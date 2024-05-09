$(document).ready(function() {
    $.ajax({
        url: '/carts',  
        type: 'GET',
        dataType: 'json',  
        success: function(response) {
            var html = '';
            for (var username in response) {
                var totalAmount = 0;  // 初始化用戶總金額
                html += '<h3>' + username + '</h3><ul>';
                response[username].forEach(function(item) {
                    var itemTotal = item.quantity * item.price;  // 每項商品的總金額
                    totalAmount += itemTotal;  // 累加總金額
                    html += '<li>Product: ' + item.product + ', Quantity: ' + item.quantity + ', Price: ' + item.price + ', Subtotal: $' + itemTotal.toFixed(2) + '</li>';
                });
                html += '</ul>';
                html += '<p>訂單總金額為 : $' + totalAmount.toFixed(2) + '</p>';  // 顯示總金額
            }
            $('#orders').html(html);
        },
        error: function() {
            $('#orders').html('<p>Error loading orders.</p>');
        }
    });
});