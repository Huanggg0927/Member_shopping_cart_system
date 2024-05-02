$(document).ready(function() {
    var token = localStorage.getItem('access_token');
    $('#tokenDisplay').text(token);
});
