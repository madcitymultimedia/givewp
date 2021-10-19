import {useState} from 'react';
import {render} from 'react-dom';

import {__} from '@wordpress/i18n';

import ADDONS from './mock-addons.json';

import giveLogo from '!!raw-loader!./givewp-logo.svg';
import './addon-gallery.css';

const GiveWPLogo = () => <div dangerouslySetInnerHTML={{__html: giveLogo}} />;

const RecurringIcon = () => (
	<svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
		<circle cx="20" cy="20" r="20" fill="#47BFF5"/>
		<path opacity="0.5" d="M10.1754 27.8462V22.5354C10.1754 22.2832 10.2756 22.0414 10.4539 21.8631C10.6322 21.6848 10.874 21.5846 11.1262 21.5846H16.437C17.284 21.5846 17.7082 22.6087 17.1105 23.2089L15.4565 24.8628C16.6881 26.0201 18.3163 26.6616 20.0063 26.6554C23.0729 26.6526 25.7232 24.5502 26.4548 21.6302C26.4801 21.5268 26.5393 21.435 26.623 21.3692C26.7067 21.3035 26.81 21.2678 26.9164 21.2677H29.1867C29.2565 21.2677 29.3254 21.283 29.3886 21.3125C29.4518 21.3421 29.5077 21.3853 29.5524 21.4389C29.597 21.4925 29.6293 21.5553 29.647 21.6228C29.6646 21.6903 29.6672 21.7608 29.6546 21.8295C28.7973 26.3812 24.8009 29.8246 20 29.8246C17.4713 29.828 15.0394 28.8528 13.2135 27.1034L11.7997 28.5173C11.1995 29.1174 10.1754 28.6932 10.1754 27.8462Z" fill="white"/>
		<path d="M10.3458 18.1706C11.2027 13.6189 15.1991 10.1755 20 10.1755C22.5287 10.1721 24.9606 11.1473 26.7865 12.8967L28.2003 11.4828C28.7993 10.8838 29.8245 11.3081 29.8245 12.1563V17.4647C29.8245 17.7168 29.7244 17.9587 29.5461 18.137C29.3678 18.3153 29.1259 18.4154 28.8738 18.4154H23.563C22.716 18.4154 22.2917 17.3914 22.8895 16.7912L24.5435 15.1373C23.312 13.98 21.684 13.3385 19.9941 13.3447C16.9255 13.3475 14.2764 15.4514 13.5451 18.3699C13.5199 18.4732 13.4607 18.5651 13.377 18.6308C13.2933 18.6966 13.19 18.7323 13.0836 18.7324H10.8133C10.7435 18.7324 10.6747 18.717 10.6115 18.6874C10.5484 18.6578 10.4925 18.6147 10.4479 18.5611C10.4033 18.5075 10.371 18.4447 10.3534 18.3772C10.3357 18.3097 10.3332 18.2392 10.3458 18.1706Z" fill="white"/>
	</svg>
);

const AddonCard = ({name, description, features, actionLink}) => (
	<article className="give-addon-gallery-addon-cta-card">
		<div className="give-addon-gallery-addon-cta-card__header-container">
			<RecurringIcon />
			<h3 className="give-addon-gallery-addon-cta-card__header">{name}</h3>
		</div>
		<div className="give-addon-gallery-addon-cta-card__image" />
		<p className="give-addon-gallery-addon-cta-card__description">{description}</p>
		<ul>
			{features.map(feature => (
				<li key={feature}>{feature}</li>
			))}
		</ul>
		<a className="give-addon-gallery-addon-cta-card__button" href={actionLink}>Learn more</a>
	</article>
);

const MustHaveAddons = () => (
	<article className="give-addon-gallery-tab-container">
		<div className="give-addon-gallery-tab-panel__header">
			<h2 className="give-addon-gallery-title">{__('Ready to take your fundraising to the next level?', 'give')}</h2>
			<p className="give-addon-gallery-description">{__('Recurring donations, fee recovery, and more powerful add-ons to power your campaigns from A to Z.', 'give')}</p>
		</div>
		<ul className="give-addon-gallery-addon-grid">
			{ADDONS.map(addon => <li key={addon.name}><AddonCard {...addon} /></li>)}
		</ul>
	</article>
);

const PricingPlans = () => (
	<article>
		Pricing Plans
	</article>
);

const AdditionalAddons = () => (
	<article>
		Additional Add-ons
	</article>
);

const Fonts___TEMP = () => <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet" />;

// Not designed for re-used beyond this file.
const Tab = ({index, children, isSelected, onSelect}) => (
	<button
		type="button"
		role="tab"
		aria-selected={isSelected}
		aria-controls={`give-addon-gallery-tab-panel-${index}`}
		tabIndex={isSelected ? 0 : -1}
		onClick={onSelect}
		id={`give-addon-gallary-tab-${index}`}
		className="give-addon-gallery-tab"
	>
		{children}
	</button>
);

// Not designed for re-used beyond this file.
const TabPanel = ({children, index, isSelected}) => (
	<div
		role="tabpanel"
		aria-labelledby={`give-addon-gallary-tab-${index}`}
		id={`give-addon-gallery-tab-panel-${index}`}
		tabIndex={isSelected ? 0 : -1}
		hidden={!isSelected}
	>
		{children}
	</div>
);

function AddonGallery() {
	const [currentTab, setCurrentTab] = useState(1);

	return (
		<article className="give-addon-gallery">
			<Fonts___TEMP />
			<div className="give-addon-gallery-header">
				<div className="give-addon-gallery-tab-container">
					<h1 className="screen-reader-text">
						{__('Give Add-ons Gallery', 'give')}
					</h1>
					<GiveWPLogo />
					<div role="tablist" aria-orientation="horizontal">
						<Tab index={1} isSelected={currentTab === 1} onSelect={() => setCurrentTab(1)}>
							{__('Must Have Add-ons', 'give')}
						</Tab>
						<Tab index={2} isSelected={currentTab === 2} onSelect={() => setCurrentTab(2)}>
							{__('View Pricing Plans', 'give')}
						</Tab>
						<Tab index={3} isSelected={currentTab === 3} onSelect={() => setCurrentTab(3)}>
							{__('Additional Add-ons', 'give')}
						</Tab>
					</div>
				</div>
			</div>
			<TabPanel index={1} isSelected={currentTab === 1}>
				<MustHaveAddons />
			</TabPanel>
			<TabPanel index={2} isSelected={currentTab === 2}>
				<PricingPlans />
			</TabPanel>
			<TabPanel index={3} isSelected={currentTab === 3}>
				<AdditionalAddons />
			</TabPanel>
		</article>
	);
}

render(
	<AddonGallery />,
	document.getElementById('root'),
);
