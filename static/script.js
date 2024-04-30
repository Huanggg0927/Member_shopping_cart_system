$(document).ready(function() {
    $('#userForm').on('submit', function(e) {
        e.preventDefault(); // 阻止表單的默認提交行為

        var userData = {
            username: $('#username').val(),
            password: $('#password').val(),
            email: $('#email').val()
        };

        $.ajax({
            url: '/users', // 根據後端設置可能需要調整URL
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(userData),
            success: function(response) {
                $('#responseMessage').html('<p>用戶註冊成功!</p>');
                console.log(response);
            },
            error: function(xhr, status, error) {
                var errorMessage = xhr.status + ': ' + xhr.statusText
                $('#responseMessage').html('<p>錯誤: ' + errorMessage + '</p>');
            }
        });
    });
});