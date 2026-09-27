/* =====================================================
                SHOPSPHERE ORDER SUCCESS
===================================================== */


/* GET SAVED ORDER */

const order =
    JSON.parse(
        localStorage.getItem("shopsphereOrder")
    );



/* =====================================================
                CHECK ORDER
===================================================== */

if (!order) {

    window.location.href =
        "products.html";

}



/* =====================================================
                DISPLAY ORDER
===================================================== */

if (order) {


    /* ORDER NUMBER */

    document.getElementById(
        "orderNumber"
    ).textContent =
        "#" + order.orderNumber;



    /* CUSTOMER */

    document.getElementById(
        "customerName"
    ).textContent =
        order.customer.name;



    /* DELIVERY */

    document.getElementById(
        "deliveryMethod"
    ).textContent =

        order.deliveryMethod === "express"
            ? "Express Delivery"
            : "Standard Delivery";



    /* PAYMENT */

    let paymentText =
        "Cash on Delivery";


    if (
        order.paymentMethod === "upi"
    ) {

        paymentText = "UPI";

    }


    if (
        order.paymentMethod === "card"
    ) {

        paymentText =
            "Credit / Debit Card";

    }


    document.getElementById(
        "paymentMethod"
    ).textContent =
        paymentText;



    /* TOTAL */

    document.getElementById(
        "orderTotal"
    ).textContent =

        `₹${order.total.toLocaleString("en-IN")}`;

}