function fetchUserInfo() {
    var userName = $('#userName').val().trim();  // 添加 trim() 来清除可能的空白字符
    if (!userName) {
        $('#userInfo').text('Please enter a valid username.');  // 检查用户名是否为空
        return;  // 如果用户名为空，则不执行后续操作
    }

    var encodedUserName = encodeURIComponent(userName);
    var url = `/users/${encodedUserName}`;
    var token = localStorage.getItem('access_token'); 

    $.ajax({
        url: url,
        type: 'GET',  // 明确指定请求类型为 GET
        dataType: 'json',  // 期望从服务器返回 JSON 格式的数据
        beforeSend: function(xhr) {   // 包含认证 token 的头部
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function(data) {
            var userInfo = $('#userInfo');
            if (data.message) {
                // 显示从服务器返回的消息，可能是错误或通知
                userInfo.text(data.message);
            } else {
                // 构建显示用户信息的 HTML 结构
                var htmlContent = `<p>Username: <strong>${data.username}</strong></p>
                                   <p>Password: <strong>${data.password}</strong></p>
                                   <p>Email: <strong>${data.email}</strong></p>
                                   <p>Role: <strong>${data.role}</strong></p>`;
                userInfo.html(htmlContent);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            // 更明确的错误处理
            var errorMessage = 'Failed to fetch user information';
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMessage += ': ' + jqXHR.responseJSON.message;
            }
            $('#userInfo').text(errorMessage);
            console.error('Error:', errorThrown);
        }
    });
}
