import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import post from "../appwrite/Post";

// Function to strip HTML tags
const stripHtml = (html) => {
  if (!html) return "";
  let text = html.replace(/<[^>]*>?/gm, "");
  const doc = new DOMParser().parseFromString(text, "text/html");
  return doc.documentElement.textContent;
};


// Function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-GB"); // DD/MM/YY format
};

function TalePost() {
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

  // Tag colors for sidebar
  const tagColors = {
    Love: "bg-pink-100 text-pink-400 dark:bg-pink-300/10",
    Sad: "bg-indigo-100 text-indigo-400 dark:bg-indigo-300/10",
    Happy: "bg-yellow-100 text-yellow-400 dark:bg-yellow-300/10",
    Angry: "bg-red-100 text-red-400 dark:bg-red-300/10",
    Emotional: "bg-purple-100/10 text-purple-400 dark:bg-purple-300/10",
    Dark: "bg-gray-100/10 text-white",
    Other: "bg-gray-100 text-gray-400 dark:bg-gray-300/10",
  };

  const [dropdownOpen, setDropdownOpen] = useState(false);
  return post1 ? (
    <div className=" items-center lg:m-20 md:m-10 mt-10 p-6">
     
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative flex bg-[#0a0d14] text-white rounded-xl overflow-hidden shadow-lg p-6 w-full "
      >
       
       <div
            className={`left-0 absolute px-3 top-0 text-center rounded-tl-xl rounded-br-lg p-1 ${
              tagColors[post1.tag] || tagColors["Other"]
            } justify-end text-left`}
          >
            {post1.tag || "Other"}
          </div>


        {/* Main Content */}
        <div className=" flex flex-col w-full">
            
            <div className="flex justify-end gap-5">

            {/* Authenticated User Actions */}
          {isAuth && (
          <div className="flex justify-end top-0  right-0">
            {/* Dropdown Button */}
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="inline-block  text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:focus:ring-gray-700 rounded-lg text-sm p-1.5"
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

          <h1 className="text-gray-200 mt-5 font-bold text-2xl">{post1.title}</h1>
          <p className="text leading-relaxed text-gray-400 mt-2">
            {stripHtml(post1.content)}
          </p>

          {/* Author & Date */}
          <div className=" text-gray-400 flex  w-full justify-end right-0 text-sm italic mt-4">
            <div className="justify-end  right-0">— {post1.userName}</div>
          </div>
            <div className="justify-end text-gray-400 right-0 flex text-sm italic">{formatDate(post1.$createdAt)}</div>


          
        </div>
      </motion.div>
    </div>
  ) : null;
}

export default TalePost;
