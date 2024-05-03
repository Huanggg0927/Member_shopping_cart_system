$(document).ready(function() {
    // 当鼠标进入购物车图标区域时触发更新
    $('#cart').mouseenter(function() {
        updateCart();  // 调用更新购物车函数
    });

    function updateCart() {
        var access_token = localStorage.getItem('access_token');
        if (access_token) {
            $.ajax({
                url: '/cart',
                type: 'GET',
                dataType: 'json',
                headers: {
                    'Authorization': 'Bearer ' + access_token
                },
                success: function(response) {
                    var items = response.items;
                    var content = '';
                    items.forEach(function(item) {
                        content += '<div class="cart-item">' +
                                    '<p>' + item.name + ' x ' + item.quantity + '</p>' +
                                    '<p>價格: $' + item.price + '</p>' +
                                   '</div>';
                    });
                    $('#cartItems').html(content);
                    // 显示总金额
                    $('#totalPrice').text('總金額: $' + response.totalPrice);
                },
                error: function() {
                    alert('無法加載購物車資料');
                }
            });
        } else {
            alert('您未登入或會話已過期。');
        }
    }
});
