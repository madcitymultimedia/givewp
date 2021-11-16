import h from 'vhtml';
import {domIsReady, insertAfter, nodeFromString, removeNode} from './not-jquery.js';

// Transforms document for classic template
domIsReady(() => {
	removeTestModeMessage();
	movePersonalInfoSectionAfterDonationAmountSection();
	movePaymentFormInsidePaymentDetailsSection();
    moveDonateNowButtonSectionAfterDonationAmountSection();
	setPersonalInfoTitle();
	addPersonalInfoDescription();
	setPaymentDetailsTitle();
	addPaymentDetailsDescription();
	splitDonationLevelAmountsIntoParts();
});

/**
 * Individual transformations
 */

function removeTestModeMessage() {
	removeNode(document.querySelector('#give_error_test_mode')); // Get out of my way!
}

function movePersonalInfoSectionAfterDonationAmountSection() {
	insertAfter(
		document.querySelector('.give-personal-info-section'),
		document.querySelector('.give-donation-amount-section'),
	);
}

function moveDonateNowButtonSectionAfterDonationAmountSection() {
    insertAfter(
        document.querySelector('.give-donate-now-button-section'),
        document.querySelector('.give-payment-details-section'),
    );
}


function setPersonalInfoTitle() {
	document.querySelector('.give-personal-info-section legend:first-of-type').textContent = classicTemplateOptions.donor_information.headline;
}

function addPersonalInfoDescription() {
	insertAfter(
		nodeFromString(h('p', {className: 'give-personal-info-description'}, classicTemplateOptions.donor_information.description)),
		document.querySelector('.give-personal-info-section legend:first-of-type'),
	);
}

function setPaymentDetailsTitle() {
	document.querySelector('.give-payment-mode-label').textContent = classicTemplateOptions.payment_method.headline;
}

function addPaymentDetailsDescription() {
	insertAfter(
		nodeFromString(h('p', {className: 'give-payment-details-description'})),
		document.querySelector('.give-payment-mode-label'),
	);
}

function movePaymentFormInsidePaymentDetailsSection() {
	document.querySelector('.give-payment-details-section').append(
		document.querySelector('#give_purchase_form_wrap')
	);
}

function splitDonationLevelAmountsIntoParts() {
	const currency = {
		code:               window.Give.fn.getGlobalVar('currency'),
		decimalSeparator:   window.Give.fn.getGlobalVar('decimal_separator'),
		precision:          Number.parseInt(window.Give.fn.getGlobalVar('number_decimals')),
		symbol:             window.Give.fn.getGlobalVar('currency_sign'),
		symbolPosition:     window.Give.fn.getGlobalVar('currency_pos'),
		thousandsSeparator: window.Give.fn.getGlobalVar('thousands_separator'),
	};

	document.querySelectorAll('.give-donation-level-btn:not(.give-btn-level-custom)').forEach(node => {
		const rawAmount = window.Give.fn.unFormatCurrency(node.getAttribute('value'), currency.decimalSeparator);
        const amountWithoutDecimal = window.accounting.format(rawAmount, 0, currency.thousandsSeparator);
        const decimalForAmount = rawAmount.toFixed(currency.precision).split('.')[1];

        // Use the formatted amount as the ARIA label.
		node.setAttribute('aria-label', node.textContent);

        const CurrencySymbol = ({position}) => h('span', {className: `give-currency-symbol-${position}`}, currency.symbol);

        // This is a visual representation of the amount. The decimal separator
        // omitted since it is not displayed. The ARIA label includes the
        // properly formatted amount, so we hide the contents for screen
        // readers.
        node.innerHTML = h(
            'span',
            {
                className: 'give-formatted-currency',
                'aria-hidden': true,
            },
            currency.symbolPosition === 'before' && h(CurrencySymbol, {position: 'before'}),
            h('span', {className: "give-amount-formatted"},
                h('span', {className: "give-amount-without-decimals"}, amountWithoutDecimal),
                h('span', {className: "give-amount-decimal"}, decimalForAmount),
            ),
            // There’s an intentional leading space before the currency symbol.
            currency.symbolPosition === 'after' && ` ${h(CurrencySymbol, {position: 'after'})}`,
        );
	});
}