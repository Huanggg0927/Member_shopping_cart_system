$(document).ready(function() {
    // 初始加载购物车
    updateCart();

    // 当鼠标移入购物车图标时触发更新购物车
    $('#cart').mouseenter(function() {
        updateCart();
    });

    $('#cartItems').on('click', '.remove-item', function() {
        var itemId = $(this).data('item-id');
        
        $.ajax({
            url: '/cart/' + itemId,  // 根据实际情况调整 URL
            type: 'DELETE',  // 请求方法为 DELETE
            success: function(result) {
                console.log('Item removed successfully');
                alert('删除成功！');  // 成功时弹出通知
            },
            error: function(xhr, status, error) {
                console.log('Error removing item: ' + error);
                alert('删除失败：' + xhr.responseText);  // 失败时弹出通知
            }
        });
    });
    


    // 定义更新购物车的函数
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
                        content += '<div class="cart-item" style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">' +
                                    '<div style="flex-grow: 1;">' +
                                        '<p>' + item.name + ' x ' + item.quantity + '</p>' +
                                        '<p>价格: $' + (item.price * item.quantity) + '</p>' +
                                    '</div>' +
                                    '<button class="remove-item" data-item-id="' + item.cart_id + '" style="flex-shrink: 0;">✖</button>' +
                                   '</div>';
                    });
                    
                    $('#cartItems').html(content);
                    // 显示总金额
                    $('#totalPrice').text('总金额: $' + response.totalPrice);
                },
                error: function() {
                    alert('无法加载购物车数据，请先登录');
                }
            });
        } else {
            alert('您未登录或会话已过期。');
        }
    }
});
