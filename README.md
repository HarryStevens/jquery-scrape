# jquery-scrape
Use jQuery as your selection engine on an HTTP request's response.

## Installation
```bash
npm i jquery-scrape -S
```

## Usage
jquery-scrape is a convenience wrapper for [request](https://github.com/request/request) and [cheerio](https://github.com/cheeriojs/cheerio). With almost no code, you can make an HTTP request and get back a jQuery selection engine.
```js
const $request = require("jquery-scrape");

$request("https://www.example.com/", $ => {
  // Get the inner HTML of the DOM's body element.
  $("body").html();

  // Get the href attribute of an anchor tag.
  $("a").attr("href");

  // Traverse through each div...
  $("div").each((i, div) => {
    ...and get its class.
    const class = $(div).attr("class");
  });

  // Scrape a table.
  let cols = [];
  $("thead").find("th").each((i, th) => {
    cols.push($(th).text().trim());
  });
  let data = [];
  $("tbody").find("tr").each((i, tr) => {
    let obj = {};
    $(tr).find("td").each((tdIndex, td) => {
      obj[cols[tdIndex]] = $(td).text().trim();
    });
    data.push(obj);
  });
  require("fs").writeFileSync("data.csv", JSON.stringify(data));
});
```

## Tests
```bash
npm test
```