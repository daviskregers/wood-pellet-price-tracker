# Wood pelet price tracker

An app to track average price of wood pellets on [https://www.ss.com/lv/production-work/firewood/granules/](ss.com) advertisements.

You can see it live at [https://pellets.deiveris.lv](https://pellets.deiveris.lv).

## App uses:
- PostgreSQL database
- Python crawler
- Elixir / phoenix for API
- React for frontend

## Todo:
- [ ] add phoenix migrations
- [ ] schedule worker [https://github.com/dbader/schedule](https://github.com/dbader/schedule)
- [ ] nginx proxy (front and api)
- [ ] travis deployment do DigitalOcean
- [ ] add categories (6mm / 8mm) (15kg / Big Bag)
- [ ] frontend toggle categories
- [ ] prices datatable
- [ ] split prices and averages endpoints
- [ ] multiple averages in chart by category