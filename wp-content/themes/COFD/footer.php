<?php
/**
 * The template for displaying the footer. 
 *
 * Comtains closing divs for header.php.
 *
 * For more info: https://developer.wordpress.org/themes/basics/template-files/#template-partials
 */

$schedule_title = get_field('schedule_title', 'option');
$schedule_content = get_field('schedule_content', 'option');
$schedule_pdf = get_field('schedule_pdf', 'option');
$calendar_title = get_field('calendar_title', 'option');
$calendar_content = get_field('calendar_content', 'option');
$calendar_pdf = get_field('calendar_pdf', 'option');
?>

<div class="schedule-modal-trigger" data-micromodal-trigger="schedule-modal">
    <?php echo file_get_contents(get_template_directory_uri().'/assets/images/schedule-icon.svg'); ?>
</div>

<!-- Schedule Modal -->
<!-- [1] -->
<div class="schedule-modal" id="schedule-modal" aria-hidden="true">
    <!-- [2] -->
    <div tabindex="-1" class="schedule-container" data-micromodal-close>
        <button aria-label="Close modal" data-micromodal-close>
            <img class="close" src="<?php echo get_template_directory_uri(); ?>/assets/images/close.svg" alt="Close Icon" />
        </button>

        <!-- [3] -->
        <div role="dialog" aria-modal="true" aria-labelledby="schedule-modal-title" >
            <header>
                <span id="schedule-modal-title" class="heading-3-bold">
                    Schedule & <span class="txt-light-italic">Dates</span>
                </span>
                <img class="squiggly" src="<?php echo get_template_directory_uri(); ?>/assets/images/squiggly-white.svg" alt="Squiggly Icon" />
            </header>

            <div class="schedule-content-container" id="schedule-modal-content">
                <div class="content-schedule content-item">
                    <span class="heading-4"><?php echo $schedule_title; ?></span>
                    <?php if (!empty($schedule_content)) echo $schedule_content; ?>
                    <a href="<?php echo $schedule_pdf; ?>" class="btn-box btn-box-blue">Download Schedule</a>
                </div>

                <div class="content-calendar content-item">
                    <span class="heading-4"><?php echo $calendar_title; ?></span>
                    <?php if (!empty($calendar_content)) echo $calendar_content; ?>
                    <a href="<?php echo $calendar_pdf; ?>" class="btn-box btn-box-blue">Download Calendar</a>
                </div>
            </div>
        </div>
    </div>
</div>

<div class="footer-wrapper b-black">
    <div class="grid-wrapper inner-grid-medium">
        <footer class="grid-container">
            <div class="grid-x">
                <div class="contact-info footer-item cell large-4 txt-white">
                    <span class="heading-5 txt-blue">Address</span>

                    <div class="item">
                        <strong>Email:</strong> <?php the_field('email', 'option') ?>
                    </div>

                    <div class="item">
                        <strong>Phone:</strong> <?php the_field('phone', 'option') ?>
                    </div>

                    <div class="item paragraph">
                        <?php the_field('address', 'option') ?>
                    </div>

                    <div class="item">
                        <a class="map-link" href="<?php echo get_field('map_location', 'option') ?>">
                            Map Location
                        </a>
                    </div>

                    <div class="item btn-container">
                        <a class="btn-box btn-box-dark" href="<?php echo get_site_url(); ?>/contact">Contact Us</a>
                    </div>
                </div>

                <div class="studio-hours footer-item cell large-4 txt-white">
                    <span class="heading-5 txt-blue">Studio Hours</span>

                    <div class="item">
                        <?php the_field('studio_hours', 'option') ?>
                    </div>

                    <small class="show-for-large">
                        <span>&copy;<?php echo date('Y'); ?></span> 
                        <?php the_field('copyright', 'option') ?>
                    </small>
                </div>

                <div class="business-callouts footer-item cell large-4">
                    <a href="https://mdpdance.com/">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/manhattan.png" />
                    </a>

                    <a href="https://gothamartshd.com/">
                        <img src="<?php echo get_template_directory_uri(); ?>/assets/images/gothamarts.png" />
                    </a>

                    <small class="hide-for-large txt-white">
                        <span>&copy;<?php echo date('Y'); ?></span> 
                        <?php the_field('copyright', 'option') ?>
                    </small>
                </div>
            </div>
        </footer>
    </div>
</div>

<?php wp_footer(); ?>

	</body>
</html> 