<?php 

function dynamic_code_block() {
    register_block_type( 'cofd-blocks/code-block', array(
        'render_callback' => 'dynamic_code_block_render_callback'
    ) );

}
add_action( 'init', 'dynamic_code_block' );


function dynamic_code_block_render_callback($attributes) {
    $data = $attributes;
    return dynamic_featured_events_archive_HTML($data);
}

function dynamic_featured_events_archive_HTML($data) {
    ob_start(); ?>
    
    <div class="code-block relative block py-[60px] mb-[40px] -xl:px-[30px] overflow-x-clip">
        <div class="content-container w-full flex flex-wrap grid-large">
            <div class="code-container">
                <!-- HTML -->
                <?php echo esc_url($data['code']); ?>

                <!-- CSS -->
                <?php echo esc_url($data['css']); ?>
            </div>
        </div>
    </div>

    <?php return ob_get_clean(); 
}