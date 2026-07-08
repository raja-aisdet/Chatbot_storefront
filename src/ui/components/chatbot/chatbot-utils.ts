export function getChatbotReply(message: string): string {
	const normalized = message.trim().toLowerCase();

	if (!normalized) {
		return "Hello! I can help with products, shipping, returns, and checkout. What would you like to know?";
	}

	if (/hello|hi|hey|help|thanks|thank you/.test(normalized)) {
		return "Hello! I can help you browse products, check shipping, or guide you through checkout.";
	}

	if (/product|catalog|collection|item|shop|buy|offer/.test(normalized)) {
		return "You can browse our products from the main navigation or search page. If you want, I can suggest popular categories for you.";
	}

	if (/ship|delivery|dispatch|tracking|order/.test(normalized)) {
		return "Shipping updates depend on the selected address and delivery method. For the fastest answer, check your order details or contact support.";
	}

	if (/return|refund|exchange|cancel/.test(normalized)) {
		return "Returns and exchanges are handled from the account area or the order confirmation page. I can also help you find the right policy link.";
	}

	if (/checkout|payment|cart|price|discount/.test(normalized)) {
		return "The checkout flow supports payments, shipping, and order review. If you run into an issue, I can help you troubleshoot it step by step.";
	}

	return "I can help with products, shipping, returns, and checkout. Tell me what you need and I’ll guide you.";
}
