<?php
function site_scripts() {
  global $wp_styles; // Call global $wp_styles variable to add conditional wrapper around ie stylesheet the WordPress way

    // Adding scripts file in the footer
    wp_enqueue_script( 'foundation-js', get_template_directory_uri() . '/assets/scripts/scripts.js', array( 'jquery' ), filemtime(get_template_directory() . '/assets/scripts/js'), 'true' );

    // Bundle JS file
    wp_enqueue_script( 'main-js', get_template_directory_uri() . '/dist/main.js', array('jquery'), null, 'true' );
   
    // Register main stylesheet
    //wp_enqueue_style( 'foundation-css', get_template_directory_uri() . '/assets/styles/style.css', array(), filemtime(get_template_directory() . '/assets/styles/scss'), 'all' );
    wp_enqueue_style( 'site-css', get_template_directory_uri() . '/dist/main.css', array(), null, 'all' );

    // Comment reply script for threaded comments
    if ( is_singular() AND comments_open() AND (get_option('thread_comments') == 1)) {
      wp_enqueue_script( 'comment-reply' );
    }
}
add_action('wp_enqueue_scripts', 'site_scripts', 999);


function replace_core_jquery_version() {
  wp_deregister_script( 'jquery' );
  // Change the URL if you want to load a local copy of jQuery from your own server.
  wp_register_script( 'jquery', "https://code.jquery.com/jquery-3.2.1.min.js", array(), '3.1.1' );
}
add_action( 'wp_enqueue_scripts', 'replace_core_jquery_version' );