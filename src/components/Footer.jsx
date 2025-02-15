import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className=" bg-gray-900">
      <div className="container mx-auto text-center md:py-8 lg:py-8">
        {/* Brand Logo */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <a href="/" className="flex gap-3 items-center">
        
            
            <span style={{fontFamily:'Literata'}} className="self-center text-gray-400 lg:block md:block hidden text-2xl font-semibold ">
              Taleverse
            </span>
          </a>
        </motion.div>

        {/* Footer Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className=" lg:grid md:grid hidden grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3"
        >
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase ">
              Resources
            </h2>
            <ul className="text-gray-500 dark:text-gray-500 font-medium">
              <li className="mb-4">
                <a href="/" className="hover:underline">
                  Documentation
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase ">
              Follow Us
            </h2>
            <ul className="text-gray-500 dark:text-gray-500 font-medium">
              <li className="mb-4">
                <a href="https://github.com/akshi009/Taleverse" className="hover:underline">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://discord.com" className="hover:underline">
                  Discord
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h2 className="mb-6 text-sm font-semibold text-gray-300 uppercase ">
              Legal
            </h2>
            <ul className="text-gray-500 dark:text-gray-500 font-medium">
              <li className="mb-4">
                <a href="/" className="hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/" className="hover:underline">
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </motion.div>

        {/* Divider */}
        <motion.hr
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="my-6 lg:block md:block hidden border-gray-200 dark:border-gray-700 lg:my-8"
        />

        {/* Copyright & Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="md:flex md:items-center hidden md:justify-between"
        >
          <span className="text-sm text-gray-500 dark:text-gray-500">
            © {new Date().getFullYear()} Taleverse. All Rights Reserved.
          </span>
          <div className="flex mt-4 sm:mt-0 space-x-5">
            <a href="#" className="text-gray-500 hover:text-gray-300 dark:hover:text-gray-300">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 dark:hover:text-gray-300">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 dark:hover:text-gray-300">
              <i className="fab fa-github"></i>
            </a>
            <a href="#" className="text-gray-500 hover:text-gray-300 dark:hover:text-gray-300">
              <i className="fab fa-dribbble"></i>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}

export default Footer;