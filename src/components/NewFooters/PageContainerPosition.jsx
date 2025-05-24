import React from "react";
import styles from "./footer.module.css";

export const PageContainerPosition = ({ children }) => {
	// Check if children is an array
	const childrenArray = React.Children.toArray(children);
	
	return (
		<div className="container max-w-6xl mx-auto px-4">
			<div className={styles.topFooterGrid}>
				{childrenArray.map((child, index) => (
					<div key={index} className={styles.topFooterColumn}>
						{child}
					</div>
				))}
			</div>
		</div>
	);
};
