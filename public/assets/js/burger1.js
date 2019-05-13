$(function(){
    $(".create-form").on("submit", function(event){
        EventTarget.preventDefault();

        var newBurger = {
            burger_name: $("#newBurger")
            .val()
            .trim(),
            devoured: 0
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(function(){
            console.log("added new burger");
            location.reload();
        });  
    });

    $(".eatburger").on("click", function(event){
        event.preventDefault();

        var id = $(this).data("id");
        var devouredState = {
            devoured: 1
        };
        $.ajax("api/burgers/" + id, {
            type: "PUT",
            data: devouredState
        }).then(function(){
            console.log("burger devoured");
            location.reload();
        });
    });

    $(".trashburger").on("click", function(event){
event.preventDefault();

var id = $(this).data("id");
//sends the delete request
$.ajax({
    type: "DELETE",
    url: "/api/burgers/" + id
}).then(location.reload());
    })

    

});