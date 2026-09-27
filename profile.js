/* =====================================================
                SHOPSPHERE PROFILE
===================================================== */


/* =====================================================
                DOM ELEMENTS
===================================================== */

const profileName =
    document.getElementById("profileName");

const profileEmail =
    document.getElementById("profileEmail");

const detailName =
    document.getElementById("detailName");

const detailEmail =
    document.getElementById("detailEmail");

const detailPhone =
    document.getElementById("detailPhone");

const logoutBtn =
    document.getElementById("logoutBtn");

const cartCount =
    document.getElementById("cartCount");

const wishlistCount =
    document.getElementById("wishlistCount");


/* =====================================================
                GET LOGIN SESSION
===================================================== */

function getLoginSession() {

    const savedSession =
        localStorage.getItem("shopsphereLoggedIn");

    if (!savedSession) {

        return null;

    }

    try {

        return JSON.parse(savedSession);

    } catch (error) {

        console.error(
            "Invalid login session:",
            error
        );

        return null;

    }

}


/* =====================================================
                LOGIN CHECK
===================================================== */

const session =
    getLoginSession();


if (
    !session ||
    session.loggedIn !== true
) {

    alert(
        "Please login to view your profile."
    );

    window.location.href =
        "login.html";

}


/* =====================================================
                DISPLAY PROFILE
===================================================== */

if (
    session &&
    session.loggedIn === true
) {

    // /* -------------------------------------------------
    //                 PROFILE CARD
    // ------------------------------------------------- */

    // if (profileName) {

    //     profileName.textContent =
    //         session.name || "User";

    // }


    // /*
    //     Do NOT hide the email here.

    //     The profile page should show
    //     the user's email.
    // */

    // if (profileEmail) {

    //     profileEmail.textContent =
    //         session.email || "user@example.com";

    // }


    /* -------------------------------------------------
                    PERSONAL INFORMATION
    ------------------------------------------------- */

    if (detailName) {

        detailName.textContent =
            session.name || "-";

    }


    if (detailEmail) {

        detailEmail.textContent =
            session.email || "-";

    }


    if (detailPhone) {

        detailPhone.textContent =
            session.phone || "Not provided";

    }

}


/* =====================================================
                    LOGOUT
===================================================== */

if (logoutBtn) {

    logoutBtn.addEventListener(
        "click",
        function () {

            const confirmLogout =
                confirm(
                    "Are you sure you want to logout?"
                );


            if (!confirmLogout) {

                return;

            }


            /* REMOVE LOGIN SESSION */

            localStorage.removeItem(
                "shopsphereLoggedIn"
            );


            localStorage.removeItem(
                "shopsphereRememberMe"
            );


            /* REDIRECT TO HOME */

            window.location.href =
                "index.html";

        }
    );

}


/* =====================================================
                    CART COUNT
===================================================== */

function updateCartCount() {

    if (!cartCount) {

        return;

    }


    let cart = [];

    try {

        cart =
            JSON.parse(
                localStorage.getItem(
                    "shopsphereCart"
                )
            ) || [];

    } catch (error) {

        cart = [];

    }


    const total =
        cart.reduce(
            function (sum, item) {

                return (
                    sum +
                    Number(
                        item.quantity || 1
                    )
                );

            },
            0
        );


    cartCount.textContent =
        total;

}


/* =====================================================
                WISHLIST COUNT
===================================================== */

function updateWishlistCount() {

    if (!wishlistCount) {

        return;

    }


    let wishlist = [];

    try {

        wishlist =
            JSON.parse(
                localStorage.getItem(
                    "shopsphereWishlist"
                )
            ) || [];

    } catch (error) {

        wishlist = [];

    }


    wishlistCount.textContent =
        wishlist.length;

}


/* =====================================================
                    INITIALIZE
===================================================== */

updateCartCount();

updateWishlistCount();