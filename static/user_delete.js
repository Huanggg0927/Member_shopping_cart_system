$(document).ready(function() {
    $('#deleteForm').submit(function(event) {
        event.preventDefault(); // 防止表单默认提交行为
        var userName = $('#userName').val();
        deleteUser(userName);  // 改名为 deleteUser
    });
});

function deleteUser(userName) {  // 这里也改为 deleteUser
    var token = localStorage.getItem('access_token'); 
    $.ajax({
        url: `/users/${encodeURIComponent(userName)}`,
        method: 'DELETE',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function(data) {
            alert(data.message);
            console.log('User deleted successfully');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Failed to delete the user:', errorThrown);
        }
    });
}
