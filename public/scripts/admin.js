var serverURL = "http://localhost:8080/api/";

//an object constructor
function Item(code,desc,price,image, category, stock, deliveryDays){
this.code = code;
this.description = desc;
this.price = price;
this.image = image;
this.category = category;
this.stock = stock;
this.deliveryDays = deliveryDays;
this.user = "Lois";
}

function clearForm(){
$("#txtCode").val("");
$("#txtDescription").val("");
$("#txtPrice").val("");
$("#txtImage").val("");
$("#txtCategory").val("");
$("#txtStock").val("");
$("#txtDeliveryDays").val("");
}

function saveItem(){
//get the values
var code = $("#txtCode").val();
var desc = $("#txtDescription").val();
var price = $("#txtPrice").val();
var image = $("#txtImage").val();
var category = $("#txtCategory").val();
var stock = $("#txtStock").val();
var delivery = $("#txtDeliveryDays").val();

//create an object
//this is one object with 7 attributes

var theItem = new Item(code, desc, price, image, category, stock, delivery);
console.log(theItem);

var jsonString = JSON.stringify(theItem);
console.log(jsonString);

//send the object to the server
$.ajax({
url: serverURL + "items",
type: "POST",
data: jsonString,
contentType: "application/json",
success: function(response){

console.log("Yay, it works!", response);

//clear the items
clearForm();

//show notification
$("#alertSuccess").removeClass("hidden");
//setTimeout fn and miliseconds
setTimeout( function(){
$("#alertSuccess").addClass("hidden");
}, 3000);
},
error: function(errorDetails){
console.log("Error:", errorDetails);
}
});
}
//AJAX - Async Javascript And XML communication PS - JSON is now XML
//pay for the order
function testAjax(){
$.ajax({
url: serverURL + "test",
type: 'GET',
success: function (res){
console.log("Payment finished");
console.log("Server says", res);

console.log("Done thank you for the payment");
},

error: function (err){
console.log("Payment error");
console.log("Error occured",err);

console.log("Done thank you for the payment");
}

});
//never run the code here until the success and error have completed
//console.log("Done thank you for the payment");
//console.log("NOT FINISHED YET");
}

function init(){
console.log("This is the Admin Page!!");

//used to retrieve the initial data
//hook events
$("#btnSave").click(saveItem);
}

window.onload = init;