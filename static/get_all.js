function fetchAllProducts() {
    const token = localStorage.getItem('access_token');
    console.log(token);

    if (!token) {
        console.log('No token found. Please login first.');
        $('#productsInfo').text('請先登入。');
        return;
    }

    $.ajax({
        url: '/products', // 确认这是正确的端点地址
        type: 'GET',
        contentType: 'application/json',
        headers: {
            'Authorization': 'Bearer ' + token
        },
        success: function(data) {
            let content = '<h2>產品列表</h2>';
            $.each(data, function(index, product) {
                content += `<div>
                                <p>名稱: ${product.name}</p>
                                <p>品牌: ${product.brand}</p>
                                <p>類別: ${product.category}</p>
                                <p>價格: $${product.price}</p>
                                <p>庫存: ${product.stock}</p>
                                <p>主圖像: <img src="${product.main_image_url}" alt="Product Image" style="width: 100px;"></p>
                            </div><hr>`;
            });
            $('#productsInfo').html(content);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Failed to fetch product information:', errorThrown);
            $('#productsInfo').text('無法獲取產品資訊。');
        }
    });
}
