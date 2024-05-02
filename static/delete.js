$(document).ready(function() {
    $('#deleteForm').submit(function(event) {
        event.preventDefault(); // 防止表单默认提交行为
        var productName = $('#productName').val();
        deleteProduct(productName);
    });
});

function deleteProduct(productName) {
    $.ajax({
        url: `/product/${encodeURIComponent(productName)}`, // 使用 encodeURIComponent 确保URL正确编码
        method: 'DELETE',
        success: function(data) {
            alert(data.message);
            console.log('Product deleted successfully');
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Failed to delete the product:', errorThrown);
        }
    });
}
