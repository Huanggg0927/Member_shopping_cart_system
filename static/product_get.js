function fetchProductInfo() {
    var productName = $('#productName').val();
    var encodedProductName = encodeURIComponent(productName);
    var url = `/product/${encodedProductName}`;

    $.getJSON(url, function(data) {
        var productInfo = $('#productInfo');
        if (data.message) {
            productInfo.text(data.message);
        } else {
            var htmlContent = `<p>名稱: ${data.name}</p>
                               <p>品牌: ${data.brand}</p>
                               <p>類別: ${data.category}</p>
                               <p>價格: ${data.price}</p>
                               <p>庫存: ${data.stock}</p>
                               <p><img src="${data.main_image_url}" alt="Product Image" /></p>`;
            productInfo.html(htmlContent);
        }
    }).fail(function(jqXHR, textStatus, errorThrown) {
        $('#productInfo').text('取的商品資訊 失敗 !');
        console.error('Error:', errorThrown);
    });
}
