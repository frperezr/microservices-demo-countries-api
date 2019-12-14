// node
const fs = require("fs");
const { spawn } = require("child_process");

// json
const json = require("./countries.json");
const continents = require("./continents.json");

const xah_obj_to_map = obj => {
  const map = new Map();
  Object.keys(obj).forEach(k => {
    map.set(k, obj[k]);
  });
  return map;
};

function get_random_int(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

const obj_to_sql = obj =>
  `INSERT INTO countries SET (continent_code,continent,country,country_code,capital,value_budget,value_midrange,value_luxury) VALUES ("${obj.continent_code}","${obj.continent}","${obj.country}","${obj.country_code}","${obj.capital}",${obj.value_budget},${obj.value_midrange},${obj.value_luxury});`;

const main = () => {
  values = [];
  for (let value of xah_obj_to_map(json)) {
    const [k, v] = value;
    let obj = {
      continent_code: v.continent,
      continent: continents[`${v.continent}`],
      country: v.name,
      country_code: k,
      capital: v.capital,
      value_budget: get_random_int(1, 500),
      value_midrange: get_random_int(500, 1000),
      value_luxury: get_random_int(1500, 3000)
    };
    values.push(obj_to_sql(obj));
  }

  const name = `seed_${Date.now()}.sql`;

  fs.writeFile(
    name,
    `-- +goose Up \n-- +goose StatementBegin \n${values
      .join(",")
      .replace(/;,/g, "; \n")
      .replace(/'/g, "")
      .replace(/"/g, "'")} \n-- +goose StatementEnd
      `,
    err => {
      if (err) return console.log(err);
      console.log("The file was saved!");
    }
  );

  spawn("mv", [`./${name}`, "../src/database/migrations"]);
};

main();
