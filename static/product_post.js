$(document).ready(function() {
    $('#productForm').submit(function(event) {
        event.preventDefault(); 
        const jsonData = {};
        const formData = $(this).serializeArray(); // 使用 jQuery 的 serializeArray() 方法

        formData.forEach(function(item) {
            jsonData[item.name] = item.value;
        });

        $.ajax({
            url: '/product',  
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(jsonData),
            success: function(data) {
                alert(data.message); 
            },
            error: function(xhr, status, error) {
                console.error('錯誤 :', error);
            }
        });
    });
});
