<?php require_once "./includes/session.php";?>

<!DOCTYPE html>
<html lang="en">

<?php require_once "./includes/head.php"; ?>


<body>

    <!-- =====================================================
     [10.1.1]
     FLOATING NAVIGATION BAR
===================================================== -->

<?php require_once "./includes/navbar.php"; ?>

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

    <span class="hero-badge">

        PROFESSIONAL BUILDING PERFORMANCE PLATFORM

    </span>

    <h1>

        Building Energy Assessment

    </h1>

    <p class="hero-subtitle">

        Analyze, simulate and optimize building energy performance
        using an interactive engineering platform.

    </p>

    <div class="hero-features">

        <div class="hero-feature">

            ✓ Interactive Building Analysis

        </div>

        <div class="hero-feature">

            ✓ Live Environmental Simulation

        </div>

        <div class="hero-feature">

            ✓ Professional Energy Recommendations

        </div>

    </div>

    <a
        href="#building-analysis"
        class="primary-button">

        Start Building Assessment

    </a>

</div>

</header>

        <!-- [3.1.9]
             Backend API system status section.
        -->
        <section 
        id="system-status"
        class="system-status-section reveal-section">
            <div class="container">

            <!-- [3.1.10]
                 System status heading.
            -->
            <h2>System Status</h2>

            <!-- [3.1.11]
                 Dynamic backend connection status output.
            -->
          <div class="platform-status-grid">

    <div class="platform-status-card">

        <h3>

            Backend API

        </h3>

        <span
            id="api-status">

            Checking...

        </span>

    </div>

    <div class="platform-status-card">

        <h3>

            SVG Engine

        </h3>

        <span>

            Ready

        </span>

    </div>

    <div class="platform-status-card">

        <h3>

            Calculation Engine

        </h3>

        <span>

            Ready

        </span>

    </div>

    <div class="platform-status-card">

        <h3>

            Session

        </h3>

        <span>

            Active

        </span>

    </div>

</div>
        </section>



        <!-- [3.1.12]
             Interactive energy house visualization section.
        -->

     <!-- =====================================================
     [16.6.1]
     ENERGY ASSESSMENT CALCULATOR
===================================================== -->

<section
    id="energy-calculator"
    class="energy-calculator-section reveal-section">

    <div class="container">

        <!-- [16.6.2]
             Calculator section heading.
        -->
        <div class="energy-calculator-header">

            <h2>
                Energy Assessment Calculator
            </h2>

            <p>
                Enter the property's basic information to
                generate an initial energy performance assessment.
            </p>

        </div>


        <!-- [16.6.3]
             Calculator form.
        -->
        <form
            id="energy-calculator-form"
            class="energy-calculator-form"
            novalidate>

<!-- =================================================
     [16.6.4]
     HOUSE TYPE
================================================== -->

<div class="calculator-field">

    <label for="house-type">

        Type of House

    </label>

    <select
        id="house-type"
        name="houseType"
        required>

        <option
            value=""
            selected
            disabled>

            Select house type

        </option>

        <option value="detached">

            Detached House

        </option>

        <option value="semi-detached">

            Semi-Detached House

        </option>

        <option value="apartment">

            Apartment

        </option>

    </select>

    <small>

        Select the type of property being assessed.

    </small>

</div>

<!-- =================================================
     [19.3.1]
     BUILDING CONFIGURATION SELECTION
================================================== -->

<div
    class="calculator-field building-configuration-group">

    <label for="attic-configuration-selector">

        Attic Configuration

    </label>

    <select
        id="attic-configuration-selector"
        name="atticConfiguration">

        <option value="none">

            No Attic

        </option>

        <option value="unheated">

            Unheated Attic

        </option>

        <option value="heated">

            Heated Attic

        </option>

    </select>

    <small>

        Select the attic configuration of the building.

    </small>

</div>
            <!-- =================================================
                 [16.6.4]
                 HOUSE SIZE
            ================================================== -->

            <div class="calculator-field">

                <label for="house-size">

                    House Size (m²)

                </label>

                <input
                    type="number"
                    id="house-size"
                    name="houseSizeM2"
                    min="20"
                    max="2000"
                    step="1"
                    required>

                <small>
                    Enter a value between 20 and 2000 m².
                </small>

            </div>


            <!-- =================================================
                 [16.6.5]
                 OCCUPANTS
            ================================================== -->

            <div class="calculator-field">

                <label for="occupants">

                    Number of Occupants

                </label>

                <input
                    type="number"
                    id="occupants"
                    name="occupants"
                    min="1"
                    max="20"
                    step="1"
                    required>

                <small>
                    Enter the number of people living in the property.
                </small>

            </div>


            <!-- =================================================
                 [16.6.6]
                 HEATING TYPE
            ================================================== -->

            <div class="calculator-field">

                <label for="heating-type">

                    Primary Heating System

                </label>

                <select
                    id="heating-type"
                    name="heatingType"
                    required>

                    <option
                        value=""
                        selected
                        disabled>

                        Select heating system

                    </option>

                    <option value="gas">
                        Natural Gas
                    </option>

                    <option value="oil">
                        Heating Oil
                    </option>

                    <option value="electric">
                        Electric Heating
                    </option>

                    <option value="heat-pump">
                        Heat Pump
                    </option>

                    <option value="district-heating">
                        District Heating
                    </option>

                    <option value="wood-pellet">
                        Wood Pellet
                    </option>

                    <option value="other">
                        Other
                    </option>

                </select>

            </div>


            <!-- =================================================
                 [16.6.7]
                 ANNUAL ENERGY CONSUMPTION
            ================================================== -->

            <div class="calculator-field">

                <label for="annual-consumption">

                    Annual Energy Consumption (kWh/year)

                </label>

                <input
                    type="number"
                    id="annual-consumption"
                    name="annualConsumptionKwh"
                    min="500"
                    max="200000"
                    step="1"
                    required>

                <small>
                    Enter annual energy consumption between
                    500 and 200,000 kWh.
                </small>

            </div>


            <!-- =================================================
                 [16.6.8]
                 CONSTRUCTION YEAR
            ================================================== -->

            <div class="calculator-field">

                <label for="year-built">

                    Construction Year

                </label>

                <input
                    type="number"
                    id="year-built"
                    name="yearBuilt"
                    min="1800"
                    max="2026"
                    step="1"
                    required>

                <small>
                    Enter the approximate construction year.
                </small>

            </div>


            <!-- =================================================
                 [16.6.9]
                 VALIDATION ERROR CONTAINER
            ================================================== -->

            <div
                id="energy-calculator-errors"
                class="energy-calculator-errors"
                role="alert"
                aria-live="polite"
                hidden>
            </div>


            <!-- =================================================
                 [16.6.10]
                 CALCULATOR SUBMISSION
            ================================================= -->

            <div class="energy-calculator-actions">

                <button
                    type="submit"
                    class="primary-button">

                    Calculate Energy Assessment

                </button>

                <br>

                <button
                    id="downloadAssessmentReportButton"
                    type="button">

                    Download Assessment Report

                </button>


            </div>

        </form>


        <!-- =================================================
             [16.6.11]
             CALCULATOR RESULT PLACEHOLDER
        ================================================== -->

        <div
            id="energy-calculator-result"
            class="energy-calculator-result"
            aria-live="polite">

        </div>

    </div>

</section> 

        <!-- =====================================================
     [5.9.1]
     ENVIRONMENTAL SIMULATION CONTROLS
===================================================== -->
<section 
    id="simulation"
    class="environment-controls-section reveal-section">
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

    <!-- =================================================
     [18.12.4.1]
     SOLAR GEOGRAPHIC POSITION CONTROL
================================================== -->

<div class="environment-control-group">

    <label for="solar-geographic-position-slider">

        Solar Geographic Position

    </label>

    <input
        type="range"
        id="solar-geographic-position-slider"
        min="0"
        max="100"
        value="50"
    >

    <div
        class="solar-geographic-scale"
        aria-hidden="true">

        <span>
            Northern Germany
        </span>

        <span>
            Central Germany
        </span>

        <span>
            Southern Germany
        </span>

    </div>

</div>

<!-- =================================================
     [18.12.7.1]
     SOLAR RESOURCE OUTPUT
================================================== -->

<div
    class="environment-control-group solar-resource-output">

    <span class="solar-resource-label">
        Estimated Solar Resource
    </span>

    <strong
        id="solar-resource-output">
        -- kWh/m²
    </strong>

</div>

</div>

</section>

      <!-- =====================================================
[12.4.1]
Premium Building Analysis Card
===================================================== -->

<section 
    id="building-analysis"
    class="interactive-house-section reveal-section">

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
    class="house-interaction-wrapper">

    <!-- =====================================================
         [15.1.1]
         TOUCH GUIDANCE OVERLAY
    ====================================================== -->

    <div
        id="touch-guidance"
        class="touch-guidance hidden">

        👆 Tap a building system to configure it

    </div>

    <div
        id="interactive-house-container"
        class="house-svg-container">

    </div>

</div>

            </div>

        </div>

        <!-- ========================================= -->
        <!-- [12.4.4] -->
        <!-- Information panel -->
        <!-- ========================================= -->

        <div class="building-analysis-footer">

<div class="building-system-status">

    <div class="system-status-item">

        <strong>

            Roof

        </strong>

        <span>

            Ready

        </span>

    </div>

    <div class="system-status-item">

        <strong>

            Walls

        </strong>

        <span>

            Ready

        </span>

    </div>

    <div class="system-status-item">

        <strong>

            Heating

        </strong>

        <span>

            Ready

        </span>

    </div>

    <div class="system-status-item">

        <strong>

            Solar

        </strong>

        <span>

            Available

        </span>

    </div>

</div>

<div id="house-tooltip">

    Hover over a building system to inspect it.

</div>

        </div>

    </div>
</div>

</section>

              <!-- [4.5.1] -->
<!-- Dynamic energy intelligence dashboard -->
<section 
    id="dashboard"
    class="energy-dashboard-section reveal-section">
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
     [16.9.12]
     CALCULATOR INTELLIGENCE SCORE
===================================================== -->

<div class="calculator-intelligence-card">

    <h3>
        Building Assessment Score
    </h3>

    <div id="calculator-energy-score">
        0%
    </div>

    <span id="calculator-classification">
        Awaiting Assessment
    </span>

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
<div 
    id="consultation"
    class="consultation-cta">

    <!-- [4.8.2] -->
    <!-- Dynamic CTA heading -->
    <h3 id="cta-heading">
        Ready For A Professional Energy Assessment?
    </h3>

    <!-- [4.8.3] -->
    <!-- Dynamic CTA description -->
    <p id="cta-description">
        Book a consultation with Das Energiezentrum and receive a professional building efficiency assessment.
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


<?php require_once "./includes/footer.php"; ?>

<script src="assets/vendor/jspdf/jspdf.umd.min.js"></script>


    <script type="module"
            src="./js/main.js">
    </script>

    <script
    type="module"
    src="/js/controllers/assessmentReportController.js"
></script>

</body>

</html>