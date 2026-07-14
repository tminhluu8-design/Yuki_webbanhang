// Mảng lưu trữ các sản phẩm trong giỏ hàng
let cart = [];

// Hàm bật/tắt hiển thị cửa sổ giỏ hàng
function toggleCart() {
    const modal = document.getElementById('cart-modal');
    if (modal.style.display === 'block') {
        modal.style.display = 'none';
    } else {
        modal.style.display = 'block';
    }
}

// Hàm thêm sản phẩm vào giỏ hàng
function addToCart(id, name, price) {
    // Kiểm tra xem sản phẩm đã có trong giỏ chưa
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        // Nếu có rồi, tăng số lượng lên 1
        existingItem.quantity += 1;
    } else {
        // Nếu chưa có, thêm sản phẩm mới vào mảng
        cart.push({
            id: id,
            name: name,
            price: price,
            quantity: 1
        });
    }
    
    // Cập nhật lại giao diện người dùng
    updateCartUI();
}

// Hàm thay đổi số lượng sản phẩm trong giỏ (+/-)
function changeQuantity(id, delta) {
    const item = cart.find(item => item.id === id);
    if (item) {
        item.quantity += delta;
        // Nếu số lượng giảm xuống bằng 0, tiến hành xóa sản phẩm khỏi giỏ
        if (item.quantity <= 0) {
            removeFromCart(id);
            return;
        }
    }
    updateCartUI();
}

// Hàm xóa hoàn toàn một sản phẩm ra khỏi giỏ
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCartUI();
}

// Hàm cập nhật toàn bộ giao diện giỏ hàng
function updateCartUI() {
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');

    // 1. Cập nhật số lượng hiển thị trên icon giỏ hàng ở Header
    let totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.innerText = totalItems;

    // Kiểm tra nếu giỏ hàng trống
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p style="text-align: center; color: #888; padding: 20px 0;">Giỏ hàng trống</p>`;
        cartTotal.innerText = "0 ₫";
        return;
    }

    // 2. Render danh sách sản phẩm trong giỏ
    let htmlContent = '';
    let totalPrice = 0;

    cart.forEach(item => {
        let itemSubtotal = item.price * item.quantity;
        totalPrice += itemSubtotal;

        htmlContent += `
            <div class="cart-item">
                <div class="item-info">
                    <h4>${item.name}</h4>
                    <p style="color: #666; font-size: 0.85rem;">${item.price.toLocaleString('vi-VN')} ₫</p>
                </div>
                <div class="item-qty-controls">
                    <button onclick="changeQuantity(${item.id}, -1)">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="changeQuantity(${item.id}, 1)">+</button>
                </div>
                <div>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Xóa</button>
                </div>
            </div>
        `;
    });

    cartItemsContainer.innerHTML = htmlContent;
    
    // 3. Cập nhật tổng số tiền
    cartTotal.innerText = totalPrice.toLocaleString('vi-VN') + " ₫";
}

// Hàm xử lý khi nhấn Thanh toán
function checkout() {
    if(cart.length === 0) {
        alert("Giỏ hàng của bạn đang trống!");
        return;
    }
    alert("Cảm ơn bạn đã mua hàng! Đơn hàng đang được xử lý.");
    cart = []; // Xóa sạch giỏ hàng sau khi đặt thành công
    updateCartUI();
    toggleCart(); // Đóng modal giỏ hàng
}
