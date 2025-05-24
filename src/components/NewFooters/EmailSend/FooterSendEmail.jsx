import React, { useState } from "react";
import { Icon } from "@iconify/react";
import styles from "../footer.module.css";

export const FooterSendEmail = () => {
	const [email, setEmail] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const [error, setError] = useState("");
	const [checked, setChecked] = useState(false);

	const handleSubscribe = (e) => {
		e.preventDefault();
		
		// Simple validation
		if (!email) {
			setError("Email is required");
			return;
		}
		
		if (!checked) {
			setError("You must agree to the terms");
			return;
		}
		
		// Clear any previous errors
		setError("");
		
		// Here you would typically send the data to an API
		console.log("Subscribing with:", { email, checked });
		
		// Show success message
		setSubmitted(true);
		
		// Reset form after 3 seconds
		setTimeout(() => {
			setEmail("");
			setChecked(false);
			setSubmitted(false);
		}, 3000);
	};

	return (
		<div className={styles.newsletterContainer}>
			<h2>NEW TO JUMIA?</h2>
			<p>Subscribe to our newsletter to get updates on our latest offers!</p>
			
			{submitted ? (
				<div className={styles.successMessage}>
					Thanks for subscribing! You'll receive our newsletter soon.
				</div>
			) : (
				<form onSubmit={handleSubscribe}>
					<div className={styles.inlineSubscribeForm}>
						<div className={styles.emailInputWrapper}>
							<Icon icon="mdi:email" className={styles.emailIcon} />
							<input
								type="email"
								placeholder="Enter your email"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								className={styles.emailField}
								aria-label="Email address"
							/>
						</div>
						<button
							type="submit"
							className={styles.subscribeButton}
						>
							Subscribe
						</button>
					</div>
					
					{error && <div className={styles.errorMessage}>{error}</div>}
					
					<div className={styles.checkboxContainer}>
						<input 
							type="checkbox" 
							id="termsCheckbox" 
							className={styles.checkbox} 
							checked={checked}
							onChange={() => setChecked(!checked)}
						/>
						<label htmlFor="termsCheckbox" className={styles.checkboxLabel}>
							I agree to Jumia's Privacy and Cookie Policy. You can unsubscribe from newsletters at any time.
							<br />
							<a href="/legal/terms" className={styles.legalLink}>I accept the Legal Terms</a>
						</label>
					</div>
				</form>
			)}
		</div>
	);
};
