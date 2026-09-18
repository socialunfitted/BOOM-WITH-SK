/**
 * BOOM WITH SK - Interactive Engine
 * Handles White Page Storefront, Product Filtering, Live Cart System,
 * Theme Toggle, Wholesale Estimator, and WhatsApp Order Generator.
 */

import { REAL_PRODUCTS } from "./data/products.js";

// --- 1. Service / Category Data (Preserved from live boomwithsk.com) ---
const SERVICES_DATA = [
  {
    id: "sky-shots",
    index: "01",
    name: "Sky Shots & Aerial Fireworks",
    title: "Multi-Shot Aerial Repeaters & Grand Shells",
    desc: "Breathtaking sky-illuminating fireworks engineered in Sivakasi. Features vibrant color bursts, whistling tails, and synchronized high-altitude peony explosions.",
    image: "/images/sky-shots.jpg",
    badge: "Most Popular Aerials",
    specs: [
      { label: "Shots Available", val: "12 to 240 Shots" },
      { label: "Altitude", val: "120 - 250 Ft" },
      { label: "Sample Price", val: "From ₹39 (Chotta Fancy)" }
    ],
    whatsappMsg: "Hello BOOM WITH SK! I'd like to inquire about your Sky Shots & Aerial Repeaters catalog and wholesale pricing."
  },
  {
    id: "ground-chakkars",
    index: "02",
    name: "Ground Chakkars & Spinners",
    title: "High-RPM Precision Whirling Wheels",
    desc: "Long-duration, smooth ground spinners with radiant golden sparks and emerald flash rings. 100% factory-tested balanced rotation.",
    image: "/images/chakkar.jpg",
    badge: "Festival Classic",
    specs: [
      { label: "Varieties", val: "Big 25, Deluxe, Special" },
      { label: "Spin Duration", val: "Up to 45 Seconds" },
      { label: "Sample Price", val: "₹40 (Big 10 pcs)" }
    ],
    whatsappMsg: "Hello BOOM WITH SK! I'd like to get wholesale rates for Ground Chakkars (Big 25, Special, Deluxe)."
  },
  {
    id: "sparklers",
    index: "03",
    name: "Luxury Sparklers & Fountains",
    title: "Low-Smoke Brilliant Festive Sparklers",
    desc: "Certified green sparklers with high luminescence and smooth burning formulation. Available in electric, red, gold crackling, and multi-colour variations.",
    image: "/images/sparklers.jpg",
    badge: "Eco-Friendly Low Smoke",
    specs: [
      { label: "Sizes", val: "7cm, 10cm, 15cm, 30cm, 50cm" },
      { label: "Burn Time", val: "40s to 3 Minutes" },
      { label: "Sample Price", val: "From ₹11 to ₹52" }
    ],
    whatsappMsg: "Hello BOOM WITH SK! I'd like to order Green Sparklers (7cm, 10cm, 15cm, 30cm) for our celebration."
  },
  {
    id: "sound-crackers",
    index: "04",
    name: "Sound Crackers & Bombs",
    title: "High-Decibel Traditional & Novelty Bombs",
    desc: "Authentic Sivakasi single-sound crackers and multi-stage rockets. High safety tolerance casing with maximum festival impact.",
    image: "/images/hero-pyro.jpg",
    badge: "70% Wholesale Off",
    specs: [
      { label: "Key Items", val: "Hydro Bomb, Bullet, Auto Bomb" },
      { label: "Safety Rating", val: "Batch Inspected" },
      { label: "Sample Price", val: "Hydro Bomb ₹81 (MRP ₹270)" }
    ],
    whatsappMsg: "Hello BOOM WITH SK! Please send the price list for Sound Crackers, Hydro Bombs, and Rockets."
  },
  {
    id: "gift-boxes",
    index: "05",
    name: "Curated Festive Gift Hampers",
    title: "Custom Family Celebration & Corporate Packs",
    desc: "Pre-assembled boxes combining aerial shots, ground chakkars, flower pots, and sparklers in deluxe moisture-proof presentation cases.",
    image: "/images/gift-box.jpg",
    badge: "Best Value Packs",
    specs: [
      { label: "Box Sizes", val: "30 to 90 Items" },
      { label: "Packaging", val: "Rigid Gift Carton" },
      { label: "Starting At", val: "₹1,049 (Factory Direct)" }
    ],
    whatsappMsg: "Hello BOOM WITH SK! I'm interested in booking Curated Festive Gift Boxes for Diwali/Celebration."
  }
];

// --- 2. Cart State ---
let cartState = {};

// --- 3. Initialize App on DOM Ready ---
document.addEventListener("DOMContentLoaded", () => {
  initImageFallbacks();
  initTheme();
  initStickyHeader();
  initMobileDrawer();
  initHeroBannerSlider();
  initServicesExplorer();
  initSavingsEstimator();
  initModalSystem();
  initSparkParticles();
  initStorefront();
  initCartDrawer();
  initCheckoutPage();
  initProductPage();
});

// --- Hero Banner Carousel Slider ---
function initHeroBannerSlider() {
  const slider = document.getElementById("hero-slider");
  if (!slider) return;

  const slides = slider.querySelectorAll(".hero-slide");
  const dots = slider.querySelectorAll(".slider-dot");
  const prevBtn = document.getElementById("hero-slider-prev");
  const nextBtn = document.getElementById("hero-slider-next");
  if (!slides.length) return;

  let currentIndex = 0;
  let autoplayTimer = null;
  const slideCount = slides.length;
  const AUTOPLAY_DELAY = 5000;

  function showSlide(index) {
    if (index < 0) index = slideCount - 1;
    if (index >= slideCount) index = 0;
    currentIndex = index;

    slides.forEach((slide, i) => {
      if (i === currentIndex) {
        slide.classList.add("active");
      } else {
        slide.classList.remove("active");
      }
    });

    dots.forEach((dot, i) => {
      if (i === currentIndex) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
    });
  }

  function nextSlide() {
    showSlide(currentIndex + 1);
  }

  function prevSlide() {
    showSlide(currentIndex - 1);
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(nextSlide, AUTOPLAY_DELAY);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      nextSlide();
      startAutoplay();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      prevSlide();
      startAutoplay();
    });
  }

  dots.forEach(dot => {
    dot.addEventListener("click", () => {
      const idx = parseInt(dot.getAttribute("data-index"), 10);
      showSlide(idx);
      startAutoplay();
    });
  });

  // Pause on hover
  slider.addEventListener("mouseenter", stopAutoplay);
  slider.addEventListener("mouseleave", startAutoplay);

  // Mobile Touch Swipe Support
  let touchStartX = 0;
  let touchEndX = 0;

  slider.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  slider.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 40) {
      if (diff > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
      startAutoplay();
    }
  }, { passive: true });

  startAutoplay();
}

// --- Theme Switcher (White Page Light Mode & Dark Mode) ---
function initTheme() {
  const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
  // Default to light (White Page) as requested by user
  const savedTheme = localStorage.getItem("boom-theme") || "light";
  applyTheme(savedTheme);

  toggleBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme") || "light";
      const next = current === "light" ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem("boom-theme", next);
    });
  });
}

function applyTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  const toggleBtns = document.querySelectorAll(".theme-toggle-btn");
  toggleBtns.forEach(btn => {
    const textSpan = btn.querySelector(".theme-text");
    const iconSpan = btn.querySelector(".theme-icon");
    if (theme === "light") {
      if (textSpan) textSpan.textContent = "White Page";
      if (iconSpan) iconSpan.textContent = "☀️";
    } else {
      if (textSpan) textSpan.textContent = "Dark Luxury";
      if (iconSpan) iconSpan.textContent = "🌙";
    }
  });
}

// --- Sticky Header Scroll Spy ---
function initStickyHeader() {
  const header = document.querySelector(".site-header");
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }

    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });
}

// --- Mobile Navigation Drawer ---
function initMobileDrawer() {
  const toggleBtn = document.querySelector(".mobile-toggle");
  const closeBtn = document.querySelector(".drawer-close");
  const drawer = document.querySelector(".mobile-drawer");
  const backdrop = document.querySelector(".drawer-backdrop");
  const mobileLinks = document.querySelectorAll(".mobile-nav-link");

  function openDrawer() {
    drawer.classList.add("open");
    backdrop.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeDrawer() {
    drawer.classList.remove("open");
    backdrop.classList.remove("open");
    document.body.style.overflow = "";
  }

  if (toggleBtn) toggleBtn.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  mobileLinks.forEach((link) => {
    link.addEventListener("click", closeDrawer);
  });
}

// --- 4. Storefront Products Grid ("All Crackers") ---
function initStorefront() {
  const productsGrid = document.getElementById("storefront-products-grid");
  const searchInput = document.getElementById("product-search-input");
  const tabBtns = document.querySelectorAll(".store-tab-btn");
  const countEl = document.getElementById("store-results-count");

  if (!productsGrid) return;

  let activeCategory = "all";
  let searchQuery = "";

  function render() {
    const filtered = REAL_PRODUCTS.filter(item => {
      const matchesCategory = activeCategory === "all" || item.category === activeCategory;
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            item.categoryLabel.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (countEl) {
      countEl.textContent = `Showing ${filtered.length} products (All with 70% Factory Direct Discount)`;
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 40px; color: var(--text-muted);">
          <h3>No crackers found matching "${searchQuery}"</h3>
          <p>Try searching for rockets, chakkars, sparklers, or bombs.</p>
        </div>
      `;
      return;
    }

    productsGrid.innerHTML = filtered.map(item => `
      <div class="product-card" data-product-id="${item.id}">
        <span class="sale-badge">Sale!</span>
        <div class="product-thumb-wrap" style="cursor: pointer;" onclick="window.openProductPage('${item.id}')">
          <img 
            src="${item.image}" 
            alt="${item.name}" 
            class="product-thumb-img" 
            loading="lazy"
            onerror="this.onerror=null; this.src='${item.fallbackImage}';"
          />
        </div>
        <div class="product-info">
          <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700; margin-bottom: 2px;">
            ${item.categoryLabel}
          </span>
          <h4 class="product-title" style="cursor: pointer;" onclick="window.openProductPage('${item.id}')">${item.name}</h4>
          <div class="product-prices">
            <span class="product-mrp">₹${item.mrp.toFixed(2)}</span>
            <span class="product-price">₹${item.price.toFixed(2)}</span>
            <span class="product-discount-tag">${item.discount}</span>
          </div>
          <div class="product-actions-bar">
            <button class="btn btn-cart add-to-cart-btn" data-product-id="${item.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" style="margin-right: 4px;"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
              Add to cart
            </button>
            <button 
              class="btn btn-secondary btn-sm" 
              onclick="window.openProductPage('${item.id}')"
              title="View Dedicated Product Page"
              style="padding: 0.5rem 0.75rem;"
            >
              View Details
            </button>
          </div>
        </div>
      </div>
    `).join("");

    // Attach Add to Cart Listeners
    productsGrid.querySelectorAll(".add-to-cart-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        const pId = btn.getAttribute("data-product-id");
        addToCart(pId);
      });
    });
  }

  // Category Tabs
  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      activeCategory = btn.getAttribute("data-category") || "all";
      render();
    });
  });

  // Search Input
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      render();
    });
  }

  render();
}

// --- 5. Cart Drawer & State ---
function initCartDrawer() {
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-drawer-overlay");
  const closeBtn = document.getElementById("cart-drawer-close");

  function openCart(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (drawer && overlay) {
      drawer.classList.add("open");
      overlay.classList.add("open");
      document.body.style.overflow = "hidden";
    }
  }

  function closeCart(e) {
    if (e && e.preventDefault) e.preventDefault();
    if (drawer && overlay) {
      drawer.classList.remove("open");
      overlay.classList.remove("open");

      // Keep overflow hidden if product page or modal is active underneath
      const pOverlay = document.getElementById("product-page-overlay");
      const mOverlay = document.getElementById("hamper-modal");
      const isPPageOpen = pOverlay && pOverlay.classList.contains("open");
      const isModalOpen = mOverlay && mOverlay.classList.contains("open");

      if (!isPPageOpen && !isModalOpen) {
        document.body.style.overflow = "";
      }
    }
  }

  // Event Delegation for all [data-open-cart] triggers across main page, product modal header, and detail page
  document.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-open-cart]");
    if (btn) {
      openCart(e);
    }
  });

  if (closeBtn) closeBtn.addEventListener("click", closeCart);
  if (overlay) overlay.addEventListener("click", closeCart);

  window.openCart = openCart;
  window.closeCart = closeCart;
}

function addToCart(productId) {
  const product = REAL_PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  if (!cartState[productId]) {
    cartState[productId] = { product, qty: 1 };
  } else {
    cartState[productId].qty += 1;
  }

  updateCartUI();
  
  // Open cart drawer so user sees their product added
  const drawer = document.getElementById("cart-drawer");
  const overlay = document.getElementById("cart-drawer-overlay");
  if (drawer && overlay) {
    drawer.classList.add("open");
    overlay.classList.add("open");
  }
}

function updateCartQty(productId, delta) {
  if (!cartState[productId]) return;
  cartState[productId].qty += delta;
  if (cartState[productId].qty <= 0) {
    delete cartState[productId];
  }
  updateCartUI();
}

function updateCartUI() {
  const cartItemsEl = document.getElementById("cart-drawer-items");
  const countBadges = document.querySelectorAll(".cart-count-badge");
  const subtotalEl = document.getElementById("cart-subtotal");
  const mrpTotalEl = document.getElementById("cart-mrp-total");
  const savingsEl = document.getElementById("cart-savings-total");
  const checkoutWhatsAppBtn = document.getElementById("cart-whatsapp-checkout");

  const entries = Object.values(cartState);
  const totalCount = entries.reduce((acc, curr) => acc + curr.qty, 0);

  countBadges.forEach(b => {
    b.textContent = totalCount;
  });

  if (entries.length === 0) {
    if (cartItemsEl) {
      cartItemsEl.innerHTML = `
        <div style="text-align: center; padding: 40px 20px; color: var(--text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin-bottom: 12px; opacity: 0.5;"><circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/></svg>
          <p style="font-weight: 600;">Your Cart is Empty</p>
          <p style="font-size: 0.85rem; margin-top: 4px;">Explore our 173+ Sivakasi crackers and add items with 70% discount.</p>
        </div>
      `;
    }
    if (subtotalEl) subtotalEl.textContent = "₹0.00";
    if (mrpTotalEl) mrpTotalEl.textContent = "₹0.00";
    if (savingsEl) savingsEl.textContent = "₹0.00";
    if (checkoutWhatsAppBtn) checkoutWhatsAppBtn.style.display = "none";
    return;
  }

  let totalMRP = 0;
  let totalFactoryPrice = 0;

  if (cartItemsEl) {
    cartItemsEl.innerHTML = entries.map(({ product, qty }) => {
      const itemMRP = product.mrp * qty;
      const itemPrice = product.price * qty;
      totalMRP += itemMRP;
      totalFactoryPrice += itemPrice;

      return `
        <div class="cart-item-row">
          <div class="cart-item-info">
            <h5>${product.name}</h5>
            <p>₹${product.price} × ${qty} = <strong>₹${itemPrice}</strong> <span style="text-decoration: line-through; color: var(--text-muted); font-size: 0.75rem;">(MRP ₹${itemMRP})</span></p>
          </div>
          <div class="cart-qty-control">
            <button class="qty-btn" onclick="window.handleCartQty('${product.id}', -1)">-</button>
            <span style="font-weight: 700; min-width: 18px; text-align: center;">${qty}</span>
            <button class="qty-btn" onclick="window.handleCartQty('${product.id}', 1)">+</button>
          </div>
        </div>
      `;
    }).join("");
  }

  const totalSaved = totalMRP - totalFactoryPrice;

  if (subtotalEl) subtotalEl.textContent = `₹${totalFactoryPrice.toLocaleString("en-IN")}.00`;
  if (mrpTotalEl) mrpTotalEl.textContent = `₹${totalMRP.toLocaleString("en-IN")}.00`;
  if (savingsEl) savingsEl.textContent = `₹${totalSaved.toLocaleString("en-IN")}.00 (70% Off)`;

  if (checkoutWhatsAppBtn) {
    checkoutWhatsAppBtn.style.display = "flex";
    
    // Generate WhatsApp Order Message
    let msg = `Hello BOOM WITH SK! I would like to book my Diwali order directly from Sivakasi:\n\n*ORDER ITEM LIST:*\n`;
    entries.forEach(({ product, qty }, i) => {
      msg += `${i + 1}. ${product.name} × ${qty} = ₹${product.price * qty}\n`;
    });
    msg += `\n*TOTAL FACTORY DIRECT BILL:* ₹${totalFactoryPrice.toLocaleString("en-IN")}\n`;
    msg += `*RETAIL MRP VALUE:* ₹${totalMRP.toLocaleString("en-IN")}\n`;
    msg += `*TOTAL CASH SAVED:* ₹${totalSaved.toLocaleString("en-IN")}\n\n`;
    msg += `Please confirm order availability, packaging, and dispatch details!`;

    checkoutWhatsAppBtn.href = `https://wa.me/918667500450?text=${encodeURIComponent(msg)}`;
  }
}

// Global hook for inline onclick buttons
window.handleCartQty = (id, delta) => {
  updateCartQty(id, delta);
};

// --- 5b. Full Checkout Page System ---
function initCheckoutPage() {
  const overlay = document.getElementById("checkout-page-overlay");
  const closeBtn = document.getElementById("checkout-page-close");
  const proceedBtn = document.getElementById("cart-proceed-checkout");
  const completeBtn = document.getElementById("checkout-complete-btn");

  function openCheckoutPage() {
    if (!overlay) return;
    
    // Close cart drawer if open
    window.closeCart();
    
    // Render Order Summary Items
    renderCheckoutSummary();
    
    overlay.classList.add("open");
    overlay.scrollTop = 0;
    document.body.style.overflow = "hidden";
  }

  function closeCheckoutPage() {
    if (!overlay) return;
    overlay.classList.remove("open");
    
    // Check if product page or modal is open underneath
    const pOverlay = document.getElementById("product-page-overlay");
    const mOverlay = document.getElementById("hamper-modal");
    const isPPageOpen = pOverlay && pOverlay.classList.contains("open");
    const isModalOpen = mOverlay && mOverlay.classList.contains("open");

    if (!isPPageOpen && !isModalOpen) {
      document.body.style.overflow = "";
    }
  }

  function renderCheckoutSummary() {
    const summaryItemsEl = document.getElementById("checkout-summary-items");
    const summaryTotalEl = document.getElementById("checkout-summary-total");
    
    const entries = Object.values(cartState);
    if (entries.length === 0) {
      if (summaryItemsEl) {
        summaryItemsEl.innerHTML = `<p style="color: var(--text-muted); font-size: 0.9rem;">Your cart is empty. Please add items before checking out.</p>`;
      }
      if (summaryTotalEl) summaryTotalEl.textContent = "₹0.00";
      return;
    }

    let grandTotal = 0;
    if (summaryItemsEl) {
      summaryItemsEl.innerHTML = entries.map(({ product, qty }) => {
        const itemPrice = product.price * qty;
        grandTotal += itemPrice;
        return `
          <div class="checkout-item-row">
            <img src="${product.image}" alt="${product.name}" class="checkout-item-thumb" onerror="this.onerror=null; this.src='${product.fallbackImage}';" />
            <div class="checkout-item-details">
              <div class="checkout-item-name">${product.name}</div>
              <div class="checkout-item-qty">Qty: ${qty} × ₹${product.price.toFixed(2)}</div>
            </div>
            <div class="checkout-item-price">₹${itemPrice.toFixed(2)}</div>
          </div>
        `;
      }).join("");
    }

    if (summaryTotalEl) {
      summaryTotalEl.textContent = `₹${grandTotal.toLocaleString("en-IN")}.00`;
    }
  }

  if (proceedBtn) proceedBtn.addEventListener("click", openCheckoutPage);
  if (closeBtn) closeBtn.addEventListener("click", closeCheckoutPage);

  if (completeBtn) {
    completeBtn.addEventListener("click", (e) => {
      e.preventDefault();
      
      const email = document.getElementById("checkout-email")?.value.trim() || "";
      const fname = document.getElementById("checkout-fname")?.value.trim() || "";
      const lname = document.getElementById("checkout-lname")?.value.trim() || "";
      const address = document.getElementById("checkout-address")?.value.trim() || "";
      const apt = document.getElementById("checkout-apt")?.value.trim() || "";
      const city = document.getElementById("checkout-city")?.value.trim() || "";
      const state = document.getElementById("checkout-state")?.value || "Tamil Nadu";
      const pincode = document.getElementById("checkout-pincode")?.value.trim() || "";
      const phone = document.getElementById("checkout-phone")?.value.trim() || "";
      const notes = document.getElementById("checkout-notes")?.value.trim() || "";

      if (!email || !fname || !address || !city || !pincode) {
        alert("Please fill in required fields (Email, First Name, Address, City, PIN Code) to complete your order.");
        return;
      }

      const entries = Object.values(cartState);
      let grandTotal = 0;
      let itemsListText = "";
      entries.forEach(({ product, qty }, i) => {
        const itemTotal = product.price * qty;
        grandTotal += itemTotal;
        itemsListText += `${i + 1}. ${product.name} × ${qty} = ₹${itemTotal}\n`;
      });

      let msg = `Hello BOOM WITH SK! I would like to place an order:\n\n`;
      msg += `📦 *ORDER ITEMS SUMMARY:*\n${itemsListText}\n`;
      msg += `*Total Order Value:* ₹${grandTotal.toLocaleString("en-IN")}.00\n`;
      msg += `*Shipping Charges:* Extra (Will be notified over WhatsApp)\n`;
      msg += `*Payment Option:* Order & Pay Offline\n\n`;
      msg += `👤 *CUSTOMER CONTACT & SHIPPING DETAILS:*\n`;
      msg += `- *Name:* ${fname} ${lname}\n`;
      msg += `- *Email:* ${email}\n`;
      if (phone) msg += `- *Phone:* ${phone}\n`;
      msg += `- *Address:* ${address}${apt ? `, ${apt}` : ""}\n`;
      msg += `- *City/State/PIN:* ${city}, ${state} - ${pincode}, India\n`;
      if (notes) msg += `\n📝 *SPECIAL ORDER NOTE:* ${notes}\n`;
      msg += `\nPlease confirm order status, final freight charges, and offline payment instructions. Thank you!`;

      window.open(`https://wa.me/918667500450?text=${encodeURIComponent(msg)}`, "_blank");
    });
  }

  window.openCheckoutPage = openCheckoutPage;
  window.closeCheckoutPage = closeCheckoutPage;
}

// --- 6. Interactive Services & Categories Explorer ---
function initServicesExplorer() {
  const navItems = document.querySelectorAll(".service-nav-item");
  if (navItems.length === 0) return;
  const previewImg = document.getElementById("preview-img");
  const previewBadge = document.getElementById("preview-badge");
  const previewTitle = document.getElementById("preview-title");
  const previewDesc = document.getElementById("preview-desc");
  const specItems = document.querySelectorAll(".preview-specs .spec-item");
  const whatsappCta = document.getElementById("preview-whatsapp-cta");

  function updateService(data) {
    if (!previewTitle) return;

    const card = document.querySelector(".service-preview-card");
    if (card) {
      card.style.opacity = "0.7";
      card.style.transform = "scale(0.99)";
    }

    setTimeout(() => {
      previewImg.src = data.image;
      previewImg.alt = data.title;
      previewBadge.textContent = data.badge;
      previewTitle.textContent = data.title;
      previewDesc.textContent = data.desc;

      if (specItems.length >= 3) {
        specItems[0].querySelector("h6").textContent = data.specs[0].label;
        specItems[0].querySelector("span").textContent = data.specs[0].val;

        specItems[1].querySelector("h6").textContent = data.specs[1].label;
        specItems[1].querySelector("span").textContent = data.specs[1].val;

        specItems[2].querySelector("h6").textContent = data.specs[2].label;
        specItems[2].querySelector("span").textContent = data.specs[2].val;
      }

      if (whatsappCta) {
        const encoded = encodeURIComponent(data.whatsappMsg);
        whatsappCta.href = `https://wa.me/918667500450?text=${encoded}`;
      }

      if (card) {
        card.style.opacity = "1";
        card.style.transform = "scale(1)";
      }
    }, 120);
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      navItems.forEach((btn) => btn.classList.remove("active"));
      item.classList.add("active");

      const serviceId = item.getAttribute("data-service-id");
      const matchedData = SERVICES_DATA.find((s) => s.id === serviceId);
      if (matchedData) updateService(matchedData);
    });

    item.addEventListener("mouseenter", () => {
      const serviceId = item.getAttribute("data-service-id");
      const matchedData = SERVICES_DATA.find((s) => s.id === serviceId);
      if (matchedData) updateService(matchedData);
    });
  });
}

// --- 7. Interactive Wholesale Savings Estimator ---
function initSavingsEstimator() {
  const slider = document.getElementById("budget-slider");
  const budgetValDisplay = document.getElementById("budget-val-display");
  const retailCostEl = document.getElementById("calc-retail-cost");
  const factoryCostEl = document.getElementById("calc-factory-cost");
  const totalSavedEl = document.getElementById("calc-total-saved");
  const packMixEl = document.getElementById("calc-pack-mix");
  const whatsappQuoteBtn = document.getElementById("estimator-whatsapp-btn");
  const scaleBtns = document.querySelectorAll(".scale-btn");

  if (!slider) return;

  function calculate(factoryBudget) {
    const retailMRP = Math.round(factoryBudget * 3.33);
    const savings = retailMRP - factoryBudget;
    const estimatedPieces = Math.max(18, Math.round(factoryBudget / 65));

    budgetValDisplay.textContent = `₹${factoryBudget.toLocaleString("en-IN")}`;
    retailCostEl.textContent = `₹${retailMRP.toLocaleString("en-IN")}`;
    factoryCostEl.textContent = `₹${factoryBudget.toLocaleString("en-IN")}`;
    totalSavedEl.textContent = `₹${savings.toLocaleString("en-IN")}`;

    let mixDesc = "";
    if (factoryBudget <= 4000) {
      mixDesc = `~${estimatedPieces} Items (Sparklers, Chakkars, Flower Pots, Rockets)`;
    } else if (factoryBudget <= 12000) {
      mixDesc = `~${estimatedPieces} Items (Aerial Repeaters, Deluxe Chakkars, Sparklers, Bombs)`;
    } else if (factoryBudget <= 25000) {
      mixDesc = `~${estimatedPieces} Items (Sky Cakes, Multi-Burst Shells, Family Gift Boxes)`;
    } else {
      mixDesc = `~${estimatedPieces}+ Bulk Cartons (Wholesale Master Cartons Direct Dispatch)`;
    }
    packMixEl.textContent = mixDesc;

    if (whatsappQuoteBtn) {
      const message = `Hello BOOM WITH SK! I calculated an estimated celebration order on your website:
- Desired Factory Budget: ₹${factoryBudget.toLocaleString("en-IN")}
- Expected Retail Market Value: ₹${retailMRP.toLocaleString("en-IN")}
- Estimated Savings: ₹${savings.toLocaleString("en-IN")} (70% Off)
- Approximate Items: ${mixDesc}

Please share the itemized wholesale packing slip and booking details!`;
      whatsappQuoteBtn.href = `https://wa.me/918667500450?text=${encodeURIComponent(message)}`;
    }

    const min = slider.min || 2000;
    const max = slider.max || 50000;
    const percent = ((factoryBudget - min) / (max - min)) * 100;
    slider.style.background = `linear-gradient(90deg, #D97706 ${percent}%, rgba(0, 0, 0, 0.08) ${percent}%)`;
  }

  slider.addEventListener("input", (e) => {
    const val = parseInt(e.target.value, 10);
    calculate(val);
  });

  scaleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      scaleBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const targetBudget = parseInt(btn.getAttribute("data-budget"), 10);
      slider.value = targetBudget;
      calculate(targetBudget);
    });
  });

  calculate(parseInt(slider.value, 10));
}

// --- 8. Modal System (Hamper Details) ---
function initModalSystem() {
  const modal = document.querySelector(".modal-overlay");
  const closeBtn = document.querySelector(".modal-close-btn");
  const openBtns = document.querySelectorAll("[data-open-modal]");
  const modalTitle = document.getElementById("modal-hamper-title");
  const modalPrice = document.getElementById("modal-hamper-price");
  const modalList = document.getElementById("modal-hamper-list");
  const modalWhatsAppBtn = document.getElementById("modal-whatsapp-cta");

  if (!modal) return;

  const HAMPER_DETAILS = {
    "grand-royale": {
      name: "The Grand Diwali Royale Box",
      price: "₹1,799 (Retail MRP: ₹5,999 - 70% Off)",
      image: "/images/hamper-grand-royale.png",
      items: [
        "12-Shot Multi-Color Sky Peony Cake (1 Pc)",
        "30cm Red & Gold Luxury Sparklers (3 Boxes)",
        "Big 25 Deluxe Whirling Ground Chakkars (2 Boxes)",
        "Tri-Colour Giant Flower Pots (2 Boxes)",
        "Hydro Bomb Thunder Crackers (2 Boxes)",
        "Luniq High-Altitude Whistling Rockets (1 Box)",
        "Kids Magic Pop-Pops & Cartoon Fountains (2 Boxes)",
        "Moisture-proof Rigid Festival Gift Packaging"
      ]
    },
    "eco-family": {
      name: "The Eco-Family Joy Collection",
      price: "₹1,049 (Retail MRP: ₹3,499 - 70% Off)",
      image: "/images/hamper-eco-family.png",
      items: [
        "Low-Smoke CSIR Green Certified Formulation",
        "15cm Electric Sparklers & Colour Sparklers (4 Boxes)",
        "Deluxe Ground Chakkars (2 Boxes)",
        "Flower Pots Special Cascade (2 Boxes)",
        "Chotta Fancy Aerial Golden Burst (2 Pcs)",
        "Twinkling Torches & Whistling Wheels (2 Boxes)",
        "Family Safe Fireworks Handling Guide & Safety Sparkler Holders"
      ]
    },
    "sivakasi-thunder": {
      name: "Sivakasi Thunder Mega Pack",
      price: "₹1,349 (Retail MRP: ₹4,499 - 70% Off)",
      image: "/images/hamper-sivakasi-thunder.png",
      items: [
        "Hydro Bomb High-Decibel Crackers (3 Boxes)",
        "Auto Bomb & Bullet Bomb Special Packs (3 Boxes)",
        "2-Sound Super Rockets (2 Boxes)",
        "Elephant Super Crackers (2 Boxes)",
        "30-Shot Rapid Fire Celebration Cake (1 Pc)",
        "Crackling Gold Sparklers (2 Boxes)",
        "Heavy-duty Impact-Resistant Cartons"
      ]
    }
  };

  function openHamperModal(key) {
    const data = HAMPER_DETAILS[key];
    if (!data) return;

    modalTitle.textContent = data.name;
    modalPrice.textContent = data.price;
    const modalImg = document.getElementById("modal-hamper-img");
    if (modalImg && data.image) {
      modalImg.src = data.image;
      modalImg.alt = data.name;
    }

    modalList.innerHTML = data.items
      .map(
        (it) => `<li><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> ${it}</li>`
      )
      .join("");

    const msg = `Hello BOOM WITH SK! I would like to order "${data.name}" at the factory direct price of ${data.price}. Please confirm stock and delivery timeline.`;
    modalWhatsAppBtn.href = `https://wa.me/918667500450?text=${encodeURIComponent(msg)}`;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  openBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const hamperKey = btn.getAttribute("data-hamper-key") || "grand-royale";
      openHamperModal(hamperKey);
    });
  });

  if (closeBtn) closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });
}

// --- 9. SVG Image Fallback & Particle Engine ---
const SVG_LOGO_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><rect width='100' height='100' rx='20' fill='%23D97706'/><path d='M50 15L58 35L78 25L65 45L85 50L65 55L78 75L58 65L50 85L42 65L22 75L35 55L15 50L35 45L22 25L42 35Z' fill='%23FFFFFF'/><text x='50' y='58' font-family='sans-serif' font-weight='900' font-size='22' fill='%23DC2626' text-anchor='middle'>SK</text></svg>";

const SVG_HERO_FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 675'><rect width='1200' height='675' fill='%230F172A'/><circle cx='600' cy='337' r='300' fill='url(%23g)' opacity='0.5'/><defs><radialGradient id='g'><stop offset='0%25' stop-color='%23F59E0B'/><stop offset='100%25' stop-color='%23DC2626' stop-opacity='0'/></radialGradient></defs><text x='600' y='270' font-family='sans-serif' font-weight='900' font-size='56' fill='%23F59E0B' text-anchor='middle'>BOOM WITH SK</text><text x='600' y='350' font-family='sans-serif' font-weight='800' font-size='42' fill='%23FFFFFF' text-anchor='middle'>SIVAKASI DIRECT WHOLESALE FIREWORKS</text><text x='600' y='430' font-family='sans-serif' font-weight='700' font-size='30' fill='%23DC2626' text-anchor='middle'>UP TO 70% FACTORY SAVINGS</text></svg>";

function initImageFallbacks() {
  const handleImg = (img) => {
    if (img.dataset.fallbackSet) return;
    img.dataset.fallbackSet = "true";
    if (img.classList.contains("brand-logo-img")) {
      img.src = SVG_LOGO_FALLBACK;
    } else {
      img.src = SVG_HERO_FALLBACK;
    }
  };

  document.querySelectorAll("img").forEach((img) => {
    img.addEventListener("error", () => handleImg(img));
    if (img.complete && img.naturalWidth === 0) {
      handleImg(img);
    }
  });

  // Observe dynamically inserted images
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((m) => {
      m.addedNodes.forEach((node) => {
        if (node.tagName === "IMG") {
          node.addEventListener("error", () => handleImg(node));
        } else if (node.querySelectorAll) {
          node.querySelectorAll("img").forEach((img) => {
            img.addEventListener("error", () => handleImg(img));
          });
        }
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
}

function initSparkParticles() {
  const canvas = document.getElementById("particle-canvas");
  const toggleBtn = document.querySelector(".particle-control");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  let width, height;
  let particles = [];
  let isRunning = true;
  let animationId;
  let lastTime = 0;
  const fpsInterval = 1000 / 30; // 30 FPS cap for high performance on mobile

  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener("resize", resize, { passive: true });

  const colors = [
    "rgba(217, 119, 6, 0.5)",
    "rgba(245, 158, 11, 0.6)",
    "rgba(220, 38, 38, 0.35)",
    "rgba(0, 0, 0, 0.2)"
  ];

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 50;
      this.size = Math.random() * 2 + 0.8;
      this.speedY = Math.random() * 0.8 + 0.3;
      this.speedX = (Math.random() - 0.5) * 0.4;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.2;
      this.decay = Math.random() * 0.003 + 0.001;
    }

    update() {
      this.y -= this.speedY;
      this.x += this.speedX;
      this.alpha -= this.decay;
      if (this.alpha <= 0 || this.y < -10) {
        this.reset();
      }
    }

    draw() {
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = this.color;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  const particleCount = window.innerWidth < 768 ? 14 : 26;
  for (let i = 0; i < particleCount; i++) {
    const p = new Particle();
    p.y = Math.random() * height;
    particles.push(p);
  }

  function loop(currentTime) {
    if (!isRunning) return;
    animationId = requestAnimationFrame(loop);

    const elapsed = currentTime - lastTime;
    if (elapsed > fpsInterval) {
      lastTime = currentTime - (elapsed % fpsInterval);
      ctx.clearRect(0, 0, width, height);
      particles.forEach((p) => {
        p.update();
        p.draw();
      });
    }
  }

  animationId = requestAnimationFrame(loop);

  if (toggleBtn) {
    toggleBtn.addEventListener("click", () => {
      isRunning = !isRunning;
      toggleBtn.classList.toggle("paused", !isRunning);
      const textSpan = toggleBtn.querySelector(".particle-text");
      if (isRunning) {
        if (textSpan) textSpan.textContent = "Sparks: Active";
        animationId = requestAnimationFrame(loop);
      } else {
        if (textSpan) textSpan.textContent = "Sparks: Paused";
        cancelAnimationFrame(animationId);
        ctx.clearRect(0, 0, width, height);
      }
    });
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden && isRunning) {
      cancelAnimationFrame(animationId);
    } else if (!document.hidden && isRunning) {
      animationId = requestAnimationFrame(loop);
    }
  });
}

// ==========================================================================
// 10. DEDICATED PRODUCT DETAIL PAGE CONTROLLER
// Handles URL hash routes (#product/ganga-jamuna, #product/ganga-jamuna-2, etc.)
// ==========================================================================
function initProductPage() {
  const closeBtn = document.getElementById("product-page-close");
  const backBtn = document.getElementById("product-page-back");
  const overlay = document.getElementById("product-page-overlay");

  if (closeBtn) closeBtn.addEventListener("click", closeProductPage);
  if (backBtn) backBtn.addEventListener("click", closeProductPage);
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) closeProductPage();
    });
  }

  handleHashRoute();
  window.addEventListener("hashchange", handleHashRoute);
}

function handleHashRoute() {
  const hash = window.location.hash;
  if (hash.startsWith("#product/")) {
    const pId = hash.replace("#product/", "");
    openProductPage(pId, false);
  } else if (hash.includes("ganga-jamuna") || hash === "#product/ganga-jamuna-2") {
    openProductPage("ganga-jamuna", false);
  }
}

function openProductPage(productId, updateHash = true) {
  const overlay = document.getElementById("product-page-overlay");
  const bodyEl = document.getElementById("product-page-body");
  if (!overlay || !bodyEl) return;

  // Match ganga-jamuna-2 or ganga-jamuna or ID
  let product = REAL_PRODUCTS.find(p => p.id === productId || p.id === productId.replace("-2", ""));
  if (!product && (productId.includes("ganga") || productId.includes("jamuna"))) {
    product = REAL_PRODUCTS.find(p => p.id === "ganga-jamuna");
  }
  if (!product) {
    product = REAL_PRODUCTS[0];
  }

  if (updateHash) {
    window.location.hash = `product/${product.id}`;
  }

  const related = REAL_PRODUCTS
    .filter(p => p.id !== product.id)
    .slice(0, 4);

  let currentQty = 1;

  bodyEl.innerHTML = `
    <div class="product-detail-container">
      <!-- Breadcrumbs -->
      <nav class="product-breadcrumbs">
        <a href="#hero" onclick="window.closeProductPage()">Home</a> &rsaquo;
        <a href="#all-crackers" onclick="window.closeProductPage()">All Crackers</a> &rsaquo;
        <span class="category-crumb">${product.categoryLabel}</span> &rsaquo;
        <span class="current-crumb">${product.name}</span>
      </nav>

      <!-- Product Main Hero Showcase -->
      <div class="product-detail-hero">
        <!-- Left: Image Gallery -->
        <div class="product-gallery-wrap">
          <div class="product-main-img-box">
            <span class="sale-badge">Sale!</span>
            <span class="green-cert-stamp">🌿 Green Fireworks Certified</span>
            <img 
              src="${product.image}" 
              alt="${product.name}" 
              class="product-detail-img" 
              id="product-detail-img-main" 
              onerror="this.onerror=null; this.src='${product.fallbackImage}';" 
            />
          </div>
          <div class="product-gallery-thumbs">
            <div class="gallery-thumb active" data-img-src="${product.image}"><img src="${product.image}" alt="${product.name}" onerror="this.onerror=null; this.src='${product.fallbackImage}';" /></div>
            <div class="gallery-thumb" data-img-src="${product.fallbackImage}"><img src="${product.fallbackImage}" alt="Sivakasi Packaging" /></div>
            <div class="gallery-thumb" data-img-src="/images/hero-pyro.jpg"><img src="/images/hero-pyro.jpg" alt="Festival Celebration" /></div>
          </div>
        </div>

        <!-- Right: Info Column -->
        <div class="product-info-column">
          <span class="product-category-pill">${product.categoryLabel} • Direct Sivakasi Wholesale</span>
          <h1 class="product-detail-title">${product.name}</h1>

          <div class="product-rating-row">
            <div class="stars">★★★★★</div>
            <span class="rating-text">4.9 / 5.0 (48 Verified Sivakasi Wholesale Reviews)</span>
            <span class="stock-status-badge">⚡ In Stock • Direct Sivakasi Dispatch Shed</span>
          </div>

          <!-- Price Box -->
          <div class="product-pricing-card">
            <div class="price-row">
              <span class="detail-mrp">Market Retail Price (MRP): <s>₹${product.mrp.toFixed(2)}</s></span>
              <span class="detail-discount-tag">${product.discount} Direct Wholesale</span>
            </div>
            <div class="detail-factory-price-wrap">
              <span class="factory-label">BOOM WITH SK Factory Price:</span>
              <span class="detail-price">₹${product.price.toFixed(2)}</span>
              <span class="per-unit-sub">/ Pack (Direct Sivakasi Invoice)</span>
            </div>
            <div class="detail-savings-highlight">
              🎉 Direct Cash Savings: <strong>₹${(product.mrp - product.price).toFixed(2)}</strong> (70% Off Retail Middleman Markup)
            </div>
          </div>

          <p class="product-detail-desc">${product.description}</p>

          <!-- Purchase Controls -->
          <div class="product-purchase-box">
            <div class="qty-selector-wrap">
              <label>Quantity (Packs):</label>
              <div class="detail-qty-control">
                <button class="detail-qty-btn" id="pdetail-qty-minus">-</button>
                <input type="number" id="pdetail-qty-input" value="1" min="1" max="99" readOnly />
                <button class="detail-qty-btn" id="pdetail-qty-plus">+</button>
              </div>
            </div>

            <div class="detail-cta-row">
              <button class="btn btn-primary btn-lg" id="pdetail-add-cart">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                <span>Add to Cart (<span id="pdetail-btn-total">₹${product.price.toFixed(2)}</span>)</span>
              </button>
              <a href="#" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp btn-lg" id="pdetail-whatsapp-btn">
                <svg class="btn-icon" viewBox="0 0 24 24" fill="currentColor"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766 0-3.18-2.587-5.771-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.694.072-2.148-.528-1.776-.733-2.906-2.542-2.994-2.66-.088-.118-.721-.96-.721-1.832 0-.872.456-1.301.618-1.479.162-.178.353-.223.471-.223.118 0 .236.002.339.006.107.005.252-.041.394.3.147.353.501 1.222.545 1.311.044.089.074.193.015.312-.059.119-.089.193-.177.297-.089.104-.187.232-.267.311-.089.089-.182.185-.078.363.104.178.461.761.989 1.231.679.605 1.251.792 1.429.881.178.089.282.074.386-.045.104-.119.443-.518.562-.696.118-.178.236-.148.397-.089.162.059 1.03.486 1.206.574.177.089.295.134.339.208.044.074.044.43-.1 1.229z"/></svg>
                <span>Instant WhatsApp Order</span>
              </a>
            </div>
          </div>

          <!-- Trust Badges Strip -->
          <div class="product-trust-strip">
            <div class="p-trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <span>100% Genuine Sivakasi Origin</span>
            </div>
            <div class="p-trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>
              <span>Moisture-Proof Export Carton</span>
            </div>
            <div class="p-trust-item">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8l-8 8M9 9h.01M15 15h.01"/></svg>
              <span>70% Wholesale Off MRP</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Technical Specifications Section -->
      <div class="product-detail-specs-section">
        <h3 class="detail-section-title">Technical Specifications & Sivakasi Standards</h3>
        <div class="specs-table-grid">
          <div class="spec-row">
            <span class="spec-label">Product Name</span>
            <span class="spec-val">${product.name}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Category</span>
            <span class="spec-val">${product.categoryLabel}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Standard Retail MRP</span>
            <span class="spec-val"><s>₹${product.mrp.toFixed(2)}</s></span>
          </div>
          <div class="spec-row">
            <span class="spec-label">BOOM WITH SK Factory Rate</span>
            <span class="spec-val text-gold" style="font-weight: 800;">₹${product.price.toFixed(2)} (70% Off)</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Chemical Formulation</span>
            <span class="spec-val">Certified CSIR-NEERI Green Pyrotechnic Composition</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Performance & Sound</span>
            <span class="spec-val">Dual Stage Ignition • Vibrant Chromatic Sparkles</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Safety Clearance</span>
            <span class="spec-val">15 Feet Minimum Clear Ground Clearance</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Manufacturing Hub</span>
            <span class="spec-val">S.K Pyro Park, Sivakasi, Tamil Nadu, 626123</span>
          </div>
        </div>
      </div>

      <!-- Related Crackers Section -->
      <div class="product-related-section" style="padding-top: var(--space-8); border-top: 1px solid var(--border-subtle);">
        <h3 class="detail-section-title">You May Also Like (70% Off Direct Wholesale)</h3>
        <div class="products-grid">
          ${related.map(rel => `
            <div class="product-card" data-product-id="${rel.id}">
              <span class="sale-badge">Sale!</span>
              <div class="product-thumb-wrap" style="cursor: pointer;" onclick="window.openProductPage('${rel.id}')">
                <img src="${rel.image}" alt="${rel.name}" class="product-thumb-img" loading="lazy" onerror="this.onerror=null; this.src='${rel.fallbackImage}';" />
              </div>
              <div class="product-info">
                <span style="font-size: 0.72rem; color: var(--text-muted); text-transform: uppercase; font-weight: 700;">${rel.categoryLabel}</span>
                <h4 class="product-title" style="cursor: pointer;" onclick="window.openProductPage('${rel.id}')">${rel.name}</h4>
                <div class="product-prices">
                  <span class="product-mrp">₹${rel.mrp.toFixed(2)}</span>
                  <span class="product-price">₹${rel.price.toFixed(2)}</span>
                  <span class="product-discount-tag">${rel.discount}</span>
                </div>
                <div class="product-actions-bar">
                  <button class="btn btn-cart" onclick="window.addToCartFromPage('${rel.id}')">Add to cart</button>
                  <button class="btn btn-secondary btn-sm" onclick="window.openProductPage('${rel.id}')">View Details</button>
                </div>
              </div>
            </div>
          `).join("")}
        </div>
      </div>
    </div>
  `;

  // Attach Quantity & WhatsApp CTA handlers
  const qtyMinus = document.getElementById("pdetail-qty-minus");
  const qtyPlus = document.getElementById("pdetail-qty-plus");
  const qtyInput = document.getElementById("pdetail-qty-input");
  const btnTotal = document.getElementById("pdetail-btn-total");
  const addCartBtn = document.getElementById("pdetail-add-cart");
  const whatsappBtn = document.getElementById("pdetail-whatsapp-btn");

  function updateDetailPricing() {
    const total = product.price * currentQty;
    if (btnTotal) btnTotal.textContent = `₹${total.toFixed(2)}`;
    if (qtyInput) qtyInput.value = currentQty;

    if (whatsappBtn) {
      const msg = `Hello BOOM WITH SK! I would like to order ${currentQty} pack(s) of ${product.name} at the direct Sivakasi factory rate of ₹${product.price} each (Total: ₹${total}). Please confirm dispatch!`;
      whatsappBtn.href = `https://wa.me/918667500450?text=${encodeURIComponent(msg)}`;
    }
  }

  if (qtyMinus) {
    qtyMinus.addEventListener("click", () => {
      if (currentQty > 1) {
        currentQty--;
        updateDetailPricing();
      }
    });
  }

  if (qtyPlus) {
    qtyPlus.addEventListener("click", () => {
      currentQty++;
      updateDetailPricing();
    });
  }

  if (addCartBtn) {
    addCartBtn.addEventListener("click", () => {
      for (let i = 0; i < currentQty; i++) {
        addToCart(product.id);
      }
    });
  }

  updateDetailPricing();

  // Gallery Thumbnail Clicks
  const mainImg = document.getElementById("product-detail-img-main");
  const thumbs = bodyEl.querySelectorAll(".gallery-thumb");
  thumbs.forEach(thumb => {
    thumb.addEventListener("click", () => {
      thumbs.forEach(t => t.classList.remove("active"));
      thumb.classList.add("active");
      const src = thumb.getAttribute("data-img-src");
      if (mainImg && src) mainImg.src = src;
    });
  });

  overlay.classList.add("open");
  overlay.scrollTop = 0;
  document.body.style.overflow = "hidden";
}

function closeProductPage() {
  const overlay = document.getElementById("product-page-overlay");
  if (overlay) {
    overlay.classList.remove("open");
    document.body.style.overflow = "";
    if (window.location.hash.startsWith("#product/")) {
      history.replaceState(null, null, ' ');
    }
  }
}

window.openProductPage = (id) => openProductPage(id, true);
window.closeProductPage = closeProductPage;
window.addToCartFromPage = (id) => addToCart(id);
