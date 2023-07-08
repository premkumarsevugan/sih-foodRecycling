import { FaInstagram, FaFacebook, FaTwitter, FaWhatsapp } from "react-icons/fa";
import logo from "../images/logo.svg";

const ContactFooter = () => {
	return (
		<footer className=" bg-gray-100 p-6 shadow-sm">
			<div>
				<div className="flex flex-wrap items-center justify-center px-12" >
					<div className="w-full md:w-1/3 text-center md:text-left">
						<div className="flex justify-start">
							<img src={logo} alt="Logo" className="h-16 w-16" />

							<h4 className="text-4xl  font-bold p-4 ">
								<span className="text-orange-500">FOOD</span>
								<span className="text-black">SAVER</span>
							</h4>
						</div>

						<p className="text-black mb-2 ml-4 text-sm">
							@powered by 
						</p>

						<p className="text-black ml-4">
							For any inquiries or support, please feel free to
							reach out to us.
						</p>
						<div className="flex space-evenly space-x-4 mt-4 ml-4">
							<FaInstagram className="text-2xl text-red-500" />
							<FaFacebook className="text-2xl text-blue-500" />
							<FaTwitter className="text-2xl text-blue-400" />
							<FaWhatsapp className="text-2xl text-green-500" />
						</div>
					</div>

					<div className="flex flex-col mt-0  w-full md:w-1/3 text-center ">
						<div className="text-lg font-bold mb-4">
							Quick Links
						</div>
						<ul className="flex items-center justify-center mt-4 md:mt-0">
							<li className="ml-4">
								<a
									href="/"
									className="text-black hover:text-gray-800"
								>
									Home
								</a>
							</li>
							<li className="ml-4">
								<a
									href="#"
									className="text-black hover:text-gray-800"
								>
									Phone
								</a>
							</li>
							<li className="ml-4">
								<a
									href="#"
									className="text-black hover:text-gray-800"
									target="_blank"
									rel="noopener noreferrer"
								>
									Website
								</a>
							</li>
						</ul>
					</div>
					<div className="flex flex-col mt-0  w-full md:w-1/3 text-center ">
						<div className="text-lg font-bold mb-4">Contact Us</div>
						<ul className="flex items-center justify-center mt-4 md:mt-0">
							<li className="ml-4">
								<a
									href="mailto:dummy@example.com"
									className="text-black hover:text-gray-800"
								>
									Email
								</a>
							</li>
							<li className="ml-4">
								<a
									href="#"
									className="text-black hover:text-gray-800"
								>
									Our Services
								</a>
							</li>
							<li className="ml-4">
								<a
									href="#"
									className="text-black hover:text-gray-800"
									target="_blank"
									rel="noopener noreferrer"
								>
									How we work
								</a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default ContactFooter;
