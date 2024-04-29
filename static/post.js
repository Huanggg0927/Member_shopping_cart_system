document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('productForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // 阻止表单默认提交行为
        const formData = new FormData(form);
        const jsonData = {};
        formData.forEach((value, key) => { jsonData[key] = value; });

        fetch('/products', {  // 注意确保这是正确的POST路由
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData)
        })
        .then(response => response.json())
        .then(data => {
            alert(data.message); // 显示从服务器返回的消息
        })
        .catch(error => console.error('Error:', error));
    });
})