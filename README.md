# jquery-scrape
Use jQuery as your selection engine on an HTTP request's response. [![Build Status](https://travis-ci.org/HarryStevens/jquery-scrape.svg?branch=master)](https://travis-ci.org/HarryStevens/jquery-scrape)

## Installation
```bash
npm i jquery-scrape -S
```

## Usage
jquery-scrape is a convenience wrapper for [request](https://github.com/request/request) and [cheerio](https://github.com/cheeriojs/cheerio). With almost no code, you can make an HTTP request and get back a jQuery selection engine. Here's a working example that you can run in your terminal:
```js
require("jquery-scrape")("https://www.example.com/", $ => {

  // Get the inner HTML of the DOM's body element.
  const html = $("body").html();
  console.log(html);

  // Get the href attribute of an anchor tag.
  const href = $("a").attr("href");
  console.log(href);

  // Traverse through each paragraph...
  $("p").each((i, p) => {
    // ...and get its text.
    const text = $(p).text().trim();
    console.log(text);
  });

});
```

Or suppose you want to scrape a table and output its result as JSON. Suppose the table is structured like [the one in this repo's test directory](https://github.com/HarryStevens/jquery-scrape/blob/master/test/test.html):
```html
<table>
  <thead>
    <tr>
      <th>Number</th>
      <th>Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>1</td>
      <td>Foo</td>
    </tr>
    <tr>
      <td>2</td>
      <td>Bar</td>
    </tr>      
  </tbody>
</table>
```

Scrape it like so:
```js
require("jquery-scrape")("https://raw.githubusercontent.com/HarryStevens/jquery-scrape/master/test/test.html", $ => {

  let columns = [];
  $("th").each((i, th) => {
    columns.push($(th).text());
  });

  let data = [];
  const rows = $("tbody tr");
  console.log(`Found ${rows.length} rows. Scraping them...`);
  rows.each((rowIndex, row) => {
    let object = {};
    $(row).find("td").each((cellIndex, cell) => {
      object[columns[cellIndex]] = $(cell).text();
    });
    console.log(`${((rowIndex + 1) / rows.length * 100).toFixed(1)}%`);
    data.push(object);
  });

  console.log("Writing file: data.json");
  fs.writeFile("data.json", JSON.stringify(data), err => {
    if (err) throw err;
    console.log("File saved.");
    process.exit();
  });

});
```

## Tests
```bash
npm test
```