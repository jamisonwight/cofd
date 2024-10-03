<?php
/**
 * The template for displaying the header
 *
 * This is the template that displays all of the <head> section
 *
 */

$text_light = get_field('text_light');
$header_theme = ($text_light) ? 'header-light' : 'header-default';
$header_hover_white = (get_field('hover_text_white')) ? 'hover-text-white' : '';
?>

<!doctype html>

<html class="no-js" <?php language_attributes(); ?>>

<head>
    <title><?php wp_title(); ?></title>
    <meta charset="utf-8">

    <!-- Force IE to use the latest rendering engine available -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">

    <!-- Mobile Meta -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta class="foundation-mq">

    <!-- Favicons -->
    <link rel="apple-touch-icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.svg">
    <link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/images/apple-touch-icon.png">

	<?php if (!function_exists('has_site_icon') || !has_site_icon()) { ?>
            <link rel="apple-touch-icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/images/favicon.svg">
            <link rel="icon" type="image/png" href="<?php echo get_template_directory_uri(); ?>/assets/images/apple-touch-icon.png">
	    <?php 
	} ?>

    <!-- Typekit goes here -->
    <link rel="stylesheet" href="https://use.typekit.net/qqd5dbu.css">

    <!-- Fontawesome -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css" integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A==" crossorigin="anonymous" referrerpolicy="no-referrer" />

    <link rel="pingback" href="<?php bloginfo('pingback_url'); ?>">

    <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>

    <header class="header <?php echo $header_theme . ' ' . $header_hover_white; ?>" role="banner">
        <div class="logo-title text-center show-for-large">
            <span>
                Conservatory of <span>Dance</span>
            </span>
        </div>
        
        <div class="sticky-trigger"></div>
        <div class="header-wrapper">
            <?php get_template_part('parts/nav', 'title-bar') ?>
        </div>
    </header> <!-- end .header -->