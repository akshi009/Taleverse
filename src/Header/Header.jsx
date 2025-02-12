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
        <header className="bg-black text-white shadow-md ">
           
                {/* Logo */}
               


                {/* Desktop Navigation */}
                <nav className="hidden md:flex justify-end">
                    {navItems.map(
                        (item) =>
                            item.active && (
                                <motion.button
                                    key={item.name}
                                    // whileHover={{ scale: 1.1 }}
                                    className="px-4 py-2 rounded-full hover:bg-white hover:text-blue-600 transition cursor-pointer"
                                    onClick={() => navigate(item.slug)}
                                >
                                    {item.name}
                                </motion.button>
                            )
                    )}
                    {authStatus && <Logout />}
                </nav>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden focus:outline-none"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            

            {/* Mobile Navigation */}
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="md:hidden cursor-pointer bg-white text-black px-6 py-4 space-y-2 shadow-lg"
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
