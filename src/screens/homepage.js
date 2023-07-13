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
    <section class="text-gray-600 body-font px-4">
      <div class="container mx-auto flex px-5 py-5 sm:py-24 md:flex-row flex-col items-center w-full justify-center">
        <div class="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 mb-10 md:mb-0">
          <ImageSlider />
        </div>
        <div class="max-w-2xl lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
          <h1 class="title-font sm:text-7xl text-5xl mb-4 font-bold text-gray-900">We help
            <br />
            <span className="text-orange-500">Save Food  </span>  </h1>
          <p class="mb-8 leading-relaxed">FoodSaver is dedicated to reducing food waste and ensuring that the
            right people get the right help at the right time. We believe that
            every bit of food can make a difference, and our mission is to connect
            surplus food with organizations and individuals who need it the most.</p>
          <div class="flex justify-center">
            <button class="inline-flex text-white bg-orange-500 border-0 py-2 px-6 focus:outline-none hover:bg-orange-600 rounded text-lg">Help Us</button>

          </div>
        </div>
      </div>
    </section>
    /* // <div className="flex flex-wrap items-center px-4">
    //   <div className="w-full md:w-1/3 p-8 ">
    //     <h1 className="text-transparent font-bold ml-2 mr-4 lg:text-8xl sm:text-6xl ">
    //       <span className="text-black ">We help</span> <br />
    //       <span className="text-orange-500 ">Save Food</span>
    //     </h1>
    //     <p className="text-sm mt-12">
    //       FoodSaver is dedicated to reducing food waste and ensuring that the
    //       right people get the right help at the right time. We believe that
    //       every bit of food can make a difference, and our mission is to connect
    //       surplus food with organizations and individuals who need it the most.
    //     </p>
    //   </div>
    //   <div className="w-full md:w-2/3 p-8">
    //     <div className="">
    //       <ImageSlider />
    //     </div>
    //   </div>
    // </div> */

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
      <div className="flex flex-wrap gap-3 justify-evenly space-x-4">
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

      <h2 class="flex flex-row flex-nowrap items-center my-8">
        <span class="flex-grow block border-t border-orange-600" aria-hidden="true" role="presentation"></span>
        <span class="flex-none block mx-4   px-4 py-2.5 leading-none font-bold uppercase bg-orange-600 text-white text-3xl">
          How We Work
        </span>
        <span class="flex-grow block border-t border-orange-600" aria-hidden="true" role="presentation"></span>
      </h2>
      <div class="flex flex-wrap -mx-4 mt-20">
         <div class="w-full md:w-1/2 xl:w-1/3 px-4">
            <div class="bg-white rounded-lg overflow-hidden mb-10 shadow-lg">
               <img
                  src={ appPic }
                  alt="image "
                  class="min-h-[400px]"
                  />
               <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3>
                     <h2
                        class="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        text-orange-500
                        "
                        >
                     Send Your Request
                     </h2>
                  </h3>
                  <p class="text-base text-body-color leading-relaxed mb-7">
                    Upload any Request or any Availability you have on our portal
                  </p>
                  
               </div>
            </div>
         </div>
         <div class="w-full md:w-1/2 xl:w-1/3 px-4">
            <div class="bg-white rounded-lg overflow-hidden mb-10 shadow-lg">
               <img
                  src={food}
                  alt="image"
                  class="min-h-[400px]"
                  />
               <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3>
                     <h2
                        class="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        text-orange-500
                        "
                        >
                     Accept an Availablity
                     </h2>
                  </h3>
                  <p class="text-base text-body-color leading-relaxed mb-7">
                  Find the right Request and Availability you need and confirm
                  </p>
                  
               </div>
            </div>
         </div>
         <div class="w-full md:w-1/2 xl:w-1/3 px-4">
            <div class="bg-white rounded-lg overflow-hidden mb-10 shadow-lg">
               <img
                  src={delivery}
                  alt="image"
                  class="min-h-[400px]"
                  />
               <div class="p-8 sm:p-9 md:p-7 xl:p-9 text-center">
                  <h3>
                     <h2
                        class="
                        font-semibold
                        text-dark text-xl
                        sm:text-[22px]
                        md:text-xl
                        lg:text-[22px]
                        xl:text-xl
                        2xl:text-[22px]
                        mb-4
                        block
                        hover:text-primary
                        text-orange-500
                        "
                        >
                     Pick Up Your Request
                     </h2>
                  </h3>
                  <p class="text-base text-body-color leading-relaxed mb-7">
                  Confirm and pick up your food with directions
                  </p>
                  
               </div>
            </div>
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
