FROM elixir:1.5.3-alpine

ARG MIX_ENV=prod

WORKDIR /app
RUN apk add --update nodejs nodejs-npm
ADD ./assets /app/assets
RUN rm -r /app/assets/node_modules
RUN cd /app/assets && npm i

ADD . /app

# Install hex & rebar
RUN cd /app && \
    mix local.hex --force && \
    mix local.rebar --force && \
    mix hex.info && \
    mix deps.get

EXPOSE 4000

RUN chmod +x start.sh
CMD ["sh", "./start.sh"]
