import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import logo from "../images/logo.svg";

const ContactFooter = () => {
  return (
    /*
    // <footer className=" bg-gray-100 p-6 shadow-sm">
    //   <div>
    //     <div className="flex flex-wrap items-center justify-center px-12">
    //       <div className="w-full md:w-1/3 text-center md:text-left">
    //         <div className="flex justify-start">
    //           <img src={logo} alt="Logo" className="h-16 w-16" />

    //           <h4 className="text-4xl  font-bold p-4 ">
    //             <span className="text-orange-500">FOOD</span>
    //             <span className="text-black">SAVER</span>
    //           </h4>
    //         </div>

    //         <p className="text-black mb-2 ml-4 text-sm">
    //           @powered by
    //           <a href="#"> Karuviyan Innovatives LLP</a>
    //         </p>

    //         <p className="text-black ml-4 text-sm">
    //           For any inquiries or support, please feel free to reach out to us.
    //         </p>
    //         <div className="flex space-evenly space-x-4 mt-4 ml-4">
    //           <FaInstagram className="text-2xl text-red-500" />
    //           <FaFacebook className="text-2xl text-blue-500" />
    //           <FaTwitter className="text-2xl text-blue-400" />
    //           <FaWhatsapp className="text-2xl text-green-500" />
    //         </div>
    //       </div>

    //       <div className="flex flex-col mt-0  w-full md:w-1/3 text-center ">
    //         <div className="text-lg font-bold mb-4">Quick Links</div>
    //         <ul className="flex items-center justify-center mt-4 md:mt-0">
    //           <li className="ml-4">
    //             <a href="/" className="text-black hover:text-gray-800">
    //               Home
    //             </a>
    //           </li>
    //           <li className="ml-4">
    //             <a href="#" className="text-black hover:text-gray-800">
    //               Phone
    //             </a>
    //           </li>
    //           <li className="ml-4">
    //             <a
    //               href="#"
    //               className="text-black hover:text-gray-800"
    //               target="_blank"
    //               rel="noopener noreferrer"
    //             >
    //               Website
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //       <div className="flex flex-col mt-0  w-full md:w-1/3 text-center ">
    //         <div className="text-lg font-bold mb-4">Contact Us</div>
    //         <ul className="flex items-center justify-center mt-4 md:mt-0">
    //           <li className="ml-4">
    //             <a
    //               href="mailto:dummy@example.com"
    //               className="text-black hover:text-gray-800"
    //             >
    //               Email
    //             </a>
    //           </li>
    //           <li className="ml-4">
    //             <a href="#" className="text-black hover:text-gray-800">
    //               Our Services
    //             </a>
    //           </li>
    //           <li className="ml-4">
    //             <a
    //               href="#"
    //               className="text-black hover:text-gray-800"
    //               target="_blank"
    //               rel="noopener noreferrer"
    //             >
    //               How we work
    //             </a>
    //           </li>
    //         </ul>
    //       </div>
    //     </div>
    //   </div>
    // </footer>*/
    <footer class="text-gray-600 body-font">
  <div class="container px-5 py-8 mx-auto flex items-center sm:flex-row flex-col">
    <a class="flex title-font font-medium items-center md:justify-start justify-center text-gray-900">
    <div className="flex justify-start">
     <img src={logo} alt="Logo" className="h-16 w-16" />

     <h4 className="text-4xl  font-bold p-4 ">
     <span className="text-orange-500">FOOD</span>
     <span className="text-black">SAVER</span>
     </h4>
     </div>
    </a>
    <p class="text-sm text-gray-500 sm:ml-4 sm:pl-4 sm:border-l-2 sm:border-gray-200 sm:py-2 sm:mt-0 mt-4">© 2023 Karuviyan Innovatives LLP
      
    </p>
    <span class="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center sm:justify-start">
      <a class="text-gray-500">
        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
        </svg>
      </a>
      <a class="ml-3 text-gray-500">
        <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
          <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
        </svg>
      </a>
      <a class="ml-3 text-gray-500">
        <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-5 h-5" viewBox="0 0 24 24">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
          <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path>
        </svg>
      </a>
      <a class="ml-3 text-gray-500">
        <svg fill="currentColor" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="0" class="w-5 h-5" viewBox="0 0 24 24">
          <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path>
          <circle cx="4" cy="4" r="2" stroke="none"></circle>
        </svg>
      </a>
    </span>
  </div>
</footer>
  );
};

export default ContactFooter;
