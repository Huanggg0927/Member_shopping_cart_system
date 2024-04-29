function updateProduct() {
    const productName = document.getElementById('name').value; // Assume product's name is unique identifier for PUT URL
    const formData = {
        name: document.getElementById('name').value,
        brand: document.getElementById('brand').value,
        category: document.getElementById('category').value,
        price: parseFloat(document.getElementById('price').value),
        stock: parseInt(document.getElementById('stock').value),
        main_image_url: document.getElementById('main_image_url').value
    };

    fetch(`/product/${encodeURIComponent(productName)}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').innerText = data.message;
    })
    .catch(error => {
        console.error('Error:', error);
        document.getElementById('message').innerText = 'Failed to update the product';
    });
}