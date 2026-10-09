
<?php

/* =====================================================
   [13.2.1]
   Determine the active page for stylesheet loading.
===================================================== */

$currentPage = basename($_SERVER["PHP_SELF"]);

?>

<head>

    <meta charset="UTF-8">

    <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0">

    <title>
        Das Energie Zentrum
    </title>



    <?php if ($currentPage === "assessment.php") : ?>


    <!-- Assessment styles -->

    <!-- =====================================================
     [10.6.10]
     Google Font Import
===================================================== -->

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

 <!-- [3.1.4]
  
         Loads global application stylesheet.
    -->

<!-- ===================================== -->
<!-- Base -->
<!-- ===================================== -->

<link rel="stylesheet" href="./css/base/reset.css">
<link rel="stylesheet" href="./css/base/variables.css">
<link rel="stylesheet" href="./css/base/typography.css">
<link rel="stylesheet" href="./css/base/globals.css">
<link rel="stylesheet" href="./css/base/utilities.css">
<link rel="stylesheet" href="./css/components/layout.css">

<!-- ===================================== -->
<!-- Components -->
<!-- ===================================== -->

<link rel="stylesheet" href="./css/components/navbar.css">
<link rel="stylesheet" href="./css/components/buttons.css">

<link rel="stylesheet" href="./css/components/cta.css">

<link rel="stylesheet" href="./css/components/footer.css">
<link rel="stylesheet" href="./css/components/animations.css">

<!-- ===================================== -->
<!-- Assessment Styles -->
<!-- ===================================== -->

<link rel="stylesheet" href="./css/components/hero.css">
<link rel="stylesheet" href="./css/main.css">
<link rel="stylesheet" href="./css/pages/assessment.css">



<?php else : ?>


    <!-- Landing page styles -->

<!-- =====================================================
     [10.6.10]
     Google Font Import
===================================================== -->

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

<!-- ===================================== -->
<!-- Base -->
<!-- ===================================== -->

<link rel="stylesheet" href="./css/base/reset.css">
<link rel="stylesheet" href="./css/base/variables.css">
<link rel="stylesheet" href="./css/base/typography.css">
<link rel="stylesheet" href="./css/base/globals.css">
<link rel="stylesheet" href="./css/base/utilities.css">
<link rel="stylesheet" href="./css/components/layout.css">

<!-- ===================================== -->
<!-- Components -->
<!-- ===================================== -->

<link rel="stylesheet" href="./css/components/navbar.css">
<link rel="stylesheet" href="./css/components/buttons.css">
<link rel="stylesheet" href="./css/components/about.css">
<link rel="stylesheet"href="./css/components/credibility.css">
<link rel="stylesheet" href="./css/components/house-explorer.css">
<link rel="stylesheet" href="./css/components/experience-banner.css">
<link rel="stylesheet" href="./css/components/cta.css">
<link rel="stylesheet" href="./css/components/footer.css">
<link rel="stylesheet" href="./css/components/animations.css">

<!-- ===================================== -->
<!-- Page Styles -->
<!-- ===================================== -->

<!-- index.php -->
<link rel="stylesheet" href="./css/landing-page.css">

<!-- ===================================== -->
<!-- Page Specific Styles -->
<!-- Loaded only by the page that requires them -->
<!-- ===================================== -->


<link rel="stylesheet" href="./css/pages/landing-page.css">

<!-- Hero Section 
<link rel="stylesheet" href="./css/components/hero.css">
It shrinks the logo 
-->

    <link rel="stylesheet" href="./css/components/forms.css">

  <link rel="stylesheet" href="./css/components/hotspot.css">


    <link rel="stylesheet" href="./css/components/cards.css">
    

<?php endif; ?>



</head>