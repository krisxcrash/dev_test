// console.log(results[0].variants[0].price);

// AJAX call to JSON object

var queryURL = "https://www.wirelessemporium.com/products.json";
$.ajax( {
		url: queryURL,
		method: "GET"
	} )
	.done( function( response ) {
		var results = response.products;
		for ( var i = 0; i < results.length; i++ ) {
			var productsDiv = $( "<div class='item col-md-6 col-sm-6 col-xs-12 squares'>" );
			var description = results[ i ].title;
			var productType = results[ i ].product_type;
			var productVariant = results[ i ].variants;
			for ( var j = 0; j < productVariant.length; j++ ) {
				var variants = productVariant[ j ];
			}
			// console.log( variants );
			// console.log( "objects: " + variants.sku + "\n" + variants.compare_at_price + "\n" + variants.price + "\n" );
			var cat = $( "<p class='cat'>" )
				.text( productType );
			var h4 = $( "<h4 class='product-info'>" )
				.text( description );
			var h6 = $( "<h6 class='product-info'>" )
				.text( description );
			var productImage = $( "<img>" );
			productImage.attr( "src", results[ i ].images[ 0 ].src );
			productImage.attr( "height", "400" );
			productImage.attr( "width", "400" )
            productImage.addClass( "products-image" );
            
            // var priceCompare = $("<div class = 'col-md-6 col-xs-6'>").text("Compare To: " + variants.compare_at_price);
            // var priceNew = $("<div class = 'col-md-6 col-xs-6'>").text("Our Price: " + variants.price);

            // productsDiv.prepend( priceCompare );
            // productsDiv.prepend( priceNew );
			productsDiv.prepend( h4 );
			productsDiv.prepend( cat );
			productsDiv.prepend( productImage );
			$( "#resultsHere" )
				.prepend( productsDiv );
		};
		renderProductList();
    } );
    
var categoryList = [ "Cases & Covers", "Phone Wallets, Wristlets & Clutches", "Phone Chargers", "Screen Protectors", "Handbags & Fashion Accessories", "Bluetooth & Audio", "Phone Cases & Covers", "Laptop Cases & Covers", "Phone Holders, Holsters & Belt Clips", "Phone Cables" ];

function renderProductList() {
	for ( var k = 0; k < categoryList.length; k++ ) {
		var list = $( "<li>" );
		list.addClass( "cat-list" );
		list.attr( "value", categoryList[ k ] );
		list.text( categoryList[ k ] )
		$( "#product-list" )
			.append( list );
	}
    categoryFilter();
}

// Filters product by category type

function categoryFilter() { 
	$( ".cat-list" )
		.on( "click", function() { 
            $( "#filter-results" )
            .empty(); //clears results from previous click

            event.preventDefault(); //prevents window from reloading on click
			var filterList = $( this )
				.attr( "value" );

            // ajax call to JSON object
			var queryURL = "https://www.wirelessemporium.com/products.json";
			$.ajax( {
					url: queryURL,
					method: "GET"
				} )
				.done( function( response ) {
					var results = response.products;
					for ( var i = 0; i < results.length; i++ ) {
						var productsDiv = $( "<div class='item col-md-6 col-sm-6 col-xs-12 squares'>" );
						var description = results[ i ].title;
						var productType = results[ i ].product_type;
						var productVariant = results[ i ].variants;
						for ( var j = 0; j < productVariant.length; j++ ) {
							var variants = productVariant[ j ];
						}
						if ( filterList === productType ) {
							var cat = $( "<p class='cat'>" )
								.text( productType );
							var h4 = $( "<h4 class='product-info'>" )
								.text( description );
							var h6 = $( "<h6 class='product-info'>" )
								.text( description );
							var productImage = $( "<img>" );
							productImage.attr( "src", results[ i ].images[ 0 ].src );
							productImage.attr( "height", "400" );
							productImage.attr( "width", "400" )
							productImage.addClass( "products-image" );
							productsDiv.prepend( h4 );
							productsDiv.prepend( cat );
							productsDiv.prepend( productImage );
							$( "#filter-results" )
								.prepend( productsDiv );
						}
						$( "#resultsHere" )
							.addClass( "hidden" ); //hides the product results
						$( "#filter-results" )
							.removeClass( "hidden" ); //displays filtered results
					};
				} );
		} )
};


function newProductList() {
    var listProducts = [];

            var queryURL = "https://www.wirelessemporium.com/products.json";
                $.ajax( {
                        url: queryURL,
                        method: "GET"
                    } )
                    .done( function( response ) {
                        var results = response.products;

                        for ( var i = 0; i < results.length; i++ ) {

                            var product = {
                                description: results[ i ].title,
                                productType: results[ i ].product_type,
                                parentId: results[ i ].id,
                            };
                            
                            var productVariant= results[ i ].variants;
                                for ( var j = 0; j < productVariant.length; j++ ) {
                                    var variants = productVariant[ j ];
                                
                                
                                var variantOfProduct = {
                                    available: variants.available,
                                    moboPrice: variants.price,
                                    comparePrice: variants.compare_at_price,
                                    childId: variants.id,
                                    childImage: variants.src
                                }

                            }
                            listProducts.push(product,variantOfProduct);
                        }
                        
                    
                    });
            
        }

$("#price-sort").on("click", function() {
    $( "#filter-results" ).empty(); //clears results from previous click

    event.preventDefault(); //prevents window from reloading on click
    var priceSort = $( this )
        .attr( "value" );

        function sortResults(prop, asc) {
            listProducts = priceSort.sort(function(a, b) {
                if (asc) {
                    return (a[prop] > b[prop]) ? 1 : ((a[prop] < b[prop]) ? -1 : 0);
                } else {
                    return (b[prop] > a[prop]) ? 1 : ((b[prop] < a[prop]) ? -1 : 0);
                }
            });
}

})

newProductList();