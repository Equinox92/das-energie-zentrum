<?php
$currentPage = basename($_SERVER["PHP_SELF"]);
?>

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

                Das Energiezentrum

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

<?php else : ?>

    <li>
        <a href="index.php">
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

<?php endif; ?>

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