function updateUser() {
    var username = $('#name').val(); 
    var formData = {
        name: $('#name').val(),
        password: $('#password').val(),
        email: $('#email').val(),
        new_name: $('#new_name').val()
    };

    // 獲取儲存在 localStorage 的 token
    var token = localStorage.getItem('access_token');

    $.ajax({
        url: `/users/${encodeURIComponent(username)}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        beforeSend: function(xhr) { 
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function(data) {
            $('#responseMessage').text(data.message);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', errorThrown);
            $('#responseMessage').text('使用者更新失敗');
        }
    });
}
