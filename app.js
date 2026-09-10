/**
 * CHOCOLATES TRONADOR - SABORES DE BARILOCHE
 * Application Logic & E-commerce Store Engine
 */

// --- Products Database ---
const PRODUCTS = [
  {
    id: 'bombones-autor',
    name: 'Bombones de Autor - Selección Bariloche',
    category: 'bombones',
    price: 18500,
    priceFormatted: '$18.500 ARS',
    image: 'assets/images/bombones.jpg',
    tag: 'Edición Limitada',
    cocoaPct: '72%',
    description: 'Surtido de bombones rellenos artesanalmente con dulce de leche casero, frambuesas patagónicas y licores artesanales.',
    notes: ['Dulce de Leche', 'Frambuesa', 'Oro Comestible', 'Avellana']
  },
  {
    id: 'chocolate-rama',
    name: 'Chocolate en Rama Tradicional (250g)',
    category: 'rama',
    price: 14200,
    priceFormatted: '$14.200 ARS',
    image: 'assets/images/rama.jpg',
    tag: 'Clásico Patagónico',
    cocoaPct: '60%',
    description: 'Delicadas láminas de chocolate con leche y amargo templado manualmente sobre mesada de mármol según la receta tradicional.',
    notes: ['Sabor Suave', 'Cacao Puro', 'Textura Crocante']
  },
  {
    id: 'trufas-patagonicas',
    name: 'Trufas de Cacao & Frutos Rojos (12u)',
    category: 'trufas',
    price: 16800,
    priceFormatted: '$16.800 ARS',
    image: 'assets/images/trufas.jpg',
    tag: '70% Cacao',
    cocoaPct: '70%',
    description: 'Trufas intensas elaboradas con cacao de origen único, espolvoreadas con caco en polvo holandés y frambuesas liofilizadas.',
    notes: ['Cacao Intenso', 'Toque Cítrico', 'Cremoso']
  },
  {
    id: 'alfajores-artesanales',
    name: 'Alfajores Patagónicos de Chocolate (6u)',
    category: 'alfajores',
    price: 12900,
    priceFormatted: '$12.900 ARS',
    image: 'assets/images/alfajores.jpg',
    tag: 'Artesanal',
    cocoaPct: '55%',
    description: 'Masa suave de cacao, abundante relleno de dulce de leche de campo y baño generoso de chocolate amargo.',
    notes: ['Dulce de Leche', 'Masa Cacao', 'Receta Familiar']
  },
  {
    id: 'caja-regalo-tronador',
    name: 'Caja Regalo Tronador Deluxe (12 piezas)',
    category: 'bombones',
    price: 24500,
    priceFormatted: '$24.500 ARS',
    image: 'assets/images/caja.jpg',
    tag: 'Ideal Regalo',
    cocoaPct: '68%',
    description: 'Estuche rígido de madera con detalles en dorado, con una fina selección de nuestras piezas artesanales más galardonadas.',
    notes: ['Caja de Madera', 'Lujo Artesanal', 'Maridaje']
  }
];

// --- Box Builder Flavors ---
const BOX_FLAVORS = [
  { id: 'b-dulce-leche', name: 'Bombón Dulce de Leche & Malbec', desc: 'Relleno cremoso con reducción de Malbec' },
  { id: 'b-frambuesa', name: 'Trufa de Frambuesa Silvestre', desc: 'Cacao 70% con corazón ácido' },
  { id: 'b-avellana', name: 'Marroc Crocante de Avellana', desc: 'Gianduja artesanal con avellanas' },
  { id: 'b-rama-blanco', name: 'Rama de Chocolate Blanco & Vainilla', desc: 'Vainilla natural de Papantla' },
  { id: 'b-nuez', name: 'Nuez Caramelizada & Bitter 80%', desc: 'Toque de flor de sal marina' }
];

// --- State Management ---
let cart = [];
let currentCategory = 'todos';
let builderBoxSize = 12;
let builderFlavors = {
  'b-dulce-leche': 4,
  'b-frambuesa': 4,
  'b-avellana': 4,
  'b-rama-blanco': 0,
  'b-nuez': 0
};

// --- DOM Elements Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  renderProducts();
  setupCategoryFilters();
  setupBoxBuilder();
  setupCartEvents();
  setupModalEvents();
});

// --- Product Catalog Rendering & Filtering ---
function renderProducts() {
  const grid = document.getElementById('productsGrid');
  if (!grid) return;

  const filtered = currentCategory === 'todos' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === currentCategory);

  grid.innerHTML = filtered.map(product => `
    <div class="double-bezel-shell product-card">
      <div class="double-bezel-core">
        <div class="product-image-container">
          <img src="${product.image}" alt="${product.name}" loading="lazy" />
          <span class="product-tag">${product.tag}</span>
        </div>
        <div class="product-content">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-desc">${product.description}</p>
          <div class="product-meta-row">
            <span class="product-price">${product.priceFormatted}</span>
            <div class="product-actions">
              <button class="btn-quick-view" onclick="openQuickView('${product.id}')" title="Vista Rápida" aria-label="Vista Rápida">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
              </button>
              <button class="btn-add-cart" onclick="addToCart('${product.id}')">
                Agregar +
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');
}

function setupCategoryFilters() {
  const buttons = document.querySelectorAll('.filter-btn');
  buttons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category || 'todos';
      renderProducts();
    });
  });
}

// --- Box Builder Logic ("Armá tu Caja Tronador") ---
function setupBoxBuilder() {
  const sizeBtns = document.querySelectorAll('.box-size-btn');
  sizeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sizeBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      builderBoxSize = parseInt(btn.dataset.size, 10);
      updateBuilderUI();
    });
  });

  renderFlavorPicker();
  updateBuilderUI();

  const addBoxBtn = document.getElementById('addCustomBoxBtn');
  if (addBoxBtn) {
    addBoxBtn.addEventListener('click', () => {
      const currentCount = getSelectedFlavorsCount();
      if (currentCount < builderBoxSize) {
        showToast(`Te faltan ${builderBoxSize - currentCount} chocolates para completar tu caja.`);
        return;
      }

      const customBoxItem = {
        id: `custom-box-${Date.now()}`,
        name: `Caja Personalizada Tronador (${builderBoxSize} piezas)`,
        price: builderBoxSize === 6 ? 11500 : (builderBoxSize === 12 ? 21000 : 38000),
        priceFormatted: builderBoxSize === 6 ? '$11.500 ARS' : (builderBoxSize === 12 ? '$21.000 ARS' : '$38.000 ARS'),
        image: 'assets/images/caja.jpg',
        quantity: 1
      };

      cart.push(customBoxItem);
      updateCartUI();
      openCartDrawer();
      showToast('Caja personalizada agregada a la cesta');
    });
  }
}

function renderFlavorPicker() {
  const container = document.getElementById('flavorPickerGrid');
  if (!container) return;

  container.innerHTML = BOX_FLAVORS.map(flavor => `
    <div class="flavor-item-card">
      <div>
        <div class="flavor-info-title">${flavor.name}</div>
        <div class="flavor-info-desc">${flavor.desc}</div>
      </div>
      <div class="flavor-counter">
        <button class="counter-btn" onclick="updateFlavorCount('${flavor.id}', -1)">-</button>
        <span class="counter-value" id="flavor-val-${flavor.id}">${builderFlavors[flavor.id] || 0}</span>
        <button class="counter-btn" onclick="updateFlavorCount('${flavor.id}', 1)">+</button>
      </div>
    </div>
  `).join('');
}

function updateFlavorCount(id, delta) {
  const currentTotal = getSelectedFlavorsCount();
  const currentItem = builderFlavors[id] || 0;

  if (delta > 0 && currentTotal >= builderBoxSize) {
    showToast(`Caja de ${builderBoxSize} piezas completa.`);
    return;
  }

  if (delta < 0 && currentItem <= 0) return;

  builderFlavors[id] = currentItem + delta;
  const valEl = document.getElementById(`flavor-val-${id}`);
  if (valEl) valEl.textContent = builderFlavors[id];

  updateBuilderUI();
}

function getSelectedFlavorsCount() {
  return Object.values(builderFlavors).reduce((a, b) => a + b, 0);
}

function updateBuilderUI() {
  const count = getSelectedFlavorsCount();
  const progressFill = document.getElementById('boxProgressFill');
  const countText = document.getElementById('boxCountText');
  const priceText = document.getElementById('boxPriceText');

  const pct = Math.min(100, (count / builderBoxSize) * 100);
  if (progressFill) progressFill.style.width = `${pct}%`;
  if (countText) countText.textContent = `${count} / ${builderBoxSize} chocolates`;

  const calculatedPrice = builderBoxSize === 6 ? '$11.500 ARS' : (builderBoxSize === 12 ? '$21.000 ARS' : '$38.000 ARS');
  if (priceText) priceText.textContent = calculatedPrice;
}

// --- Cart Management & Events ---
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const existing = cart.find(item => item.id === productId);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  openCartDrawer();
  showToast(`${product.name} agregado a la cesta`);
}

function updateCartQuantity(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== id);
  }
  updateCartUI();
}

function updateCartUI() {
  const cartBadge = document.getElementById('cartBadgeCount');
  const itemsContainer = document.getElementById('cartItemsList');
  const totalPriceEl = document.getElementById('cartTotalPrice');

  const totalCount = cart.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = cart.reduce((sum, i) => sum + (i.price * i.quantity), 0);

  if (cartBadge) cartBadge.textContent = totalCount;
  if (totalPriceEl) totalPriceEl.textContent = `$${totalPrice.toLocaleString('es-AR')} ARS`;

  if (itemsContainer) {
    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" style="margin: 0 auto 1rem; opacity: 0.4;"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
          <p>Tu cesta de chocolates está vacía.</p>
        </div>
      `;
    } else {
      itemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
          <img src="${item.image}" alt="${item.name}" class="cart-item-img" />
          <div class="cart-item-info">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">$${(item.price * item.quantity).toLocaleString('es-AR')} ARS</div>
            <div class="flavor-counter" style="margin-top: 0.5rem;">
              <button class="counter-btn" onclick="updateCartQuantity('${item.id}', -1)">-</button>
              <span class="counter-value">${item.quantity}</span>
              <button class="counter-btn" onclick="updateCartQuantity('${item.id}', 1)">+</button>
            </div>
          </div>
        </div>
      `).join('');
    }
  }
}

function openCartDrawer() {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (overlay) overlay.classList.add('active');
}

function closeCartDrawer() {
  const overlay = document.getElementById('cartDrawerOverlay');
  if (overlay) overlay.classList.remove('active');
}

function setupCartEvents() {
  const cartTrigger = document.getElementById('cartTrigger');
  const closeBtn = document.getElementById('cartCloseBtn');
  const overlay = document.getElementById('cartDrawerOverlay');

  if (cartTrigger) cartTrigger.addEventListener('click', openCartDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeCartDrawer);
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) closeCartDrawer();
    });
  }

  const checkoutBtn = document.getElementById('checkoutBtn');
  if (checkoutBtn) {
    checkoutBtn.addEventListener('click', () => {
      if (cart.length === 0) {
        showToast('Tu cesta está vacía');
        return;
      }
      showToast('¡Gracias por tu compra! Redirigiendo a Checkout...');
    });
  }
}

// --- Quick View Modal Logic ---
function openQuickView(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  if (!product) return;

  const modalContent = document.getElementById('modalContent');
  const modalOverlay = document.getElementById('quickViewModal');

  if (modalContent && modalOverlay) {
    modalContent.innerHTML = `
      <div class="modal-grid">
        <img src="${product.image}" alt="${product.name}" class="modal-img" />
        <div>
          <span class="eyebrow-badge" style="margin-bottom: 0.5rem;">${product.tag} · ${product.cocoaPct} Cacao</span>
          <h2 class="h2" style="font-size: 2.25rem; margin-bottom: 0.75rem;">${product.name}</h2>
          <div style="font-family: var(--font-serif); font-size: 1.75rem; color: var(--accent-gold); font-weight: 700; margin-bottom: 1.25rem;">${product.priceFormatted}</div>
          <p style="color: var(--text-muted); font-size: 0.95rem; margin-bottom: 1.5rem; line-height: 1.6;">${product.description}</p>
          
          <div style="margin-bottom: 1.5rem;">
            <div style="font-weight: 600; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.1em; color: var(--text-muted); margin-bottom: 0.5rem;">Notas de Cata</div>
            <div style="display: flex; flex-wrap: wrap; gap: 0.5rem;">
              ${product.notes.map(n => `<span style="padding: 0.25rem 0.75rem; background: rgba(255,255,255,0.05); border: 1px solid var(--border-light); border-radius: var(--radius-pill); font-size: 0.8rem;">${n}</span>`).join('')}
            </div>
          </div>

          <button class="btn-primary" style="width: 100%; justify-content: center;" onclick="addToCart('${product.id}'); closeQuickView();">
            <span>Agregar a la Cesta</span>
            <div class="btn-icon-badge">→</div>
          </button>
        </div>
      </div>
    `;
    modalOverlay.classList.add('active');
  }
}

function closeQuickView() {
  const modalOverlay = document.getElementById('quickViewModal');
  if (modalOverlay) modalOverlay.classList.remove('active');
}

function setupModalEvents() {
  const modalOverlay = document.getElementById('quickViewModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  if (closeBtn) closeBtn.addEventListener('click', closeQuickView);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeQuickView();
    });
  }
}

// --- Toast Feedback Utility ---
function showToast(message) {
  const container = document.getElementById('toastContainer');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent-gold)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}
