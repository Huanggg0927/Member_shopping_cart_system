$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault(); 

        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            url: '/login',  
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function(data) {
                console.log(data);
                if (data.access_token) {
                    // 保存 token 和 回首頁
                    localStorage.setItem('access_token', data.access_token);
                    window.location.href = '/'
                    alert(data.msg)
                } else {
                    $('#message').text('登入失敗 : ' + data.msg);
                }
            },
            error: function(xhr) {
                alert(xhr.responseJSON.msg);
            }
        });
    });
});