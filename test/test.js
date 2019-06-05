var path = require("path"),
    tape = require("tape"),
    $request = require("../");

console.log(path.join(__dirname, "test.html"));
console.log(path.resolve(__dirname, "test.html"));

tape("$request requests some HTML and lets you use jQuery as the selection engine", function(test){
  $request("https://raw.githubusercontent.com/HarryStevens/jquery-scrape/master/test/test.html", function($){
    test.equal($("h1").text().trim(), "Hello");
    test.equal($("div").html(), "world!");

    $("tbody tr").each(function(rowIndex, row){

      if (rowIndex === 0){
        test.equal(rowIndex, 0);

        $(row).find("td").each(function(cellIndex, cell){
          const cellText = $(cell).text().trim();

          if (cellIndex === 0){
            test.equal(cellText, "1");
          }

          else {
            test.equal(cellText, "Foo");
          }

        });
      }

      else {
        test.equal(rowIndex, 1);

        $(row).find("td").each(function(cellIndex, cell){
          const cellText = $(cell).text().trim();

          if (cellIndex === 0){
            test.equal(cellText, "2");
          }

          else {
            test.equal(cellText, "Bar");
          }

        });        
      }
    });

    test.end();
  });
});