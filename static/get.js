function fetchProductInfo() {
    const productName = document.getElementById('productName').value;
    fetch(`/product/${encodeURIComponent(productName)}`)
        .then(response => response.json())
        .then(data => {
            if (data.message) {
                document.getElementById('productInfo').innerText = data.message;
            } else {
                document.getElementById('productInfo').innerHTML = 
                    `<p>Name: ${data.name}</p>
                     <p>Brand: ${data.brand}</p>
                     <p>Category: ${data.category}</p>
                     <p>Price: ${data.price}</p>
                     <p>Stock: ${data.stock}</p>
                     <p>Main Image: <img src="${data.main_image_url}" alt="Product Image" /></p>`;
            }
        })
        .catch(error => {
            document.getElementById('productInfo').innerText = 'Failed to fetch product information';
            console.error('Error:', error);
        });
}