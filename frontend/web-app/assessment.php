<?php require_once "./includes/session.php";?>

<!DOCTYPE html>
<html lang="en">

<head>

    <!-- [3.1.1]
         Defines UTF-8 encoding for international text support.
    -->
    <meta charset="UTF-8">

    <!-- [3.1.2]
         Enables responsive rendering on mobile devices.
    -->
    <meta name="viewport"
          content="width=device-width, initial-scale=1.0">

    <!-- [3.1.3]
         Defines browser tab title.
    -->
    <title>Dasenergiezentrum</title>

    <!-- [3.1.4]
         Loads global application stylesheet.
    -->
    <link rel="stylesheet" href="./css/base/reset.css">

<link rel="stylesheet" href="./css/base/variables.css">

<link rel="stylesheet"
href="./css/components/hero.css">

<link
    rel="stylesheet"
    href="./css/components/navbar.css">

    <link
    rel="stylesheet"
    href="./css/components/buttons.css">

<link
    rel="stylesheet"
    href="./css/components/footer.css">


<link rel="stylesheet" href="./css/main.css">



    

          <link rel="stylesheet" href="css/components/animations.css">

</head>

<body>

    <!-- =====================================================
     [10.1.1]
     FLOATING NAVIGATION BAR
===================================================== -->

<nav class="floating-navbar">

    <div class="navbar-container">

    <!-- =====================================================
         [10.1.2]
         Brand Identity Area
    ===================================================== -->

    <div class="navbar-brand">


    <img
        src="./assets/images/logo-placeholder.png"
        alt="Das Energie Zentrum Logo"
        class="navbar-logo">

        <span>

            Dasenergiezentrum

        </span>

    </div>

    <!-- =====================================================
         [10.1.3]
         Primary Navigation
    ===================================================== -->

    <!-- =====================================================
     [10.6.5]
     MOBILE MENU TOGGLE BUTTON
===================================================== -->

<button
    id="mobile-menu-button"
    class="mobile-menu-button">

    ☰

</button>

    <ul class="navbar-links">

        <li>

            <a href="#hero">

                Home

            </a>

        </li>

        <li>

            <a href="#about">

                About

            </a>

        </li>

        <li>

            <a href="#services">

                Services

            </a>

        </li>

        <li>

            <a href="#house">

                Building Systems

            </a>

        </li>

        <li>

            <a href="#contact">

                Contact

            </a>

        </li>

    </ul>

<!-- =====================================================
     [11.3.1]
     Language Switcher
===================================================== -->

<div
    class="language-switcher">

    <button
        class="language-option active-language">

        🇩🇪 DE

    </button>

    <button
        class="language-option">

         🇬🇧 EN

    </button>

</div>

</div>

</nav>

    <!-- [3.1.5]
         Main application layout wrapper.
    -->
    <div class="app-container">

        <!-- [3.1.6]
             Main hero branding section.
        -->
<header class="hero-section">

    <div class="container hero-content">

        <img
            src="./assets/images/logo-full.png"
            alt="Das Energie Zentrum Logo"
            class="hero-logo">

        <h1>
            Building Energy Assessment
        </h1>

        <p>
            Professional Energy Efficiency Analysis
        </p>

    </div>

</header>

        <!-- [3.1.9]
             Backend API system status section.
        -->
        <section class="system-status-section reveal-section">
            <div class="container">

            <!-- [3.1.10]
                 System status heading.
            -->
            <h2>System Status</h2>

            <!-- [3.1.11]
                 Dynamic backend connection status output.
            -->
            <div id="api-status">
                Checking backend connection...
            </div>
        </div>

        </section>



        <!-- [3.1.12]
             Interactive energy house visualization section.
        -->
      <!-- =====================================================
[12.4.1]
Premium Building Analysis Card
===================================================== -->

<section class="interactive-house-section reveal-section">

    <div class="container">

    <div class="building-analysis-card">

        <!-- ========================================= -->
        <!-- [12.4.2] -->
        <!-- Premium card header -->
        <!-- ========================================= -->

        <div class="building-analysis-header">

            <h2>

                Building Energy Analysis

            </h2>

            <p>

                Explore the building to identify
                efficiency opportunities.

            </p>

        </div>

        <!-- ========================================= -->
        <!-- [12.4.3] -->
        <!-- Interactive visualization -->
        <!-- ========================================= -->

        <div class="building-analysis-content">

            <div class="interactive-house-wrapper">

                <div id="configure-badge">

                    ⚡ Configure

                </div>

                <div id="configuration-panel">

                    <h3>

                        System Configuration

                    </h3>

                    <ul id="configuration-options">

                    </ul>

                </div>

                <div
                    id="interactive-house-container"
                    class="house-svg-container">

                </div>

            </div>

        </div>

        <!-- ========================================= -->
        <!-- [12.4.4] -->
        <!-- Information panel -->
        <!-- ========================================= -->

        <div class="building-analysis-footer">

            <div id="house-tooltip">

                Hover over a house section.

            </div>

        </div>

    </div>
</div>

</section>

      

        <!-- =====================================================
     [5.9.1]
     ENVIRONMENTAL SIMULATION CONTROLS
===================================================== -->
<section class="environment-controls-section reveal-section">
    <div class="container">

    <!-- [5.9.2]
         Simulation controls heading.
    -->
    <h2>
        Environmental Simulation
    </h2>

    <!-- [5.9.3]
         Season simulation controls.
    -->
    <div class="environment-control-group">

        <label for="season-selector">
            Active Season
        </label>

        <select id="season-selector">

            <option value="winter">
                Winter
            </option>

            <option value="summer">
                Summer
            </option>

        </select>
    </div>

    <!-- [5.9.4]
         Solar intensity simulation controls.
    -->
    <div class="environment-control-group">

        <label for="solar-intensity-slider">
            Solar Intensity
        </label>

        <input
            type="range"
            id= "solar-intensity-slider"
            min="0"
            max="100"
            value="70"
        >

    </div>
</div>

</section>

              <!-- [4.5.1] -->
<!-- Dynamic energy intelligence dashboard -->
<section class="energy-dashboard-section reveal-section">
    <div class="container">

    <!-- [4.5.2] -->
    <!-- Live building energy score -->
    <h2>
        Energy Efficiency Dashboard
    </h2>

    <!-- [4.5.3] -->
    <!-- Dynamic energy score container -->
    <div id="energy-score">
        0%
    </div>

    <!-- =====================================================
     [8.2.11]
     ENGINEERING ANALYTICS DASHBOARD
===================================================== -->

<div class="analytics-dashboard">

    <!-- [8.2.12]
         Estimated savings metric.
    -->
    <div class="analytics-card">

        <h3>
            Estimated Savings
        </h3>

        <div id="estimated-savings">
            R 0
        </div>

    </div>

    <!-- [8.2.13]
         Carbon reduction metric.
    -->
    <div class="analytics-card">

        <h3>
            Carbon Reduction
        </h3>

        <div id="carbon-reduction">
            0%
        </div>

    </div>

    <!-- [8.2.14]
         Thermal efficiency metric.
    -->
    <div class="analytics-card">

        <h3>
            Thermal Efficiency
        </h3>

        <div id="thermal-efficiency">
            Low
        </div>

    </div>

    <!-- [8.2.15]
         Optimization classification metric.
    -->
    <div class="analytics-card">

        <h3>
            Optimization Level
        </h3>

        <div id="optimization-level">
            Basic
        </div>

    </div>

</div>

    <!-- [4.5.4] -->
    <!-- Recommendation heading -->
    <h2>
        Recommendations
    </h2>

    <!-- [4.5.5] -->
    <!-- Dynamic recommendation rendering container -->
    <ul id="energy-recommendations">

    </ul>



    <!-- [4.8.1] -->
<!-- Intelligent consultation CTA section -->
<div class="consultation-cta">

    <!-- [4.8.2] -->
    <!-- Dynamic CTA heading -->
    <h3 id="cta-heading">
        Ready For A Professional Energy Assessment?
    </h3>

    <!-- [4.8.3] -->
    <!-- Dynamic CTA description -->
    <p id="cta-description">
        Book a consultation with Das Energie Zentrum and receive a professional building efficiency assessment.
    </p>

    <!-- [4.8.4] -->
    <!-- CTA action controls -->
    <div class="cta-buttons">

        <!-- [4.8.5] -->
        <!-- WhatsApp consultation action -->
        <button class="cta-button">
            Book Consultation
        </button>

        <!-- [4.8.6] -->
        <!-- Email consultation action -->
        <button class="cta-button">
            Request Report
        </button>

        <!-- [FUTURE ADMIN MODULE] -->
        <!-- Internal expert dashboard hook -->
        <!-- Reserved for authenticated expert workflows -->

        <!-- [FUTURE COMPONENT MODULE] -->
        <!-- Drag-and-drop engineering component hooks -->

        <!-- [FUTURE GDPR MODULE] -->
        <!-- Client document uploads intentionally disabled -->

    </div>

</div>
</div>
</section>

    

    <!-- [3.1.20]
         Loads modular JavaScript application entry point.
    -->

    <!-- =====================================================
     [10.4.1]
     PROFESSIONAL FOOTER
===================================================== -->

<footer
    class="site-footer">

    <!-- =====================================================
         [10.4.2]
         Footer Grid
    ===================================================== -->

    <div
        class="footer-grid">

        <!-- =====================================================
             [10.4.3]
             Company Information
        ===================================================== -->

        <div
            class="footer-column">

            <h3>

                Das Energie Zentrum

            </h3>

            <p>

                Professional energy consulting,
                technical planning,
                building performance
                and energy optimization.

            </p>

        </div>

        <!-- =====================================================
             [10.4.4]
             Navigation
        ===================================================== -->

        <div
            class="footer-column">

            <h3>

                Navigation

            </h3>

            <ul>

                <li>

                    <a href="#hero">

                        Home

                    </a>

                </li>

                <li>

                    <a href="#about">

                        About

                    </a>

                </li>

                <li>

                    <a href="#services">

                        Services

                    </a>

                </li>

                <li>

                    <a href="#house">

                        Building Systems

                    </a>

                </li>

            </ul>

        </div>

        <!-- =====================================================
             [10.4.5]
             Contact
        ===================================================== -->

        <div
            class="footer-column">

            <h3>

                Contact

            </h3>

            <p>

                info@dasenergiezentrum.de

            </p>

            <p>

<a
    href="https://www.linkedin.com/in/gidopeuster-0159661b3"
    target="_blank">

    LinkedIn Profile

</a>

            </p>

        </div>

        <!-- =====================================================
             [10.4.6]
             Legal Placeholder
        ===================================================== -->

        <div
            class="footer-column">

            <h3>

                Legal

            </h3>

            <p>

                Impressum
                (Coming Soon)

            </p>

            <p>

                Privacy Policy
                (Coming Soon)

            </p>

        </div>

    </div>

</footer>



    <script type="module"
            src="./js/main.js">
    </script>

</body>

</html>