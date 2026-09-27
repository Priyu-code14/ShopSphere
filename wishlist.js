/* =====================================================
                SHOPSPHERE WISHLIST
===================================================== */


/* =====================================================
                GET WISHLIST
===================================================== */

function getWishlist() {

    return JSON.parse(
        localStorage.getItem(
            "shopsphereWishlist"
        )
    ) || [];

}



/* =====================================================
                SAVE WISHLIST
===================================================== */

function saveWishlist(wishlist) {

    localStorage.setItem(
        "shopsphereWishlist",
        JSON.stringify(wishlist)
    );

}



/* =====================================================
                GET CART
===================================================== */

function getCart() {

    return JSON.parse(
        localStorage.getItem(
            "shopsphereCart"
        )
    ) || [];

}



/* =====================================================
                    ELEMENTS
===================================================== */

const wishlistProducts =
    document.getElementById(
        "wishlistProducts"
    );

const emptyWishlist =
    document.getElementById(
        "emptyWishlist"
    );

const wishlistCount =
    document.getElementById(
        "wishlistCount"
    );

const cartCount =
    document.getElementById(
        "cartCount"
    );



/* =====================================================
              DISPLAY WISHLIST
===================================================== */

function displayWishlist() {

    const wishlist =
        getWishlist();


    wishlistProducts.innerHTML = "";


    /* EMPTY WISHLIST */

    if (wishlist.length === 0) {

        emptyWishlist.classList.remove(
            "d-none"
        );

        updateCounts();

        return;

    }


    /* HIDE EMPTY MESSAGE */

    emptyWishlist.classList.add(
        "d-none"
    );


    /* DISPLAY PRODUCTS */

    wishlist.forEach(product => {

        const column =
            document.createElement("div");

        column.className =
            "col-sm-6 col-lg-4 col-xl-3";


        column.innerHTML = `

            <div class="wishlist-card">

                <div class="wishlist-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        onerror="
                            this.src='https://placehold.co/600x700?text=ShopSphere';
                        "
                    >


                    <button
                        class="remove-wishlist"
                        onclick="
                            removeFromWishlist(${product.id})
                        ">

                        <i class="bi bi-heart-fill"></i>

                    </button>

                </div>


                <div class="wishlist-info">

                    <span class="wishlist-category">

                        ${product.category || "Fashion"}

                    </span>


                    <h3>

                        ${product.name}

                    </h3>


                    <div class="wishlist-price">

                        ₹${Number(product.price)
                            .toLocaleString("en-IN")}

                    </div>


                    <div class="wishlist-buttons">

                        <button
                            class="add-cart-btn"
                            onclick="
                                moveToCart(${product.id})
                            ">

                            <i class="bi bi-bag-plus"></i>

                            Add to Cart

                        </button>

                    </div>

                </div>

            </div>

        `;


        wishlistProducts.appendChild(
            column
        );

    });


    updateCounts();

}



/* =====================================================
            REMOVE FROM WISHLIST
===================================================== */

function removeFromWishlist(productId) {

    let wishlist =
        getWishlist();


    wishlist =
        wishlist.filter(
            product =>
                Number(product.id) !==
                Number(productId)
        );


    saveWishlist(wishlist);


    displayWishlist();


    showToast(
        "Removed from wishlist"
    );

}



/* =====================================================
                MOVE TO CART
===================================================== */

function moveToCart(productId) {

    const wishlist =
        getWishlist();


    const product =
        wishlist.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    if (!product) {

        return;

    }


    let cart =
        getCart();


    const existingProduct =
        cart.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    if (existingProduct) {

        existingProduct.quantity =
            (existingProduct.quantity || 1) + 1;

    } else {

        cart.push({

            ...product,

            quantity: 1

        });

    }


    /* SAVE CART */

    localStorage.setItem(
        "shopsphereCart",
        JSON.stringify(cart)
    );


    /* REMOVE FROM WISHLIST */

    const updatedWishlist =
        wishlist.filter(
            item =>
                Number(item.id) !==
                Number(productId)
        );


    saveWishlist(
        updatedWishlist
    );


    displayWishlist();


    showToast(
        `${product.name} added to cart`
    );

}



/* =====================================================
                UPDATE COUNTS
===================================================== */

function updateCounts() {

    const wishlist =
        getWishlist();

    const cart =
        getCart();


    if (wishlistCount) {

        wishlistCount.textContent =
            wishlist.length;

    }


    if (cartCount) {

        const totalItems =
            cart.reduce(
                (total, item) =>
                    total +
                    Number(item.quantity || 1),
                0
            );


        cartCount.textContent =
            totalItems;

    }

}



/* =====================================================
                    TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "wishlistToast"
        );


    const messageElement =
        document.getElementById(
            "wishlistToastMessage"
        );


    if (!toast || !messageElement) {

        return;

    }


    messageElement.textContent =
        message;


    toast.classList.add(
        "show"
    );


    clearTimeout(
        toastTimer
    );


    toastTimer =
        setTimeout(() => {

            toast.classList.remove(
                "show"
            );

        }, 2500);

}



/* =====================================================
                    INITIALIZE
===================================================== */

displayWishlist();