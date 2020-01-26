var items = [];
var serverURL = "http://localhost:8080/API/";


function fetchCatalog() {

    //get items from the server
    $.ajax({
        url: serverURL + "items",
        type: "GET",
        success: function (response) {

            console.log("Yay, it works!", response);



            //solve, show only my items
            //travel response array
            //get each item on the array
            // if the item.user == "Sandie"
            // then, push item into items array

            for (var i = 0; i < response.length; i++) {
                var item = response[i];
                if (item.user == "Lois") {
                    items.push(item);
                }
            }
            //for all the items to show
            //items = response;

            displayCatalog();

        },
        error: function (errorDetails) {
            console.log("Error:", errorDetails);
        }
    });

}

function displayCatalog() {
    //travel the array
    for (var i = 0; i < items.length; i++) {
        //get the item
        var item = items[i];
        //draw the item on the DOM (html)
        drawItem(item);
    }

}

function drawItem(item) {
    //create the syntax

    var sntx =
        `<div class='item'>
<img src='${item.image}'>
<label class='code'>${item.code}</label>
<label class='cat'>${item.category}</label>

<label class='desc'>${item.description}</label>

<label class='price'>${item.price}</label>
<button class='btn btn-sm btn-info'> + </button>

</div>`;


    //get the element from the screen
    var container = $("#catalog");

    //append the syntax to the element
    container.append(sntx);

}

function search() {

    var text = $("#txtSearch").val().toLowerCase(); //get the text
    //console.log(text);

    //clear previous results
    $("#catalog").html("");

    //travel the array and show only items that contains the text
    for (var i = 0; i < items.length; i++) {
        var item = items[i];

        //if the description contains the text,
        //OR the category contains the text
        //OR the code is equal to the text
        //or the price is equal to the text
        //then show the item on the screen

        if (item.description.toLowerCase().includes(text)
            || item.category.toLowerCase().includes(text)
            || item.code == text
            || item.price == text

        ) {
            drawItem(item);
        }
    }
}

function init() {
    console.log("This is the catalog page");

    //get data
    fetchCatalog();
    displayCatalog();

    //hook events
    $("#btnSearch").click(search);
    $("#txtSearch").keypress(function (e) {

        /* if(e.key == "Enter"){
        search();
        } */

        if (e.keyCode == 13) {
            search();
        }

    });

    $("#catalog").on("click", ".item", function () {

        // $(this).toggleClass("selected");

        // get the image of the clicked element
        var img = $(this).find('img').clone();

        $(".modal-body").html(img);
        $("#modal").modal();

    });


}



window.onload = init;