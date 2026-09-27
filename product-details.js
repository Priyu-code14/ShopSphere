/* =====================================================
            SHOPSPHERE PRODUCT DETAILS
===================================================== */


/* =====================================================
            GET SELECTED PRODUCT
===================================================== */

const product = JSON.parse(
    localStorage.getItem("selectedProduct")
);


/* =====================================================
            PRODUCT ELEMENTS
===================================================== */

const productImage =
    document.getElementById("productImage");

const productName =
    document.getElementById("productName");

const productCategory =
    document.getElementById("productCategory");

const productPrice =
    document.getElementById("productPrice");

const productOldPrice =
    document.getElementById("productOldPrice");

const productRating =
    document.getElementById("productRating");

const productDescription =
    document.getElementById("productDescription");

const breadcrumbName =
    document.getElementById("breadcrumbName");

const productBadge =
    document.getElementById("productBadge");


/* =====================================================
                CHECK PRODUCT
===================================================== */

if (!product) {

    if (productName) {
        productName.textContent =
            "Product Not Found";
    }

    if (productCategory) {
        productCategory.textContent =
            "SHOPSPHERE";
    }

    if (productDescription) {
        productDescription.textContent =
            "The product you are looking for could not be found.";
    }

}


/* =====================================================
                DISPLAY PRODUCT
===================================================== */

else {

    /* IMAGE */

    if (productImage) {

        productImage.src =
            product.image;

        productImage.alt =
            product.name;

    }


    /* NAME */

    if (productName) {

        productName.textContent =
            product.name;

    }


    /* CATEGORY */

    if (productCategory) {

        productCategory.textContent =
            product.category || "Fashion";

    }


    /* PRICE */

    if (productPrice) {

        productPrice.textContent =
            `₹${Number(
                product.price || 0
            ).toLocaleString("en-IN")}`;

    }


    /* OLD PRICE */

    if (productOldPrice) {

        if (product.oldPrice) {

            productOldPrice.textContent =
                `₹${Number(
                    product.oldPrice
                ).toLocaleString("en-IN")}`;

        }

        else {

            productOldPrice.style.display =
                "none";

        }

    }


    /* RATING */

    if (productRating) {

        productRating.textContent =
            product.rating || "4.8";

    }


    /* BREADCRUMB */

    if (breadcrumbName) {

        breadcrumbName.textContent =
            product.name;

    }


    /* DESCRIPTION */

    if (productDescription) {

        productDescription.textContent =
            product.description ||

            `Discover the ${product.name}, designed with modern style, quality materials and everyday comfort in mind. Perfect for creating a stylish look for any occasion.`;

    }


    /* BADGE */

    if (productBadge) {

        if (product.badge) {

            productBadge.textContent =
                product.badge;

        }

        else {

            productBadge.style.display =
                "none";

        }

    }

}


/* =====================================================
            SIZE REQUIREMENT (BY CATEGORY)
===================================================== */

/*
    Accessories (bags, sunglasses, jewellery etc.)
    don't use clothing sizes like S / M / L / XL,
    so we hide that section for them and skip the
    "please select a size" requirement.
*/

const requiresSize =
    !!product &&
    product.category !== "Accessories";


if (!requiresSize) {

    const sizeSection =
        document.getElementById(
            "sizeSection"
        );


    if (sizeSection) {

        sizeSection.style.display =
            "none";

    }

}


/* =====================================================
                    SIZE SELECTION
===================================================== */

/*
    Accessories (bags, sunglasses, totes, etc.)
    don't use clothing sizes like S / M / L / XL.
    They get a single "One Size" option instead,
    which is auto-selected so checkout isn't blocked.
*/

function setupSizeSection() {

    const sizeOptionsContainer =
        document.querySelector(".size-options");

    const sizeGuideLink =
        document.getElementById(
            "sizeGuideLink"
        );


    if (
        !product ||
        !sizeOptionsContainer
    ) {

        return;

    }


    if (product.category === "Accessories") {

        sizeOptionsContainer.innerHTML = `
            <button
                class="size-btn active one-size"
                type="button"
            >
                One Size
            </button>
        `;


        if (sizeGuideLink) {

            sizeGuideLink.style.display =
                "none";

        }

    }


    bindSizeButtons();

}


function bindSizeButtons() {

    const sizeButtons =
        document.querySelectorAll(".size-btn");


    sizeButtons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                sizeButtons.forEach(btn => {

                    btn.classList.remove(
                        "active"
                    );

                });


                button.classList.add(
                    "active"
                );

            }
        );

    });

}


setupSizeSection();


/* =====================================================
                        QUANTITY
===================================================== */

const decreaseQty =
    document.getElementById(
        "decreaseQty"
    );

const increaseQty =
    document.getElementById(
        "increaseQty"
    );

const quantityElement =
    document.getElementById(
        "quantity"
    );


let quantity = 1;


/* DECREASE */

if (decreaseQty) {

    decreaseQty.addEventListener(
        "click",
        () => {

            if (quantity > 1) {

                quantity--;

                if (quantityElement) {

                    quantityElement.textContent =
                        quantity;

                }

            }

        }
    );

}


/* INCREASE */

if (increaseQty) {

    increaseQty.addEventListener(
        "click",
        () => {

            if (quantity < 10) {

                quantity++;

                if (quantityElement) {

                    quantityElement.textContent =
                        quantity;

                }

            }

        }
    );

}


/* =====================================================
                        WISHLIST
===================================================== */

const wishlistButton =
    document.getElementById(
        "wishlistButton"
    );


function getWishlist() {

    return JSON.parse(
        localStorage.getItem(
            "shopsphereWishlist"
        )
    ) || [];

}


function saveWishlist(wishlist) {

    localStorage.setItem(
        "shopsphereWishlist",
        JSON.stringify(wishlist)
    );

}


/* =====================================================
                CHECK WISHLIST
===================================================== */

function checkWishlist() {

    if (
        !product ||
        !wishlistButton
    ) {

        return;

    }


    const wishlist =
        getWishlist();


    const exists =
        wishlist.some(
            item =>
                Number(item.id) ===
                Number(product.id)
        );


    if (exists) {

        wishlistButton.classList.add(
            "active"
        );

        wishlistButton.innerHTML =
            '<i class="bi bi-heart-fill"></i>';

    }

}


checkWishlist();


/* =====================================================
            ADD / REMOVE WISHLIST
===================================================== */

if (wishlistButton) {

    wishlistButton.addEventListener(
        "click",
        () => {

            if (!product) {
                return;
            }


            let wishlist =
                getWishlist();


            const index =
                wishlist.findIndex(
                    item =>
                        Number(item.id) ===
                        Number(product.id)
                );


            /* REMOVE */

            if (index !== -1) {

                wishlist.splice(
                    index,
                    1
                );


                wishlistButton.classList.remove(
                    "active"
                );


                wishlistButton.innerHTML =
                    '<i class="bi bi-heart"></i>';


                showMessage(
                    "Removed from wishlist"
                );

            }


            /* ADD */

            else {

                wishlist.push({
                    ...product
                });


                wishlistButton.classList.add(
                    "active"
                );


                wishlistButton.innerHTML =
                    '<i class="bi bi-heart-fill"></i>';


                showMessage(
                    "Added to wishlist ❤️"
                );

            }


            saveWishlist(
                wishlist
            );


            updateWishlistCount();

        }
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
                SAVE CART
===================================================== */

function saveCart(cart) {

    localStorage.setItem(
        "shopsphereCart",
        JSON.stringify(cart)
    );

}


/* =====================================================
            CREATE CART PRODUCT
===================================================== */

function createCartProduct(size) {

    return {

        id:
            product.id,

        name:
            product.name,

        category:
            product.category || "Fashion",

        price:
            Number(
                product.price || 0
            ),

        oldPrice:
            Number(
                product.oldPrice || 0
            ),

        rating:
            product.rating || 0,

        image:
            product.image,

        size:
            size,

        quantity:
            quantity

    };

}


/* =====================================================
                ADD PRODUCT TO CART
===================================================== */

function addProductToCart() {

    if (!product) {

        showMessage(
            "Product not found."
        );

        return false;

    }


    let size = "";


    /* CHECK SIZE (SKIPPED FOR ACCESSORIES) */

    if (requiresSize) {

        const selectedSize =
            document.querySelector(
                ".size-btn.active"
            );


        if (!selectedSize) {

            showMessage(
                "Please select a size first."
            );

            return false;

        }


        size =
            selectedSize.textContent.trim();

    }


    /* GET CART */

    let cart =
        getCart();


    /* CREATE PRODUCT */

    const cartProduct =
        createCartProduct(size);


    /* CHECK EXISTING PRODUCT */

    const existingIndex =
        cart.findIndex(
            item =>

                Number(item.id) ===
                Number(product.id) &&

                item.size === size
        );


    /* UPDATE QUANTITY */

    if (existingIndex !== -1) {

        cart[existingIndex].quantity =
            Number(
                cart[existingIndex].quantity || 0
            ) + quantity;

    }


    /* ADD NEW PRODUCT */

    else {

        cart.push(
            cartProduct
        );

    }


    /* SAVE */

    saveCart(cart);


    /* UPDATE NAVBAR */

    updateCartCount();


    return true;

}


/* =====================================================
                    ADD TO CART
===================================================== */

const addCartButton =
    document.getElementById(
        "addCartButton"
    );


if (addCartButton) {

    addCartButton.addEventListener(
        "click",
        () => {

            const success =
                addProductToCart();


            if (!success) {
                return;
            }


            showMessage(
                `${product.name} added to cart 🛒`
            );

        }
    );

}


/* =====================================================
                        BUY NOW
===================================================== */

const buyNowButton =
    document.getElementById(
        "buyNowButton"
    );


if (buyNowButton) {

    buyNowButton.addEventListener(
        "click",
        () => {

            /*
                Add product to cart FIRST so it isn't
                lost if the user gets redirected to login.
            */

            const success =
                addProductToCart();


            if (!success) {
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


                showMessage(
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


            /*
                Product is now stored in
                shopsphereCart before checkout.
            */

            window.location.href =
                "checkout.html";

        }
    );

}


/* =====================================================
                UPDATE WISHLIST COUNT
===================================================== */

function updateWishlistCount() {

    const count =
        document.getElementById(
            "wishlistCount"
        );


    if (!count) {
        return;
    }


    const wishlist =
        getWishlist();


    count.textContent =
        wishlist.length;

}


/* =====================================================
                    UPDATE CART COUNT
===================================================== */

function updateCartCount() {

    const count =
        document.getElementById(
            "cartCount"
        );


    if (!count) {
        return;
    }


    const cart =
        getCart();


    const total =
        cart.reduce(
            (sum, item) =>

                sum +
                Number(
                    item.quantity || 1
                ),

            0
        );


    count.textContent =
        total;

}


/* =====================================================
                        MESSAGE
===================================================== */

function showMessage(message) {

    const oldMessage =
        document.querySelector(
            ".shop-message"
        );


    if (oldMessage) {

        oldMessage.remove();

    }


    const messageBox =
        document.createElement(
            "div"
        );


    messageBox.className =
        "shop-message";


    messageBox.textContent =
        message;


    document.body.appendChild(
        messageBox
    );


    setTimeout(
        () => {

            messageBox.classList.add(
                "show"
            );

        },
        10
    );


    setTimeout(
        () => {

            messageBox.classList.remove(
                "show"
            );


            setTimeout(
                () => {

                    if (
                        messageBox.parentNode
                    ) {

                        messageBox.remove();

                    }

                },
                300
            );

        },
        2200
    );

}


/* =====================================================
                    INITIALIZE
===================================================== */

updateWishlistCount();

updateCartCount();