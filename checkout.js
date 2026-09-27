/* =====================================================
                SHOPSPHERE CHECKOUT
===================================================== */


/* =====================================================
                GET CART
===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem("shopsphereCart")
    ) || [];


/* =====================================================
                DOM ELEMENTS
===================================================== */

const checkoutForm =
    document.getElementById("checkoutForm");

const checkoutItems =
    document.getElementById("checkoutItems");

const subtotalElement =
    document.getElementById("checkoutSubtotal");

const deliveryElement =
    document.getElementById("checkoutDelivery");

const totalElement =
    document.getElementById("checkoutTotal");

const cartCountElement =
    document.getElementById("cartCount");


/* =====================================================
                FORMAT PRICE
===================================================== */

function formatPrice(price) {

    return Number(price || 0)
        .toLocaleString("en-IN");

}


/* =====================================================
                SAVE CART
===================================================== */

function saveCart() {

    localStorage.setItem(
        "shopsphereCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
                GET CART QUANTITY
===================================================== */

function getCartQuantity() {

    return cart.reduce(
        (total, item) => {

            return total +
                Number(
                    item.quantity || 1
                );

        },
        0
    );

}


/* =====================================================
                GET SUBTOTAL
===================================================== */

function getSubtotal() {

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
                GET DELIVERY
===================================================== */

function getDeliveryCharge() {

    const subtotal =
        getSubtotal();

    const deliveryMethod =
        document.querySelector(
            'input[name="delivery"]:checked'
        );


    if (
        deliveryMethod &&
        deliveryMethod.value === "express"
    ) {

        return 199;

    }


    /* FREE STANDARD DELIVERY ABOVE ₹2000 */

    if (subtotal >= 2000) {

        return 0;

    }


    return 99;

}


/* =====================================================
                CHECK LOGIN
===================================================== */

if (
    typeof isUserLoggedIn !== "function" ||
    !isUserLoggedIn()
) {

    localStorage.setItem(
        "shopsphereRedirectAfterLogin",
        "checkout.html"
    );


    alert(
        "Please login to continue with your purchase."
    );


    window.location.href =
        "login.html";

}


/* =====================================================
                CHECK EMPTY CART
===================================================== */

function checkEmptyCart() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add a product first."
        );

        window.location.href =
            "products.html";

        return true;

    }

    return false;

}


checkEmptyCart();


/* =====================================================
                DISPLAY ORDER ITEMS
===================================================== */

function displayCheckoutItems() {

    if (!checkoutItems) {

        return;

    }


    checkoutItems.innerHTML = "";


    cart.forEach(
        (item, index) => {

            const quantity =
                Number(
                    item.quantity || 1
                );


            const price =
                Number(
                    item.price || 0
                );


            const itemTotal =
                price * quantity;


            const itemElement =
                document.createElement("div");


            itemElement.className =
                "checkout-product";


            itemElement.innerHTML = `

                <!-- IMAGE -->

                <div class="checkout-product-image">

                    <img
                        src="${item.image || ""}"
                        alt="${item.name || "Product"}"
                        onerror="
                            this.src='https://via.placeholder.com/100x120?text=ShopSphere'
                        "
                    >

                </div>


                <!-- PRODUCT INFO -->

                <div class="checkout-product-info">

                    <h5>
                        ${item.name || "Product"}
                    </h5>


                    ${
                        item.size &&
                        item.size !== "Standard"
                            ? `
                                <small>
                                    Size: ${item.size}
                                </small>
                              `
                            : ""
                    }


                    <!-- QUANTITY CONTROLS -->

                    <div class="checkout-qty-control">

                        <button
                            type="button"
                            class="checkout-decrease-btn"
                            data-index="${index}"
                        >
                            −
                        </button>


                        <span>
                            ${quantity}
                        </span>


                        <button
                            type="button"
                            class="checkout-increase-btn"
                            data-index="${index}"
                        >
                            +
                        </button>

                    </div>

                </div>


                <!-- PRICE + REMOVE -->

                <div class="checkout-product-side">

                    <div class="checkout-product-price">

                        ₹${formatPrice(itemTotal)}

                    </div>


                    <button
                        type="button"
                        class="checkout-remove-item"
                        data-index="${index}"
                        aria-label="Remove product"
                    >

                        <i class="bi bi-trash3"></i>

                    </button>

                </div>

            `;


            checkoutItems.appendChild(
                itemElement
            );

        }
    );


    updateSummary();

    updateCartCount();

}


/* =====================================================
                CHANGE QUANTITY
===================================================== */

function changeCheckoutQuantity(
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


    /* REMOVE WHEN QUANTITY BECOMES 0 */

    if (
        cart[index].quantity <= 0
    ) {

        cart.splice(
            index,
            1
        );

    }


    /* MAXIMUM QUANTITY = 10 */

    if (
        cart[index] &&
        cart[index].quantity > 10
    ) {

        cart[index].quantity = 10;

    }


    saveCart();


    /* IF CART IS NOW EMPTY, REDIRECT */

    if (checkEmptyCart()) {
        return;
    }


    displayCheckoutItems();

}


/* =====================================================
                REMOVE ITEM
===================================================== */

function removeCheckoutItem(index) {

    if (!cart[index]) {
        return;
    }


    cart.splice(
        index,
        1
    );


    saveCart();


    /* IF CART IS NOW EMPTY, REDIRECT */

    if (checkEmptyCart()) {
        return;
    }


    displayCheckoutItems();

}


/* =====================================================
                CHECKOUT ITEMS EVENTS
===================================================== */

if (checkoutItems) {

    checkoutItems.addEventListener(
        "click",
        function (event) {


            /* =====================================
                    DECREASE
            ===================================== */

            const decreaseButton =
                event.target.closest(
                    ".checkout-decrease-btn"
                );


            if (decreaseButton) {

                const index =
                    Number(
                        decreaseButton.dataset.index
                    );


                changeCheckoutQuantity(
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
                    ".checkout-increase-btn"
                );


            if (increaseButton) {

                const index =
                    Number(
                        increaseButton.dataset.index
                    );


                changeCheckoutQuantity(
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
                    ".checkout-remove-item"
                );


            if (removeButton) {

                const index =
                    Number(
                        removeButton.dataset.index
                    );


                removeCheckoutItem(
                    index
                );

            }

        }
    );

}


/* =====================================================
                UPDATE SUMMARY
===================================================== */

function updateSummary() {

    const subtotal =
        getSubtotal();


    const delivery =
        getDeliveryCharge();


    const total =
        subtotal + delivery;


    if (subtotalElement) {

        subtotalElement.textContent =
            `₹${formatPrice(subtotal)}`;

    }


    if (deliveryElement) {

        deliveryElement.textContent =
            delivery === 0
                ? "FREE"
                : `₹${formatPrice(delivery)}`;

    }


    if (totalElement) {

        totalElement.textContent =
            `₹${formatPrice(total)}`;

    }

}


/* =====================================================
                DELIVERY CHANGE
===================================================== */

const deliveryInputs =
    document.querySelectorAll(
        'input[name="delivery"]'
    );


deliveryInputs.forEach(
    input => {

        input.addEventListener(
            "change",
            updateSummary
        );

    }
);


/* =====================================================
                FORM VALIDATION
===================================================== */

if (checkoutForm) {

    checkoutForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            /* =================================================
                        GET CUSTOMER DATA
            ================================================= */

            const name =
                document
                    .getElementById("fullName")
                    ?.value
                    .trim();


            const phone =
                document
                    .getElementById("phone")
                    ?.value
                    .trim();


            const email =
                document
                    .getElementById("email")
                    ?.value
                    .trim();


            const address =
                document
                    .getElementById("address")
                    ?.value
                    .trim();


            const city =
                document
                    .getElementById("city")
                    ?.value
                    .trim();


            const state =
                document
                    .getElementById("state")
                    ?.value
                    .trim();


            const pincode =
                document
                    .getElementById("pincode")
                    ?.value
                    .trim();


            /* =================================================
                        NAME VALIDATION
            ================================================= */

            if (
                !name ||
                name.length < 3
            ) {

                alert(
                    "Please enter your full name."
                );

                return;

            }


            /* =================================================
                        PHONE VALIDATION
            ================================================= */

            if (
                !/^[0-9]{10}$/.test(phone)
            ) {

                alert(
                    "Please enter a valid 10-digit phone number."
                );

                return;

            }


            /* =================================================
                        EMAIL VALIDATION
            ================================================= */

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email)
            ) {

                alert(
                    "Please enter a valid email address."
                );

                return;

            }


            /* =================================================
                        ADDRESS VALIDATION
            ================================================= */

            if (
                !address ||
                address.length < 10
            ) {

                alert(
                    "Please enter your complete address."
                );

                return;

            }


            /* =================================================
                        CITY VALIDATION
            ================================================= */

            if (
                !city ||
                city.length < 2
            ) {

                alert(
                    "Please enter your city."
                );

                return;

            }


            /* =================================================
                        STATE VALIDATION
            ================================================= */

            if (
                !state ||
                state.length < 2
            ) {

                alert(
                    "Please enter your state."
                );

                return;

            }


            /* =================================================
                        PINCODE VALIDATION
            ================================================= */

            if (
                !/^[0-9]{6}$/.test(pincode)
            ) {

                alert(
                    "Please enter a valid 6-digit PIN code."
                );

                return;

            }


            /* =================================================
                        DELIVERY METHOD
            ================================================= */

            const selectedDelivery =
                document.querySelector(
                    'input[name="delivery"]:checked'
                );


            const selectedPayment =
                document.querySelector(
                    'input[name="payment"]:checked'
                );


            if (!selectedDelivery) {

                alert(
                    "Please select a delivery method."
                );

                return;

            }


            if (!selectedPayment) {

                alert(
                    "Please select a payment method."
                );

                return;

            }


            const deliveryMethod =
                selectedDelivery.value;


            const paymentMethod =
                selectedPayment.value;


            /* =================================================
                        CALCULATE TOTAL
            ================================================= */

            const subtotal =
                getSubtotal();


            let delivery = 99;


            if (
                deliveryMethod === "express"
            ) {

                delivery = 199;

            }

            else if (
                deliveryMethod === "standard" &&
                subtotal >= 2000
            ) {

                delivery = 0;

            }


            const total =
                subtotal + delivery;


            /* =================================================
                        CREATE ORDER NUMBER
            ================================================= */

            const orderNumber =
                "SS" +
                Date.now()
                    .toString()
                    .slice(-8);


            /* =================================================
                        CREATE ORDER
            ================================================= */

            const order = {

                orderNumber: orderNumber,

                customer: {

                    name: name,

                    phone: phone,

                    email: email

                },

                address: {

                    address: address,

                    city: city,

                    state: state,

                    pincode: pincode

                },

                deliveryMethod:
                    deliveryMethod,

                paymentMethod:
                    paymentMethod,

                items: cart,

                subtotal:
                    subtotal,

                delivery:
                    delivery,

                total:
                    total,

                date:
                    new Date()
                        .toLocaleString(
                            "en-IN"
                        )

            };


            /* =================================================
                    SAVE ORDER
            ================================================= */

            localStorage.setItem(
                "shopsphereOrder",
                JSON.stringify(order)
            );


            /* =================================================
                    CLEAR CART
            ================================================= */

            localStorage.removeItem(
                "shopsphereCart"
            );


            /* =================================================
                    GO TO SUCCESS PAGE
            ================================================= */

            window.location.href =
                "order-success.html";

        }
    );

}


/* =====================================================
                CART COUNT
===================================================== */

function updateCartCount() {

    if (!cartCountElement) {

        return;

    }


    const count =
        getCartQuantity();


    cartCountElement.textContent =
        count;

}


/* =====================================================
                INITIALIZE
===================================================== */

displayCheckoutItems();

updateSummary();

updateCartCount();