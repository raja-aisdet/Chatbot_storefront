import { describe, expect, it } from "vitest";
import { getChatbotReply } from "./chatbot-utils";

describe("getChatbotReply", () => {
	it("returns a helpful greeting when no message is provided", () => {
		expect(getChatbotReply("")).toContain("help with products");
	});

	it("handles shipping questions", () => {
		expect(getChatbotReply("Where is my order")).toContain("Shipping");
	});

	it("handles checkout questions", () => {
		expect(getChatbotReply("I need help with checkout")).toContain("checkout");
	});
});
