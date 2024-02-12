<?php 
	$logo = get_template_directory_uri().'/assets/images/logo.png';
	$text_light = get_field('text_light');
?>

<div 
	class="title-bar hide-for-large" 
	data-responsive-toggle="header-bar" 
	data-hide-for="large"
	>
	<div class="menu-toggle">
		<div class="open" data-toggle>
			<div class="menu-line"></div>
			<div class="menu-line"></div>
			<div class="menu-line"></div>
		</div>
	</div>

    <div class="logo-container show-for-large">
        <a href="<?php echo bloginfo('url'); ?>">
            <img src="<?php echo $logo; ?>" alt="Conseratory Of Dance Logo" />
        </a>
    </div>

	<div class="logo-title text-center hide-for-large">
		<a href="<?php echo bloginfo('url'); ?>">
			<span>
				Conservatory of <span>Dance</span>
			</span>
		</a>
	</div>
</div>

<div 
	class="header-bar" 
    id="header-bar" 
    data-closable data-animate="slide-in-right fast slide-out-right fast"
    >
	<div class="close hide-for-large" data-close></div>

	<div class="logo-container">
        <a href="<?php echo bloginfo('url'); ?>">
            <img src="<?php echo $logo; ?>" alt="Conseratory Of Dance Logo" />
        </a>
    </div>

	<div class="menu">
		<?php 
			wp_nav_menu( array( 
				'menu' => 'Menu Main'
			)); 
		?>
	</div>

	<div class="register">
		<a 
			href="<?php echo get_site_url(); ?>/registration"
			class="btn-default <?php echo ($text_light) ? 'btn-white' : 'btn-black'; ?>"
			>
			Register Now
		</a>
	</div>
</div>