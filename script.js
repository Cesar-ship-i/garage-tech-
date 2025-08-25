document.addEventListener('DOMContentLoaded', () => {
    // Referencias a elementos del DOM
    const productsContainer = document.getElementById('productsContainer');
    const searchInput = document.getElementById('searchInput');
    const cartCount = document.getElementById('cartCount');
    const loadingSpinner = document.getElementById('loadingSpinner');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotalSpan = document.getElementById('cartTotal');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const processPaymentBtn = document.getElementById('processPaymentBtn');
    const quantityInput = document.getElementById('quantityInput');
    const confirmAddToCartBtn = document.getElementById('confirmAddToCartBtn');

    // Instancias de Modales de Bootstrap
    const quantityModal = new bootstrap.Modal(document.getElementById('quantityModal'));
    const cartModal = new bootstrap.Modal(document.getElementById('cartModal'));
    const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'));

    // Estado de la aplicación
    let vehiclesData = [];
    let cart = [];
    let selectedVehicle = null;

    const JSON_URL = 'https://raw.githubusercontent.com/JUANCITOPENA/Pagina_Vehiculos_Ventas/refs/heads/main/vehiculos.json';

    /**
     * Carga los datos de los vehículos desde la API JSON.
     */
    async function loadVehicles() {
        try {
            loadingSpinner.style.display = 'flex';
            const response = await fetch(JSON_URL);
            if (!response.ok) {
                throw new Error(`Error en la solicitud: ${response.status}`);
            }
            vehiclesData = await response.json();
            displayVehicles(vehiclesData);
        } catch (error) {
            console.error('Error al cargar los vehículos:', error);
            productsContainer.innerHTML = `<p class="text-center text-danger">No se pudieron cargar los datos de los vehículos. Por favor, inténtelo de nuevo más tarde.</p>`;
        } finally {
            loadingSpinner.style.display = 'none';
        }
    }

    /**
     * Muestra los vehículos en el contenedor de productos.
     * @param {Array} vehicles - Array de vehículos a mostrar.
     */
    function displayVehicles(vehicles) {
        productsContainer.innerHTML = '';
        if (vehicles.length === 0) {
            productsContainer.innerHTML = '<p class="text-center">No se encontraron vehículos que coincidan con su búsqueda.</p>';
            return;
        }

        vehicles.forEach(vehicle => {
            const card = document.createElement('div');
            card.className = 'col-lg-4 col-md-6 mb-4';
            card.innerHTML = `
                <div class="card h-100">
                    <img src="${vehicle.imagen}" class="card-img-top" alt="${vehicle.marca} ${vehicle.modelo}" loading="lazy">
                    <div class="card-body">
                        <div>
                            <h5 class="card-title">${vehicle.marca} ${vehicle.modelo}</h5>
                            <p class="card-text text-muted">${vehicle.categoria}</p>
                             <p class="card-text"><strong>Tipo:</strong> ${vehicle.tipo.replace(/[\u{1F600}-\u{1F64F}]/gu, '').trim()}</p>
                        </div>
                        <div>
                            <p class="card-text fs-5 fw-bold mt-2">$${vehicle.precio_venta.toLocaleString('es-CO')}</p>
                            <button class="btn btn-primary w-100 addToCartBtn" data-codigo="${vehicle.codigo}">Añadir al Carrito</button>
                        </div>
                    </div>
                </div>
            `;
            productsContainer.appendChild(card);
        });

        addAddToCartListeners();
    }
    
    /**
     * Añade los event listeners a los botones "Añadir al Carrito".
     */
    function addAddToCartListeners() {
        const buttons = document.querySelectorAll('.addToCartBtn');
        buttons.forEach(button => {
            button.addEventListener('click', (event) => {
                const codigo = parseInt(event.target.dataset.codigo);
                selectedVehicle = vehiclesData.find(v => v.codigo === codigo);
                if (selectedVehicle) {
                    showQuantityModal(selectedVehicle);
                }
            });
        });
    }

    /**
     * Muestra el modal para seleccionar la cantidad.
     * @param {Object} vehicle - El vehículo a añadir.
     */
    function showQuantityModal(vehicle) {
        quantityInput.value = 1; // Resetea la cantidad
        quantityModal.show();
    }

    // Event listener para el botón de confirmación en el modal de cantidad
    confirmAddToCartBtn.addEventListener('click', () => {
        const quantity = parseInt(quantityInput.value);
        if (quantity > 0) {
            addItemToCart(selectedVehicle, quantity);
            quantityModal.hide();
        } else {
            alert('La cantidad debe ser al menos 1.');
        }
    });

    /**
     * Añade un ítem al carrito o actualiza su cantidad.
     * @param {Object} vehicle - El vehículo a añadir.
     * @param {number} quantity - La cantidad a añadir.
     */
    function addItemToCart(vehicle, quantity) {
        const existingItem = cart.find(item => item.codigo === vehicle.codigo);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            cart.push({ ...vehicle, quantity });
        }
        updateCartUI();
    }

    /**
     * Actualiza la interfaz del carrito (contador, modal, total).
     */
    function updateCartUI() {
        cartItemsContainer.innerHTML = '';
        let total = 0;
        let totalItems = 0;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío.</p>';
        } else {
            cart.forEach(item => {
                const subtotal = item.precio_venta * item.quantity;
                total += subtotal;
                totalItems += item.quantity;
                
                cartItemsContainer.innerHTML += `
                    <div class="cart-item">
                        <img src="${item.imagen}" alt="${item.marca}">
                        <div class="cart-item-details">
                            <h6>${item.marca} ${item.modelo}</h6>
                            <p>Cantidad: ${item.quantity}</p>
                            <p>Subtotal: <strong>$${subtotal.toLocaleString('es-CO')}</strong></p>
                        </div>
                    </div>
                `;
            });
        }
        
        cartTotalSpan.textContent = `$${total.toLocaleString('es-CO')}`;
        cartCount.textContent = totalItems;
        
        // Activa o desactiva la animación del contador
        if (totalItems > 0) {
            cartCount.classList.add('pulse');
        } else {
            cartCount.classList.remove('pulse');
        }
    }
    
    /**
     * Filtra los vehículos basados en el texto de búsqueda.
     */
    function filterVehicles() {
        const searchTerm = searchInput.value.toLowerCase().trim();
        const filteredVehicles = vehiclesData.filter(vehicle =>
            vehicle.marca.toLowerCase().includes(searchTerm) ||
            vehicle.modelo.toLowerCase().includes(searchTerm) ||
            vehicle.categoria.toLowerCase().includes(searchTerm)
        );
        displayVehicles(filteredVehicles);
    }

    /**
     * Genera una factura en PDF con los detalles de la compra.
     */
    function generateInvoice() {
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        const customerName = document.getElementById('customerName').value || "Cliente";

        let y = 20; // Posición vertical inicial

        doc.setFontSize(22);
        doc.text("Factura de Compra - GarageOnline", 10, y);
        y += 10;
        
        doc.setFontSize(12);
        doc.text(`Fecha: ${new Date().toLocaleDateString()}`, 10, y);
        doc.text(`Cliente: ${customerName}`, 10, y + 5);
        y += 20;

        doc.setFontSize(14);
        doc.text("Detalles de la Compra:", 10, y);
        y += 10;

        let total = 0;
        cart.forEach(item => {
            const subtotal = item.quantity * item.precio_venta;
            total += subtotal;
            doc.setFontSize(10);
            doc.text(`- ${item.marca} ${item.modelo} (x${item.quantity})`, 15, y);
            doc.text(`$${subtotal.toLocaleString('es-CO')}`, 150, y);
            y += 7;
        });

        y += 5;
        doc.setFontSize(16);
        doc.text(`Total a Pagar: $${total.toLocaleString('es-CO')}`, 10, y);

        doc.save(`factura-garageonline-${Date.now()}.pdf`);
    }

    // Event Listeners
    searchInput.addEventListener('input', filterVehicles);
    
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            cartModal.hide();
            paymentModal.show();
        } else {
            alert('Tu carrito está vacío.');
        }
    });

    processPaymentBtn.addEventListener('click', () => {
        // Validación simple
        if (document.getElementById('paymentForm').checkValidity()) {
            alert('¡Pago procesado con éxito! Generando su factura.');
            generateInvoice();

            // Limpiar carrito y UI
            cart = [];
            updateCartUI();
            
            // Ocultar modales
            paymentModal.hide();
        } else {
            alert('Por favor, complete todos los campos del formulario de pago.');
        }
    });

    // Carga inicial de datos
    loadVehicles();
});