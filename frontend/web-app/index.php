<?php require_once "./includes/session.php";?>

<!DOCTYPE html>
<html lang="en">

<?php require_once "./includes/head.php"; ?>

<link
    rel="stylesheet"
    href="./css/pages/landing-page.css">

<body>

    <?php require "./includes/navbar.php"; ?>

    <!-- [9.4.1] -->
    <!-- Main website wrapper -->
    <div class="website-container">

        <!-- ====================================== -->
        <!-- HERO SECTION -->
        <!-- ====================================== -->

        <section id="hero" class="hero-section">

<!-- =====================================================
     [10.5.7]
     HERO GRID
===================================================== -->

<div
    class="hero-grid">

    <!-- =====================================================
         [10.5.8]
         Hero Content
    ===================================================== -->

    <div
        class="hero-left">

        <img
            src="./assets/images/logo-full.png"
            alt="Das Energie Zentrum Logo"
            class="hero-logo">

<!-- =====================================================
     [12.3.1]
     PRIMARY CONSULTATION BUTTON
===================================================== -->

<a
    href="#contact"
    class="primary-button">

    Book Consultation

</a>

    </div>

    <!-- =====================================================
         [10.5.9]
         Professional Portrait
    ===================================================== -->

    <div
        class="hero-right">

        <img
            src="./assets/images/gido-placeholder.jpg"
            alt="Gido Peuster"
            class="hero-portrait">

    </div>

</div>

        </section>

        <!-- ====================================== -->
        <!-- ABOUT SECTION -->
        <!-- ====================================== -->

<!-- =====================================================
     [10.2.1]
     PROFESSIONAL EXPERT PROFILE
===================================================== -->

<!-- =====================================================
     [10.5.1]
     CORE EXPERTISE SECTION
===================================================== -->

<section
id="about" 
    class="expertise-section">

    <h2>

        Core Expertise

    </h2>

    <div
        class="expertise-grid">

        <!-- =====================================================
             [10.5.2]
             Expertise Card
        ===================================================== -->

        <div
            class="expertise-card">

            Heat Pump Systems

        </div>

        <!-- =====================================================
             [10.5.3]
             Expertise Card
        ===================================================== -->

        <div
            class="expertise-card">

            Energy Planning

        </div>

        <!-- =====================================================
             [10.5.4]
             Expertise Card
        ===================================================== -->

        <div
            class="expertise-card">

            Building Performance

        </div>

        <!-- =====================================================
             [10.5.5]
             Expertise Card
        ===================================================== -->

        <div
            class="expertise-card">

            System Validation

        </div>

        <!-- =====================================================
             [10.5.6]
             Expertise Card
        ===================================================== -->

        <div
            class="expertise-card">

            Technical Consulting

        </div>

    </div>

</section>

<!-- =====================================================
     [10.3.1]
     PROFESSIONAL CREDIBILITY SECTION
===================================================== -->

<section
    class="credibility-section">

    <h2>

        Why Work With Das Energiezentrum

    </h2>

    <div
        class="credibility-grid">

        <!-- =====================================================
             [10.3.2]
             Credibility Card
        ===================================================== -->

        <div
            class="credibility-card">

            <h3>

                Technical Expertise

            </h3>

            <p>

                Deep understanding of energy systems,
                building performance,
                heat pumps
                and technical planning.

            </p>

        </div>

        <!-- =====================================================
             [10.3.3]
             Credibility Card
        ===================================================== -->

        <div
            class="credibility-card">

            <h3>

                Industry Experience

            </h3>

            <p>

                Years of professional experience
                within international energy
                and heating technology projects.

            </p>

        </div>

        <!-- =====================================================
             [10.3.4]
             Credibility Card
        ===================================================== -->

        <div
            class="credibility-card">

            <h3>

                Independent Perspective

            </h3>

            <p>

                Focused on practical,
                efficient
                and sustainable solutions.

            </p>

        </div>

        <!-- =====================================================
             [10.3.5]
             Credibility Card
        ===================================================== -->

        <div
            class="credibility-card">

            <h3>

                Future-Focused

            </h3>

            <p>

                Supporting modern buildings,
                renewable integration
                and long-term efficiency planning.

            </p>

        </div>

    </div>

</section>

<!-- =====================================================
     [11.5.1]
     PROFESSIONAL EXPERIENCE BANNER
===================================================== -->

<section
    class="experience-banner">

    <div
        class="experience-grid">

        <!-- =====================================================
             [11.5.2]
             Experience Metric
        ===================================================== -->

        <div
            class="experience-card">

            <h3>

                11+

            </h3>

            <p>

                Years Industry Experience

            </p>

        </div>

        <!-- =====================================================
             [11.5.3]
             Experience Metric
        ===================================================== -->

        <div
            class="experience-card">

            <h3>

                Systems Engineer

            </h3>

            <p>

                International Energy Expertise

            </p>

        </div>

        <!-- =====================================================
             [11.5.4]
             Experience Metric
        ===================================================== -->

        <div
            class="experience-card">

            <h3>

                Heat Pumps

            </h3>

            <p>

                System Planning & Validation

            </p>

        </div>

        <!-- =====================================================
             [11.5.5]
             Experience Metric
        ===================================================== -->

        <div
            class="experience-card">

            <h3>

                International

            </h3>

            <p>

                Technical Training Experience

            </p>

        </div>

    </div>

</section>
        <!-- ====================================== -->
        <!-- SERVICES SECTION -->
        <!-- ====================================== -->

        <section
            id="services"
            class="services-section">

            <h2>

                Services

            </h2>

            <div class="services-grid">

                <div class="service-card">

                    Energy Audits

                </div>

                <div class="service-card">

                    Building Efficiency

                </div>

                <div class="service-card">

                    Renewable Systems

                </div>

                <div class="service-card">

                    Compliance Consulting

                </div>

            </div>

        </section>

        <!-- ====================================== -->
        <!-- INTERACTIVE HOUSE -->
        <!-- ====================================== -->

<!-- ====================================== -->
<!-- INTERACTIVE HOUSE EXPLORER -->
<!-- ====================================== -->

<section id="house"
    class="interactive-house-section">

    <h2>

        Explore Building Systems

    </h2>

    <!-- =====================================================
         [9.8.1]
         House Explorer Card
    ===================================================== -->

    <div
        class="house-explorer">

        <!-- =====================================================
             [9.8.2]
             Interactive House Container
        ===================================================== -->

<div
    id="energy-house-container"
    class="energy-house-container">

    <div
        id="energy-house-canvas"
        class="energy-house-canvas">

        <img
            src="./assets/images/energy-house.png"
            class="energy-house-image">

        <div
            id="hotspot-tooltip"
            class="hotspot-tooltip">
        </div>

    </div>

</div>

        <!-- =====================================================
             [9.8.4]
             Service Information Panel
        ===================================================== -->

        <div
            id="service-information-panel"
            class="service-information-panel">

            <h3
                id="service-panel-title">

                Energy Efficiency Solutions

            </h3>

            <p
                id="service-panel-description">

                Explore the building systems above
                 to discover energy-saving opportunities 
                 and professional consultation services.

            </p>

            <ul
                id="service-panel-list">

            </ul>

        </div>

        </div>

</section>
        <!-- ====================================== -->
        <!-- CTA SECTION -->
        <!-- ====================================== -->

        <section
            class="cta-section">

            <h2>

                Ready To Improve
                Your Building?

            </h2>

            <a
                href="./assessment.php">

                Start Assessment

            </a>

        </section>

        <!-- =====================================================
     [11.1.1]
     CONSULTATION REQUEST SECTION
===================================================== -->

<section
    id="contact"
    class="consultation-section">

    <!-- =====================================================
         [11.1.2]
         Section Heading
    ===================================================== -->

    <div
        class="consultation-header">

        <h2>

            Request A Consultation

        </h2>

        <p>

            Tell us about your project,
            building requirements,
            or energy efficiency goals.

        </p>

    </div>

    <!-- =====================================================
         [11.1.3]
         Consultation Form
    ===================================================== -->

    <form
        class="consultation-form">

        <!-- =====================================================
     [12.3.1]
     Validation Feedback Area
===================================================== -->

<div
    id="form-feedback"
    class="form-feedback">

</div>

        <!-- =====================================================
             [11.1.4]
             Full Name
        ===================================================== -->

        <div
            class="form-group">

            <label
                for="full-name">

                Full Name

            </label>

            <input
                id="full-name"
                type="text"
                placeholder="Enter your full name">

        </div>

        <!-- =====================================================
             [11.1.5]
             Email Address
        ===================================================== -->

        <div
            class="form-group">

            <label
                for="email">

                Email Address

            </label>

            <input
                id="email"
                type="email"
                placeholder="Enter your email">

        </div>

        <!-- =====================================================
             [11.1.6]
             Property Type
        ===================================================== -->

        <div
            class="form-group">

            <label
                for="property-type">

                Property Type

            </label>

            <select
                id="property-type">

                <option>

                    Residential

                </option>

                <option>

                    Commercial

                </option>

                <option>

                    Developer

                </option>

                <option>

                    Government

                </option>

                <option>

                    Other

                </option>

            </select>

        </div>

        <!-- =====================================================
             [11.1.7]
             Project Type
        ===================================================== -->

        <div
            class="form-group">

            <label
                for="project-type">

                Project Type

            </label>

            <input
                id="project-type"
                type="text"
                placeholder="Describe the project type">

        </div>

        <!-- =====================================================
     [11.4.1]
     Consultation Category
===================================================== -->

<div
    class="form-group">

    <label
        for="consultation-category">

        Consultation Category

    </label>

    <select
        id="consultation-category">

        <option>

            Energy Audit

        </option>

        <option>

            Heat Pump Planning

        </option>

        <option>

            Building Performance

        </option>

        <option>

            Technical Planning

        </option>

        <option>

            Compliance Consulting

        </option>

        <option>

            General Consultation

        </option>

    </select>

</div>

<!-- =====================================================
     [11.4.2]
     Project Scale
===================================================== -->

<div
    class="form-group">

    <label
        for="project-scale">

        Project Scale

    </label>

    <select
        id="project-scale">

        <option>

            Small Project

        </option>

        <option>

            Medium Project

        </option>

        <option>

            Large Project

        </option>

        <option>

            Enterprise Project

        </option>

    </select>

</div>

<!-- =====================================================
     [11.4.3]
     Preferred Consultation Date
===================================================== -->

<div
    class="form-group">

    <label
        for="consultation-date">

        Preferred Consultation Date

    </label>

    <input
        id="consultation-date"
        type="date">

</div>

        <!-- =====================================================
             [11.1.8]
             Message
        ===================================================== -->

        <div
            class="form-group">

            <label
                for="message">

                Message

            </label>

            <textarea
                id="message"
                rows="6"
                placeholder="Tell us about your project">

            </textarea>

        </div>

        <!-- =====================================================
             [11.1.9]
             Submit Button
        ===================================================== -->

        <button
            type="submit"
            class="primary-button">

            Request Consultation

        </button>

        <!-- =====================================================
             [11.1.10]
             Future Integrations
        ===================================================== -->

        <!-- Future CRM Integration -->

        <!-- Future Email Automation -->

        <!-- Future Lead Scoring -->

       <!-- =====================================================
     [11.4.4]
     Future Lead Qualification

     Future CRM Routing

     Future Lead Scoring

     Future Priority Assignment

===================================================== --> 

    </form>

    <!-- =====================================================
     [12.11.1]
     Consultation Summary Card
===================================================== -->

<div
    id="consultation-summary"
    class="consultation-summary">

</div>


</section>

<!-- =====================================================
     [10.4.1]
     PROFESSIONAL FOOTER
===================================================== -->

<?php require_once "./includes/footer.php"; ?>

    </div>
<!--
    <script
    type="module"
    src="./js/core/previewGuard.js">
</script>
-->

    <script
    type="module"
    src="./js/landingMain.js">

</script>

</body>

</html>