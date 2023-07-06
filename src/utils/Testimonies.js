import React from "react";
import { useState, useEffect } from "react";
import logo from "../images/logo.svg";

const testimonialsData = [
	{
		id: 1,
		name: "John Doe",
		testimonial:
			"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer vitae mollis lectus. Morbi quis massa ut tellus dapibus accumsan.",
		image: "user1.jpg",
	},
	{
		id: 2,
		name: "Jane Smith",
		testimonial:
			"Ut feugiat aliquam ligula, in bibendum est fringilla vitae. Nam lobortis justo ut orci varius auctor. Fusce rhoncus ullamcorper dolor, id condimentum orci congue id.",
		image: "user2.jpg",
	},
	// Add more testimonials here
];

const TestimonialCard = ({ testimonial }) => {
	return (
		<div className="flex flex-col items-center justify-center text-center p-8 mx-auto shadow-md rounded-lg bg-white">
			<img
				src={logo}
				alt={testimonial.name}
				className="w-16 h-16 rounded-full mb-4"
			/>
			<h4 className="text-lg font-bold mb-2">{testimonial.name}</h4>
			<p className="text-gray-600">{testimonial.testimonial}</p>
		</div>
	);
};

const TestimonialSlider = () => {
	const [currentTestimonial, setCurrentTestimonial] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCurrentTestimonial((prev) =>
				prev === testimonialsData.length - 1 ? 0 : prev + 1
			);
		}, 4000); // Adjust the time interval (in milliseconds) for each slide

		return () => clearInterval(timer);
	}, []);

	return (
		<div className="flex flex-col items-center justify-center">
			<TestimonialCard
				testimonial={testimonialsData[currentTestimonial]}
			/>
		</div>
	);
};

export default TestimonialSlider;
