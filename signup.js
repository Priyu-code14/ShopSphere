/* =====================================================
                SHOPSPHERE SIGNUP
===================================================== */


/* =====================================================
                DOM ELEMENTS
===================================================== */

const signupForm =
    document.getElementById("signupForm");

const signupName =
    document.getElementById("signupName");

const signupEmail =
    document.getElementById("signupEmail");

const signupPhone =
    document.getElementById("signupPhone");

const signupPassword =
    document.getElementById("signupPassword");

const confirmPassword =
    document.getElementById("confirmPassword");

const termsCheckbox =
    document.getElementById("terms");

const authMessage =
    document.getElementById("signupMessage");



/* =====================================================
                PASSWORD TOGGLE
===================================================== */

const toggleSignupPassword =
    document.getElementById(
        "toggleSignupPassword"
    );


if (
    toggleSignupPassword &&
    signupPassword
) {

    toggleSignupPassword.addEventListener(
        "click",
        function () {

            if (
                signupPassword.type ===
                "password"
            ) {

                signupPassword.type =
                    "text";

                toggleSignupPassword.innerHTML =
                    '<i class="bi bi-eye-slash"></i>';

            }

            else {

                signupPassword.type =
                    "password";

                toggleSignupPassword.innerHTML =
                    '<i class="bi bi-eye"></i>';

            }

        }
    );

}



/* =====================================================
            CONFIRM PASSWORD TOGGLE
===================================================== */

const toggleConfirmPassword =
    document.getElementById(
        "toggleConfirmPassword"
    );


if (
    toggleConfirmPassword &&
    confirmPassword
) {

    toggleConfirmPassword.addEventListener(
        "click",
        function () {

            if (
                confirmPassword.type ===
                "password"
            ) {

                confirmPassword.type =
                    "text";

                toggleConfirmPassword.innerHTML =
                    '<i class="bi bi-eye-slash"></i>';

            }

            else {

                confirmPassword.type =
                    "password";

                toggleConfirmPassword.innerHTML =
                    '<i class="bi bi-eye"></i>';

            }

        }
    );

}



/* =====================================================
                SHOW MESSAGE
===================================================== */

function showMessage(
    message,
    type = "error"
) {

    if (!authMessage) {
        return;
    }

    authMessage.textContent =
        message;

    authMessage.className =
        `signup-message show ${type}`;

}



/* =====================================================
                GET USERS
===================================================== */

function getUsers() {

    return JSON.parse(
        localStorage.getItem(
            "shopsphereUsers"
        )
    ) || [];

}



/* =====================================================
                SAVE USERS
===================================================== */

function saveUsers(users) {

    localStorage.setItem(
        "shopsphereUsers",
        JSON.stringify(
            users
        )
    );

}



/* =====================================================
                SIGNUP FORM
===================================================== */

if (signupForm) {

    signupForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();



            /* =================================================
                        GET VALUES
            ================================================= */

            const name =
                signupName
                    ? signupName.value.trim()
                    : "";

            const email =
                signupEmail
                    ? signupEmail.value
                        .trim()
                        .toLowerCase()
                    : "";

            const phone =
                signupPhone
                    ? signupPhone.value.trim()
                    : "";

            const password =
                signupPassword
                    ? signupPassword.value
                    : "";

            const confirm =
                confirmPassword
                    ? confirmPassword.value
                    : "";



            /* =================================================
                        NAME VALIDATION
            ================================================= */

            if (name.length < 3) {

                showMessage(
                    "Please enter your full name."
                );

                if (signupName) {
                    signupName.focus();
                }

                return;

            }


            if (!/^[a-zA-Z\s]+$/.test(name)) {

                showMessage(
                    "Name should contain only letters."
                );

                if (signupName) {
                    signupName.focus();
                }

                return;

            }



            /* =================================================
                        EMAIL VALIDATION
            ================================================= */

            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email)
            ) {

                showMessage(
                    "Please enter a valid email address."
                );

                if (signupEmail) {
                    signupEmail.focus();
                }

                return;

            }



            /* =================================================
                        PHONE VALIDATION
            ================================================= */

            if (
                !/^[0-9]{10}$/.test(phone)
            ) {

                showMessage(
                    "Please enter a valid 10-digit phone number."
                );

                if (signupPhone) {
                    signupPhone.focus();
                }

                return;

            }



            /* =================================================
                        PASSWORD VALIDATION
            ================================================= */

            if (password.length < 6) {

                showMessage(
                    "Password must contain at least 6 characters."
                );

                if (signupPassword) {
                    signupPassword.focus();
                }

                return;

            }



            /* =================================================
                    PASSWORD CONFIRMATION
            ================================================= */

            if (
                password !== confirm
            ) {

                showMessage(
                    "Passwords do not match."
                );

                if (confirmPassword) {
                    confirmPassword.focus();
                }

                return;

            }



            /* =================================================
                    TERMS & CONDITIONS
            ================================================= */

            if (
                termsCheckbox &&
                !termsCheckbox.checked
            ) {

                showMessage(
                    "Please accept the Terms & Conditions."
                );

                return;

            }



            /* =================================================
                        GET EXISTING USERS
            ================================================= */

            const users =
                getUsers();



            /* =================================================
                        CHECK EMAIL
            ================================================= */

            const existingUser =
                users.find(
                    user =>
                        user.email === email
                );


            if (existingUser) {

                showMessage(
                    "An account with this email already exists."
                );

                if (signupEmail) {
                    signupEmail.focus();
                }

                return;

            }



            /* =================================================
                        CREATE USER
            ================================================= */

            const newUser = {

                id:
                    Date.now(),

                name:
                    name,

                email:
                    email,

                phone:
                    phone,

                password:
                    password,

                createdAt:
                    new Date()
                        .toISOString()

            };



            /* =================================================
                        SAVE USER
            ================================================= */

            users.push(
                newUser
            );

            saveUsers(
                users
            );



            /* =================================================
                        SUCCESS MESSAGE
            ================================================= */

            showMessage(
                "Account created successfully! Redirecting to login...",
                "success"
            );



            /* =================================================
                        RESET FORM
            ================================================= */

            signupForm.reset();



            /* =================================================
                        REDIRECT
            ================================================= */

            setTimeout(
                function () {

                    window.location.href =
                        "login.html";

                },
                1500
            );

        }
    );

}



/* =====================================================
                PHONE INPUT
===================================================== */

if (signupPhone) {

    signupPhone.addEventListener(
        "input",
        function () {

            this.value =
                this.value
                    .replace(
                        /\D/g,
                        ""
                    )
                    .slice(
                        0,
                        10
                    );

        }
    );

}



/* =====================================================
                INITIALIZE
===================================================== */

if (authMessage) {

    authMessage.textContent =
        "";

    authMessage.className =
        "signup-message";

}