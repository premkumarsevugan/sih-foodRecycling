import React from "react";
import NavBar from "./navBar";
import { Carousel } from "react-responsive-carousel";
import TestimonialSlider from "../utils/Testimonies";
import ContactFooter from "../utils/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import food from "../images/food.svg";
import delivery from "../images/delivery.svg";
import app from "../images/app.svg";

const Homepage = () => {
  return (
    <div className="">
      <NavBar />
      <ResponsiveComponent />
      <HowWeWork />
      <ServicesComponent />
      <Testimonies />
      <ContactFooter />
    </div>
  );
};

const ResponsiveComponent = () => {
  return (
    <div className="flex flex-wrap items-center px-4 h-120">
      <div className="w-full md:w-1/3 p-8 ">
        <h1 className="text-transparent font-bold ml-2 mr-4 lg:text-8xl sm:text-6xl ">
          <span className="text-black ">We help</span> <br />
          <span className="text-orange-500 ">Save Food</span>
        </h1>
        <p className="text-sm mt-12">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eleifend
          pretium turpis, ac tincidunt ex condimentum id. Fusce eleifend
          suscipit ante, eu iaculis nisl eleifend at.
        </p>
      </div>
      <div className="w-full md:w-2/3 p-4">
        <div className="w-auto h-auto ">
          <ImageSlider />
        </div>
      </div>
    </div>
  );
};

const ImageSlider = () => {
  const imageList = [
    "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    "https://images.unsplash.com/photo-1524069290683-0457abfe42c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTV8fHBvb3IlMjBraWRzfGVufDB8fDB8fHww&auto=format&fit=crop&w=500&q=60",
    "https://images.unsplash.com/photo-1542810634-71277d95dcbb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8cG9vciUyMGtpZHN8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60",
    "https://media.istockphoto.com/id/896375494/photo/portrait-of-indian-village-boy-in-classroom-at-school.webp?b=1&s=170667a&w=0&k=20&c=G2ELGpfULkzKfJBxC63lBTCliDe8erSkYpP5fWhlbCc=",
  ];

  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      showIndicators={false}
      infiniteLoop
      emulateTouch
      centerMode
      centerSlidePercentage={100}
      selectedItem={0}
      useKeyboardArrows
      autoPlay
      interval={3000}
      transitionTime={800}
      stopOnHover
      className="w-full"
    >
      {imageList.map((image, index) => (
        <div key={index}>
          <img
            src={image}
            alt={`Slide ${index}`}
            className="w-auto h-auto object-cover rounded-xl"
          />
        </div>
      ))}
    </Carousel>
  );
};

const ServiceTile = ({ icon, title }) => {
  return (
    <div className="flex flex-col first-letter:items-center justify-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg cursor-pointer h-auto w-auto">
      <div className="text-8xl text-orange-500 mb-6">{icon}</div>
      <div className="text-lg font-bold mt-4 mb-4">{title}</div>
      <p className="text-sm mb-12">
        We provide the best service you ever need.
      </p>
    </div>
  );
};

const ServicesComponent = () => {
  return (
    <div className="text-center p-4 mt-16">
      <div className="flex items-center justify-center mb-8">
        <h4 className="text-3xl font-bold mb-4 text-black mx-4">Services</h4>
        <h4 className="text-3xl font-bold mb-4 text-orange-500">We Provide</h4>
      </div>
      <div className="flex justify-evenly space-x-4">
        <ServiceTile icon="🍽️" title="Catering" />
        <ServiceTile icon="🚚" title="Delivery" />
        <ServiceTile icon="💼" title="Consultation" />
      </div>
    </div>
  );
};

const HowWeWork = () => {
  return (
    <div className="text-center px-8 py-8 mt-8">
      <div className="flex items-center justify-center mb-6">
        <h4 className="text-3xl font-bold mb-4 text-orange-500">How We Work</h4>
        <h4 className="text-3xl font-bold mb-4 text-black mx-4">
          To Serve You
        </h4>
      </div>

      <div className="flex justify-evenly space-x-4">
        <div className="flex flex-col first-letter:items-center justify-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg cursor-pointer h-auto w-auto">
          <div className="text-6xl text-orange-500">
            <img src={app} alt="Logo" className="h-18 w-18 ml-8" />
          </div>
          <div className="text-lg font-bold mt-4 mb-4">Send ur Request</div>
          <p className="text-sm">
            Do you want to lose weight, exercise, adhere to a therapeutic diet?
            Our dietitian will help you with choosing the right program!
          </p>
        </div>

        <div className="flex flex-col first-letter:items-center justify-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg cursor-pointer h-auto w-auto">
          <div className="text-lg font-bold mt-4 mb-4">Accept Request</div>
          <p className="text-sm">
            Do you want to lose weight, exercise, adhere to a therapeutic diet?
            Our dietitian will help you with choosing the right program!
          </p>

          <div className="text-6xl text-orange-500 mt-6 ml-10">
            <img src={food} alt="Logo" className="h-18 w-18" />
          </div>
        </div>

        <div className="flex flex-col first-letter:items-center justify-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg cursor-pointer h-auto w-auto">
          <div className="text-6xl text-orange-500">
            <img src={delivery} alt="Logo" className="-18 w-18 ml-6" />
          </div>
          <div className="text-lg font-bold mt-4 mb-4">Get it delivered</div>
          <p className="text-sm whitespace-normal">
            Do you want to lose weight, exercise, adhere to a therapeutic diet?
            Our dietitian will help you with choosing the right program!
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonies = () => {
  return (
    <div className="text-center px-8 py-8 mt-8">
      <div className="mb-6">
        <h4 className="text-3xl font-bold mb-2 text-black mx-4">Testimonies</h4>
        <h4 className="text-3xl font-bold mb-4 text-orange-500">
          That prove our Mission
        </h4>
      </div>
      <div className="flex flex-wrap items-center px-4">
        <div className="w-full md:w-1/2 p-8 ">
          <TestimonialSlider />
        </div>
        <div className="w-full md:w-1/2 p-4">
          <ImageSlider />
        </div>
      </div>
    </div>
  );
};

export default Homepage;
