<?php 

function dynamic_featured_events_archive() {
    register_block_type( 'cofd-blocks/events', array(
        'render_callback' => 'dynamic_featured_events_archive_render_callback'
    ) );

}
add_action( 'init', 'dynamic_featured_events_archive' );


function dynamic_featured_events_archive_render_callback($attributes) {
    // Define the file path where you want to get the JSON data
    $json_file_path = COFD_PATH . 'src/json/events.json';

    $eventsData = file_exists($json_file_path) ? json_decode(file_get_contents($json_file_path), true) : [];

    return dynamic_featured_events_archive_HTML($eventsData);
}

function dynamic_featured_events_archive_HTML($eventsData) {
    ob_start(); ?>
    
    <div class="events relative block py-[60px] mb-[40px] -xl:px-[30px] overflow-x-clip">
        <div class="gradients">
            <div class='radial-gradient radial-gradient-top-right'></div>
            <div class='radial-gradient radial-gradient-bottom-left'></div>
        </div>

        <div class="content-container w-full flex flex-wrap grid-large">
            <div class="intro w-full text-center pb-[20px]">
                <span role='heading' class="heading-2 !italic">
                    Events
                </span>
            </div>

            <div class="events-container w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[20px] md:gap-[40px] lg:gap-[40px] items-start">
                <?php
                foreach ($eventsData as $event) :
                    $eventStartDate = date('F j, Y', strtotime($event['eventStartDate']));
                    $eventEndDate = date('F j, Y', strtotime($event['eventEndDate']));
                ?>
                    <?php if (!$event['eventHide']) : ?>
                    <a  
                        href="<?php echo esc_url($event['eventLink']); ?>"
                        class="event-item event-<?php echo esc_attr($event['eventID']); ?> w-full flex flex-col justify-center items-center flex-wrap mt-[40px] md:mt-[80px] lg:mt-[40px]"
                        >
                        <div class="event-image-wrapper animate-gradient-bg w-[300px] h-[300px] lg:w-[280px] lg:h-[280px] text-center">
                            <img 
                                src="<?php echo esc_url($event['eventImageURL']); ?>" 
                                alt="<?php echo esc_attr($event['eventTitle']); ?> image"
                                class="image w-full h-full object-cover relative p-[10px]" 
                            />

                            <img 
                                src="<?php echo COFD_URL . 'src/assets/images/squiggly-blue.svg'; ?>" 
                                alt="Squiggly Divider"
                                class="squiggly mt-[20px]" 
                            />
                        </div>

                        <div class="event-content relative w-full flex flex-col">
                            <div class="content-wrap w-full flex flex-col items-center text-center">
                                <h3 class="heading-4 mt-[60px]"><?php echo $event['eventTitle']; ?></h3>
                                <span class="date heading-6 block py-[20px]"><?php echo esc_html(getFormattedDate($eventStartDate, $eventEndDate)); ?></span>
                                <p class="-lg:max-w-[400px]"><?php echo truncateText($event['eventContent'], 50); ?></p>
                                <span
                                    class="event-link link text-black block mt-[20px]"
                                    >See Full Details
                                </span>
                            </div>
                        </div>
                    </a>
                    <?php endif; ?>
                <?php endforeach; ?>
            </div>
        </div>
    </div>

    <?php return ob_get_clean(); 
}