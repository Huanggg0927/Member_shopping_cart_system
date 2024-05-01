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
                    window.location.href = '/welcome.html';  // 重定向到欢迎页面
                } else {
                    $('#message').text('Login failed: ' + data.msg);
                }
            },
            error: function(xhr, status, error) {
                $('#message').text('Error: ' + error);
                console.error('Login failed with status: ' + status + ' and error: ' + error);
            }
        });
    });
});