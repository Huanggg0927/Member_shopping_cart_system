document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById('deleteForm');
    form.addEventListener('submit', function(event) {
        event.preventDefault();  // Prevent the default form submit
        const productName = document.getElementById('productName').value;
        deleteProduct(productName);
    });
});

function deleteProduct(productName) {
    fetch(`/product/${productName}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
        if (response.ok) {
            console.log('Product deleted successfully');
        } else {
            console.error('Failed to delete the product');
        }
    })
    .catch(error => console.error('Error:', error));
}