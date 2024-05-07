$(document).ready(function() {
    $('#userForm').on('submit', function(e) {
        e.preventDefault(); 

        var userData = {
            username: $('#username').val(),
            password: $('#password').val(),
            email: $('#email').val()
        };

        $.ajax({
            url: '/users', 
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