function fetchAllProducts() {
    fetch(`/products`) // Assuming the endpoint for all products is /products
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                document.getElementById('productsInfo').innerText = data.message;
            } else {
                let content = '<h2>Products List</h2>';
                data.forEach(product => {
                    content += `<div>
                                    <p>Name: ${product.name}</p>
                                    <p>Brand: ${product.brand}</p>
                                    <p>Category: ${product.category}</p>
                                    <p>Price: $${product.price}</p>
                                    <p>Stock: ${product.stock}</p>
                                    <p>Main Image: <img src="${product.main_image_url}" alt="Product Image"></p>
                                </div><hr>`;
                });
                document.getElementById('productsInfo').innerHTML = content;
            }
        })
        .catch(error => {
            document.getElementById('productsInfo').innerText = 'Failed to fetch product information';
            console.error('Error:', error);
        })
}