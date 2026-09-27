/* =====================================================
                SHOPSPHERE 404
===================================================== */


/* =====================================================
                CART COUNT
===================================================== */

function updateCartCount() {

    const cartCount =
        document.getElementById("cartCount");


    if (!cartCount) {
        return;
    }


    const cart =
        JSON.parse(
            localStorage.getItem("shopsphereCart")
        ) || [];


    const total =
        cart.reduce(
            (sum, item) =>
                sum +
                Number(item.quantity || 1),
            0
        );


    cartCount.textContent =
        total;

}



/* =====================================================
                WISHLIST COUNT
===================================================== */

function updateWishlistCount() {

    const wishlistCount =
        document.getElementById("wishlistCount");


    if (!wishlistCount) {
        return;
    }


    const wishlist =
        JSON.parse(
            localStorage.getItem("shopsphereWishlist")
        ) || [];


    wishlistCount.textContent =
        wishlist.length;

}



/* =====================================================
                    INITIALIZE
===================================================== */

updateCartCount();

updateWishlistCount();