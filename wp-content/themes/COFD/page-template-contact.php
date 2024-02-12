<?php
/** Template Name: Contact */

get_header('blog');

$description = get_field('description');
$contact_form = do_shortcode('[contact-form-7 id="5" title="Contact form 1"]');
$email = get_field('email');
$fb_url = get_field('facebook_url');
$ig_url = get_field('instagram_url');
$fb_icon = get_template_directory_uri().'/assets/images/footer-fb.svg';
$ig_icon = get_template_directory_uri().'/assets/images/footer-instagram.svg';
$submit_event = get_template_directory_uri().'/assets/images/submit-event.svg';
$dots = get_template_directory_uri().'/assets/images/contact-dots.svg';
?>

<div class="grid-container contact-us">
    <div class="wrapper inner-grid-medium">
        <div class="grid-x grid-padding-x">
            <div class="intro-content text-light cell large-8">
                <span class="heading-1">Contact Us</span>
                <?php echo $description; ?>
            </div>
            <!-- Filler Div -->
            <div class="cell large-4 show-for-large"></div>

            <div class="form cell large-8">
                <?php echo $contact_form; ?>
            </div>

            <div class="info cell large-4">
                <div class="content-top text-light">
                    <span class="heading-3">Contact Info</span>
                    <p><a class="text-light" href="mailto:<?php echo $email; ?>"><?php echo $email; ?></a></p>

                    <img class="divider" src="<?php echo $dots; ?>" alt="Dots Divider">

                    <span class="heading-3">Social</span>
                    <div class="social">
                        <a href="<?php echo $fb_url; ?>" target="_blank">
                            <img src="<?php echo $fb_icon;  ?>" alt="Facebook Icon">
                        </a>

                        <a href="<?php echo $ig_url; ?>" target="_blank">
                            <img src="<?php echo $ig_icon; ?>" alt="Instagram Icon">
                        </a>
                    </div>
                </div>

                <div class="content-bottom">
                    <a href="<?php echo get_site_url().'/submit-an-event'; ?>">
                       <?php echo file_get_contents($submit_event); ?>
                    </a>
                </div>
            </div>
        </div>
    </div>
</div>

<?php get_footer('blog'); ?>