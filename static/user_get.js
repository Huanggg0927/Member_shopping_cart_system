function fetchUserInfo() {
    var userName = $('#userName').val().trim();
    if (!userName) {
        $('#userInfo').text('Please enter a valid username.');  // 檢查用戶名是否為空
        return;  // 如果是空的，就不執行後續
    }

    var encodedUserName = encodeURIComponent(userName);
    var url = `/users/${encodedUserName}`;
    var token = localStorage.getItem('access_token'); 

    $.ajax({
        url: url,
        type: 'GET',  
        dataType: 'json',  
        beforeSend: function(xhr) {  
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function(data) {
            var userInfo = $('#userInfo');
            if (data.message) {
                userInfo.text(data.message);
            } else {
                var htmlContent = `<p>Username: <strong>${data.username}</strong></p>
                                   <p>Password: <strong>${data.password}</strong></p>
                                   <p>Email: <strong>${data.email}</strong></p>
                                   <p>Role: <strong>${data.role}</strong></p>`;
                userInfo.html(htmlContent);
            }
        },
        error: function(jqXHR, textStatus, errorThrown) {
            var errorMessage = '取得使用者訊息失敗 !';
            if (jqXHR.responseJSON && jqXHR.responseJSON.message) {
                errorMessage += ': ' + jqXHR.responseJSON.message;
            }
            $('#userInfo').text(errorMessage);
            console.error('Error:', errorThrown);
        }
    });
}
