import React from "react";
import Logo from "../../../assets/footer_images/JMIA.png";
import { Icon } from "@iconify/react";
import styles from "../footer.module.css";

export const FooterDownLoadApp = () => {
	return (
		<div className={styles.appDownloadContainer}>
			<div className={styles.logoContainer}>
				<div className={styles.appLogo}>
					<img src={Logo} alt="Jumia App Logo" className={styles.jumia_star}/>
				</div>
				<div className={styles.appInfo}>
					<h2>DOWNLOAD JUMIA FREE APP</h2>
					<p>Get access to exclusive offers!</p>
				</div>
			</div>
			
			<div className={styles.storeButtons}>
				<a 
					href="https://apps.apple.com/app/jumia-online-shopping/id925015459" 
					target="_blank" 
					rel="noopener noreferrer"
					className={styles.storeButton}
				>
					<span className={styles.storeIcon}>
						<Icon icon="ic:baseline-apple" width="20" />
					</span>
					<div className={styles.storeText}>
						<small>Download on the</small>
						<span>App Store</span>
					</div>
				</a>
				
				<a 
					href="https://play.google.com/store/apps/details?id=com.jumia.android" 
					target="_blank" 
					rel="noopener noreferrer"
					className={styles.storeButton}
				>
					<span className={styles.storeIcon}>
						<Icon icon="mdi:google-play" width="20" />
					</span>
					<div className={styles.storeText}>
						<small>GET IT ON</small>
						<span>Google Play</span>
					</div>
				</a>
			</div>
		</div>
	);
};
