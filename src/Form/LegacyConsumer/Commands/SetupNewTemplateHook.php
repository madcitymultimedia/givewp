<?php

namespace Give\Form\LegacyConsumer\Commands;

use Give\Framework\FieldsAPI\FieldCollection;
use Give\Form\LegacyConsumer\FieldView;

class SetupNewTemplateHook implements HookCommandInterface {
	public function __invoke( $hook ) {

		// On the old hook, run the new hook and render the fields.
		add_action(
			"give_$hook",
			function( $formID ) use ( $hook ) {
				$fieldCollection = new FieldCollection( 'root' );
				do_action( "give_fields_$hook", $fieldCollection, $formID );
				foreach ( $fieldCollection->getFields() as $field ) {
					FieldView::render( $field );
				}
			}
		);

		// Register custom fields during processing to validate required.
		add_action(
			'give_donation_form_required_fields',
			function( $requiredFields, $formID ) use ( $hook ) {
				$fieldCollection = new FieldCollection( 'root' );
				do_action( "give_fields_$hook", $fieldCollection, $formID );
				$fieldCollection->walk(
					function( $field ) use ( &$requiredFields ) {
						if ( $field->isRequired() ) {
							$requiredFields[ $field->getName() ] = $field->getRequiredError();
						}
					}
				);
				return $requiredFields;
			},
			10,
			2
		);
	}
}
