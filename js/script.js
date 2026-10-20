/* =========================================
   Jowhara Accessories — Base Script
   Edit the PRODUCTS array below to add your own items.
   ========================================= */

const PRODUCTS = [
  { id: 1, name: "Gold Halo Necklace", price: 48, category: "necklaces", icon: "📿", badge: "Bestseller" },
  { id: 2, name: "Pearl Drop Earrings", price: 32, category: "earrings", icon: "✨" },
  { id: 3, name: "Stackable Ring Set", price: 26, category: "rings", icon: "💍", badge: "New" },
  { id: 4, name: "Chain Link Bracelet", price: 38, category: "bracelets", icon: "🔗" },
  { id: 5, name: "Layered Pendant Necklace", price: 54, category: "necklaces", icon: "📿" },
  { id: 6, name: "Huggie Hoop Earrings", price: 29, category: "earrings", icon: "✨", badge: "New" },
  { id: 7, name: "Statement Cocktail Ring", price: 34, category: "rings", icon: "💍" },
  { id: 8, name: "Charm Bangle", price: 42, category: "bracelets", icon: "🔗" },
];

let cart = [];

/* ---------- Render Products ---------- */
function renderProducts(filter = "all") {
  const grid = document.getElementById("product-grid");
  const items = filter === "all" ? PRODUCTS : PRODUCTS.filter(p => p.category === filter);

  grid.innerHTML = items.map(p => `
    <div class="product-card">
      <div class="product-image">
        ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
        <span>${p.icon}</span>
      </div>
      <div class="product-info">
        <h3>${p.name}</h3>
        <p class="product-price">$${p.price.toFixed(2)}</p>
        <button class="add-to-cart" data-id="${p.id}">Add to Bag</button>
      </div>
    </div>
  `).join("");

  document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => addToCart(Number(btn.dataset.id)));
  });
}

/* ---------- Filters ---------- */
document.getElementById("filters").addEventListener("click", (e) => {
  const btn = e.target.closest(".filter-btn");
  if (!btn) return;
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  renderProducts(btn.dataset.filter);
});

/* ---------- Cart ---------- */
function addToCart(id) {
  const product = PRODUCTS.find(p => p.id === id);
  const existing = cart.find(item => item.id === id);
  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }
  renderCart();
  openCart();
}

function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
  renderCart();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const totalPrice = document.getElementById("cart-total-price");

  const totalQty = cart.reduce((sum, i) => sum + i.qty, 0);
  cartCount.textContent = totalQty;

  if (cart.length === 0) {
    cartItems.innerHTML = `<p class="cart-empty">Your bag is empty.</p>`;
  } else {
    cartItems.innerHTML = cart.map(item => `
      <div class="cart-item">
        <div class="cart-item-info">
          <h4>${item.name}</h4>
          <span>Qty ${item.qty} · $${(item.price * item.qty).toFixed(2)}</span>
        </div>
        <button class="cart-item-remove" data-id="${item.id}">Remove</button>
      </div>
    `).join("");

    cartItems.querySelectorAll(".cart-item-remove").forEach(btn => {
      btn.addEventListener("click", () => removeFromCart(Number(btn.dataset.id)));
    });
  }

  const total = cart.reduce((sum, i) => sum + i.price * i.qty, 0);
  totalPrice.textContent = `$${total.toFixed(2)}`;
}

function openCart() {
  document.getElementById("cart-drawer").classList.add("open");
  document.getElementById("cart-overlay").classList.add("open");
}
function closeCart() {
  document.getElementById("cart-drawer").classList.remove("open");
  document.getElementById("cart-overlay").classList.remove("open");
}

document.getElementById("cart-btn").addEventListener("click", openCart);
document.getElementById("close-cart").addEventListener("click", closeCart);
document.getElementById("cart-overlay").addEventListener("click", closeCart);

/* ---------- Mobile Menu ---------- */
document.getElementById("hamburger").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});

/* ---------- Forms (front-end only — connect to your backend/email service) ---------- */
document.getElementById("newsletter-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("newsletter-msg").textContent = "Thanks for subscribing! 🎉";
  e.target.reset();
});

document.getElementById("contact-form").addEventListener("submit", (e) => {
  e.preventDefault();
  document.getElementById("contact-msg").textContent = "Message sent — we'll be in touch soon!";
  e.target.reset();
});

/* ---------- Init ---------- */
renderProducts();
renderCart();