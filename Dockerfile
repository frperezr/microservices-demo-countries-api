FROM alpine

RUN apk add --update ca-certificates

WORKDIR /src/countries-api

COPY bin/noken-countries-api /usr/bin/noken-countries-api

EXPOSE 3040

CMD ["/bin/sh", "-l", "-c", "noken-countries-api"]