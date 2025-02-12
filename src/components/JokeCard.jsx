import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import post from "../appwrite/Post";

function JokeCard({ $id, title, content, userName,onDelete }) {
  const navigate = useNavigate();
  const stripHtml = (html) => html.replace(/<[^>]*>?/gm, "");

  const userData = useSelector((state) => state.auth.userData);
  const isAuth = userData?.$id && userData.name === userName; // Check if logged-in user is the author

   const deletePost = async () => {
    try {
      await post.deletePost($id);
      console.log("✅ Post deleted successfully.");
      
      if (onDelete) onDelete($id); // Update the UI immediately
      navigate('/')
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const edit = () => {
    navigate(`/edit-post/${$id}`);
  };

  const WORD_LIMIT = 20;
  const truncateContent = (content) => {
    const words = content.split(" ");
    if (words.length > WORD_LIMIT) {
      return words.slice(0, WORD_LIMIT).join(" ") + "...";
    }
    return content;
  };

  const cleanContent = stripHtml(content);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full h-60 bg-white/10 backdrop-blur-lg shadow-lg rounded-xl overflow-hidden p-6 border border-white/10 flex flex-col"
    >
      {/* Joke Title */}
      <h1 className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-2">
        {title}
      </h1>

      {/* Joke Content */}
      <Link to={`/post/${$id}`} className="block p-2 rounded-lg transition-all duration-300 hover:bg-white/10">
        <p className="text-gray-300 text-md leading-relaxed flex-1">
          {truncateContent(cleanContent)}
          {cleanContent.split(" ").length > WORD_LIMIT && (
            <span className="text-blue-400 ml-2 cursor-pointer">Read More</span>
          )}
        </p>
      </Link>

      {/* Spacer to push buttons to bottom */}
      <div className="flex-1"></div>

      {/* Written by */}
      <p className="text-gray-400 text-xs italic text-right mt-4">
        — {userName}
      </p>

      {/* Authenticated User Actions (Fixed at Bottom) */}
      {isAuth && (
        <div className="flex justify-end gap-4 mt-auto pt-4 border-gray-600">
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
  );
}

export default JokeCard;