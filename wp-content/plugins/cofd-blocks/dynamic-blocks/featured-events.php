<?php 

function dynamic_featured_events() {
    register_block_type( 'cofd-blocks/featured-events', array(
        'render_callback' => 'dynamic_featured_events_render_callback'
    ) );

}
add_action( 'init', 'dynamic_featured_events' );


function dynamic_featured_events_render_callback($attributes) {
    // Define the file path where you want to get the JSON data
    $json_file_path = COFD_PATH . 'src/json/events.json';

    $eventsData = file_exists($json_file_path) ? json_decode(file_get_contents($json_file_path), true) : [];

    return dynamic_featured_events_HTML($attributes, $eventsData);
}

function dynamic_featured_events_HTML($attributes, $eventsData) {
    $featuredEvents = $attributes['featuredEvents'];
    
    ob_start(); ?>
    
    <div class="featured-events relative block py-[100px] -xl:px-[30px] overflow-clip animate-title">
        <div class="gradients">
            <div class="radial-gradient radial-gradient-top-right"></div>
            <div class="radial-gradient radial-gradient-bottom-left"></div>
        </div>

        <div class="content-container w-full flex flex-wrap grid-large">
            <div class="intro w-full text-center pb-[40px]">
                <span 
                    role="heading" 
                    class="heading-2 !italic animate-title-text justify-center"
                    aria-label='Upcoming Events'
                    title='Upcoming Events'
                    >
                    Upcoming <span class="txt-blue txt-light-italic">Events</span>
                </span>
            </div>

            <div class="events-container w-full">
                <?php foreach ($featuredEvents as $eventId) {
                    $event = array_values(array_filter($eventsData, function ($event) use ($eventId) {
                        return $event['eventID'] === $eventId;
                    }))[0] ?? null;

                    if ($event) {
                        $eventStartDate = date('F j, Y', strtotime($event['eventStartDate']));
                        $eventEndDate = date('F j, Y', strtotime($event['eventEndDate'])); ?>

                        <a 
                            href="<?php echo esc_url($event['eventLink']); ?>" 
                            class="event-item w-full flex items-center flex-wrap my-[60px] md:my-[120px] lg:my-[60px] -lg:flex-col -lg:justify-center event-<?php echo esc_attr($event['eventID']); ?>"
                            >
                            <div class="event-image-wrapper animate-gradient-bg w-[300px] h-[300px] md:w-[380px] md:h-[380px] lg:w-[280px] lg:h-[280px]">
                                <img src="<?php echo esc_url($event['eventImageURL']); ?>" alt="<?php echo esc_attr($event['eventTitle']) . ' image '; ?>" class="image w-full h-full object-cover relative p-[10px]" />
                            </div>

                            <div class="event-content relative flex items-center lg:w-[calc(100%_-_280px)] squiggley-divider divider-left -lg:flex-col -lg:justify-center -lg:w-full">
                                <div class="content-wrap w-full -lg:flex -lg:flex-col -lg:items-center -lg:text-center">
                                    <h3 class="heading-4"><?php echo $event['eventTitle']; ?></h3>
                                    <span class="date heading-6 block py-[20px]"><?php echo esc_html(getFormattedDate($eventStartDate, $eventEndDate)); ?></span>
                                    <p class="-lg:max-w-[400px]">
                                        <?php echo truncateText($event['eventContent'], 50); ?>
                                    </p>
                                    <span class="event-link link text-black block mt-[20px]">See Full Details</span>
                                </div>
                            </div>
                        </a>
                <?php }
                } ?>
            </div>

            <div class="all-events w-full text-center">
                <a class="btn-default btn-blue" href="/events">All Events</a>
            </div>
        </div>
    </div>

    <?php return ob_get_clean(); 
}