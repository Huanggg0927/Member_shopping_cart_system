$(document).ready(function() {
    $('body').on('submit', '.add-to-cart-form', function(event) {
        event.preventDefault(); 

        var productName = $(this).data('product-name');
        var quantity = $(this).find('.quantity-input').val();
        var access_token = localStorage.getItem('access_token');

        $.ajax({
            url: '/cart',
            type: 'POST',
            data: {
                product_name: productName,
                access_token: access_token,
                quantity: quantity
            },
            headers: {
                'Authorization': 'Bearer ' + access_token
            },
            success: function(response) {
                alert('已將 ' + quantity + ' 件 ' + productName + ' 添加到購物車');
            },
            error: function() {
                alert('添加到購物車失敗，請重試!');
            }
        });

        $(this).find('.quantity-input').val(1);
    });
});