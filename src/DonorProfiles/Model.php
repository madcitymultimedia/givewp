<?php

namespace Give\DonorProfiles;

class Model {

	// Settings
	protected $enabled;

	// Internal variables
	protected $tabs;

	/**
	 * Constructs and sets up setting variables for a new Donor Profile model
	 *
	 * @param array $args Arguments for new Donor Profile, including 'enabled'
	 * @since 2.10.0
	 **/
	public function __construct() {
		$this->enabled = [];
		$this->tabs    = [];
	}

	/**
	 * Get output markup for Multi-Form Goal
	 *
	 * @return string
	 * @since 2.10.0
	 **/
	public function getOutput() {
		ob_start();
		$output = '';
		require $this->getTemplatePath();
		$output = ob_get_contents();
		ob_end_clean();
		return $output;
	}

	/**
	 * Get enabled tabs for Donor Profile
	 *
	 * @return string
	 * @since 2.10.0
	 **/
	public function getEnabled() {
		return $this->enabled;
	}

	/**
	 * Get template path for Donor Profile component template
	 * @since 2.9.0
	 **/
	public function getTemplatePath() {
		return GIVE_PLUGIN_DIR . '/src/DonorProfiles/resources/views/donorprofile.php';
	}

	/**
	 * Enqueue assets for front-end donor profiles
	 *
	 * @return void
	 * @since 2.10.0
	 **/
	public function loadAssets() {
		wp_enqueue_script(
			'give-donor-profiles-app',
			GIVE_PLUGIN_URL . 'assets/dist/js/donor-profiles-app.js',
			[ 'wp-element', 'wp-i18n' ],
			GIVE_VERSION,
			true
		);

		wp_localize_script(
			'give-donor-profiles-app',
			'giveDonorProfileData',
			[
				'apiRoot'  => esc_url_raw( rest_url() ),
				'apiNonce' => wp_create_nonce( 'wp_rest' ),
			]
		);

		wp_enqueue_style(
			'give-google-font-montserrat',
			'https://fonts.googleapis.com/css?family=Montserrat:500,500i,600,600i,700,700i&display=swap',
			[],
			null
		);

		wp_enqueue_style(
			'give-donor-profiles-app',
			GIVE_PLUGIN_URL . 'assets/dist/css/donor-profiles-app.css',
			[ 'give-google-font-montserrat' ],
			GIVE_VERSION
		);
	}
}
