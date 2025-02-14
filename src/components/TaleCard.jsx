import { motion } from "framer-motion";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import post from "../appwrite/Post";

function TaleCard({ $id, title, content, userName, onDelete, tag }) {
  const navigate = useNavigate();
  

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showToast, setShowToast] = useState(false); // State for toast visibility

  const stripHtml = (html) => {
    if (!html) return "";
    
    // Remove HTML tags
    let text = html.replace(/<[^>]*>?/gm, "");
    
    // Decode HTML entities
    const doc = new DOMParser().parseFromString(text, "text/html");
    return doc.documentElement.textContent;
  };
  

  const userData = useSelector((state) => state.auth.userData);
  const isAuth = userData?.$id && userData.name === userName;



  const tagColors = {
    Love: "bg-pink-100 text-pink-400 dark:bg-pink-300/10",
    Sad: "bg-indigo-100 text-indigo-400 dark:bg-indigo-300/10",
    Happy: "bg-yellow-100 text-yellow-400 dark:bg-yellow-300/10",
    Angry: "bg-red-100 text-red-400 dark:bg-red-300/10",
    Emotional: "bg-purple-100/10 text-purple-400 dark:bg-purple-300/10",
    Dark: "bg-gray-100/10 text-white",
    Other: "bg-gray-100 text-gray-400 dark:bg-gray-300/10",
  };

  const deletePost = async () => {
    try {
      await post.deletePost($id);
      if (onDelete) onDelete($id); 
      setShowToast(true); 
      setTimeout(() => setShowToast(false), 3000); 
      console.log("Post deleted and toast shown"); 
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const edit = () => {
    navigate(`/edit-post/${$id}`);
  };

  const WORD_LIMIT = 65;
  const truncateContent = (content) => {
    const words = content.split(" ");
    if (words.length > WORD_LIMIT) {
      return words.slice(0, WORD_LIMIT).join(" ") + "...";
    }
    return content;
  };

  const cleanContent = stripHtml(content);

  return (
    <>
      {/* Toast Notification */}
      {showToast && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3 }}
          className="fixed top-5 right-5 flex items-center w-full max-w-xs p-4 space-x-4 text-gray-500 bg-white divide-x divide-gray-200 rounded-lg shadow-lg z-[1000]"
          role="alert"
        >
          <svg
            className="w-5 h-5 text-blue-600 rotate-45"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m9 17 8 2L9 1 1 19l8-2Zm0 0V9"
            />
          </svg>
          <div className="ps-4 text-sm font-normal">Post deleted successfully.</div>
        </motion.div>
      )}

      {/* Joke Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex flex-col mb-5 bg-[#0a0d14] text-white h-96 lg:h-[350px] rounded-xl shadow-lg w-80 lg:w-[450px] p-5 transition-all hover:shadow-xl"
      >
          <div
            className={`left-0 absolute px-3 top-0  text-center rounded-tl-xl rounded-br-lg p-1 ${
              tagColors[tag] || tagColors["Other"]
            } justify-end text-left`}
          >
            {tag || "Other"}
          </div>
        <div className="flex absolute w-full top-0 right-0 justify-end px-5 p-3 ">

          {/* Authenticated User Actions */}
          {isAuth && (
            <div className="flex justify-end top-0 right-0">
              {/* Dropdown Button */}
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="inline-block text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
              >
                <svg
                  className="w-5 h-5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute top-8 right-16 z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-md w-44 dark:bg-gray-700">
                  <ul className="py-2">
                    <li>
                      <button
                        onClick={edit}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        ✏️ Edit
                      </button>
                    </li>
                    <li>
                      <button
                        onClick={deletePost}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                      >
                        ❌ Delete
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Section */}
        <Link to={`/post/${$id}`}>
        <div className="flex-1 mt-10">
          <h2 className="text-lg font-bold text-gray-200">{title.toUpperCase()}</h2>
          <p className="text-gray-400 mt-5 text-sm  leading-relaxed">
            {truncateContent(cleanContent)}

            {cleanContent.split(" ").length > WORD_LIMIT && (
              <Link to={`/post/${$id}`} className=" text-gray-400 hover:text-blue-500 transition duration-300 ml-2">
                READ MORE
              </Link>
            )}
          </p>
        </div>
        </Link>

        
        <div className="mt-auto">
          <div className="text-gray-500 text-sm italic text-right">— {userName}</div>
          {/* <div className="text-gray-500 text-sm italic text-right">— {userName}</div> */}
        </div>
      </motion.div>
    </>
  );
}

export default TaleCard;