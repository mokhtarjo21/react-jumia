import React from "react";
import { BottomLogo } from "./JumiaLogo/BottomLogo";
import { PageContainerPosition } from "./PageContainerPosition";
import { FooterDownLoadApp } from "./DownloadApp/FooterDownLoadApp";
import { FooterSendEmail } from "./EmailSend/FooterSendEmail";
import { AllAbouJumiaFooter } from "./AllAbouJumiaFooter";
import styles from "./footer.module.css";

const FooterPrime = () => {
	return (
		<footer className={styles.footerContainer}>
			{/* Top Footer with Newsletter and App Download */}
			<div className={styles.topFooter}>
				<PageContainerPosition>
					<BottomLogo />
					<FooterSendEmail />
					<FooterDownLoadApp />
				</PageContainerPosition>
			</div>
			
			{/* Middle Footer with Links */}
			<AllAbouJumiaFooter />
			
			{/* Copyright Footer */}
			<div className={styles.copyrightFooter}>
				<div className="container max-w-6xl mx-auto px-4 text-center">
					<p className={styles.copyright}>© {new Date().getFullYear()} Jumia. All rights reserved.</p>
				</div>
			</div>
		</footer>
	);
};

export default FooterPrime;