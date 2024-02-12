<?php 
    get_header();

    $paged = ( get_query_var( 'paged' ) ) ? get_query_var( 'paged' ) : 1;
?>

<div class="grid-container posts">
<?php if ( $posts_query->have_posts() ) : ?>
    <?php while ($posts_query->have_posts()) : the_post();  ?>

        <!-- Post Content -->
        
    <?php endwhile; ?>
    </div>
<?php endif; wp_reset_postdata(); ?>

<div class="posts-navigation text-light">
    <?php 
        previous_posts_link( 'PREVIOUS' );

        if (!empty(get_previous_posts_link()) && !empty(get_next_posts_link())) {
            echo '<span>|</span>';
        }

        next_posts_link( 'NEXT', $posts_query->max_num_pages ); 
        
        // reset the main query object to avoid 
        // unexpected results on other parts of the page   
        $wp_query = NULL;
        $wp_query = $temp_query;
    ?>
</div>

<?php get_footer(); ?>