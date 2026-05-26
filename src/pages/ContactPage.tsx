// src/pages/ContactPage.tsx
import React from "react";
import DynamicGradientCard from "@/components/GradientCard";
import DynamicGradientButton from "@/components/GradientButton";
import { MapPin, Mail, Phone } from "lucide-react"; // Import contact icons

import { Theme, Page } from "@/types";

interface ContactPageProps {
	theme: Theme;
	onNavigate: (page: Page) => void; // Змінили string на Page
}

const ContactPage: React.FC<ContactPageProps> = ({ theme, onNavigate }) => {
	// State for handling the form submission simulation
	const [formData, setFormData] = React.useState({
		name: "",
		email: "",
		message: "",
	});
	const [isSubmitting, setIsSubmitting] = React.useState(false);
	const [submissionStatus, setSubmissionStatus] = React.useState<
		"idle" | "success" | "error"
	>("idle");

	// Handler for form input changes
	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	// Form submission simulation handler
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setIsSubmitting(true);
		setSubmissionStatus("idle");

		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 1200));

		// Validation check
		if (!formData.name || !formData.email || formData.message.length < 10) {
			setSubmissionStatus("error");
			setIsSubmitting(false);
			return;
		}

		// Success simulation
		console.log("Form Data Submitted:", formData); // Log to console for debugging/confirmation
		setSubmissionStatus("success");
		setIsSubmitting(false);
	};

	return (
		<div className='pt-32 pb-20'>
			<div className='max-w-5xl mx-auto px-4 sm:px-6 lg:px-8'>
				{/* Header Section */}
				<div className='text-center mb-16'>
					<h1 className='text-5xl font-bold mb-6'>Get in Touch</h1>
					<p className='text-gray-400 text-lg'>
						Whether you need to reserve a table, inquire about catering, or just
						want to say hello, we are here for you.
					</p>
				</div>

				{/* Content Grid */}
				<div className='grid lg:grid-cols-2 gap-16 p-6 rounded-2xl bg-[#110e0d]/90 backdrop-blur-md '>
					{/* Contact Form (The Interactive Part) */}
					<div className=''>
						<h3 className='text-2xl font-bold mb-6 text-white'>
							Send us a nessage
						</h3>
						<form onSubmit={handleSubmit} className='space-y-6 p-6'>
							{/* Status Feedback */}
							{submissionStatus === "success" && (
								<div className='p-4 bg-green-500/20 border border-green-500 rounded-xl text-center'>
									<p className='font-semibold text-lg text-white'>Success!</p>
									<p className='text-sm text-white/80 mt-1'>
										Your message has been received. We will respond shortly.
									</p>
								</div>
							)}
							{submissionStatus === "error" && (
								<div className='p-4 bg-red-500/20 border border-red-500 rounded-xl text-center'>
									<p className='font-semibold text-lg text-white'>
										Validation Error
									</p>
									<p className='text-sm text-white/80 mt-1'>
										Please ensure Name, Email, and Message are filled out
										(Message must be 10+ chars).
									</p>
								</div>
							)}

							{/* Form Fields */}
							<div>
								<label
									htmlFor='name'
									className='block text-sm font-medium mb-2 text-gray-300'
								>
									Full Name
								</label>
								<input
									type='text'
									id='name'
									name='name'
									value={formData.name}
									onChange={(e) => handleInputChange(e)}
									className='w-full p-3 border border-gray-700 rounded-lg bg-[#110e0d] text-white focus:ring-2 focus:ring-orange-500 transition'
									placeholder='Your Name'
								/>
							</div>

							<div>
								<label
									htmlFor='email'
									className='block text-sm font-medium mb-2 text-gray-300'
								>
									Email Address
								</label>
								<input
									type='email'
									id='email'
									name='email'
									value={formData.email}
									onChange={(e) => handleInputChange(e)}
									className='w-full p-3 border border-gray-700 rounded-lg bg-[#110e0d] text-white focus:ring-2 focus:ring-orange-500 transition'
									placeholder='you@example.com'
								/>
							</div>

							<div>
								<label
									htmlFor='message'
									className='block text-sm font-medium mb-2 text-gray-300'
								>
									Your Message
								</label>
								<textarea
									id='message'
									name='message'
									rows={5}
									value={formData.message}
									onChange={(e) => handleInputChange(e)}
									className='w-full p-3 border border-gray-700 rounded-lg bg-[#110e0d] text-white focus:ring-2 focus:ring-orange-500 transition'
									placeholder='Tell us about your visit or inquiry...'
								/>
							</div>

							<div className='pt-4'>
								<DynamicGradientButton
									onClick={handleSubmit}
									active={true} // Default active state for the primary CTA
									theme={theme} // Pass theme object
								>
									{isSubmitting ? "Sending Message..." : "Send Inquiry"}
								</DynamicGradientButton>
							</div>
						</form>
					</div>

					{/* Contact Info Block */}
					<div className='space-y-8'>
						<div className='gap-6 grid'>
							<h3 className='text-2xl font-bold mb-6 text-white'>
								Our Details
							</h3>

							{/* Contact Item Component */}
							<div className='flex items-start gap-4 p-4 hover:bg-[#1c1816]/50 transition duration-300 rounded-lg border-l-4 border-orange-500/70'>
								<MapPin
									className={`${theme.accent} flex-shrink-0 mt-1`}
									size={28}
								/>{" "}
								{/* Icon */}
								<div>
									<h4 className='text-xl font-semibold text-white'>Location</h4>
									<p className='text-gray-300'>
										{/* Placeholder for actual address */}
									</p>
									<p className='text-sm text-gray-400 mt-1'>
										123 Cafe Lane, City Center, 90210
									</p>
								</div>
							</div>

							{/* Contact Item Component */}
							<div className='flex items-start gap-4 p-4 hover:bg-[#1c1816]/50 transition duration-300 rounded-lg border-l-4 border-orange-500/70'>
								<Mail
									className={`${theme.accent} flex-shrink-0 mt-1`}
									size={28}
								/>{" "}
								{/* Icon */}
								<div>
									<h4 className='text-xl font-semibold text-white'>Email</h4>
									<p className='text-gray-300'>
										{/* Placeholder for actual email */}
									</p>
									<p className='text-sm text-gray-400 mt-1'>hello@coff.com</p>
								</div>
							</div>

							{/* Contact Item Component */}
							<div className='flex items-start gap-4 p-4 hover:bg-[#1c1816]/50 transition duration-300 rounded-lg border-l-4 border-orange-500/70'>
								<Phone
									className={`${theme.accent} flex-shrink-0 mt-1`}
									size={28}
								/>{" "}
								{/* Icon */}
								<div>
									<h4 className='text-xl font-semibold text-white'>Phone</h4>
									<p className='text-gray-300'>
										{/* Placeholder for actual phone */}
									</p>
									<p className='text-sm text-gray-400 mt-1'>
										+1 (555) 123-COFF
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ContactPage;
