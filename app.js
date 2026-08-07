// Gelys Store - Main Application Logic (Multi-Page Version)

// 1. Datos de Productos (Catálogo)
const products = [
    {
        id: 1,
        name: "Vestido Elegante 'Comayagua'",
        category: "damas",
        price: 850.00,
        tag: "Premium",
        desc: "Vestido formal de corte elegante, ideal para eventos de noche o reuniones ejecutivas. Tela suave y transpirable.",
        image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 2,
        name: "Blusa Casual de Lino",
        category: "damas",
        price: 420.00,
        tag: "Tendencia",
        desc: "Blusa fresca de lino natural en tonos pastel, perfecta para clima cálido. Estilo casual y refinado.",
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 3,
        name: "Jeans Skinny High-Waist",
        category: "damas",
        price: 680.00,
        tag: "Básico",
        desc: "Jeans elásticos tiro alto que moldean la silueta con máxima comodidad. Excelente durabilidad.",
        image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 4,
        name: "Conjunto Casual Rosa Pastel",
        category: "damas",
        price: 950.00,
        tag: "Nuevo",
        desc: "Set de dos piezas (saco corto y short) en tejido liso. Un look juvenil, fresco y muy a la moda.",
        image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 5,
        name: "Camisa Oxford Premium",
        category: "caballeros",
        price: 580.00,
        tag: "Elegante",
        desc: "Camisa de vestir estilo Oxford confeccionada en algodón de alta resistencia. Corte ajustado slim-fit.",
        image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 6,
        name: "Chaqueta Bomber Denim",
        category: "caballeros",
        price: 1200.00,
        tag: "Tendencia",
        desc: "Chaqueta de mezclilla resistente con forro cómodo. Un clásico atemporal que combina con todo.",
        image: "https://images.unsplash.com/photo-1611312449412-6cefac5dc3e4?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 7,
        name: "Pantalón Chino Slim-Fit",
        category: "caballeros",
        price: 750.00,
        tag: "Básico",
        desc: "Pantalón de gabardina semi-formal. Versátil para el trabajo diario o salidas de fin de semana.",
        image: "https://images.unsplash.com/photo-1479064555552-3ef4979f8908?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 8,
        name: "Camiseta Básica Algodón Pima",
        category: "caballeros",
        price: 320.00,
        tag: "Básico",
        desc: "Camiseta de cuello redondo hecha de algodón peruano ultra-suave. Tacto premium y gran frescura.",
        image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 9,
        name: "Gorra Deportiva Minimalista",
        category: "accesorios",
        price: 280.00,
        tag: "Nuevo",
        desc: "Gorra de béisbol con logo bordado sutil. Cierre ajustable metálico y visera precurvada.",
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?q=80&w=500&auto=format&fit=crop"
    },
    {
        id: 10,
        name: "Fardo de Ropa Mixta Premium",
        category: "accesorios",
        price: 5000.00,
        tag: "Wholesale",
        desc: "Fardo especial de ropa seleccionada (Damas y Caballeros) de alta demanda. Ideal para revendedores locales.",
        image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?q=80&w=500&auto=format&fit=crop"
    }
];

// 2. Estado Global de la Aplicación (Carga persistente del Carrito)
let cart = JSON.parse(localStorage.getItem("gelys_cart")) || [];
let currentCategory = "all";
let searchQuery = "";

// Número de contacto de WhatsApp para enviar pedidos (Yorgely Nohemy Aguilar)
const WHATSAPP_PHONE = "50499000000"; 

// 3. Selectores DOM
const productsGrid = document.getElementById("products-grid");
const categoryFilters = document.getElementById("category-filters");
const productSearch = document.getElementById("product-search");
const cartToggle = document.getElementById("cart-toggle");
const cartClose = document.getElementById("cart-close");
const cartDrawer = document.getElementById("cart-drawer");
const cartDrawerOverlay = document.getElementById("cart-drawer-overlay");
const cartItemsContainer = document.getElementById("cart-items-container");
const cartSubtotal = document.getElementById("cart-subtotal");
const cartTotal = document.getElementById("cart-total");
const cartCountBadges = document.querySelectorAll(".cart-count");
const themeToggle = document.getElementById("theme-toggle");
const menuToggle = document.getElementById("menu-toggle");
const mainNav = document.getElementById("main-nav");
const tabsControl = document.querySelector(".tabs-control");
const orderForm = document.getElementById("order-form");

// 4. Inicialización
document.addEventListener("DOMContentLoaded", () => {
    // Inicializar iconos de Lucide
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
    
    // Configurar Tema Inicial (Modo Claro/Oscuro)
    initTheme();
    
    // Parsear parámetros de la URL para categoría de productos
    const urlParams = new URLSearchParams(window.location.search);
    const catParam = urlParams.get('category');
    if (catParam && ["damas", "caballeros", "accesorios"].includes(catParam)) {
        currentCategory = catParam;
        
        // Actualizar el botón de filtro activo en la vista
        if (categoryFilters) {
            document.querySelectorAll(".filter-btn").forEach(btn => {
                if (btn.dataset.category === catParam) {
                    btn.classList.add("active");
                } else {
                    btn.classList.remove("active");
                }
            });
        }
    }
    
    // Renderizar Catálogo (Si existe en la página actual)
    if (productsGrid) {
        renderProducts();
    }
    
    // Actualizar la interfaz del carrito cargada desde el almacenamiento local
    updateCartUI();
    
    // Configurar Eventos
    setupEventListeners();
});

// 5. Configurar Tema (Claro / Oscuro)
function initTheme() {
    const savedTheme = localStorage.getItem("theme") || "light";
    document.documentElement.setAttribute("data-theme", savedTheme);
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const darkIcon = document.querySelector(".theme-icon-dark");
    const lightIcon = document.querySelector(".theme-icon-light");
    
    if (darkIcon && lightIcon) {
        if (theme === "dark") {
            darkIcon.style.display = "none";
            lightIcon.style.display = "block";
        } else {
            darkIcon.style.display = "block";
            lightIcon.style.display = "none";
        }
    }
}

// 6. Configurar Event Listeners
function setupEventListeners() {
    // Alternar Tema de Color
    if (themeToggle) {
        themeToggle.addEventListener("click", () => {
            const currentTheme = document.documentElement.getAttribute("data-theme");
            const newTheme = currentTheme === "dark" ? "light" : "dark";
            document.documentElement.setAttribute("data-theme", newTheme);
            localStorage.setItem("theme", newTheme);
            updateThemeIcon(newTheme);
        });
    }
    
    // Filtros de Categoría (Sólo si existen en el DOM)
    if (categoryFilters) {
        categoryFilters.addEventListener("click", (e) => {
            if (e.target.classList.contains("filter-btn")) {
                document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
                e.target.classList.add("active");
                currentCategory = e.target.dataset.category;
                renderProducts();
            }
        });
    }
    
    // Búsqueda en tiempo real (Sólo si existe en el DOM)
    if (productSearch) {
        productSearch.addEventListener("input", (e) => {
            searchQuery = e.target.value.toLowerCase();
            renderProducts();
        });
    }
    
    // Alternar Sidebar de Carrito
    if (cartToggle) cartToggle.addEventListener("click", toggleCart);
    if (cartClose) cartClose.addEventListener("click", toggleCart);
    if (cartDrawerOverlay) cartDrawerOverlay.addEventListener("click", toggleCart);
    
    // Menu Hamburguesa Móvil
    if (menuToggle && mainNav) {
        menuToggle.addEventListener("click", () => {
            mainNav.classList.toggle("open");
            const menuIcon = menuToggle.querySelector("i");
            if (menuIcon) {
                if (mainNav.classList.contains("open")) {
                    menuIcon.setAttribute("data-lucide", "x");
                } else {
                    menuIcon.setAttribute("data-lucide", "menu");
                }
            }
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    }
    
    // Control de Pestañas (Canvas / Inversión - Sólo si existe en el DOM)
    if (tabsControl) {
        tabsControl.addEventListener("click", (e) => {
            if (e.target.classList.contains("tab-btn")) {
                document.querySelectorAll(".tab-btn").forEach(btn => btn.classList.remove("active"));
                document.querySelectorAll(".tab-content").forEach(content => content.classList.remove("active"));
                
                e.target.classList.add("active");
                const targetTab = e.target.dataset.tab;
                const contentBox = document.getElementById(`tab-${targetTab}`);
                if (contentBox) contentBox.classList.add("active");
            }
        });
    }
    
    // Efecto Sticky en Header
    window.addEventListener("scroll", () => {
        const header = document.querySelector(".glass-header");
        if (header) {
            if (window.scrollY > 50) {
                header.style.boxShadow = "var(--shadow-md)";
                header.style.backgroundColor = document.documentElement.getAttribute("data-theme") === "dark" 
                    ? "rgba(18, 18, 18, 0.95)" 
                    : "rgba(253, 251, 247, 0.95)";
            } else {
                header.style.boxShadow = "none";
                header.style.backgroundColor = varColorNavbar();
            }
        }
    });
    
    // Envío del Formulario de Pedido a WhatsApp (Sólo si existe en el DOM)
    if (orderForm) {
        orderForm.addEventListener("submit", (e) => {
            e.preventDefault();
            sendOrderToWhatsApp();
        });
    }
}

// Helper para color de navbar
function varColorNavbar() {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    return isDark ? "rgba(18, 18, 18, 0.8)" : "rgba(253, 251, 247, 0.8)";
}

// 7. Renderizar Productos
function renderProducts() {
    if (!productsGrid) return;
    
    // Filtrar la lista
    const filtered = products.filter(product => {
        const matchesCategory = currentCategory === "all" || product.category === currentCategory;
        const matchesSearch = product.name.toLowerCase().includes(searchQuery) || 
                              product.desc.toLowerCase().includes(searchQuery);
        return matchesCategory && matchesSearch;
    });
    
    // Generar HTML
    if (filtered.length === 0) {
        productsGrid.innerHTML = `
            <div class="text-center" style="grid-column: 1/-1; padding: 4rem 1rem;">
                <i data-lucide="package-search" style="width: 3.5rem; height: 3.5rem; color: var(--color-text-light); margin-bottom: 1rem;"></i>
                <h3>No se encontraron productos</h3>
                <p style="color: var(--color-text-secondary); font-weight: 300;">Intenta buscando con palabras clave diferentes o cambia de categoría.</p>
            </div>
        `;
        if (typeof lucide !== 'undefined') lucide.createIcons();
        return;
    }
    
    productsGrid.innerHTML = filtered.map(product => `
        <div class="product-card">
            <div class="product-image-container">
                <div class="product-img-placeholder" style="background-image: url('${product.image}');"></div>
                ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ''}
            </div>
            <div class="product-details">
                <span class="product-category">${product.category}</span>
                <h3 class="product-name">${product.name}</h3>
                <p class="product-desc">${product.desc}</p>
                <div class="product-footer">
                    <span class="product-price">L ${product.price.toLocaleString('es-HN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                    <button class="add-to-cart-btn" onclick="addToCart(${product.id})" aria-label="Añadir ${product.name} al carrito">
                        <i data-lucide="plus"></i>
                    </button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Volver a renderizar iconos
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// 8. Lógica del Carrito
function toggleCart() {
    if (cartDrawer && cartDrawerOverlay) {
        cartDrawer.classList.toggle("open");
        cartDrawerOverlay.classList.toggle("open");
    }
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    if (!product) return;
    
    const existing = cart.find(item => item.id === productId);
    
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ ...product, qty: 1 });
    }
    
    updateCartUI();
    
    // Animación visual rápida al botón de carrito
    if (cartToggle) {
        cartToggle.classList.add("pulse");
        setTimeout(() => cartToggle.classList.remove("pulse"), 500);
    }
}

function changeQty(productId, change) {
    const item = cart.find(p => p.id === productId);
    if (!item) return;
    
    item.qty += change;
    
    if (item.qty <= 0) {
        cart = cart.filter(p => p.id !== productId);
    }
    
    updateCartUI();
}

function removeFromCart(productId) {
    cart = cart.filter(p => p.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    // Persistencia local
    localStorage.setItem("gelys_cart", JSON.stringify(cart));
    
    // Cantidad total
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    cartCountBadges.forEach(badge => {
        badge.textContent = totalItems;
        badge.style.display = totalItems === 0 ? "none" : "flex";
    });
    
    // Subtotal y Total (si existen los campos en el drawer actual)
    const subtotalValue = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const subtotalText = `L ${subtotalValue.toLocaleString('es-HN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    
    if (cartSubtotal) cartSubtotal.textContent = subtotalText;
    if (cartTotal) cartTotal.textContent = subtotalText;
    
    // Contenedor de Items
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = `
                <div class="cart-empty-message">
                    <i data-lucide="shopping-bag" style="width: 3.5rem; height: 3.5rem;"></i>
                    <p>Tu pedido está vacío.</p>
                    <p style="font-size: 0.85rem; font-weight: 300;">Explora el catálogo y añade prendas a tu gusto.</p>
                </div>
            `;
            const footerElement = document.getElementById("cart-footer");
            if (footerElement) footerElement.style.display = "none";
        } else {
            const footerElement = document.getElementById("cart-footer");
            if (footerElement) footerElement.style.display = "block";
            
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-info">
                        <h4 class="cart-item-name">${item.name}</h4>
                        <span class="cart-item-price">L ${item.price.toLocaleString('es-HN', {minimumFractionDigits: 2})}</span>
                        <div class="cart-item-qty">
                            <button class="qty-btn" onclick="changeQty(${item.id}, -1)">-</button>
                            <span>${item.qty}</span>
                            <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
                        </div>
                    </div>
                    <button class="cart-item-remove" onclick="removeFromCart(${item.id})" aria-label="Eliminar ${item.name}">
                        <i data-lucide="trash-2"></i>
                    </button>
                </div>
            `).join('');
        }
    }
    
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
}

// 9. Enviar Pedido a WhatsApp
function sendOrderToWhatsApp() {
    const clientName = document.getElementById("client-name").value;
    const clientLocation = document.getElementById("client-location").value;
    const clientNotes = document.getElementById("client-notes").value;
    
    const subtotalValue = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
    const subtotalText = `L ${subtotalValue.toLocaleString('es-HN', {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;
    
    // Crear mensaje formateado en markdown de WhatsApp
    let message = `Hola Yorgely, me interesa realizar el siguiente pedido en Gelys Store:\n\n`;
    message += `*Cliente:* ${clientName}\n`;
    message += `*Lugar de Entrega:* ${clientLocation}\n`;
    if (clientNotes.trim() !== "") {
        message += `*Notas:* ${clientNotes}\n`;
    }
    message += `\n*Detalle del Pedido:*\n`;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.qty;
        message += `- ${item.qty}x ${item.name} (L ${itemTotal.toLocaleString('es-HN', {minimumFractionDigits: 2})})\n`;
    });
    
    message += `\n*Total Estimado:* ${subtotalText}\n\n`;
    message += `Quedo a la espera de la confirmación de disponibilidad y detalles de la entrega. ¡Muchas gracias!`;
    
    // Encode de URL
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE}?text=${encodedMessage}`;
    
    // Abrir enlace en pestaña nueva
    window.open(whatsappUrl, '_blank');
}
