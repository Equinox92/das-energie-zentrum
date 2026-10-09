<?php
$currentPage = basename($_SERVER["PHP_SELF"]);
?>

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

            Das Energiezentrum

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

<?php if ($currentPage === "assessment.php") : ?>

        <li>
        <a href="index.php">
            Home
        </a>
    </li>

    <li>
        <a href="#system-status">
            Platform
        </a>
    </li>

    <li>
        <a href="#building-analysis">
            Building Analysis
        </a>
    </li>

    <li>
        <a href="#simulation">
            Simulation
        </a>
    </li>

    <li>
        <a href="#dashboard">
            Dashboard
        </a>
    </li>

    <li>
        <a href="#consultation">
            Consultation
        </a>
    </li>

<?php else : ?>

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

<?php endif; ?>

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


