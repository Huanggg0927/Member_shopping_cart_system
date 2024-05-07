$(document).ready(function() {
    // 初始載入購物車
    updateCart();

    // 當滑鼠移到購物車圖案時觸發更新
    $('#cart').mouseenter(function() {
        updateCart();
    });

    // 購物車中的取消功能
    $('#cartItems').on('click', '.remove-item', function() {
        var itemId = $(this).data('item-id');
        
        $.ajax({
            url: '/cart/' + itemId,  
            type: 'DELETE', 
            success: function(result) {
                console.log('Item removed successfully');
                alert('删除成功！');  
            },
            error: function(xhr, status, error) {
                console.log('Error removing item: ' + error);
                alert('删除失败：' + xhr.responseText);  
            }
        });
    });

    // 更新購物車的函數
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
                                        '<p>價格: $' + (item.price * item.quantity) + '</p>' +
                                    '</div>' +
                                    '<button class="remove-item" data-item-id="' + item.cart_id + '" style="flex-shrink: 0;">✖</button>' +
                                   '</div>';
                    });
                    $('#cartItems').html(content);
                    // 顯示總金額
                    $('#totalPrice').text('總金額: $' + response.totalPrice);
                },
                error: function() {
                    alert('無法載入購物車內容，請先登入');
                }
            });
        } else {
            alert('請先登入，重新生成 Token');
        }
    }
});