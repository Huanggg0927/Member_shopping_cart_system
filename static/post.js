$(document).ready(function() {
    $('#productForm').submit(function(event) {
        event.preventDefault(); // 阻止表单默认提交行为
        const jsonData = {};
        const formData = $(this).serializeArray(); // 使用 jQuery 的 serializeArray() 方法

        formData.forEach(function(item) {
            jsonData[item.name] = item.value; // 将表单数据转换为 JSON 对象
        });

        $.ajax({
            url: '/product',  // 确保这是正确的 POST 路由
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData), // 发送 JSON 数据
            success: function(data) {
                alert(data.message); // 显示从服务器返回的消息
            },
            error: function(xhr, status, error) {
                console.error('Error:', error);
            }
        });
    });
});
