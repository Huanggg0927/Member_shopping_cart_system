$(document).ready(function() {
    $('#loginForm').submit(function(event) {
        event.preventDefault();  // 防止表单默认提交

        var username = $('#username').val();
        var password = $('#password').val();

        $.ajax({
            url: '/login',  // 对应后端的登录路由
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password
            }),
            success: function(data) {
                console.log(data);
                if (data.access_token) {
                    // 登录成功，保存 token 和跳转
                    localStorage.setItem('access_token', data.access_token);
                    window.location.href = '/'
                    alert(data.msg)
                } else {
                    $('#message').text('Login failed: ' + data.msg);
                }
            },
            error: function(xhr) {
                // xhr.responseJSON 是從服務器返回的 JSON
                alert(xhr.responseJSON.msg);
            }
        });
    });
});