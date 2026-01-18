// Cake data
const cakes = [
    {
        id: 1,
        name: "Chocolate Dream",
        description: "Rich chocolate cake with layers of chocolate ganache",
        price: 35.99,
        category: "birthday",
        image: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=789&q=80"
    },
    {
        id: 2,
        name: "Vanilla Bliss",
        description: "Classic vanilla cake with buttercream frosting",
        price: 32.50,
        category: "birthday",
        image: "https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=765&q=80"
    },
    {
        id: 3,
        name: "Red Velvet Royalty",
        description: "Luxurious red velvet with cream cheese frosting",
        price: 42.75,
        category: "specialty",
        image: "https://images.unsplash.com/photo-1614707267537-b85aaf00c4b7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },
    {
        id: 4,
        name: "Elegant Wedding Cake",
        description: "Three-tiered white cake with delicate floral design",
        price: 299.99,
        category: "wedding",
        image: "https://images.unsplash.com/photo-1535254973040-607b474cb50d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },

    {
        id: 5,
        name: "Strawberry Shortcake",
        description: "Light sponge cake with fresh strawberries and cream",
        price: 38.25,
        category: "specialty",
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
    },

      {
        id: 6,
        name: "Luxury Wedding Cake",
        description: "Five-tiered masterpiece with gold leaf accents",
        price: 450.00,
        category: "wedding",
        image: "https://images.unsplash.com/photo-1532117182044-031e7cd916ee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=780&q=80"
    },
     
    
    
];

// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// DOM Elements
const cakesGrid = document.querySelector('.cakes-grid');
const categoryFilter = document.querySelector('.category-filter');
const cartBtn = document.getElementById('cart-btn');
const cartModal = document.getElementById('cart-modal');
const closeCartBtn = document.getElementById('close-cart');
const closeModalBtns = document.querySelectorAll('.close-modal');
const cartCount = document.querySelector('.cart-count');
const cartItems = document.querySelector('.cart-items');
const cartTotal = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');
const themeToggle = document.getElementById('theme-toggle');
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
const orderForm = document.getElementById('order-form');
const successModal = document.getElementById('success-modal');
const closeSuccessBtn = document.getElementById('close-success');
const backToTopBtn = document.getElementById('back-to-top');
const filterButtons = document.querySelectorAll('.filter-btn');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayCakes(cakes);
    updateCartCount();
    
    // Set minimum date for order form to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
});

// Display cakes in the grid
function displayCakes(cakesToDisplay) {
    cakesGrid.innerHTML = '';
    
    if (cakesToDisplay.length === 0) {
        cakesGrid.innerHTML = '<p class="no-cakes">No cakes found in this category.</p>';
        return;
    }
    
    cakesToDisplay.forEach(cake => {
        const cakeCard = document.createElement('div');
        cakeCard.className = 'cake-card';
        cakeCard.dataset.category = cake.category;
        
        cakeCard.innerHTML = `
            <div class="cake-img" style="background-image: url('${cake.image}')"></div>
            <div class="cake-info">
                <h3>${cake.name}</h3>
                <p>${cake.description}</p>
                <div class="cake-price">
                    <span class="price">$${cake.price.toFixed(2)}</span>
                    <button class="add-to-cart" data-id="${cake.id}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        
        cakesGrid.appendChild(cakeCard);
    });
    
    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll('.add-to-cart').forEach(button => {
        button.addEventListener('click', (e) => {
            const cakeId = parseInt(e.currentTarget.dataset.id);
            addToCart(cakeId);
        });
    });
}

// Filter cakes by category
categoryFilter.addEventListener('click', (e) => {
    if (e.target.classList.contains('filter-btn')) {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');
        
        const filter = e.target.dataset.filter;
        
        if (filter === 'all') {
            displayCakes(cakes);
        } else {
            const filteredCakes = cakes.filter(cake => cake.category === filter);
            displayCakes(filteredCakes);
        }
    }
});

// Cart functionality
function addToCart(cakeId) {
    const cake = cakes.find(c => c.id === cakeId);
    const existingItem = cart.find(item => item.id === cakeId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: cake.id,
            name: cake.name,
            price: cake.price,
            quantity: 1
        });
    }
    
    updateCartCount();
    saveCartToLocalStorage();
    showNotification(`${cake.name} added to cart!`);
}

function removeFromCart(cakeId) {
    cart = cart.filter(item => item.id !== cakeId);
    updateCartCount();
    updateCartModal();
    saveCartToLocalStorage();
}

function updateCartCount() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;
}

function updateCartModal() {
    cartItems.innerHTML = '';
    
    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotal.textContent = '0.00';
        return;
    }
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const cartItem = document.createElement('div');
        cartItem.className = 'cart-item';
        cartItem.innerHTML = `
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
            </div>
            <div class="item-actions">
                <div>
                    <button class="quantity-btn decrease" data-id="${item.id}">-</button>
                    <span>${item.quantity}</span>
                    <button class="quantity-btn increase" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item" data-id="${item.id}">Remove</button>
            </div>
        `;
        
        cartItems.appendChild(cartItem);
    });
    
    cartTotal.textContent = total.toFixed(2);
    
    // Add event listeners to cart item buttons
    document.querySelectorAll('.decrease').forEach(button => {
        button.addEventListener('click', (e) => {
            const cakeId = parseInt(e.currentTarget.dataset.id);
            updateQuantity(cakeId, -1);
        });
    });
    
    document.querySelectorAll('.increase').forEach(button => {
        button.addEventListener('click', (e) => {
            const cakeId = parseInt(e.currentTarget.dataset.id);
            updateQuantity(cakeId, 1);
        });
    });
    
    document.querySelectorAll('.remove-item').forEach(button => {
        button.addEventListener('click', (e) => {
            const cakeId = parseInt(e.currentTarget.dataset.id);
            removeFromCart(cakeId);
        });
    });
}

function updateQuantity(cakeId, change) {
    const item = cart.find(item => item.id === cakeId);
    
    if (item) {
        item.quantity += change;
        
        if (item.quantity <= 0) {
            removeFromCart(cakeId);
        } else {
            updateCartCount();
            updateCartModal();
            saveCartToLocalStorage();
        }
    }
}

function saveCartToLocalStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Modal functionality
cartBtn.addEventListener('click', () => {
    updateCartModal();
    cartModal.classList.add('active');
    document.body.style.overflow = 'hidden';
});

closeCartBtn.addEventListener('click', () => {
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

closeModalBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.modal').forEach(modal => {
            modal.classList.remove('active');
        });
        document.body.style.overflow = 'auto';
    });
});

checkoutBtn.addEventListener('click', () => {
    if (cart.length === 0) {
        alert('Your cart is empty!');
        return;
    }
    
    alert('Thank you for your order! This is a demo site, so no actual purchase was made.');
    cart = [];
    updateCartCount();
    updateCartModal();
    saveCartToLocalStorage();
    cartModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Theme toggle
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-theme')) {
        icon.className = 'fas fa-sun';
        localStorage.setItem('theme', 'dark');
    } else {
        icon.className = 'fas fa-moon';
        localStorage.setItem('theme', 'light');
    }
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    themeToggle.querySelector('i').className = 'fas fa-sun';
}

// Mobile menu toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// Order form submission
orderForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const date = document.getElementById('date').value;
    const cakeType = document.getElementById('cake-type').value;
    const message = document.getElementById('message').value;
    
    // In a real application, you would send this data to a server
    console.log('Order request submitted:', { name, email, date, cakeType, message });
    
    // Show success modal
    successModal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Reset form
    orderForm.reset();
    
    // Set minimum date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
});

closeSuccessBtn.addEventListener('click', () => {
    successModal.classList.remove('active');
    document.body.style.overflow = 'auto';
});

// Back to top button
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.style.display = 'flex';
    } else {
        backToTopBtn.style.display = 'none';
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show notification
function showNotification(message) {
    // Check if notification already exists
    let notification = document.querySelector('.notification');
    
    if (notification) {
        notification.remove();
    }
    
    // Create notification
    notification = document.createElement('div');
    notification.className = 'notification';
    notification.innerHTML = `
        <p>${message}</p>
        <i class="fas fa-times close-notification"></i>
    `;
    
    document.body.appendChild(notification);
    
    // Add styles for notification
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: var(--primary-color);
        color: white;
        padding: 15px 20px;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow);
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 15px;
        z-index: 3000;
        animation: slideIn 0.3s ease;
        max-width: 350px;
    `;
    
    // Add close button functionality
    notification.querySelector('.close-notification').addEventListener('click', () => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    });
    
    // Auto-remove notification after 3 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, 3000);
    
    // Add keyframes for animations
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
    `;
    
    document.head.appendChild(style);
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
    if (e.target.classList.contains('modal')) {
        e.target.classList.remove('active');
        document.body.style.overflow = 'auto';
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });

});
