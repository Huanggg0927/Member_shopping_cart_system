$(document).ready(function() {
    $('#deleteForm').submit(function(event) {
        event.preventDefault();
        var userName = $('#userName').val();
        deleteUser(userName); 
    });
});

function deleteUser(userName) { 
    var token = localStorage.getItem('access_token'); 
    $.ajax({
        url: `/users/${encodeURIComponent(userName)}`,
        method: 'DELETE',
        beforeSend: function(xhr) {
            xhr.setRequestHeader("Authorization", "Bearer " + token);
        },
        success: function(data) {
            alert(data.message);
            console.log('刪除使用者 成功!');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('刪除使用者失敗 :', errorThrown);
        }
    });
}
