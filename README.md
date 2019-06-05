# jquery-scrape
Use jQuery as your selection engine on the result of an HTTP/HTTPS request.

## Installation
```bash
npm i jquery-scrape
```

## Usage
```js
const $request = requre("jquery-scrape");

$request("https://www.google.com/", $ => {

  $("body").html();
});
```