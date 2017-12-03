
var queryURL = "https://www.wirelessemporium.com/products.json";
$.ajax({
		url: queryURL,
		method: "GET"
	})
	.done(function(response) {
		console.log(response);
		console.log(response.products[0].id);
		var results = response.products;
		for (var i = 0; i < results.length; i++) {
			var productsDiv = $("<div class='item col-md-6 col-sm-6 col-xs-12 squares'>");
            var description = results[i].title;
            var productType = results[i].product_type;
            var productVariant = results[i].variants;

            for (let j = 0; j < productVariant.length; j++) {
                const variants = productVariant[j];
            }
                var cat = $("<p class='cat'>").text(productType);
                var h4 = $("<h4 class='product-info'>")
                .text(description);
                var h6 = $("<h6 class='product-info'>")
				.text(description);
                var productImage = $("<img>");
                productImage.attr("src", results[i].images[0].src);
                productImage.attr("height", "400");
                productImage.attr("width", "400")
                productImage.addClass("products-image");
                
                productsDiv.prepend(h4);
                productsDiv.prepend(cat);
                productsDiv.prepend(productImage);
                $("#resultsHere")
                    .prepend(productsDiv);


		};
    });


$(document).on("click", ".product-list", function() {
    var catFilter = $(this).value;

    $("#resultsHere").addClass("hidden");

    

})
    // var queryURL = "https://www.wirelessemporium.com/products.json";
    // $.ajax({
    //         url: queryURL,
    //         method: "GET"
    //     })
    //     .done(function(response) {
    //         console.log(response);
    //         console.log(response.products[0].id);
    //         var results = response.products;
    //         for (var i = 0; i < results.length; i++) {
    //             var productsDiv = $("<div class='item col-md-6 col-sm-6 col-xs-12 squares'>");
    //             var description = results[i].title;
    //             var productType = results[i].product_type;
    //             var productVariant = results[i].variants;
    
    //             for (let j = 0; j < productVariant.length; j++) {
    //                 const variants = productVariant[j];
    //             }
