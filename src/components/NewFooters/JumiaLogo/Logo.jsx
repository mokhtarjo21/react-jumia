import React from "react";
import { Link } from "react-router-dom";
import ImageLogo from "../../../assets/footer_images/jumia-group-logo-new.png";
import styles from "../footer.module.css";

export const Logo = () => {
	return (
		<div className={styles.mainLogo}>
			<Link to="/" title="Jumia Home">
				<img
					src={ImageLogo}
					alt="Jumia Logo"
					className={styles.logoImage}
				/>
			</Link>
		</div>
	);
};
