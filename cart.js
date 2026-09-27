/* =====================================================
                SHOPSPHERE CART
===================================================== */


/* =====================================================
                STORAGE KEY
===================================================== */

const CART_KEY = "shopsphereCart";


/* =====================================================
                CART DATA
===================================================== */

let cart = JSON.parse(
    localStorage.getItem(CART_KEY)
) || [];


/* =====================================================
                DOM ELEMENTS
===================================================== */

const cartItems =
    document.getElementById("cartItems");

const cartEmpty =
    document.getElementById("cartEmpty");

const cartSubtotal =
    document.getElementById("cartSubtotal");

const cartTotal =
    document.getElementById("cartTotal");

const checkoutButton =
    document.getElementById("checkoutBtn");


/* =====================================================
                SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        CART_KEY,
        JSON.stringify(cart)
    );

}


/* =====================================================
                FORMAT PRICE
===================================================== */

function formatPrice(price) {

    return Number(price || 0).toLocaleString("en-IN");

}


/* =====================================================
                CART QUANTITY
===================================================== */

function getCartQuantity() {

    return cart.reduce(
        (total, item) => {

            return total +
                Number(item.quantity || 1);

        },
        0
    );

}


/* =====================================================
                CART TOTAL
===================================================== */

function getCartTotal() {

    return cart.reduce(
        (total, item) => {

            return total +
                (
                    Number(item.price || 0) *
                    Number(item.quantity || 1)
                );

        },
        0
    );

}


/* =====================================================
                UPDATE CART COUNT
===================================================== */

function updateCartCount() {

    const count =
        document.getElementById("cartCount");

    if (!count) {
        return;
    }

    count.textContent =
        getCartQuantity();

}


/* =====================================================
                DISPLAY CART
===================================================== */

function displayCart() {

    if (!cartItems) {

        console.error(
            "ERROR: #cartItems not found."
        );

        return;

    }


    cartItems.innerHTML = "";


    /* =========================================
                    EMPTY CART
    ========================================= */

    if (cart.length === 0) {

        if (cartEmpty) {

            cartEmpty.classList.remove(
                "d-none"
            );

        }

        updateSummary();
        updateCartCount();

        return;

    }


    /* =========================================
                HIDE EMPTY MESSAGE
    ========================================= */

    if (cartEmpty) {

        cartEmpty.classList.add(
            "d-none"
        );

    }


    /* =========================================
                DISPLAY PRODUCTS
    ========================================= */

    cart.forEach(
        (item, index) => {

            const quantity =
                Number(item.quantity || 1);


            const price =
                Number(item.price || 0);


            const itemTotal =
                price * quantity;


            const cartItem =
                document.createElement("div");


            cartItem.className =
                "cart-item";


            cartItem.innerHTML = `

                <!-- PRODUCT IMAGE -->

                <div class="cart-item-image">

                    <img
                        src="${item.image || 'https://via.placeholder.com/150x180?text=ShopSphere'}"
                        alt="${item.name || 'Product'}"
                        onerror="
                            this.src='https://via.placeholder.com/150x180?text=ShopSphere'
                        "
                    >

                </div>


                <!-- PRODUCT INFO -->

                <div class="cart-item-info">

                    <small>
                        ${item.category || "Fashion"}
                    </small>


                    <h4>
                        ${item.name || "Product"}
                    </h4>


                    ${
                        item.size
                        ? `
                            <p>

                                Size:

                                <strong>
                                    ${item.size}
                                </strong>

                            </p>
                        `
                        : ""
                    }


                    <p class="cart-item-price">

                        ₹${formatPrice(price)}

                        <span style="color:#888; font-weight:500; font-size:14px;">
                            (₹${formatPrice(itemTotal)} total)
                        </span>

                    </p>


                    <!-- QUANTITY -->

                    <div class="quantity-control">

                        <button
                            type="button"
                            class="decrease-btn"
                            data-index="${index}"
                        >
                            −
                        </button>


                        <span>
                            ${quantity}
                        </span>


                        <button
                            type="button"
                            class="increase-btn"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>

                </div>


                <!-- REMOVE -->

                <button
                    type="button"
                    class="remove-item"
                    data-index="${index}"
                    aria-label="Remove product"
                >

                    <i class="bi bi-trash3"></i>

                </button>

            `;


            cartItems.appendChild(
                cartItem
            );

        }
    );


    updateSummary();
    updateCartCount();

}


/* =====================================================
                UPDATE SUMMARY
===================================================== */

function updateSummary() {

    const subtotal =
        getCartTotal();


    if (cartSubtotal) {

        cartSubtotal.textContent =
            `₹${formatPrice(subtotal)}`;

    }


    /*
        Delivery charge
    */

    const deliveryElement =
        document.getElementById("delivery");


    const delivery =
        cart.length > 0 ? 99 : 0;


    if (deliveryElement) {

        deliveryElement.textContent =
            `₹${formatPrice(delivery)}`;

    }


    /*
        Discount
    */

    const discountElement =
        document.querySelector(".discount");


    if (discountElement) {

        discountElement.textContent =
            "₹0";

    }


    /*
        FINAL TOTAL
    */

    const finalTotal =
        subtotal + delivery;


    if (cartTotal) {

        cartTotal.textContent =
            `₹${formatPrice(finalTotal)}`;

    }

}


/* =====================================================
                CHANGE QUANTITY
===================================================== */

function changeQuantity(
    index,
    change
) {

    if (!cart[index]) {
        return;
    }


    cart[index].quantity =
        Number(
            cart[index].quantity || 1
        ) + change;


    /*
        Remove when quantity becomes 0
    */

    if (
        cart[index].quantity <= 0
    ) {

        const productName =
            cart[index].name;

        cart.splice(
            index,
            1
        );

        showCartMessage(
            `${productName} removed from cart`
        );

    }


    /*
        Maximum quantity = 10
    */

    if (
        cart[index] &&
        cart[index].quantity > 10
    ) {

        cart[index].quantity = 10;

    }


    saveCart();

    displayCart();

}


/* =====================================================
                REMOVE ITEM
===================================================== */

function removeFromCart(index) {

    if (!cart[index]) {
        return;
    }


    const productName =
        cart[index].name;


    cart.splice(
        index,
        1
    );


    saveCart();

    displayCart();


    showCartMessage(
        `${productName} removed from cart`
    );

}


/* =====================================================
                CLEAR CART
===================================================== */

function clearCart() {

    if (cart.length === 0) {
        return;
    }


    const confirmClear =
        confirm(
            "Are you sure you want to remove all products from your cart?"
        );


    if (!confirmClear) {
        return;
    }


    cart = [];


    saveCart();

    displayCart();


    showCartMessage(
        "Cart cleared"
    );

}


/* =====================================================
                CART BUTTON EVENTS
===================================================== */

if (cartItems) {

    cartItems.addEventListener(
        "click",
        function (event) {


            /* =====================================
                    DECREASE
            ===================================== */

            const decreaseButton =
                event.target.closest(
                    ".decrease-btn"
                );


            if (decreaseButton) {

                const index =
                    Number(
                        decreaseButton.dataset.index
                    );


                changeQuantity(
                    index,
                    -1
                );


                return;

            }


            /* =====================================
                    INCREASE
            ===================================== */

            const increaseButton =
                event.target.closest(
                    ".increase-btn"
                );


            if (increaseButton) {

                const index =
                    Number(
                        increaseButton.dataset.index
                    );


                changeQuantity(
                    index,
                    1
                );


                return;

            }


            /* =====================================
                    REMOVE
            ===================================== */

            const removeButton =
                event.target.closest(
                    ".remove-item"
                );


            if (removeButton) {

                const index =
                    Number(
                        removeButton.dataset.index
                    );


                removeFromCart(
                    index
                );

            }

        }
    );

}


/* =====================================================
                CLEAR CART BUTTON
===================================================== */

const clearCartButton =
    document.getElementById(
        "clearCartBtn"
    );


if (clearCartButton) {

    clearCartButton.addEventListener(
        "click",
        clearCart
    );

}


/* =====================================================
                CHECKOUT
===================================================== */

if (checkoutButton) {

    checkoutButton.addEventListener(
        "click",
        function () {

            if (cart.length === 0) {

                showCartMessage(
                    "Your cart is empty."
                );

                return;

            }


            /* MUST BE LOGGED IN TO PURCHASE */

            if (
                typeof isUserLoggedIn === "function" &&
                !isUserLoggedIn()
            ) {

                localStorage.setItem(
                    "shopsphereRedirectAfterLogin",
                    "checkout.html"
                );


                showCartMessage(
                    "Please login to continue with your purchase."
                );


                setTimeout(
                    () => {

                        window.location.href =
                            "login.html";

                    },
                    1200
                );


                return;

            }


            window.location.href =
                "checkout.html";

        }
    );

}


/* =====================================================
                MESSAGE (TOAST)
===================================================== */

let toastTimer;


function showCartMessage(message) {

    const toast =
        document.getElementById("shopToast");

    const toastMessage =
        document.getElementById("toastMessage");


    if (!toast || !toastMessage) {

        console.log(message);

        return;

    }


    toastMessage.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(
            () => {

                toast.classList.remove(
                    "show"
                );

            },
            2500
        );

}


/* =====================================================
                INITIALIZE
===================================================== */

displayCart();

updateCartCount();