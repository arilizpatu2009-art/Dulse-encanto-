/* ==========================================
   PASTELERÍA DULCE ENCANTO - LÓGICA & JS
   ========================================== */

// BASE DE DATOS DE PASTELES (Catálogo de productos)
const PRODUCTS = [
  {
    id: 1,
    name: "Pastel Velvet Rosa",
    category: "Clásicos",
    price: 450,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80",
    description: "Bizcocho suave de terciopelo rosa con relleno de queso crema y vainilla natural.",
    featured: true
  },
  {
    id: 2,
    name: "Sueño de Fresas & Crema",
    category: "Frutales",
    price: 480,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?auto=format&fit=crop&w=600&q=80",
    description: "Pastel frío con fresas frescas orgánicas, mermelada artesanal y crema chantilly.",
    featured: true
  },
  {
    id: 3,
    name: "Chocolate Fudge Supremo",
    category: "Chocolate",
    price: 520,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?auto=format&fit=crop&w=600&q=80",
    description: "Triple capa de chocolate 70% cacao con cobertura de ganache brillante.",
    featured: true
  },
  {
    id: 4,
    name: "Pastel Mariposa Pistacho",
    category: "Especiales",
    price: 560,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80",
    description: "Delicioso bizcocho de harina de pistacho con crema suave de frutos del bosque.",
    featured: true
  },
  {
    id: 5,
    name: "Tres Leches Canela & Vainilla",
    category: "Clásicos",
    price: 420,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=600&q=80",
    description: "Bañado en infusión de tres leches tradicionales terminado con suave merengue suizo.",
    featured: false
  },
  {
    id: 6,
    name: "Cheesecake de Limón & Lavanda",
    category: "Frutales",
    price: 490,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?auto=format&fit=crop&w=600&q=80",
    description: "Pastel horneado estilo Nueva York con toques refrescantes de limón amarillo y aroma de lavanda.",
    featured: false
  },
  {
    id: 7,
    name: "Pastel Vegano Avellana & Cacao",
    category: "Especiales",
    price: 540,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?auto=format&fit=crop&w=600&q=80",
    description: "100% libre de lácteos y huevo. Endulzado con azúcar de coco y relleno de crema de avellanas.",
    featured: false
  },
  {
    id: 8,
    name: "Tarta Milhojas Dulce de Leche",
    category: "Clásicos",
    price: 460,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80",
    description: "Hojaldre crujiente intercalado con abundante manjar casero y lluvia de nueces picadas.",
    featured: false
  }
];

// ESTADO GLOBAL
let cart = [];

// INICIALIZACIÓN DE LA PÁGINA
document.addEventListener("DOMContentLoaded", () => {
  renderFeaturedCakes();
  renderCatalog(PRODUCTS);
  updateCartUI();
  if (window.lucide) {
    lucide.createIcons();
  }
});

// SISTEMA DE NAVEGACIÓN ENTRE SECCIONES (Inicio, Catálogo, Guía, Cuenta)
function switchTab(tabId) {
  document.getElementById('section-inicio').classList.add('hidden');
  document.getElementById('section-catalogo').classList.add('hidden');
  document.getElementById('section-tipos').classList.add('hidden');
  document.getElementById('section-cuenta').classList.add('hidden');

  document.getElementById(`section-${tabId}`).classList.remove('hidden');

  const navButtons = document.querySelectorAll('.nav-btn');
  navButtons.forEach(btn => {
    btn.classList.remove('bg-white', 'text-pastel-dark', 'shadow-sm');
    btn.classList.add('text-gray-600');
  });

  const activeBtn = document.getElementById(`nav-${tabId}`);
  if (activeBtn) {
    activeBtn.classList.add('bg-white', 'text-pastel-dark', 'shadow-sm');
    activeBtn.classList.remove('text-gray-600');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// RENDERIZAR PASTELES DESTACADOS (INICIO)
function renderFeaturedCakes() {
  const featuredGrid = document.getElementById('featured-cakes-grid');
  if (!featuredGrid) return;
  const featuredList = PRODUCTS.filter(p => p.featured);

  featuredGrid.innerHTML = featuredList.map(product => `
    <div class="bg-white rounded-2xl overflow-hidden border border-pastel-pink/60 custom-shadow flex flex-col justify-between group">
      <div class="relative overflow-hidden h-48">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
        <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-pink-500">
          ⭐ ${product.rating}
        </span>
      </div>
      <div class="p-5 flex flex-col justify-between flex-grow space-y-3">
        <div>
          <span class="text-xs text-pink-400 font-medium">${product.category}</span>
          <h3 class="font-serif font-bold text-pastel-dark text-lg leading-snug">${product.name}</h3>
          <p class="text-xs text-gray-500 line-clamp-2 mt-1">${product.description}</p>
        </div>
        <div class="flex items-center justify-between pt-2 border-t border-pastel-pink/40">
          <span class="font-bold text-pastel-dark">${product.price} MXN</span>
          <button onclick="addToCart(${product.id})" class="p-2 rounded-full bg-pastel-rose hover:bg-pink-400 text-white transition">
            <i data-lucide="plus" class="w-4 h-4"></i>
          </button>
        </div>
      </div>
    </div>
  `).join('');
}

// RENDERIZAR PASTELES EN EL CATÁLOGO
function renderCatalog(productsToRender) {
  const grid = document.getElementById('products-grid');
  if (!grid) return;

  if (productsToRender.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full text-center py-12 text-gray-500">
        <i data-lucide="search-x" class="w-12 h-12 mx-auto text-pastel-rose mb-3"></i>
        <p class="text-lg font-medium">No encontramos pasteles que coincidan con tu búsqueda.</p>
      </div>
    `;
    if (window.lucide) lucide.createIcons();
    return;
  }

  grid.innerHTML = productsToRender.map(product => `
    <div class="bg-white rounded-2xl overflow-hidden border border-pastel-pink/70 custom-shadow flex flex-col justify-between group">
      <div class="relative overflow-hidden h-52">
        <img src="${product.image}" alt="${product.name}" class="w-full h-full object-cover group-hover:scale-105 transition duration-500">
        <span class="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-semibold text-pink-500">
          ⭐ ${product.rating}
        </span>
        <span class="absolute top-3 right-3 bg-pastel-cream text-pastel-dark font-medium px-2.5 py-1 rounded-full text-xs border border-pastel-pink">
          ${product.category}
        </span>
      </div>
      <div class="p-5 flex flex-col justify-between flex-grow space-y-4">
        <div>
          <h3 class="font-serif font-bold text-pastel-dark text-xl leading-snug">${product.name}</h3>
          <p class="text-xs text-gray-600 mt-2 leading-relaxed">${product.description}</p>
        </div>
        <div class="flex items-center justify-between pt-3 border-t border-pastel-pink/40">
          <div>
            <span class="text-xs text-gray-400 block">Precio</span>
            <span class="font-bold text-lg text-pastel-dark">$${product.price} MXN</span>
          </div>
          <button onclick="addToCart(${product.id})" class="bg-pastel-rose hover:bg-pink-400 text-white px-4 py-2 rounded-full text-sm font-medium transition shadow flex items-center space-x-1">
            <i data-lucide="shopping-bag" class="w-4 h-4"></i>
            <span>Agregar</span>
          </button>
        </div>
      </div>
    </div>
  `).join('');

  if (window.lucide) lucide.createIcons();
}

// BÚSQUEDA Y FILTRADO DE PRODUCTOS
function filterProducts() {
  const searchQuery = document.getElementById('search-input').value.toLowerCase();
  const selectedCategory = document.getElementById('category-filter').value;

  const filtered = PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery) || product.description.toLowerCase().includes(searchQuery);
    const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  renderCatalog(filtered);
}

// FUNCIONALIDADES DEL CARRITO
function addToCart(productId) {
  const product = PRODUCTS.find(p => p.id === productId);
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  updateCartUI();
  showToast(`¡${product.name} añadido al carrito!`);
}

function changeQuantity(productId, delta) {
  const item = cart.find(i => i.id === productId);
  if (!item) return;

  item.quantity += delta;
  if (item.quantity <= 0) {
    cart = cart.filter(i => i.id !== productId);
  }

  updateCartUI();
}

function removeFromCart(productId) {
  cart = cart.filter(i => i.id !== productId);
  updateCartUI();
  showToast('Producto eliminado del carrito');
}

function updateCartUI() {
  const cartBadge = document.getElementById('cart-badge');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const subtotalEl = document.getElementById('cart-subtotal');
  const totalEl = document.getElementById('cart-total');

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cartBadge) cartBadge.innerText = totalCount;
  if (subtotalEl) subtotalEl.innerText = `$${subtotal.toFixed(2)} MXN`;
  if (totalEl) totalEl.innerText = `$${subtotal.toFixed(2)} MXN`;

  if (!cartItemsContainer) return;

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div class="text-center py-12 text-gray-400">
        <i data-lucide="shopping-cart" class="w-12 h-12 mx-auto mb-3 text-pastel-rose"></i>
        <p class="text-sm">Tu carrito está vacío por ahora.</p>
      </div>
    `;
  } else {
    cartItemsContainer.innerHTML = cart.map(item => `
      <div class="flex items-center space-x-3 p-3 bg-pastel-cream/30 rounded-2xl border border-pastel-pink/50">
        <img src="${item.image}" alt="${item.name}" class="w-16 h-16 rounded-xl object-cover">
        <div class="flex-grow">
          <h4 class="font-medium text-sm text-pastel-dark line-clamp-1">${item.name}</h4>
          <p class="text-xs text-pink-500 font-bold">$${item.price} MXN</p>
          
          <div class="flex items-center space-x-2 mt-2">
            <button onclick="changeQuantity(${item.id}, -1)" class="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs text-gray-600 hover:bg-pastel-pink">-</button>
            <span class="text-xs font-semibold px-1">${item.quantity}</span>
            <button onclick="changeQuantity(${item.id}, 1)" class="w-6 h-6 rounded-full bg-white border border-gray-200 flex items-center justify-center text-xs text-gray-600 hover:bg-pastel-pink">+</button>
          </div>
        </div>
        <button onclick="removeFromCart(${item.id})" class="text-gray-400 hover:text-red-400 p-1">
          <i data-lucide="trash-2" class="w-4 h-4"></i>
        </button>
      </div>
    `).join('');
  }

  if (window.lucide) lucide.createIcons();
}

function toggleCartDrawer() {
  const drawer = document.getElementById('cart-drawer');
  const backdrop = document.getElementById('cart-drawer-backdrop');

  if (drawer && backdrop) {
    drawer.classList.toggle('translate-x-full');
    backdrop.classList.toggle('hidden');
  }
}

function checkout() {
  if (cart.length === 0) {
    showToast('Agrega al menos un pastel a tu carrito');
    return;
  }

  alert('¡Gracias por tu compra en Dulce Encanto! Hemos recibido tu pedido con éxito.');
  cart = [];
  updateCartUI();
  toggleCartDrawer();
}

// GUARDAR DATOS DEL PERFIL DE USUARIO
function saveUserProfile(event) {
  event.preventDefault();
  const name = document.getElementById('input-name').value;
  const email = document.getElementById('input-email').value;

  document.getElementById('display-name').innerText = name;
  document.getElementById('display-email').innerText = email;

  const initials = name.split(' ').map(n => n[0]).join('').substring(0,2).toUpperCase();
  document.getElementById('user-avatar').innerText = initials || 'U';

  showToast('Perfil actualizado correctamente');
}

// MOSTRAR MENSAJES FLOTANTES (TOAST)
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');

  if (toast && toastMsg) {
    toastMsg.innerText = message;
    toast.classList.remove('translate-y-20', 'opacity-0');

    setTimeout(() => {
      toast.classList.add('translate-y-20', 'opacity-0');
    }, 3000);
  }
}