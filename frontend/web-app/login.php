<!DOCTYPE html>

<html lang="en">

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>

        Das Energiezentrum | Development Preview

    </title>

    <link
        rel="preconnect"
        href="https://fonts.googleapis.com">

    <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossorigin>

    <link
        href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
        rel="stylesheet">

    <link
        rel="stylesheet"
        href="./css/login.css">

        <link
    rel="stylesheet"
    href="./css/components/animations.css">

</head>

<body>

    <main
        class="login-page">

<section
    class="login-card fade-slide-in">

            <img
                src="./assets/images/logo-full.png"
                alt="Das Energie Zentrum Logo"
                class="login-logo">

            <h1>

                Development Preview

            </h1>

            <p>

                Authorized access for project stakeholders.

            </p>

<form

    action="authenticate.php"

    method="POST"

    id="login-form">

                <label
                    for="username">

                    Username

                </label>

                <input
                    id="username"
name="username"
                    type="text"
                    
                    required>

                <label
                    for="password">

                    Password

                </label>

                <input
                    id="password"
name="password"
                    type="password"
                    required>

                <button
                    type="submit">

                    Access Preview

                </button>

            </form>

            <small>

                Das Energiezentrum Development Environment

            </small>

        </section>

    </main>
<!--
   <script
    type="module"
    src="./js/core/login.js">
</script> 
-->
</body>

</html>