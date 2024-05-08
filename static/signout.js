$(document).ready(function() {
    $('#signoutButton').click(function(e) {
        e.preventDefault(); // 阻止按钮默认行为
        $.ajax({
            url: '/signout',
            type: 'GET',
            success: function() {
                alert('登出成功');
                window.location.href = '/'; // 重定向到首页或登录页面
            },
            error: function() {
                alert('登出失败，请稍后再试');
            }
        });
    });
});