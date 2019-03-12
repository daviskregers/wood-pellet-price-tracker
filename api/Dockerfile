FROM elixir:1.5.3-alpine

WORKDIR /app
ADD . /app

RUN apk add --update nodejs nodejs-npm
RUN cd /app/assets && npm i

# Install hex & rebar
RUN cd /app && \
    mix local.hex --force && \
    mix local.rebar --force && \
    mix hex.info && \
    mix deps.get

EXPOSE 4000

CMD ["mix", "phx.server"]