<?php 

function dynamic_featured_bios() {
    register_block_type( 'cofd-blocks/featured-bios', array(
        'render_callback' => 'dynamic_featured_bios_render_callback'
    ) );

}
add_action( 'init', 'dynamic_featured_bios' );


function dynamic_featured_bios_render_callback($attributes) {
    // Define the file path where you want to get the JSON data
    $json_file_path = COFD_PATH . 'src/json/bios.json';

    $biosData = file_exists($json_file_path) ? json_decode(file_get_contents($json_file_path), true) : [];

    return dynamic_featured_bios_HTML($attributes, $biosData);
}

function dynamic_featured_bios_HTML($attributes, $biosData) {
    $featuredBios = $attributes['featuredBios'];
    
    ob_start(); ?>
    
    <div class="featured-bios relative block py-[100px] -xl:px-[30px] overflow-hidden bg-black">
        <div class="content-container w-full flex flex-wrap grid-large">
            <div class="bios-container w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[40px] xl:gap-[60px]">
                <?php
                foreach ($featuredBios as $bioId) {
                    $bio = array_values(array_filter($biosData, function ($bio) use ($bioId) {
                        return $bio['bioID'] === $bioId;
                    }))[0];

                    if ($bio) {
                ?>
                    <a 
                        href="<?php echo esc_url($bio['bioLink']); ?>" 
                        class="bio-item bio-<?php echo esc_attr($bio['bioID']); ?> w-full block flex flex-col items-center lg:w-[296px] my-[20px]"
                        >
                        <?php if (!empty($bio['bioVideoURL'])) : ?>
                        <div class="bio-video-cursor fixed w-[296px] top-0 left-0 pointer-events-none z-index-top opacity-0 show-desktop">
                            <video 
                                src="<?php echo esc_url($bio['bioVideoURL']); ?>"
                                class="block w-[296px] rounded-[10px] blue-box-shadow"
                                muted
                                playsInline
                                autoplay
                                loop
                            /> 
                        
                        </div>
                        <?php endif; ?>

                        <div class="bio-image-wrapper animate-gradient-bg relative w-[296px] h-[414px] z-10 overflow-hidden">
                            <img 
                                src="<?php echo esc_url($bio['bioImageURL']); ?>" 
                                alt="<?php echo esc_attr($bio['bioName']); ?> image" 
                                class="image w-full h-full object-cover relative p-[10px]" 
                            />
                        </div>

                        <div class="bio-content relative w-full">
                            <div class="text-radial-gradient text-radial-gradient-center z-1"></div>

                            <div class="content-wrap relative w-full text-center text-white z-5">
                                <h3 class="heading-4 mt-[40px]"><?php echo esc_html($bio['bioName']); ?></h3>
                                <span class="career-title italic font-bold block my-[20px]"><?php echo esc_html($bio['bioCareerTitle']); ?></span>
                                <p><?php echo truncateText($bio['bioContent'], 40); ?></p>
                                <span class="bio-link btn-default btn-white-blue block mt-[20px]">View Full Bio</span>

                                <?php if (!empty($bio['bioVideoURL'])) : ?>
                                    <br>
                                    <span 
                                        data-src="<?php echo $bio['bioVideoURL'] ?>" 
                                        class="block btn-box btn-box-white mt-[30px] text-h3 !text-[14px]"
                                        data-fancybox
                                        >
                                        <i class="fa-solid fa-play"></i>&nbsp; Watch <?php echo strtok($bio['bioName'], " "); ?>'s Video
                                    </span>
                                <?php endif; ?>
                            </div>
                        </div>
                    </a>
                <?php
                    }
                }
                ?>
            </div>
        </div>
    </div>

    <?php return ob_get_clean(); 
}