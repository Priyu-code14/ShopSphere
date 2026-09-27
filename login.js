/* =====================================================
                SHOPSPHERE LOGIN
===================================================== */


/* =====================================================
                DOM ELEMENTS
===================================================== */

const loginForm =
    document.getElementById("loginForm");

const loginEmail =
    document.getElementById("loginEmail");

const loginPassword =
    document.getElementById("loginPassword");

const togglePassword =
    document.getElementById("togglePassword");

const loginMessage =
    document.getElementById("loginMessage");

const forgotPassword =
    document.getElementById("forgotPassword");



/* =====================================================
                SHOW MESSAGE
===================================================== */

function showLoginMessage(
    message,
    type = "error"
) {

    if (!loginMessage) {
        return;
    }


    loginMessage.textContent =
        message;


    loginMessage.className =
        `login-message show ${type}`;


    setTimeout(() => {

        loginMessage.classList.remove(
            "show"
        );

    }, 3500);

}



/* =====================================================
                SHOW / HIDE PASSWORD
===================================================== */

if (togglePassword) {

    togglePassword.addEventListener(
        "click",
        () => {

            if (!loginPassword) {
                return;
            }


            if (
                loginPassword.type ===
                "password"
            ) {

                loginPassword.type =
                    "text";


                togglePassword.innerHTML =
                    '<i class="bi bi-eye-slash"></i>';


                togglePassword.setAttribute(
                    "aria-label",
                    "Hide password"
                );

            }

            else {

                loginPassword.type =
                    "password";


                togglePassword.innerHTML =
                    '<i class="bi bi-eye"></i>';


                togglePassword.setAttribute(
                    "aria-label",
                    "Show password"
                );

            }

        }
    );

}



/* =====================================================
                GET ALL REGISTERED USERS
===================================================== */

function getUsers() {

    try {

        return JSON.parse(
            localStorage.getItem(
                "shopsphereUsers"
            )
        ) || [];

    }

    catch (error) {

        console.error(
            "Unable to read registered users.",
            error
        );

        return [];

    }

}



/* =====================================================
                FIND USER BY EMAIL
===================================================== */

function findUserByEmail(
    email
) {

    const users =
        getUsers();


    return users.find(
        user =>
            user.email &&
            user.email.toLowerCase() ===
            email.toLowerCase()
    ) || null;

}



/* =====================================================
                SAVE LOGIN SESSION
===================================================== */

function saveLoginSession(
    user
) {

    const session = {

        id:
            user.id,

        name:
            user.name,

        email:
            user.email,

        phone:
            user.phone || "",

        loggedIn:
            true,

        loginTime:
            new Date().toISOString()

    };


    localStorage.setItem(
        "shopsphereLoggedIn",
        JSON.stringify(
            session
        )
    );

}



/* =====================================================
                LOGIN FORM
===================================================== */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            /* =================================================
                        GET FORM VALUES
            ================================================= */

            const email =
                loginEmail
                    ? loginEmail.value
                        .trim()
                        .toLowerCase()
                    : "";


            const password =
                loginPassword
                    ? loginPassword.value
                    : "";



            /* =================================================
                        EMAIL VALIDATION
            ================================================= */

            if (!email) {

                showLoginMessage(
                    "Please enter your email address."
                );

                if (loginEmail) {
                    loginEmail.focus();
                }

                return;

            }


            if (
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/
                    .test(email)
            ) {

                showLoginMessage(
                    "Please enter a valid email address."
                );

                if (loginEmail) {
                    loginEmail.focus();
                }

                return;

            }



            /* =================================================
                        PASSWORD VALIDATION
            ================================================= */

            if (!password) {

                showLoginMessage(
                    "Please enter your password."
                );

                if (loginPassword) {
                    loginPassword.focus();
                }

                return;

            }


            if (password.length < 6) {

                showLoginMessage(
                    "Password must contain at least 6 characters."
                );

                if (loginPassword) {
                    loginPassword.focus();
                }

                return;

            }



            /* =================================================
                        FIND USER
            ================================================= */

            const user =
                findUserByEmail(
                    email
                );


            /* =================================================
                        USER NOT FOUND
            ================================================= */

            if (!user) {

                showLoginMessage(
                    "No account found with this email. Please sign up first."
                );

                return;

            }



            /* =================================================
                        CHECK PASSWORD
            ================================================= */

            if (
                user.password !==
                password
            ) {

                showLoginMessage(
                    "Incorrect email or password."
                );

                if (loginPassword) {
                    loginPassword.focus();
                }

                return;

            }



            /* =================================================
                        LOGIN SUCCESS
            ================================================= */

            saveLoginSession(
                user
            );



            /* =================================================
                        REMEMBER ME
            ================================================= */

            const rememberMe =
                document.getElementById(
                    "rememberMe"
                );


            if (
                rememberMe &&
                rememberMe.checked
            ) {

                localStorage.setItem(
                    "shopsphereRememberMe",
                    "true"
                );


                localStorage.setItem(
                    "shopsphereRememberedEmail",
                    email
                );

            }

            else {

                localStorage.removeItem(
                    "shopsphereRememberMe"
                );


                localStorage.removeItem(
                    "shopsphereRememberedEmail"
                );

            }



            /* =================================================
                        SUCCESS MESSAGE
            ================================================= */

            showLoginMessage(
                `Welcome back, ${user.name}!`,
                "success"
            );



            /* =================================================
                        REDIRECT
            ================================================= */

            const redirectTarget =
                localStorage.getItem(
                    "shopsphereRedirectAfterLogin"
                ) || "index.html";


            localStorage.removeItem(
                "shopsphereRedirectAfterLogin"
            );


            setTimeout(
                () => {

                    window.location.href =
                        redirectTarget;

                },
                1200
            );

        }
    );

}



/* =====================================================
                FORGOT PASSWORD
===================================================== */

if (forgotPassword) {

    forgotPassword.addEventListener(
        "click",
        function (event) {

            event.preventDefault();


            showLoginMessage(
                "Password reset will be available after connecting ShopSphere to Django."
            );

        }
    );

}



/* =====================================================
                LOAD REMEMBERED EMAIL
===================================================== */

function loadRememberedEmail() {

    const rememberMe =
        localStorage.getItem(
            "shopsphereRememberMe"
        );


    if (
        rememberMe !== "true"
    ) {

        return;

    }


    const rememberedEmail =
        localStorage.getItem(
            "shopsphereRememberedEmail"
        );


    if (
        rememberedEmail &&
        loginEmail
    ) {

        loginEmail.value =
            rememberedEmail;


        const rememberCheckbox =
            document.getElementById(
                "rememberMe"
            );


        if (rememberCheckbox) {

            rememberCheckbox.checked =
                true;

        }

    }

}



/* =====================================================
                CHECK EXISTING LOGIN
===================================================== */

function checkExistingLogin() {

    try {

        const session =
            JSON.parse(
                localStorage.getItem(
                    "shopsphereLoggedIn"
                )
            );


        if (
            session &&
            session.loggedIn === true
        ) {

            console.log(
                `Already logged in as ${session.name}`
            );

        }

    }

    catch (error) {

        console.error(
            "Unable to check login session.",
            error
        );

    }

}



/* =====================================================
                INITIALIZE
===================================================== */

loadRememberedEmail();

checkExistingLogin();