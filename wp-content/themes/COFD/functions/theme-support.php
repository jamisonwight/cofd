<?php
	
// Adding WP Functions & Theme Support
function joints_theme_support() {

	// Add WP Thumbnail Support
	add_theme_support( 'post-thumbnails' );
	
	// Default thumbnail size
	set_post_thumbnail_size(125, 125, true);

	// Add RSS Support
	add_theme_support( 'automatic-feed-links' );
	
	// Add Support for WP Controlled Title Tag
	add_theme_support( 'title-tag' );
	
	// Add HTML5 Support
	add_theme_support( 'html5', 
	         array( 
	         	'comment-list', 
	         	'comment-form', 
	         	'search-form', 
	         ) 
	);
	
	
	// Adding post format support
	add_theme_support( 'post-formats',
		array(
			'aside',             // title less blurb
			'gallery',           // gallery of images
			'link',              // quick link to other site
			'image',             // an image
			'quote',             // a quick quote
			'status',            // a Facebook like status update
			'video',             // video
			'audio',             // audio
			'chat'               // chat transcript
		)
	); 

	
	// Set the maximum allowed width for any content in the theme, like oEmbeds and images added to posts.
	$GLOBALS['content_width'] = apply_filters( 'joints_theme_support', 1200 );	
	
} /* end theme support */

add_action( 'after_setup_theme', 'joints_theme_support' );


if( function_exists('acf_add_options_page') ) {
   acf_add_options_page();
}

add_filter('disable_block_recover', '__return_true');


add_filter('script_loader_tag', 'add_defer_tags_to_scripts');

function add_defer_tags_to_scripts($tag){

    # List scripts to add attributes to
    $scripts_to_defer = array('main.js');
    // $scripts_to_async = array('script_c', 'script_d');
 
    # add the defer tags to scripts_to_defer array
    foreach($scripts_to_defer as $current_script){
        if(true == strpos($tag, $current_script))
            return str_replace(' src', ' defer="defer" src', $tag);
    }
     
    return $tag;
 }

function get_post_primary_category($post_id, $term='category', $return_all_categories=false){
    $return = array();

    if (class_exists('WPSEO_Primary_Term')){
        // Show Primary category by Yoast if it is enabled & set
        $wpseo_primary_term = new WPSEO_Primary_Term( $term, $post_id );
        $primary_term = get_term($wpseo_primary_term->get_primary_term());

        if (!is_wp_error($primary_term)){
            $return['primary_category'] = $primary_term;
        }
    }

    if (empty($return['primary_category']) || $return_all_categories){
        $categories_list = get_the_terms($post_id, $term);

        if (empty($return['primary_category']) && !empty($categories_list)){
            $return['primary_category'] = $categories_list[0];  //get the first category
        }
        if ($return_all_categories){
            $return['all_categories'] = array();

            if (!empty($categories_list)){
                foreach($categories_list as &$category){
                    $return['all_categories'][] = $category->term_id;
                }
            }
        }
    }

    return $return;
}

add_action('login_enqueue_scripts', function(){
    wp_dequeue_script('user-profile');
    wp_dequeue_script('password-strength-meter');
    wp_deregister_script('user-profile');

    $suffix = SCRIPT_DEBUG ? '' : '.min';
    wp_enqueue_script( 'user-profile', "/wp-admin/js/user-profile$suffix.js", array( 'jquery', 'wp-util' ), false, 1 );
});

function uilogin_func( $args ) {
    $a = shortcode_atts( array(
        'echo' => true,
        'remember' => true,
        'redirect' =>  get_site_url().'/resources',
        'form_id' => 'loginform',
        'id_username' => 'user_login',
        'id_password' => 'user_pass',
        'id_remember' => 'rememberme',
        'id_submit' => 'wp-submit',
        'label_username' => __( 'Username or Email Address' ),
        'label_password' => __( 'Password' ),
        'label_remember' => __( 'Remember Me' ),
        'placeholder_username' => __( 'username' ),
        'placeholder_password' => __( 'password' ),
        'label_log_in' => __( 'Log In' ),
        'value_username' => '',
        'value_remember' => false
    ), $args );

    wp_login_form( $a );
}
add_shortcode( 'uilogin', 'uilogin_func' );

function Redirect($url, $code = 302){
    if (strncmp('cli', PHP_SAPI, 3) !== 0) {
        if (headers_sent() !== true) {
            if (strlen(session_id()) > 0) {// if using sessions
                session_regenerate_id(true); // avoids session fixation 	attacks
                session_write_close(); // avoids having sessions lock other requests
            }

            if (strncmp('cgi', PHP_SAPI, 3) === 0) {
                header(sprintf('Status: %03u', $code), true, $code);
            }

            header('Location: ' . $url, true, (preg_match('~^30[1237]$~', $code) >  0) ? $code : 302);
        }
        exit();
    }
}

add_action( 'login_form_middle', 'add_lost_password_link' );
function add_lost_password_link() {
    return '<a href="/wp-login.php?action=lostpassword">Lost Password?</a>';
}

function yoast_primary_cat_as_first_cat($categories) {
    
    // Check if yoast exists and get the primary category
    if ($categories && class_exists('WPSEO_Primary_Term') ) {

        // Show the post's 'Primary' category, if this Yoast feature is available, & one is set
        $wpseo_primary_term = new WPSEO_Primary_Term( 'category', get_the_id() );
        $wpseo_primary_term = $wpseo_primary_term->get_primary_term();
        $term = get_term( $wpseo_primary_term );
    
        // If no error is returned, get primary yoast term 
        $primary_cat_term_id = (!is_wp_error($term)) ? $term->term_id : null;

        // Loop all categories
        if($primary_cat_term_id !== null) {
            foreach ($categories as $i => $category) {

                // Move the primary category to the top of the array
                if($category->term_id === $primary_cat_term_id) {

                    $out = array_splice($categories, $i, 1);
                    array_splice($categories, 0, 0, $out);

                    break;
                }
            }
        }
    } 
    
    return $categories;
}
add_filter( 'get_the_categories', 'yoast_primary_cat_as_first_cat' );

function myplugin_register_template() {
    // EVENTS
    $post_type_events_object = get_post_type_object( 'events' );
    $post_type_events_object->template = array(
        array( 'cofd-blocks/event', null ),
    );
    
    // BIOS
    $post_type_bios_object = get_post_type_object( 'bios' );
    $post_type_bios_object->template = array(
        array( 'cofd-blocks/bio', null ),
    );
}
add_action( 'init', 'myplugin_register_template' );

add_filter( 'acf/settings/remove_wp_meta_box', '__return_false' );