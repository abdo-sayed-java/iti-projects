async function fetchProducts() {
  try {
    const response = await fetch("https://dummyjson.com/products");

    if (!response.ok) throw new Error("Failed to fetch the products! :(");

    const data = await response.json();
    console.log(data);
    const products = data.products;
    console.log(products);
    const productList = document.getElementById("productList");

    productList.innerHTML = "";

    //loop products to create HTML Element
    products.forEach((product) => {
      const productDiv = document.createElement("div"); // <div> </div>
      productDiv.className = "product"; // <div class="product"></div>

      productDiv.innerHTML = `
            <img src="${product.images[0]}" alt="product image" class="product-image">
            <h3>${product.title}</h3>
            <p class="price">Price: $${product.price}</p>
            <p class="stock">Stock: ${product.stock}</p>
            <button class="buy-btn">Buy Now</button>
            `;

      // Add click event to open product.html and pass product data
      productDiv.addEventListener("click", () => {
        localStorage.setItem("selectedProduct", JSON.stringify(product));
        window.location.href = "product.html";
      });

      productList.appendChild(productDiv);
    });
  } catch (error) {
    productList.innerHTML = `<p style="color:red;"> Error: ${error.message}</p>`;
  }
}

fetchProducts();

// search part
document.getElementById("search-button").addEventListener("click", () => {
  const query = document.querySelector(".search-box input").value.trim();
  if (query) {
    localStorage.setItem("searchQuery", query);
    window.location.href = "search.html";
  }
});
