import { motion } from "framer-motion";
import { Menu, X } from "lucide-react"; // For mobile menu icons
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Logout from "./Logout";

function Header() {
    const authStatus = useSelector((state) => state.auth.status);
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const navItems = [
        { name: "Home", slug: "/", active: true },
        { name: "Login", slug: "/login", active: !authStatus },
        { name: "Signup", slug: "/signup", active: !authStatus },
        { name: "Add Post", slug: "/addpost", active: authStatus },
        { name: "All Posts", slug: "/allpost", active: authStatus },
    ];

    return (
        <header className="bg-black py-2 text-white shadow-md justify-end right-0">
           
                {/* Logo */}
               


                {/* Desktop Navigation */}
                <nav className="hidden md:flex justify-end right-3 mx-10">
                    {navItems.map(
                        (item) =>
                            item.active && (
                                <button
                                    key={item.name}
                                    // whileHover={{ scale: 1.1 }}
                                    className="px-4 py-2 rounded-full hover:bg-gray-700 duration-300 ease-in-out transition cursor-pointer"
                                    onClick={() => navigate(item.slug)}
                                >
                                    {item.name}
                                </button>
                            )
                    )}
                    {authStatus && <Logout />}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden focus:outline-none text-left justify-end mx-2"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            

            {/* Mobile Navigation */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden cursor-pointer bg-black text-gray-200 px-6 pt-4 space-y-2 shadow-lg"
                >
                    {navItems.map(
                        (item) =>
                            item.active && (
                                <button
                                    key={item.name}
                                    className="block w-full text-left px-4 py-2 rounded-lg hover:bg-gray-100 transition cursor-pointer"
                                    onClick={() => {
                                        navigate(item.slug);
                                        setIsOpen(false);
                                    }}
                                >
                                    {item.name}
                                </button>
                            )
                    )}
                    {authStatus && <Logout />}
                </motion.div>
            )}
        </header>
    );
}

export default Header;
