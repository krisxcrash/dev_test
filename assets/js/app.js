// this returns the initial product array to the screen. 
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
      var cat = $( "<p class='cat'>" )
        .text( productType );
      var h4 = $( "<h4 class='product-info'>" )
        .text( description );
      var productImage = $( "<img>" );
      productImage.attr( "src", results[ i ].images[ 0 ].src );
      productImage.attr( "height", "400" );
      productImage.attr( "width", "400" )
      productImage.addClass( "products-image" );
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
            var productsDiv = $( "<div class='item col-md-6 col-sm-6 col-xs-12 squares clearfix'>" );
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


//this function sorts the products from lowest price to the highest
// function sortLowHigh() {

  $( ".sort-low-high" )
    .on( "click", function() {
        var listProducts = [];
      $( "#filter-results" )
        .empty(); //clears results from previous click
      event.preventDefault(); //prevents window from reloading on click
      var priceSort = $( this )
        .attr( "value" );
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
            var productVariant = results[ i ].variants;
            for ( var j = 0; j < productVariant.length; j++ ) {
              var variants = productVariant[ j ];
              var variantOfProduct = {
                available: variants.available,
                moboPrice: variants.price,
                comparePrice: variants.compare_at_price,
                childId: variants.id,
                // childImage: variantImage.src
              }
              jQuery.extend( product, variantOfProduct )
              listProducts.push( product );
            }
            listProducts.sort( function( a, b ) {
              return parseFloat( a.moboPrice ) - parseFloat( b.moboPrice );
            } );
            for ( var m = 0; m < listProducts.length; m++ ) {
              var listProductsSort = listProducts[ m ];
              console.log( listProductsSort )
            }
            var productsDiv = $( "<div class='item col-md-6 col-sm-6 col-xs-12 squares clearfix'>" );
            var description = listProductsSort.description;
            var productType = listProductsSort.productType;
            var price = listProductsSort.moboPrice;
            var cat = $( "<p class='cat'>" )
              .text( productType );
            var h4 = $( "<h4 class='product-info'>" )
              .text( description );
            var h6 = $( "<h6 class='product-price'>" )
              .text( price );
            var productImage = $( "<img>" );
            // productImage.attr( "src", listProductsSort.childImage );
            productImage.attr( "height", "400" );
            productImage.attr( "width", "400" )
            productImage.addClass( "products-image" );
            productsDiv.prepend( h6 );
            productsDiv.prepend( h4 );
            productsDiv.prepend( cat );
            productsDiv.prepend( productImage );
            $( "#price-results" )
              .append( productsDiv );
            $( "#resultsHere" )
              .addClass( "hidden" ); //hides the product results
            $( "#filter-results" )
              .addClass( "hidden" ); //hides the filtered category results
            $( "#price-results" )
              .removeClass( "hidden" ); // displays the price results 
          }
        //   console.log( listProductsSort )
        } );
    } );
// }
// sortLowHigh();


//this function sorts the products from highest price to the lowest
// function sortHighLow() {

  $( ".sort-high-low" )
    .on( "click", function() {
        var listProducts = [];
      $( "#filter-results" )
        .empty(); //clears results from previous click
      event.preventDefault(); //prevents window from reloading on click
      var priceSort = $( this )
        .attr( "value" );
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
            var productVariant = results[ i ].variants;
            for ( var j = 0; j < productVariant.length; j++ ) {
              var variants = productVariant[ j ];
              var variantOfProduct = {
                available: variants.available,
                moboPrice: variants.price,
                comparePrice: variants.compare_at_price,
                childId: variants.id,
                // childImage: variantImage.src
              }
              jQuery.extend( product, variantOfProduct )
              listProducts.push( product );
            }
            listProducts.sort( function( a, b ) {
              return parseFloat( b.moboPrice ) - parseFloat( a.moboPrice );
            } );
            for ( var m = 0; m < listProducts.length; m++ ) {
              var listProductsSort = listProducts[ m ];
              console.log( listProductsSort )
            }
            var productsDiv = $( "<div class='item col-md-6 col-sm-6 col-xs-12 squares clearfix'>" );
            var description = listProductsSort.description;
            var productType = listProductsSort.productType;
            var price = listProductsSort.moboPrice;
            var cat = $( "<p class='cat'>" )
              .text( productType );
            var h4 = $( "<h4 class='product-info'>" )
              .text( description );
            var h6 = $( "<h6 class='product-price'>" )
              .text( price );
            var productImage = $( "<img>" );
            // productImage.attr( "src", listProductsSort.childImage );
            productImage.attr( "height", "400" );
            productImage.attr( "width", "400" )
            productImage.addClass( "products-image" );
            productsDiv.prepend( h6 );
            productsDiv.prepend( h4 );
            productsDiv.prepend( cat );
            productsDiv.prepend( productImage );
            $( "#price-results" )
              .append( productsDiv );
            $( "#resultsHere" )
              .addClass( "hidden" ); //hides the product results
            $( "#filter-results" )
              .addClass( "hidden" ); //hides the filtered category results
            $( "#price-results" )
              .removeClass( "hidden" ); // displays the price results 
          }
        } );
    } );
// }
// sortHighLow();