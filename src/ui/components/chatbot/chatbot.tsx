"use client";

import { useMemo, useState } from "react";
import { Bot, Send, X } from "lucide-react";
import { getChatbotReply } from "./chatbot-utils";

export function Chatbot() {
	const [isOpen, setIsOpen] = useState(false);
	const [messages, setMessages] = useState([
		{
			id: "welcome",
			type: "assistant" as const,
			text: "Hello! I can help with products, shipping, returns, and checkout. What would you like to know?",
		},
	]);
	const [input, setInput] = useState("");

	const quickPrompts = useMemo(
		() => ["Show me products", "Shipping help", "Return policy", "Checkout support"],
		[]
	);

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const value = input.trim();
		if (!value) return;

		setMessages((prev) => [
			...prev,
			{ id: `${prev.length}-user`, type: "user" as const, text: value },
			{ id: `${prev.length + 1}-assistant`, type: "assistant" as const, text: getChatbotReply(value) },
		]);
		setInput("");
	};

	return (
		<div className="fixed bottom-4 right-4 z-50 flex flex-col items-end gap-3">
			{isOpen ? (
				<div className="w-[min(24rem,calc(100vw-2rem))] rounded-2xl border border-border bg-background shadow-2xl">
					<div className="flex items-center justify-between border-b border-border bg-muted/70 px-4 py-3">
						<div className="flex items-center gap-2">
							<div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
								<Bot className="h-5 w-5" />
							</div>
							<div>
								<p className="font-semibold">Storefront Assistant</p>
								<p className="text-sm text-muted-foreground">Online now</p>
							</div>
						</div>
						<button
							type="button"
							className="rounded-full p-2 text-muted-foreground transition hover:bg-muted"
							onClick={() => setIsOpen(false)}
							aria-label="Close chatbot"
						>
							<X className="h-4 w-4" />
						</button>
					</div>

					<div className="flex max-h-[24rem] flex-col gap-3 overflow-y-auto px-4 py-3">
						{messages.map((message) => (
							<div
								key={message.id}
								className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${message.type === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted text-foreground"}`}
							>
								{message.text}
							</div>
						))}
						<div className="flex flex-wrap gap-2">
							{quickPrompts.map((prompt) => (
								<button
									key={prompt}
									type="button"
									className="rounded-full border border-border bg-background px-3 py-1.5 text-sm text-foreground transition hover:bg-muted"
									onClick={() => {
										setMessages((prev) => [
											...prev,
											{ id: `${prev.length}-user`, type: "user" as const, text: prompt },
											{ id: `${prev.length + 1}-assistant`, type: "assistant" as const, text: getChatbotReply(prompt) },
										]);
									}}
								>
									{prompt}
								</button>
							))}
						</div>
					</div>

					<form onSubmit={handleSubmit} className="border-t border-border p-3">
						<div className="flex items-center gap-2 rounded-full border border-border bg-background px-3 py-2">
							<input
								value={input}
								onChange={(event) => setInput(event.target.value)}
								placeholder="Ask about products or checkout"
								className="flex-1 bg-transparent text-sm outline-none"
							/>
							<button className="rounded-full bg-primary p-2 text-primary-foreground transition hover:opacity-90" type="submit" aria-label="Send message">
								<Send className="h-4 w-4" />
							</button>
						</div>
					</form>
				</div>
			) : (
				<button
					type="button"
					className="flex items-center gap-2 rounded-full bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground shadow-lg transition hover:opacity-90"
					onClick={() => setIsOpen(true)}
				>
					<Bot className="h-5 w-5" />
					Need help?
				</button>
			)}
		</div>
	);
}
