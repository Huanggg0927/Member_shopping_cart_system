$(document).ready(function() {
    $('.add-to-cart-form').on('submit', function(e) {
        e.preventDefault(); // 阻止表單的標準提交
        // var productId = $(this).find('input[name="product_id"]').val(); // 獲取產品ID
        var access_token = localStorage.getItem('access_token');
        var product_name = $(this).data('product-name');
        var quantity  = $('.quantity-input').val();

        $.ajax({
            url: '/cart', // POST 請求的 URL
            type: 'POST', // 設定請求類型
            data: { // 將數據打包成一個對象
                product_name: product_name,
                access_token: access_token,
                quantity : quantity
            },
            success: function(response) {
                // 這裡可以添加一些代碼，處理成功的回應
                alert('商品已加入購物車');
            },
            error: function() {
                // 處理錯誤的回應
                alert('添加到購物車失敗');
            }
        });
    });
});