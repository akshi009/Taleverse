import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import post from "../appwrite/Post";

// Function to strip HTML tags
const stripHtml = (html) => html.replace(/<[^>]*>?/gm, "");

function JokePost() {
    const [post1, setPost1] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const userData = useSelector((state) => state.auth.userData);
    const isAuth = post1 && userData?.$id && post1.userId === userData.$id;

    useEffect(() => {
        if (slug) {
            post.getPost(slug).then((data) => {
                if (data) setPost1(data);
                else navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = async () => {
        if (!post1?.$id) return;
        try {
            await post.deletePost(post1.$id);
            navigate("/");
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const edit = () => {
        if (post1?.$id) {
            navigate(`/edit-post/${post1.$id}`);
        }
    };

    return post1 ? (
        <div className="p-10 flex w-full items-center h-96 justify-start  pt-20">
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full bg-white/10 bg-opacity-70 shadow-lg rounded-xl overflow-hidden p-6 border border-gray-700"



            >
                {/* Post Image (Placeholder for Now) */}
                

                {/* Joke Title */}
                <h1 className="text-2xl font-bold text-gray-100 mb-2">{post1.title}</h1>

                {/* Joke Content (Fixed: No more unwanted <p> tags) */}
                <p className="text-gray-300 mb-4">{stripHtml(post1.content)}</p>

                {/* Written by */}
                <p className="text-gray-400 text-sm text-right italic">
                    — {post1.userName}
                </p>

                {/* Authenticated User Actions */}
                {isAuth && (
                    <div className="flex justify-end gap-4 mt-6">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-600 transition"
                            onClick={edit}
                        >
                            ✏️ Edit
                        </motion.button>
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="bg-red-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-red-700 transition"
                            onClick={deletePost}
                        >
                            ❌ Delete
                        </motion.button>
                    </div>
                )}
            </motion.div>
        </div>
    ) : null;
}

export default JokePost;
