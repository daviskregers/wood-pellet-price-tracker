# Wood pelet price tracker

An app to track average price of wood pellets on [https://www.ss.com/lv/production-work/firewood/granules/](ss.com) advertisements.

You can see it live at [https://pellets.deiveris.lv](https://pellets.deiveris.lv).

## App uses:
- PostgreSQL database
- Python crawler
- Elixir / phoenix for API
- React for frontend

## Todo:
- [x] add phoenix migrations
- [x] schedule worker [https://github.com/dbader/schedule](https://github.com/dbader/schedule)
- [x] nginx proxy (front and api)
- [x] chart date make scalar x scale
- [x] split prices and averages endpoints
- [ ] logo, favicon, meta
- [ ] chart label dates
- [ ] add categories (6mm / 8mm) (15kg / Big Bag)
- [ ] frontend toggle categories
- [ ] prices datatable
- [ ] multiple averages in chart by category
- [ ] travis deployment do DigitalOcean
- [ ] Email notifications when average crosses certain level