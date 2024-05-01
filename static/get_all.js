// function fetchAllProducts() {
//     fetch(`/products`) // Assuming the endpoint for all products is /products
//         .then(response => response.json())
//         .then(data => {
//             if (data.message) {
//                 document.getElementById('productsInfo').innerText = data.message;
//             } else {
//                 let content = '<h2>Products List</h2>';
//                 data.forEach(product => {
//                     content += `<div>
//                                     <p>Name: ${product.name}</p>
//                                     <p>Brand: ${product.brand}</p>
//                                     <p>Category: ${product.category}</p>
//                                     <p>Price: $${product.price}</p>
//                                     <p>Stock: ${product.stock}</p>
//                                     <p>Main Image: <img src="${product.main_image_url}" alt="Product Image"></p>
//                                 </div><hr>`;
//                 });
//                 document.getElementById('productsInfo').innerHTML = content;
//             }
//         })
//         .catch(error => {
//             document.getElementById('productsInfo').innerText = 'Failed to fetch product information';
//             console.error('Error:', error);
//         })
// }
function fetchAllProducts() {
    const token = localStorage.getItem('access_token');
    console.log(token)

    if (!token) {
        console.log('No token found. Please login first.');
        document.getElementById('productsInfo').innerText = '請先登入。';
        return;
    }

    fetch('/products', { // 確認這是正確的端點地址
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok, status: ' + response.status);
        }
        return response.json();
    })
    .then(data => {
        let content = '<h2>產品列表</h2>';
        data.forEach(product => {
            content += `<div>
                            <p>名稱: ${product.name}</p>
                            <p>品牌: ${product.brand}</p>
                            <p>類別: ${product.category}</p>
                            <p>價格: $${product.price}</p>
                            <p>庫存: ${product.stock}</p>
                            <p>主圖像: <img src="${product.main_image_url}" alt="Product Image" style="width: 100px;"></p>
                        </div><hr>`;
        });
        document.getElementById('productsInfo').innerHTML = content;
    })
    .catch(error => {
        console.error('Failed to fetch product information:', error);
        document.getElementById('productsInfo').innerText = '無法獲取產品資訊。';
    });
}
