import React from "react";
import NavBar from "./navBar";
import { Carousel } from "react-responsive-carousel";
import TestimonialSlider from "../utils/Testimonies";
import ContactFooter from "../utils/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import food from "../images/Food.jpg";
import delivery from "../images/delivery.svg";
import appPic from "../images/app.png";

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
    <div className="flex flex-wrap items-center px-4">
      <div className="w-full md:w-1/3 p-8 ">
        <h1 className="text-transparent font-bold ml-2 mr-4 lg:text-8xl sm:text-6xl ">
          <span className="text-black ">We help</span> <br />
          <span className="text-orange-500 ">Save Food</span>
        </h1>
        <p className="text-sm mt-12">
          FoodSaver is dedicated to reducing food waste and ensuring that the
          right people get the right help at the right time. We believe that
          every bit of food can make a difference, and our mission is to connect
          surplus food with organizations and individuals who need it the most.
        </p>
      </div>
      <div className="w-full md:w-2/3 p-8">
        <div className="">
          <ImageSlider />
        </div>
      </div>
    </div>
  );
};

const ImageSlider = () => {
  const imageList = [
    "https://images.unsplash.com/photo-1567057419565-4349c49d8a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1172&q=80",
    "https://media.gettyimages.com/id/535555349/photo/group-of-happy-indian-children.jpg?s=612x612&w=0&k=20&c=1zJBdY4-3UfonM955AGb9kHQRcjGQLM6FAuRG_9JGMI=",
    "https://media.gettyimages.com/id/941788480/photo/portrait-of-girl-kid-having-mid-day-meal-in-indian-school.jpg?s=612x612&w=0&k=20&c=tdMRbWtA9rtYSE_6EpXpSl5E4d4xdvqK7egdYd_Q_MM=",
    "https://media.gettyimages.com/id/1295068990/photo/senior-male-friends-having-fun-at-park.jpg?s=612x612&w=0&k=20&c=wKyody-7mgfht5NDonhuDXlN_Z2NnOrwHOlD9JqHdV4=",
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
    <div className="flex flex-col first-letter:items-center justify-center px-8 py-6 bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg cursor-pointer h-auto w-auto">
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
    <div className="text-center p-4 mt-8">
      <div className="flex items-center justify-center mb-8">
        <h4 className="text-3xl font-bold mb-4 text-black mx-4">Our</h4>
        <h4 className="text-3xl font-bold mb-4 text-orange-500">Services</h4>
      </div>
      <div className="flex justify-evenly space-x-4">
        <ServiceTile icon="📝" title="Post Requests" />
        <ServiceTile icon="🤝" title="Connecting" />
        <ServiceTile icon="🚚" title="Pickup" />
      </div>
    </div>
  );
};

const HowWeWork = () => {
  return (
    <div className="text-center px-8 py-8 mt-4">
      <div className="flex items-center justify-center mb-4">
        <h4 className="text-3xl font-bold mb-4">
          <span className="text-black-500">How</span>{" "}
          <span className="text-orange-500">We Work</span>
        </h4>
      </div>

      <div className="flex justify-evenly space-x-4">
        <div className="flex flex-col first-letter:items-center justify-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg cursor-pointer h-auto w-1/3">
          <div className="text-6xl text-orange-500">
            <img
              src={appPic}
              alt="Logo"
              className="h-48 flex justify-center ml-2"
            />
          </div>
          <div className="text-3xl font-bold mt-4 mb-4 text-orange-500">
            Send ur Request
          </div>
          <p className="text-sm ">
            Upload any Request or any Availability you have on our portal
          </p>
        </div>

        <div className="flex flex-col first-letter:items-center justify-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg cursor-pointer h-auto w-1/3">
          <div className="text-3xl font-bold mt-4 mb-4 text-orange-500">
            Accept an Availability
          </div>
          <p className="text-sm ">
            Find the right Request and Availability you need and confirm
          </p>

          <div className=" flex justify-center">
            <img src={food} alt="Logo" className="h-18 w-18 p-14 rounded" />
          </div>
        </div>

        <div className="flex flex-col first-letter:items-center justify-center p-4 bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg cursor-pointer h-auto w-1/3">
          <div className="text-6xl text-orange-500">
            <img
              src={delivery}
              alt="Logo"
              className="h-18 w-18 flex justify-center p-4 ml-2"
            />
          </div>
          <div className="text-2xl font-bold mb-4 text-orange-500">
            Pick Up your Request
          </div>
          <p className="text-sm whitespace-normal mb-4 ">
            Confirm and pick up your food with directions
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
