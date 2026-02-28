// document.addEventListener('DOMContentLoaded', () => {
//     let cart = [];
//     let total = 0;

//     const cartSidebar = document.getElementById('cartSidebar');
//     const cartBtn = document.getElementById('cart-btn');
//     const closeBtn = document.getElementById('close-cart');
//     const cartItemsContainer = document.getElementById('cartItems');
//     const cartCount = document.getElementById('cart-count');
//     const cartTotal = document.getElementById('cart-total');
//     const totalTimeDisplay = document.getElementById('total-time');
//     const checkoutBtn = document.getElementById('checkout-btn');

//     // Open/Close Cart
//     cartBtn.onclick = () => cartSidebar.classList.add('active');
//     closeBtn.onclick = () => cartSidebar.classList.remove('active');

//     // Add to Cart
//     window.addToCart = (name, price, time) => {
//         cart.push({ name, price, time });
//         total += price;
//         updateUI();
//     };

//     function updateUI() {
//         cartCount.innerText = cart.length;
//         cartTotal.innerText = `₹${total}`;

//         if (cart.length === 0) {
//             cartItemsContainer.innerHTML = '<p style="text-align:center; margin-top:50px; color:#64748b;">Your cart is empty</p>';
//             totalTimeDisplay.innerText = "0";
//         } else {
//             // Render Items
//             cartItemsContainer.innerHTML = cart.map((item, index) => `
//                 <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:#f8fafc; margin-bottom:10px; border-radius:12px;">
//                     <div>
//                         <div style="font-weight:600; font-size:0.9rem;">${item.name}</div>
//                         <div style="font-size:0.75rem; color:#64748b;"><i class="far fa-clock"></i> ${item.time}m prep</div>
//                     </div>
//                     <b style="color:var(--primary);">₹${item.price}</b>
//                 </div>
//             `).join('');

//             // Smart Prep Time Calculation
//             // We take the max prep time item + 1.5 mins for every other item in the order
//             const maxTime = Math.max(...cart.map(i => i.time));
//             const buffer = (cart.length - 1) * 1.5;
//             totalTimeDisplay.innerText = Math.round(maxTime + buffer);
//         }
//     }

//     // Checkout / Token Generation
//     checkoutBtn.onclick = () => {
//         if (cart.length > 0) {
//             const token = "NSUT-" + Math.floor(1000 + Math.random() * 9000);
//             const waitTime = totalTimeDisplay.innerText;
            
//             alert(`✅ Order Placed!\n\nToken: ${token}\nEst. Wait Time: ${waitTime} mins\n\nShow this token at the counter.`);
            
//             cart = []; total = 0;
//             updateUI();
//             cartSidebar.classList.remove('active');
//         } else {
//             alert("Empty cart! Order something first.");
//         }
//     };

//     // Category Filter
//     document.querySelectorAll('.cat-btn').forEach(btn => {
//         btn.onclick = () => {
//             document.querySelector('.cat-btn.active').classList.remove('active');
//             btn.classList.add('active');
//             const cat = btn.innerText;
//             document.querySelectorAll('.menu-card').forEach(card => {
//                 card.style.display = (cat === "All" || card.dataset.category === cat) ? "block" : "none";
//             });
//         };
//     });
// });

document.addEventListener('DOMContentLoaded', () => {
    let cart = [];
    let total = 0;

    const cartSidebar = document.getElementById('cartSidebar');
    const cartBtn = document.getElementById('cart-btn');
    const closeBtn = document.getElementById('close-cart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    const totalTimeDisplay = document.getElementById('total-time');
    const checkoutBtn = document.getElementById('checkout-btn');

    cartBtn.onclick = () => cartSidebar.classList.add('active');
    closeBtn.onclick = () => cartSidebar.classList.remove('active');

    window.addToCart = (name, price, time) => {
        cart.push({ name, price, time });
        total += price;
        updateUI();
    };

    // --- DELETE FUNCTION START ---
    window.removeItem = (index) => {
        total -= cart[index].price; // Price minus karo
        cart.splice(index, 1);      // Array se item nikalo
        updateUI();                 // UI refresh karo
    };
    // --- DELETE FUNCTION END ---

    function updateUI() {
        cartCount.innerText = cart.length;
        cartTotal.innerText = `₹${total}`;

        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p style="text-align:center; margin-top:50px; color:#64748b;">Your cart is empty</p>';
            totalTimeDisplay.innerText = "0";
        } else {
            cartItemsContainer.innerHTML = cart.map((item, index) => `
                <div style="display:flex; justify-content:space-between; align-items:center; padding:12px; background:#f8fafc; margin-bottom:10px; border-radius:12px; border: 1px solid #edf2f7;">
                    <div>
                        <div style="font-weight:600; font-size:0.9rem;">${item.name}</div>
                        <div style="font-size:0.75rem; color:#64748b;">₹${item.price} • ${item.time}m</div>
                    </div>
                    <button onclick="removeItem(${index})" style="background:none; border:none; color:#ef4444; cursor:pointer; padding:5px;">
                        <i class="fas fa-trash-alt"></i>
                    </button>
                </div>
            `).join('');

            const maxTime = Math.max(...cart.map(i => i.time));
            const buffer = (cart.length - 1) * 1.5;
            totalTimeDisplay.innerText = Math.round(maxTime + buffer);
        }
    }

    checkoutBtn.onclick = () => {
        if (cart.length > 0) {
            const token = "CH-" + Math.floor(1000 + Math.random() * 9000);
            alert(`✅ Order Placed!\nToken: ${token}\nWait: ${totalTimeDisplay.innerText} mins`);
            cart = []; total = 0;
            updateUI();
            cartSidebar.classList.remove('active');
        }
    };

    document.querySelectorAll('.cat-btn').forEach(btn => {
        btn.onclick = () => {
            const activeBtn = document.querySelector('.cat-btn.active');
            if(activeBtn) activeBtn.classList.remove('active');
            btn.classList.add('active');
            const cat = btn.innerText;
            document.querySelectorAll('.menu-card').forEach(card => {
                card.style.display = (cat === "All" || card.dataset.category === cat) ? "block" : "none";
            });
        };
    });
});