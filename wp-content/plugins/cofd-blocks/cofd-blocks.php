<?php
/**
 * Plugin Name:       COFD Blocks
 * Description:       Custom COFD Gutenberg Blocks
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           2
 * Author:            JDigital
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       COFD Blocks
 *
 */
define( 'COFD_PATH', plugin_dir_path( __FILE__ ) );
define( 'COFD_URL', plugin_dir_url( __FILE__ ) );

function enqueue_custom_blocks_script() {
    // Get the file modification time for cache-busting
    $version = filemtime(COFD_PATH . 'build/index.js');

    wp_enqueue_script(
        'cofd-blocks',
        COFD_URL . 'build/index.js',
        array('wp-blocks', 'wp-editor', 'wp-components', 'wp-i18n', 'acf'),
        $version, // Use file modification time for version
        'true'
    );

     // Pass site URL to the script
     wp_localize_script('cofd-blocks', 'cofdData', array(
        'siteUrl' => get_site_url(),
        'jsonUrl' => get_site_url().'/wp-content/plugins/cofd-blocks/src/json/',
        'defaultTextFormats' => 'core/bold', 'core/italic', 'core/code', 'core/image', 'core/link', 'core/underline',
    ));
}
add_action('enqueue_block_editor_assets', 'enqueue_custom_blocks_script');


function enqueue_custom_libs_script() {
    $version = filemtime(COFD_PATH . 'build/lib.js');

    wp_enqueue_script(
        'cofd-blocks-libs',
        COFD_URL . 'build/lib.js',
        array('wp-blocks', 'wp-editor', 'wp-components', 'wp-i18n'),
        $version, // Cache-busting version
        'true'
    );
}
add_action('wp_enqueue_scripts', 'enqueue_custom_libs_script');

function enqueue_custom_lib_styles() {
    $version = filemtime(COFD_PATH . 'build/lib.css');

    wp_enqueue_style(
        'cofd-lib-styles', // A unique handle for your stylesheet
        COFD_URL . 'build/lib.css', // Path to your CSS file
        array(), // Dependencies (if any)
        $version, // Cache-busting version
        'all' // Media type ('all', 'screen', 'print', etc.)
    );
}
add_action('wp_enqueue_scripts', 'enqueue_custom_lib_styles');


function enqueue_custom_blocks_styles() {
    $version = filemtime(COFD_PATH . 'build/style-index.css');

    wp_enqueue_style(
        'cofd-blocks-styles', // A unique handle for your stylesheet
        COFD_URL . 'build/style-index.css', // Path to your CSS file
        array(), // Dependencies (if any)
        $version, // Cache-busting version
        'all' // Media type ('all', 'screen', 'print', etc.)
    );
}
add_action('enqueue_block_assets', 'enqueue_custom_blocks_styles');
add_action('wp_enqueue_scripts', 'enqueue_custom_blocks_styles');

// EVENTS
// Define a Save Events endpoint for your REST API
function save_event_attributes_json_callback(WP_REST_Request $request) {
    $post_id = $request->get_param('postID');
    $json_data = $request->get_param('data');

    // Define the file path where you want to save the JSON data
    $json_file_path = plugin_dir_path(__FILE__) . '/src/json/events.json';

    // Load existing JSON data
    $event_data = file_exists($json_file_path) ? json_decode(file_get_contents($json_file_path), true) : [];

    // Add or update the JSON data for the specified post ID
    $event_data[$post_id] = json_decode($json_data);

    // Save the updated JSON data to the file
    file_put_contents($json_file_path, json_encode($event_data));

    // Create a response object with events data and success message
    $response_data = array(
        'data' => $event_data,
        'message' => "Event was saved successfully",
    );

    return rest_ensure_response($response_data);
}

// Register the REST API endpoint for events
add_action('rest_api_init', function () {
    register_rest_route('cofd-blocks/v1', '/save-event-attributes', array(
        'methods' => 'POST',
        'callback' => 'save_event_attributes_json_callback',
        'permission_callback' => '__return_true',
    ));
});

function delete_event_data_on_post_delete($post_id) {
    // Check if this is an event post type and if it's being deleted
    if (get_post_type($post_id) === 'events') {
        // Define the file path where your JSON data is stored
        $json_file_path = plugin_dir_path(__FILE__) . '/src/json/events.json';

        // Load existing JSON data
        $event_data = file_exists($json_file_path) ? json_decode(file_get_contents($json_file_path), true) : [];

        // Remove the event data associated with the deleted post ID
        if (isset($event_data[$post_id])) {
            unset($event_data[$post_id]);
        }

        // Save the updated JSON data to the file
        file_put_contents($json_file_path, json_encode($event_data));
    }
}

// Hook into the delete_post action to delete event data on post deletion
add_action('delete_post', 'delete_event_data_on_post_delete');

// BIOS
// Define a Save Bios endpoint for your REST API
function save_bio_attributes_json_callback(WP_REST_Request $request) {
    $post_id = $request->get_param('postID');
    $json_data = $request->get_param('data');

    // Define the file path where you want to save the JSON data
    $json_file_path = plugin_dir_path(__FILE__) . '/src/json/bios.json';

    // Load existing JSON data
    $bio_data = file_exists($json_file_path) ? json_decode(file_get_contents($json_file_path), true) : [];

    // Add or update the JSON data for the specified post ID
    $bio_data[$post_id] = json_decode($json_data);

    // Save the updated JSON data to the file
    file_put_contents($json_file_path, json_encode($bio_data));

    // Create a response object with events data and success message
    $response_data = array(
        'data' => $bio_data,
        'message' => "Bio was saved successfully",
    );

    return rest_ensure_response($response_data);
}

// Register the REST API endpoint for Bios
add_action('rest_api_init', function () {
    register_rest_route('cofd-blocks/v1', '/save-bio-attributes', array(
        'methods' => 'POST',
        'callback' => 'save_bio_attributes_json_callback',
        'permission_callback' => '__return_true',
    ));
});

function delete_bio_data_on_post_delete($post_id) {
    // Check if this is an event post type and if it's being deleted
    if (get_post_type($post_id) === 'bios') {
        // Define the file path where your JSON data is stored
        $json_file_path = plugin_dir_path(__FILE__) . '/src/json/bios.json';

        // Load existing JSON data
        $bio_data = file_exists($json_file_path) ? json_decode(file_get_contents($json_file_path), true) : [];

        // Remove the event data associated with the deleted post ID
        if (isset($bio_data[$post_id])) {
            unset($bio_data[$post_id]);
        }

        // Save the updated JSON data to the file
        file_put_contents($json_file_path, json_encode($bio_data));
    }
}

// Hook into the delete_post action to delete bio data on post deletion
add_action('delete_post', 'delete_bio_data_on_post_delete');

// ACF OPTION FIELDS
// Register the REST API endpoint for ACF options
function get_acf_option_data_callback() {
    $options = array(
        'email' => get_field('email', 'option'),
        'phone' => get_field('phone', 'option'),
        'address' => get_field('address', 'option'),
        'map_location' => get_field('map_location', 'option'),
        'studio_hours' => get_field('studio_hours', 'option'),
    );

    return rest_ensure_response($options);
}

// Hook into the rest_api_init action to register the custom endpoint
add_action('rest_api_init', function () {
    register_rest_route('cofd-blocks/v1', '/acf-options', array(
        'methods' => 'GET',
        'callback' => 'get_acf_option_data_callback',
        'permission_callback' => '__return_true',
    ));
});

function truncateText($text, $wordCount) {
    $words = explode(' ', $text);
    $truncated = implode(' ', array_slice($words, 0, $wordCount));
    
    return $truncated .= '...' ;
}

function getFormattedDate($start, $end = null) {
    $startMoment = new DateTime($start);

    if ($end !== null) {
        $endMoment = new DateTime($end);

        // Check if both start and end dates are the same
        if ($startMoment->format('Ymd') === $endMoment->format('Ymd')) {
            // Only show the start date when the end date is the same
            return $startMoment->format('F j, Y');
        }

        // Check if both start and end dates are in the same month
        if ($startMoment->format('Ym') === $endMoment->format('Ym')) {
            // Format as "Month Day-Day Year" when end date is available
            return $startMoment->format('F j') . '-' . $endMoment->format('j, Y');
        }
    }

    // Only show the start date when the end date is not available or in a different month
    return $startMoment->format('F j, Y') . ($end !== null ? ' - ' . (new DateTime($end))->format('F j, Y') : '');
}


// Import Dynamic Blocks
include('dynamic-blocks/index.php');