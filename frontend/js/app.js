   
   function requireAuth() {
  const token = localStorage.getItem("token");
  if (!token) {
    window.location.href = "login.html";
  }
}
function logout() {
  localStorage.removeItem("token");
  window.location.href = "login.html";
}

   function toggleAuthLinks() {
  const token = localStorage.getItem("token");
  const loginLinks = document.querySelectorAll(".auth-link");
  const logoutBtn = document.querySelector(".logout-btn");

  if (token) {
    loginLinks.forEach(el => el.style.display = "none");
    if (logoutBtn) logoutBtn.style.display = "inline-block";
  } else {
    loginLinks.forEach(el => el.style.display = "inline-block");
    if (logoutBtn) logoutBtn.style.display = "none";
  }
}

   
   
   
   const API_URL = "http://127.0.0.1:8000";

    const container = document.getElementById("products");

    fetch(`${API_URL}/api/products/products/`)
    .then(res => {
        if (!res.ok) {
        throw new Error("API not working");
        }
        return res.json();
    })
    .then(products => {
        if (products.length === 0) {
        container.innerHTML = "<p>No products found</p>";
        return;
        }

        products.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <h3>${product.name}</h3>
            <img src="${product.image}" />
            <p>₹${product.price}</p>
            <button>Add to Cart</button>
        `;

        container.appendChild(card);
        });
    })
    .catch(error => {
        container.innerHTML = "<p>Error loading products</p>";
        console.error(error);
    });
