/* ===============================
   AUTH HELPERS
================================ */
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

/* Call on every page */
document.addEventListener("DOMContentLoaded", toggleAuthLinks);


/* ===============================
   PRODUCTS + ADD TO CART
================================ */
const API_URL = "http://127.0.0.1:8000";
const container = document.getElementById("products");

/* ✅ Only run if products container exists */
if (container) {
  fetch(`${API_URL}/api/products/products/`)
    .then(res => {
      if (!res.ok) throw new Error("API not working");
      return res.json();
    })
    .then(products => {
      if (!products || products.length === 0) {
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
          <button onclick="addToCart(${product.id})">
            Add to Cart
          </button>
        `;

        container.appendChild(card);
      });
    })
    .catch(err => {
      console.error(err);
      container.innerHTML = "<p>Error loading products</p>";
    });
}


/* ===============================
   ADD TO CART LOGIC
================================ */
function addToCart(productId) {
  const token = localStorage.getItem("token");

  if (!token) {
    window.location.href = "login.html";
    return;
  }

  fetch(`${API_URL}/api/cart/add/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer " + token
    },
    body: JSON.stringify({
      product_id: productId,
      quantity: 1
    })
  })
  .then(res => res.json())
  .then(() => {
    alert("Added to cart 🛍️");
  })
  .catch(() => {
    alert("Failed to add to cart");
  });
}
