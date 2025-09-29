
document.addEventListener("DOMContentLoaded", () => {
  // Elements
  const cartCountEl   = document.getElementById("cartCount");
  const favCountEl    = document.getElementById("favCount");
  const cartDropdown  = document.getElementById("cartDropdown");
  const favDropdown   = document.getElementById("favDropdown");
  const cartIcon      = document.getElementById("cartIcon");
  const favIcon       = document.getElementById("favIcon");
  const hamburger     = document.getElementById("hamburger");
  const navLinks      = document.querySelector(".nav-links");

  // Mobile menu toggle
  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => navLinks.classList.toggle("active"));
  }

  // LocalStorage data
  let cart = JSON.parse(localStorage.getItem("timeLux_cart")) || [];
  let favs = JSON.parse(localStorage.getItem("timeLux_favs")) || [];

  // Save helper
  function save() {
    localStorage.setItem("timeLux_cart", JSON.stringify(cart));
    localStorage.setItem("timeLux_favs", JSON.stringify(favs));
  }

  // Update UI
  function updateUI() {
    if (cartCountEl) cartCountEl.innerText = cart.reduce((s, i) => s + (i.qty || 1), 0);
    if (favCountEl) favCountEl.innerText = favs.length;

    renderCartDropdown();
    renderFavDropdown();
  }

  // Render cart
  function renderCartDropdown() {
    if (!cartDropdown) return;
    if (cart.length === 0) {
      cartDropdown.innerHTML = '<div class="empty">Your cart is empty</div>';
      return;
    }

    let html = '<h4>Your Cart</h4>';
    cart.forEach((item, idx) => {
      const img = item.img || 'https://via.placeholder.com/60x60?text=img';
      const name = item.name || 'Unnamed product';
      const price = Number(item.price) || 0;
      const qty = item.qty || 1;

      html += `
        <div class="dropdown-item">
          <img src="${img}" alt="${escapeHtml(name)}" />
          <div class="meta">
            <div class="name">${escapeHtml(name)}</div>
            <div class="price">$${price.toFixed(2)}</div>
          </div>
          <div class="controls">
            <button class="qty-btn" onclick="changeQty(${idx}, -1)">-</button>
            <span>${qty}</span>
            <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
            <button class="qty-btn remove" onclick="removeFromCart(${idx})">Remove</button>
          </div>
        </div>`;
    });

    const total = cart.reduce((sum, it) => sum + (Number(it.price) || 0) * (it.qty || 1), 0);
    html += `<div class="total">Total: $${total.toFixed(2)}</div>`;
    cartDropdown.innerHTML = html;
  }

  // Render favorites
  function renderFavDropdown() {
    if (!favDropdown) return;
    if (favs.length === 0) {
      favDropdown.innerHTML = '<div class="empty">No favorites yet</div>';
      return;
    }

    let html = '<h4>Favorites</h4>';
    favs.forEach((item, idx) => {
      const img = item.img || 'https://via.placeholder.com/60x60?text=img';
      const name = item.name || 'Unnamed product';
      const price = Number(item.price) || 0;

      html += `
        <div class="dropdown-item">
          <img src="${img}" alt="${escapeHtml(name)}" />
          <div class="meta">
            <div class="name">${escapeHtml(name)}</div>
            <div class="price">$${price.toFixed(2)}</div>
          </div>
          <div class="controls">
            <button class="qty-btn remove" onclick="removeFromFav(${idx})">Remove</button>
          </div>
        </div>`;
    });
    favDropdown.innerHTML = html;
  }

  // Global functions
//  window.addToCart = function (name, price, img) {
//   // Fix relative image paths like ../images/...
//   // const fixedImg = img && img.startsWith("..") ? img.replace("..", "") : img;

//   const idx = cart.findIndex(i => i.name === name && i.price == price);
//   if (idx > -1) {
//     cart[idx].qty = (cart[idx].qty || 1) + 1;
//   } else {
//     cart.push({ name, price, img, qty: 1 });
//   }
//   save();
//   updateUI();
// };

// window.addToFavorites = function (name, price, img) {
//   // const fixedImg = img && img.startsWith("..") ? img.replace("..", "") : img;

//   if (!favs.some(i => i.name === name && i.price == price)) {
//     favs.push({ name, price, img});
//     save();
//     updateUI();
//   }
// };

window.addToCart = function (name, price, img) {
  const idx = cart.findIndex(i => i.name === name && i.price == price);
  if (idx > -1) {
    cart[idx].qty = (cart[idx].qty || 1) + 1;
  } else {
    cart.push({ name, price, img, qty: 1 }); // img stays same
  }
  save();
  updateUI();
};

window.addToFavorites = function (name, price, img) {
  if (!favs.some(i => i.name === name && i.price == price)) {
    favs.push({ name, price, img });
    save();
    updateUI();
  }
};

  window.removeFromCart = function (index) {
    cart.splice(index, 1);
    save();
    updateUI();
  };

  window.removeFromFav = function (index) {
    favs.splice(index, 1);
    save();
    updateUI();
  };

  window.changeQty = function (index, delta) {
    if (cart[index]) {
      cart[index].qty += delta;
      if (cart[index].qty <= 0) cart.splice(index, 1);
      save();
      updateUI();
    }
  };

  // Product buttons (dataset)
  function initProductButtons() {
    document.querySelectorAll(".btn-add").forEach(btn => {
      btn.addEventListener("click", () => {
        addToCart(btn.dataset.name, btn.dataset.price, btn.dataset.img);
      });
    });

    document.querySelectorAll(".btn-fav").forEach(btn => {
      btn.addEventListener("click", () => {
        addToFavorites(btn.dataset.name, btn.dataset.price, btn.dataset.img);
      });
    });
  }

  // Escape helper
  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // Dropdown toggle
  function setupDropdown(icon, dropdown) {
    if (!icon || !dropdown) return;
    icon.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("show");
    });
  }

  // Close dropdowns on outside click
  document.addEventListener("click", () => {
    cartDropdown && cartDropdown.classList.remove("show");
    favDropdown && favDropdown.classList.remove("show");
  });

  // Init
  initProductButtons();
  updateUI();
  setupDropdown(cartIcon, cartDropdown);
  setupDropdown(favIcon, favDropdown);
});
