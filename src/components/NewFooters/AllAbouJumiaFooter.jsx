import React from "react";
import { Link } from "react-router-dom";
import {
	help,
	aboutJumia,
	sales,
	countries,
	socilaMedia,
	paymentMethod,
} from "../../utils/footerMenuLinks";
import { Icon } from "@iconify/react";
import styles from "./footer.module.css";

export const AllAbouJumiaFooter = () => {
	// Create link components with proper routing
	const renderLinks = (links, prefix = "") => {
		return links.map((link) => (
			<div className={styles.linkItem} key={link}>
				<Link to={`${prefix}/${link.toLowerCase().replace(/\s+/g, "-")}`}>
					{link}
				</Link>
			</div>
		));
	};

	// Render country links
	const countryLinks = countries.map((link) => (
		<div className={styles.linkItem} key={link}>
			<a 
				href={`https://www.jumia.com.${link === 'Ivory Coast' ? 'ci' : link.toLowerCase().substring(0, 2)}`} 
				target="_blank" 
				rel="noopener noreferrer"
			>
				{link}
			</a>
		</div>
	));

	// Render social media links
	const socialMediaLinks = socilaMedia.map((item) => (
		<a 
			key={item.icon}
			href={item.link} 
			target="_blank" 
			rel="noopener noreferrer" 
			className={styles.socialIcon}
		>
			<Icon icon={item.icon} width="20" />
		</a>
	));

	// Render payment method icons
	const paymentMethodIcons = paymentMethod.map((icon) => (
		<div key={icon} className={styles.paymentIcon}>
			<Icon icon={icon} width="25" />
		</div>
	));

	return (
		<div className={styles.middleFooter}>
			<div className="container mx-auto px-4">
				<div className={styles.footerSectionsContainer}>
					<div className={styles.footerColumn}>
						<h2 className={styles.footerSectionTitle}>NEED HELP?</h2>
						{renderLinks(help, "/help")}
					</div>
					
					<div className={styles.footerColumn}>
						<h2 className={styles.footerSectionTitle}>ABOUT JUMIA EGYPT</h2>
						{renderLinks(aboutJumia, "/about")}
					</div>
					
					<div className={styles.footerColumn}>
						<h2 className={styles.footerSectionTitle}>MAKE MONEY WITH JUMIA</h2>
						{renderLinks(sales, "/partner")}
					</div>
					
					<div className={styles.footerColumn}>
						<h2 className={styles.footerSectionTitle}>JUMIA INTERNATIONAL</h2>
						<div className={styles.twoColumnGrid}>
							{countryLinks}
						</div>
					</div>
				</div>
				
				<div className={styles.footerBottomSection}>
					<div className={styles.footerColumn}>
						<h2 className={styles.footerSectionTitle}>JOIN US ON</h2>
						<div className={styles.socialLinks}>
							{socialMediaLinks}
						</div>
					</div>
					
					<div className={styles.footerColumn}>
						<h2 className={styles.footerSectionTitle}>PAYMENT METHODS</h2>
						<div className={styles.paymentMethods}>
							{paymentMethodIcons}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
