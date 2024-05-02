function updateUser() {
    var username = $('#name').val(); // 假设产品名称是唯一标识符，用于PUT URL
    var formData = {
        name: $('#name').val(),
        password: $('#password').val(),
        email: $('#email').val(),
        new_name: $('#new_name').val()
    };

    // 获取存储在 localStorage 或 sessionStorage 的 token
    var token = localStorage.getItem('access_token'); // 或 sessionStorage.getItem('jwtToken')

    $.ajax({
        url: `/users/${encodeURIComponent(username)}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        beforeSend: function(xhr) {   // 包含认证 token 的头部
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function(data) {
            $('#responseMessage').text(data.message);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', errorThrown);
            $('#responseMessage').text('Failed to update the user');
        }
    });
}
