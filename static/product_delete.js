$(document).ready(function() {
    $('#deleteForm').submit(function(event) {
        event.preventDefault();
        var productName = $('#productName').val();
        deleteProduct(productName);
    });
});

function deleteProduct(productName) {
    $.ajax({
        url: `/product/${encodeURIComponent(productName)}`,
        method: 'DELETE',
        success: function(data) {
            alert(data.message);
            console.log('商品刪除 成功 !');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('商品刪除 失敗 :', errorThrown);
        }
    });
}
