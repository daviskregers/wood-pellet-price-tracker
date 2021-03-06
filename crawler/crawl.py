import psycopg2
from pprint import pprint
from os import environ
import requests
from bs4 import BeautifulSoup
import schedule
import time
import datetime

domain = 'https://www.ss.com'

def crawl_page(url, urls_parsed = None):

    pprint('Crawl ' + url)
    pprint('Urls already parsed:')
    pprint(urls_parsed)

    if( urls_parsed == None) :
        urls_parsed = [url]

    code = requests.get(url)
    s = BeautifulSoup(code.text, "html.parser")

    items = []

    next_page = domain + s.find('a', {'rel': 'next'}).get('href');

    for item in s.findAll('tr'):

        title_column = item.find('td', {'class': 'msg2'})
        price_column = item.find('td', {'class': 'msga2-o pp6'})

        if( price_column == None  ):
            print('No price found, skipping ...')
            # pprint([item, title_column, price_column])
            continue

        title = title_column.find('a', {'class': 'am'}).get_text('', strip=True)
        link = domain + title_column.find('a', {'class': 'am'}).get('href')
        price = price_column.get_text('', strip=True)

        if( price == None or price == 'pērku'  ):
            print('No price found, skipping ...')
            # pprint([item, title_column, price_column])
            continue

        price = float(price.replace(",", "").replace(" ", "").replace("€/t.", ""))

        items.append({
            "title": title,
            "link": link,
            "price": price
        })

    pprint('got ' + str(len(items)) + ' items')

    if( next_page not in urls_parsed ):
        urls_parsed.append(next_page)
        time.sleep(1)
        pprint('crawl next page')
        (items_2, urls_parsed) = crawl_page(next_page, urls_parsed)
        items = items + items_2

    return (items, urls_parsed)

def crawl():

    pprint("Starting crawler ...")

    conn = psycopg2.connect(
        host=environ.get("PGHOST"),
        database=environ.get("PGDATABASE"), 
        user=environ.get("PGUSER"), 
        password=environ.get("PGPASSWORD")
    );

    cur = conn.cursor()
    (items, urls_parsed) = crawl_page('https://www.ss.com/lv/production-work/firewood/granules/')
    pprint(items)
    pprint(urls_parsed)

    time_now = datetime.datetime.now()

    pprint('to insert:')
    pprint(len(items))

    for item in items:
        try:
            cur.execute('INSERT INTO prices (title, url, price, date, inserted_at, updated_at) VALUES (%s, %s, %s, %s, NOW(), NOW())', (item['title'], item['link'], item['price'], time_now))
        except (Exception) as error:
            print(error)

    cur.execute("SELECT COUNT(*) FROM prices")
    pprint('inserted:')
    pprint(cur.fetchall())

    conn.commit()
    cur.close()

    if conn is not None:
        conn.close()
        print('Database connection closed.')

def job():
    crawl()

schedule.every(4).hours.do(job)

while True:
    schedule.run_pending()
    time.sleep(1)