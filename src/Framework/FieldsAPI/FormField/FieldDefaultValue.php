<?php

namespace Give\Framework\FieldsAPI\FormField;

trait FieldDefaultValue {

	/** @var string */
	protected $defaultValue;

	/**
	 * @param string|array $defaultValue
	 * @return $this
	 */
	public function defaultValue( $defaultValue ) {
		$this->defaultValue = $defaultValue;
		return $this;
	}

	/**
	 * @return string|array
	 */
	public function getDefaultValue() {
		return $this->defaultValue;
	}

	/**
	 * @return string|array
	 */
	public function getSelected() {
		return $this->getDefaultValue();
	}
}
