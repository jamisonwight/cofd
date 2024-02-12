<?php if (!empty(get_sub_field('cta_text'))) : ?>
    <div class="btn-container">
        <?php 
            $CTA_URL = (!empty(get_sub_field('external_link')) ? get_sub_field('external_link') : get_sub_field('cta_link'));
        ?>
        <a class="btn-default" data-text="<?php the_sub_field('cta'); ?>" href="<?php echo $CTA_URL; ?>"><?php the_sub_field('cta_text'); ?></a>
    </div>
<?php endif; ?>