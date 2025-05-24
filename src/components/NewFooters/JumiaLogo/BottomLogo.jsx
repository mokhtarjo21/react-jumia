import React from "react";
import { Link } from "react-router-dom";
import ImageLogo from "../../../assets/footer_images/jumia-group-logo-new.png";
import styles from "../footer.module.css";

export const BottomLogo = () => {
	return (
		<div className={styles.logoWrapper}>
			<Link to="/" title="Jumia Home" className={styles.footerLogoLink}>
				<img style={{width: "120px!important"}}
					src={ImageLogo}
					alt="Jumia Logo"
					className={styles.footerLogo}
				/>
			</Link>
			<p className={styles.footerTagline}>
				Your Trusted Online Shopping Destination
			</p>
		</div>
	);
};
