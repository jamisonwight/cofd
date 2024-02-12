<!-- For each module add a name for indexing -->
<?php
    $modules = [
        'hero',
        'featured_posts',
        'featured_event',
        'content_banner',
        'graphic_callouts',
        'post_callouts',
        'about_section',
        'events_callout',
        'banner',
        'image_content_banner',
        'slider',
        'business_callouts',
        'float_image_content_blocks',
        'content_slider',
        'icon_callouts',
        'map'
    ];

    $moduleIndex = array();
    foreach ($modules as $module) {
        $moduleIndex[$module] = -1;
    }

    if ( have_rows('modules') ) {
        while (have_rows('modules')) {
            the_row();

            foreach ($modules as $module) {
                if (get_row_layout() == $module) {
                    $moduleIndex[$module]++;
                    include 'templates/'.$module.'.php';
                }
            }
        }
    }