/* =====================================================
                    SHOPSPHERE PRODUCTS
===================================================== */


/* =====================================================
                    PRODUCT DATA
===================================================== */

const products = [

    {
        id: 1,
        name: "Classic White Shirt",
        category: "Women",
        price: 599,
        oldPrice: 899,
        rating: 4.8,
        badge: "SALE",
        image: "shirt.jpg"
    },

    {
        id: 2,
        name: "Classic Denim Jacket",
        category: "Men",
        price: 999,
        oldPrice: 1499,
        rating: 4.7,
        badge: "POPULAR",
        image: "jacket.jpg"
    },

    {
        id: 3,
        name: "Minimal Leather Tote",
        category: "Accessories",
        price: 489,
        oldPrice: 699,
        rating: 4.9,
        badge: "TRENDING",
        image: "tote bag.jpg"
    },

    {
        id: 4,
        name: "Relaxed Denim Jeans",
        category: "Men",
        price: 1499,
        oldPrice: 1999,
        rating: 4.6,
        badge: "",
        image: "jeans.jpg"
    },

    {
        id: 5,
        name: "Satin Maxi Dress",
        category: "Women",
        price: 799,
        oldPrice: 1099,
        rating: 4.9,
        badge: "NEW",
        image: "maxi.jpg"
    },

    {
        id: 6,
        name: "Everyday Sneakers",
        category: "Accessories",
        price: 1499,
        oldPrice: 1999,
        rating: 4.8,
        badge: "SALE",
        image: "sneakers.jpg"
    },

    {
        id: 7,
        name: "Men's Shirt",
        category: "Men",
        price: 699,
        oldPrice: 899,
        rating: 4.5,
        badge: "",
        image: "men shirt.jpg"
    },

    {
        id: 8,
        name: "Ribbed Knit Top",
        category: "Women",
        price: 699,
        oldPrice: 899,
        rating: 4.7,
        badge: "NEW",
        image: "knit.jpg"
    },

    {
        id: 9,
        name: "Oversized Beige Blazer",
        category: "Women",
        price: 899,
        oldPrice: 1299,
        rating: 4.8,
        badge: "TRENDING",
        image: "Blazer.jpg"
    },

    {
        id: 10,
        name: "Essential Black T-Shirt",
        category: "Men",
        price: 499,
        oldPrice: 889,
        rating: 4.6,
        badge: "SALE",
        image: "black tshirt.jpg"
    },

    {
        id: 11,
        name: "Classic Sunglasses",
        category: "Accessories",
        price: 599,
        oldPrice: 799,
        rating: 4.7,
        badge: "NEW",
        image: "sunglass.jpg"
    },

    {
        id: 12,
        name: "Elegant Crossbody Bag",
        category: "Accessories",
        price: 499,
        oldPrice: 699,
        rating: 4.8,
        badge: "POPULAR",
        image: "bag.jpg"
    }

];


/* =====================================================
                    DOM ELEMENTS
===================================================== */

const productGrid =
    document.getElementById("productGrid");

const searchInput =
    document.getElementById("searchInput");

const categoryFilter =
    document.getElementById("categoryFilter");

const sortFilter =
    document.getElementById("sortFilter");

const productCount =
    document.getElementById("productCount");

const noProducts =
    document.getElementById("noProducts");


/* =====================================================
                STORAGE MIGRATION
===================================================== */

/*
    Older versions of the project used:

        cart
        wishlist

    New ShopSphere version uses:

        shopsphereCart
        shopsphereWishlist

    This automatically moves old data
    into the new storage keys.
*/

function migrateOldStorage() {

    /* CART */

    const oldCart =
        localStorage.getItem("cart");

    const newCart =
        localStorage.getItem("shopsphereCart");


    if (
        oldCart &&
        !newCart
    ) {

        localStorage.setItem(
            "shopsphereCart",
            oldCart
        );

    }


    /* WISHLIST */

    const oldWishlist =
        localStorage.getItem("wishlist");

    const newWishlist =
        localStorage.getItem(
            "shopsphereWishlist"
        );


    if (
        oldWishlist &&
        !newWishlist
    ) {

        localStorage.setItem(
            "shopsphereWishlist",
            oldWishlist
        );

    }

}


migrateOldStorage();


/* =====================================================
                    CART STORAGE
===================================================== */

let cart =
    JSON.parse(
        localStorage.getItem(
            "shopsphereCart"
        )
    ) || [];


/* =====================================================
                    WISHLIST STORAGE
===================================================== */

let wishlist =
    JSON.parse(
        localStorage.getItem(
            "shopsphereWishlist"
        )
    ) || [];


/* =====================================================
                NORMALIZE WISHLIST
===================================================== */

function normalizeWishlist() {

    wishlist = wishlist
        .map(item => {

            /* OLD FORMAT */

            if (
                typeof item === "number" ||
                typeof item === "string"
            ) {

                return products.find(
                    product =>
                        Number(product.id) ===
                        Number(item)
                );

            }


            /* NEW FORMAT */

            if (
                item &&
                item.id !== undefined
            ) {

                const originalProduct =
                    products.find(
                        product =>
                            Number(product.id) ===
                            Number(item.id)
                    );


                return (
                    originalProduct ||
                    item
                );

            }


            return null;

        })
        .filter(Boolean);


    /* REMOVE DUPLICATES */

    const uniqueWishlist = [];


    wishlist.forEach(item => {

        const exists =
            uniqueWishlist.some(
                product =>
                    Number(product.id) ===
                    Number(item.id)
            );


        if (!exists) {

            uniqueWishlist.push(item);

        }

    });


    wishlist =
        uniqueWishlist;


    localStorage.setItem(
        "shopsphereWishlist",
        JSON.stringify(wishlist)
    );

}


normalizeWishlist();


/* =====================================================
                    DISPLAY PRODUCTS
===================================================== */

function displayProducts(productList) {

    if (!productGrid) {
        return;
    }


    productGrid.innerHTML = "";


    /* NO PRODUCTS */

    if (
        productList.length === 0
    ) {

        if (noProducts) {

            noProducts.classList.remove(
                "d-none"
            );

        }


        if (productCount) {

            productCount.textContent =
                "0 products";

        }


        return;

    }


    if (noProducts) {

        noProducts.classList.add(
            "d-none"
        );

    }


    if (productCount) {

        productCount.textContent =
            `${productList.length} products`;

    }


    /* CREATE PRODUCT CARDS */

    productList.forEach(product => {

        const isWishlist =
            wishlist.some(
                item =>
                    Number(item.id) ===
                    Number(product.id)
            );


        const card =
            document.createElement("div");


        card.className =
            "col-sm-6 col-lg-4 col-xl-3";


        card.innerHTML = `

            <div
                class="shop-product-card"
                style="cursor:pointer;"
            >

                <!-- IMAGE -->

                <div class="shop-product-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                        loading="lazy"
                        onerror="
                            this.src='https://via.placeholder.com/700x850?text=ShopSphere'
                        "
                    >


                    ${
                        product.badge
                            ? `
                                <span class="product-badge">
                                    ${product.badge}
                                </span>
                              `
                            : ""
                    }


                    <!-- WISHLIST -->

                    <button
                        class="shop-wishlist ${
                            isWishlist
                                ? "active"
                                : ""
                        }"
                        aria-label="Wishlist"
                    >

                        <i class="bi ${
                            isWishlist
                                ? "bi-heart-fill"
                                : "bi-heart"
                        }"></i>

                    </button>

                </div>


                <!-- INFORMATION -->

                <div class="shop-product-info">

                    <span class="shop-product-category">
                        ${product.category}
                    </span>


                    <h5>
                        ${product.name}
                    </h5>


                    <div class="shop-rating">
                        ⭐ ${product.rating}
                    </div>


                    <div class="shop-price">

                        ₹${product.price.toLocaleString("en-IN")}

                        <del>
                            ₹${product.oldPrice.toLocaleString("en-IN")}
                        </del>

                    </div>


                    <!-- CART -->

                    <button
                        class="add-cart-btn"
                        aria-label="Add to cart"
                    >

                        <i class="bi bi-bag-plus"></i>

                        Add to Cart

                    </button>

                </div>

            </div>

        `;


        /* =================================================
                        PRODUCT CLICK
        ================================================= */

        const productCard =
            card.querySelector(
                ".shop-product-card"
            );


        productCard.addEventListener(
            "click",
            event => {

                /*
                    Don't open details when
                    clicking wishlist or cart.
                */

                if (
                    event.target.closest(
                        ".shop-wishlist"
                    )
                ) {

                    return;

                }


                if (
                    event.target.closest(
                        ".add-cart-btn"
                    )
                ) {

                    return;

                }


                openProductDetails(
                    product.id
                );

            }
        );


        /* =================================================
                        WISHLIST BUTTON
        ================================================= */

        const wishlistButton =
            card.querySelector(
                ".shop-wishlist"
            );


        wishlistButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                toggleWishlist(
                    product.id
                );

            }
        );


        /* =================================================
                        CART BUTTON
        ================================================= */

        const addCartButton =
            card.querySelector(
                ".add-cart-btn"
            );


        addCartButton.addEventListener(
            "click",
            event => {

                event.stopPropagation();

                addToCart(
                    product.id
                );

            }
        );


        productGrid.appendChild(card);

    });

}


/* =====================================================
                OPEN PRODUCT DETAILS
===================================================== */

function openProductDetails(
    productId
) {

    const product =
        products.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return;

    }


    const selectedProduct = {

        ...product,

        description:
            `Discover the ${product.name}, designed with modern style, quality materials and everyday comfort in mind. Perfect for creating a stylish look for any occasion.`

    };


    localStorage.setItem(
        "selectedProduct",
        JSON.stringify(
            selectedProduct
        )
    );


    window.location.href =
        "product-details.html";

}


/* =====================================================
                    FILTER PRODUCTS
===================================================== */

function getFilteredProducts() {

    let filtered =
        [...products];


    /* SEARCH */

    const search =
        searchInput
            ? searchInput.value
                .toLowerCase()
                .trim()
            : "";


    if (search) {

        filtered =
            filtered.filter(
                product =>
                    product.name
                        .toLowerCase()
                        .includes(search)
            );

    }


    /* CATEGORY */

    const category =
        categoryFilter
            ? categoryFilter.value
            : "All";


    if (
        category !== "All"
    ) {

        filtered =
            filtered.filter(
                product =>
                    product.category ===
                    category
            );

    }


    /* SORT */

    const sort =
        sortFilter
            ? sortFilter.value
            : "default";


    if (sort === "low") {

        filtered.sort(
            (a, b) =>
                a.price - b.price
        );

    }

    else if (sort === "high") {

        filtered.sort(
            (a, b) =>
                b.price - a.price
        );

    }

    else if (sort === "rating") {

        filtered.sort(
            (a, b) =>
                b.rating - a.rating
        );

    }

    else if (sort === "name") {

        filtered.sort(
            (a, b) =>
                a.name.localeCompare(
                    b.name
                )
        );

    }


    return filtered;

}


/* =====================================================
                    FILTER FUNCTION
===================================================== */

function filterProducts() {

    displayProducts(
        getFilteredProducts()
    );

}


/* =====================================================
                    SEARCH
===================================================== */

if (searchInput) {

    searchInput.addEventListener(
        "input",
        filterProducts
    );

}


/* =====================================================
                    CATEGORY
===================================================== */

if (categoryFilter) {

    categoryFilter.addEventListener(
        "change",
        filterProducts
    );

}


/* =====================================================
                    SORT
===================================================== */

if (sortFilter) {

    sortFilter.addEventListener(
        "change",
        filterProducts
    );

}


/* =====================================================
                    ADD TO CART
===================================================== */

function addToCart(productId) {

    const product =
        products.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    if (!product) {

        console.error(
            "Product not found:",
            productId
        );

        return;

    }


    const existingProduct =
        cart.find(
            item =>
                Number(item.id) ===
                Number(product.id) &&
                (
                    item.size ===
                    "Standard" ||
                    !item.size
                )
        );


    if (existingProduct) {

        existingProduct.quantity =
            Number(
                existingProduct.quantity || 1
            ) + 1;

    }

    else {

        cart.push({

            id:
                product.id,

            name:
                product.name,

            category:
                product.category,

            price:
                product.price,

            oldPrice:
                product.oldPrice,

            rating:
                product.rating,

            image:
                product.image,

            size:
                "Standard",

            quantity:
                1

        });

    }


    localStorage.setItem(
        "shopsphereCart",
        JSON.stringify(cart)
    );


    updateCartCount();


    showToast(
        `${product.name} added to cart 🛍️`
    );

}


/* =====================================================
                    CART COUNT
===================================================== */

function updateCartCount() {

    const cartCount =
        document.getElementById(
            "cartCount"
        );


    if (!cartCount) {
        return;
    }


    const savedCart =
        JSON.parse(
            localStorage.getItem(
                "shopsphereCart"
            )
        ) || [];


    const count =
        savedCart.reduce(
            (total, item) =>
                total +
                Number(
                    item.quantity || 1
                ),
            0
        );


    cartCount.textContent =
        count;

}


/* =====================================================
                    WISHLIST
===================================================== */

function toggleWishlist(
    productId
) {

    const product =
        products.find(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    if (!product) {
        return;
    }


    const existingIndex =
        wishlist.findIndex(
            item =>
                Number(item.id) ===
                Number(productId)
        );


    /* REMOVE */

    if (
        existingIndex !== -1
    ) {

        wishlist.splice(
            existingIndex,
            1
        );


        showToast(
            `${product.name} removed from wishlist`
        );

    }

    /* ADD */

    else {

        wishlist.push({
            ...product
        });


        showToast(
            `${product.name} added to wishlist ❤️`
        );

    }


    localStorage.setItem(
        "shopsphereWishlist",
        JSON.stringify(wishlist)
    );


    updateWishlistCount();


    displayProducts(
        getFilteredProducts()
    );

}


/* =====================================================
                COMPATIBILITY
===================================================== */

function addToWishlist(
    productId
) {

    toggleWishlist(
        productId
    );

}


/* =====================================================
                WISHLIST COUNT
===================================================== */

function updateWishlistCount() {

    const wishlistCount =
        document.getElementById(
            "wishlistCount"
        );


    if (!wishlistCount) {
        return;
    }


    const savedWishlist =
        JSON.parse(
            localStorage.getItem(
                "shopsphereWishlist"
            )
        ) || [];


    wishlistCount.textContent =
        savedWishlist.length;

}


/* =====================================================
                TOAST
===================================================== */

let toastTimer;


function showToast(message) {

    const toast =
        document.getElementById(
            "shopToast"
        );


    const toastMessage =
        document.getElementById(
            "toastMessage"
        );


    if (
        !toast ||
        !toastMessage
    ) {

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
                URL CATEGORY
===================================================== */

function loadCategoryFromURL() {

    if (!categoryFilter) {
        return;
    }


    const params =
        new URLSearchParams(
            window.location.search
        );


    const category =
        params.get(
            "category"
        );


    if (
        category === "Women" ||
        category === "Men" ||
        category === "Accessories"
    ) {

        categoryFilter.value =
            category;

    }

}


/* =====================================================
                NAVBAR ACTIVE LINK
===================================================== */

function setActiveNavbarLink() {

    const currentPage =
        window.location.pathname;


    const currentCategory =
        new URLSearchParams(
            window.location.search
        ).get(
            "category"
        );


    const navLinks =
        document.querySelectorAll(
            ".nav-link"
        );


    navLinks.forEach(
        link => {

            link.classList.remove(
                "active"
            );


            const href =
                link.getAttribute(
                    "href"
                ) || "";


            /* HOME */

            if (
                href === "index.html" &&
                (
                    currentPage.endsWith(
                        "/"
                    ) ||
                    currentPage.endsWith(
                        "/index.html"
                    )
                )
            ) {

                link.classList.add(
                    "active"
                );

            }


            /* SHOP */

            if (
                href === "products.html" &&
                !currentCategory &&
                currentPage.endsWith(
                    "products.html"
                )
            ) {

                link.classList.add(
                    "active"
                );

            }


            /* CATEGORY */

            if (
                currentCategory &&
                href.includes(
                    `category=${currentCategory}`
                )
            ) {

                link.classList.add(
                    "active"
                );

            }

        }
    );

}


/* =====================================================
                    INITIALIZE
===================================================== */

function initializeShop() {

    normalizeWishlist();

    loadCategoryFromURL();

    displayProducts(
        getFilteredProducts()
    );

    updateCartCount();

    updateWishlistCount();

    setActiveNavbarLink();

}


initializeShop();