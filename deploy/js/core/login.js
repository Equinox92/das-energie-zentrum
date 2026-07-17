// =====================================================
// [1.0.1]
// Waits until the document is fully loaded.
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        // =====================================================
        // [1.0.2]
        // Retrieves login form.
        // =====================================================

        const loginForm =
            document.getElementById(
                "login-form"
            );

        // =====================================================
        // [1.0.3]
        // Handles login submission.
        // =====================================================

        loginForm.addEventListener(
            "submit",
            (event) => {

                event.preventDefault();

                const username =
                    document
                        .getElementById("username")
                        .value
                        .trim();

                const password =
                    document
                        .getElementById("password")
                        .value;

                // =====================================================
                // [1.0.4]
                // Temporary development credentials.
                // =====================================================

                if (
                    username === "gido"
                    && password === "energie"
                ) {

                    sessionStorage.setItem(
                        "previewAuthenticated",
                        "true"
                    );

                    window.location.href =
                        "index.php";

                    return;
                }

                alert(
                    "Invalid username or password."
                );

            }
        );

    }
);