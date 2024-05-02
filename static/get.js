function fetchProductInfo() {
    var productName = $('#productName').val();
    var encodedProductName = encodeURIComponent(productName);
    var url = `/product/${encodedProductName}`;

    $.getJSON(url, function(data) {
        var productInfo = $('#productInfo');
        if (data.message) {
            productInfo.text(data.message);
        } else {
            var htmlContent = `<p>Name: ${data.name}</p>
                               <p>Brand: ${data.brand}</p>
                               <p>Category: ${data.category}</p>
                               <p>Price: ${data.price}</p>
                               <p>Stock: ${data.stock}</p>
                               <p>Main Image: <img src="${data.main_image_url}" alt="Product Image" /></p>`;
            productInfo.html(htmlContent);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        $('#productInfo').text('Failed to fetch product information');
        console.error('Error:', errorThrown);
    });
}
