function updateProduct() {
    var productName = $('#name').val();
    var formData = {
        name: $('#name').val(),
        brand: $('#brand').val(),
        category: $('#category').val(),
        price: parseFloat($('#price').val()),
        stock: parseInt($('#stock').val()),
        main_image_url: $('#main_image_url').val()
    };

    $.ajax({
        url: `/product/${encodeURIComponent(productName)}`,
        method: 'PUT',
        contentType: 'application/json',
        data: JSON.stringify(formData),
        success: function(data) {
            $('#message').text(data.message);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            console.error('Error:', errorThrown);
            $('#message').text('更新產品 失敗!');
        }
    });
}
