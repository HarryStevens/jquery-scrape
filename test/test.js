var path = require("path"),
    tape = require("tape"),
    $request = require("../");

console.log(path.join(__dirname, "test.html"));
console.log(path.resolve(__dirname, "test.html"));

tape("$request requests some HTML and lets you use jQuery as the selection engine", function(test){
  $request(path.resolve(__dirname, "test.html"), $ => {
    console.log($("body").html());
  });
  test.end();
});