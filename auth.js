/* =====================================================
                SHOPSPHERE AUTHENTICATION
===================================================== */


/* =====================================================
                GET LOGIN SESSION
===================================================== */

function getLoginSession() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "shopsphereLoggedIn"
            )
        );

    }

    catch (error) {

        console.error(
            "Unable to read login session.",
            error
        );

        return null;

    }

}



/* =====================================================
                CHECK LOGIN
===================================================== */

function isUserLoggedIn() {

    const session =
        getLoginSession();


    return (
        session &&
        session.loggedIn === true
    );

}



/* =====================================================
                GET USER NAME
===================================================== */

function getLoggedInUserName() {

    const session =
        getLoginSession();


    if (
        session &&
        session.name
    ) {

        return session.name;

    }


    return "";

}



/* =====================================================
                LOGOUT
===================================================== */

function logoutUser() {

    localStorage.removeItem(
        "shopsphereLoggedIn"
    );

    localStorage.removeItem(
        "shopsphereRememberMe"
    );

    localStorage.removeItem(
        "shopsphereRememberedEmail"
    );


    window.location.href =
        "login.html";

}



/* =====================================================
                UPDATE NAVBAR
===================================================== */

function updateAuthNavbar() {

    const loginBtn =
        document.getElementById("loginBtn");

    const userMenuBtn =
        document.getElementById("userMenuBtn");

    const userDropdown =
        document.getElementById("userDropdown");

    const navbarUserName =
        document.getElementById("navbarUserName");

    const dropdownUserName =
        document.getElementById("dropdownUserName");

    const navbarLogoutBtn =
        document.getElementById("navbarLogoutBtn");


    /* If this page's navbar doesn't have the
       login/user-menu markup, stop here. */

    if (!loginBtn || !userMenuBtn || !userDropdown) {

        return;

    }



    /* =================================================
                USER IS LOGGED OUT
    ================================================= */

    if (!isUserLoggedIn()) {

        loginBtn.classList.remove("d-none");

        userMenuBtn.classList.add("d-none");

        userDropdown.classList.remove("show");

        return;

    }



    /* =================================================
                USER IS LOGGED IN
    ================================================= */

    const userName =
        getLoggedInUserName() || "Account";


    if (navbarUserName) {

        navbarUserName.textContent =
            userName;

    }


    if (dropdownUserName) {

        dropdownUserName.textContent =
            userName;

    }


    loginBtn.classList.add("d-none");

    userMenuBtn.classList.remove("d-none");



    /* =================================================
                TOGGLE DROPDOWN ON CLICK
    ================================================= */

    userMenuBtn.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            userDropdown.classList.toggle("show");

            userMenuBtn.classList.toggle("active");

        }
    );



    /* =================================================
                CLOSE ON OUTSIDE CLICK
    ================================================= */

    document.addEventListener(
        "click",
        function (event) {

            const wrapper =
                document.getElementById(
                    "userMenuWrapper"
                );


            if (
                wrapper &&
                !wrapper.contains(event.target)
            ) {

                userDropdown.classList.remove("show");

                userMenuBtn.classList.remove("active");

            }

        }
    );



    /* =================================================
                LOGOUT BUTTON
    ================================================= */

    if (navbarLogoutBtn) {

        navbarLogoutBtn.addEventListener(
            "click",
            logoutUser
        );

    }

}



/* =====================================================
                SYNC CART / WISHLIST COUNTS
===================================================== */

function syncShopCounts() {

    const cartCountElement =
        document.getElementById("cartCount");

    const wishlistCountElement =
        document.getElementById("wishlistCount");


    if (cartCountElement) {

        const cart =
            JSON.parse(
                localStorage.getItem("shopsphereCart")
            ) || [];


        const total =
            cart.reduce(
                (sum, item) =>
                    sum + Number(item.quantity || 1),
                0
            );


        cartCountElement.textContent =
            total;

    }


    if (wishlistCountElement) {

        const wishlist =
            JSON.parse(
                localStorage.getItem("shopsphereWishlist")
            ) || [];


        wishlistCountElement.textContent =
            wishlist.length;

    }

}



/* =====================================================
                INITIALIZE AUTH
===================================================== */

document.addEventListener(
    "DOMContentLoaded",
    () => {

        updateAuthNavbar();

        syncShopCounts();

    }
);