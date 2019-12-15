// node
const fs = require('fs')
const { spawn } = require('child_process')

// json
const cities = require('./cities.json')
const countries = require('./countries.json')
const continents = require('./continents.json')

const objToMap = (obj) => {
  const map = new Map()
  Object.keys(obj).forEach((k) => {
    map.set(k, obj[k])
  })
  return map
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}

const insertContinentSQL = ({ code, name }) => `INSERT INTO continents SET (code, name) VALUES ("${code}", "${name}");`

const dropContinentSQL = ({ code, name }) => `DELETE FROM continents WHERE code = "${code}" AND name = "${name}";`

const insertCountrySQL = ({ continent_code, code, name }) =>
  `INSERT INTO countries SET (continent_code, code, name) VALUES ("${continent_code}", "${code}", "${name}");`

const dropCountrySQL = ({ continent_code, code, name }) =>
  `DELETE FROM countries WHERE continent_code = "${continent_code}" AND code = "${code}" AND name = "${name}";`

const insertCitySQL = ({ stay_price, travel_price, country, name }) =>
  `INSERT INTO cities SET (stay_price, travel_price, country, name) VALUES ("${stay_price}", "${travel_price}", "${country}", "${name}");`

const dropCitySQL = ({ stay_price, travel_price, country, name }) =>
  `DELETE FROM cities WHERE stay_price = ${stay_price} AND travel_price = ${travel_price} AND country = "${country}" AND name = "${name}";`

const getFileName = (file) =>
  `${new Date()
    .toISOString()
    .split('.')[0]
    .replace(/\D/g, '')}${file.length}_${file}_seed.sql`

const write_sql = (file, up, down) => {
  const name = getFileName(file)

  fs.writeFile(
    name,
    `-- +goose Up \n-- +goose StatementBegin \n${up} \n-- +goose StatementEnd\n
      \n-- +goose Down \n-- +goose StatementBegin \n${down} \n-- +goose StatementEnd
      `,
    (err) => {
      if (err) return console.log(err)
      console.log(`The file ${name} was saved!`)
    },
  )

  spawn('mv', [`./${name}`, '../src/database/migrations'])
}

const getValues = (name, func, json) => {
  values = []
  for (let value of objToMap(json)) {
    const [k, v] = value
    let obj = {}

    switch (name) {
      case 'continents':
        obj = {
          code: k,
          name: v,
        }
        values.push(func(obj))
        break
      case 'countries':
        obj = {
          code: k,
          continent_code: v['continent'],
          name: v['name'],
        }
        values.push(func(obj))
        break
      case 'cities':
        for (let city of v) {
          obj = {
            stay_price: getRandomInt(1, 500),
            travel_price: getRandomInt(500, 1500),
            country: k,
            name: city,
          }
          values.push(func(obj))
        }
        break
      default:
        break
    }
  }
  return values
    .join(',')
    .replace(/;,/g, '; \n')
    .replace(/'/g, '')
    .replace(/"/g, "'")
}

const continentsSeed = () => {
  const up = getValues('continents', insertContinentSQL, continents)
  const down = getValues('continents', dropContinentSQL, continents)
  write_sql('continents', up, down)
}

const countriesSeed = () => {
  const up = getValues('countries', insertCountrySQL, countries)
  const down = getValues('countries', dropCountrySQL, countries)
  write_sql('countries', up, down)
}

const citiesSeed = () => {
  const up = getValues('cities', insertCitySQL, cities)
  const down = getValues('cities', dropCitySQL, cities)
  write_sql('cities', up, down)
}

const main = () => {
  continentsSeed()
  countriesSeed()
  citiesSeed()
}

main()
