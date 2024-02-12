<?php
/** Template Name: Copy */

get_header();
?>

<div class="grid-container page-copy background-grey-dark">
    <div class="wrapper inner-grid-small">
        <div class="title text-light">
            <span class="heading-1"><?php echo get_the_title(); ?></span>
        </div>

        <div class="copy text-light">
            <?php the_content(); ?>
        </div>
    </div>
</div>

<?php get_footer(); ?>