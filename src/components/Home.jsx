import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import post from "../appwrite/Post";
import TaleCard from "./TaleCard";

function Home() {
  const auth = useSelector((state) => state.auth.status);
  const heroRef = useRef(null);
 

  // Parallax effect for Hero section
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroParallax = useTransform(heroScroll, [0, 1], [0, -200]);


  const [posts, setPosts] = useState([]);

  

  useEffect(() => {
    post.getAllPost()
      .then((response) => {
        if (response?.documents) {
          const sortedPosts = response.documents.sort(
            (a, b) => new Date(b.createdAt || b.$createdAt) - new Date(a.createdAt || a.$createdAt)
          );
          setPosts([...sortedPosts]);
        }
      })
      .catch((error) => console.error("Error fetching posts:", error));
  }, []);
  
  
  

  const fullText =
    "Unleash your imagination, one word at a time. Share your story, inspire the world, and let your voice be heard...";
  const [text, setText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = (setInterval(() => {
      if (i < fullText.length) {
        setText((prev) => prev + fullText.charAt(i));
        i++;
      } else {
        clearInterval(interval);
      } 
    }, 70));
    return () => clearInterval(interval);
  }, []);

  const timelineData = [
    {
      date: "Figma",
      title: "UI & UX",
      desc: "Designed intuitive and user-friendly interfaces with wireframes and prototypes in Figma.",
    },
    {
      date: "Appwrite",
      title: "Open Source Backend",
      desc: "Implemented authentication, database, and serverless functions for seamless backend operations.",
    },
    {
      date: "React and Framer Motion",
      title: "Frontend",
      desc: "Built interactive and dynamic UI with React and added smooth animations using Framer Motion.",
    },
    {
      date: "Github",
      title: "Managing Project",
      desc: "Deployed and managed the project with GitHub Pages and continuous integration workflows.",
    },
    {
      date: "Vercel",
      title: "Hosting",
      desc: "Hosted and managed the project on Vercel with CI/CD integration via GitHub Pages.",
    },
  ];
  
  const stories = [
    {
      id: 1,
      tag: "Emotional",
      content:
        "Aarav sat on the park bench, staring at his phone. His fingers hovered over the voicemail icon, the one message he had avoided for weeks. It was from his mother. She had left it the night before the accident....",
      author: "Akshi",
      date: "3 Dec 2025",
    },
    {
      id: 2,
      tag: "Sad",
      content:
        "She texted, 'I made your favorite dinner. Hurry home.'He never read it.The police knocked first.She opened the door, smiling—until she saw their faces....",
      author: "Akshi",
      date: "3 Dec 2025",
    },
  ];
  
  return (
    <div className="w-full items-center justify-center overflow-y-auto">
      {!auth ? (
        <div className="text-white overflow-hidden">
          
        {/* Hero Section */}
        <motion.section
          ref={heroRef}
          style={{ y: heroParallax }}
          className="relative flex flex-col items-center justify-center h-screen bg-black px-8"
        >
          

          <motion.h1
            className="absolute justify-center mx-auto  tracking-[0.1em]  lg:mb-20 w-full text-[17vw] text-center bg-gradient-to-t from-gray-500 to-[#F3EBE3] bg-clip-text text-transparent"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.5 }}
            style={{fontFamily:'Literata'}}
          >
            Taleverse
          </motion.h1>

          <motion.p
              className="text-gray-300/50 mx-10 lg:block md:block hidden tracking-[0.1em] text-center absolute mt-40 lg:mt-60 lg:text-sm max-w-2xl font-mono text-xs"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 ,ease:'ease-in' }}
              transition={{ duration: 1, ease: "easeOut", delay: 1 }}
              style={{fontFamily: "Literata"}}
            >
              {text} <span className="animate-blink">|</span>
            </motion.p>
            <motion.div
        className="absolute bottom-10  flex justify-center  cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut", delay: 1 }}
        onMouseDown={() => {
          document.getElementById("action-buttons").scrollIntoView({ behavior: "smooth" });
        }}
      >
        <motion.span
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
          className=" lg:bg-gray-300 text-white lg:text-gray-900 p-2 px-5 rounded-4xl  text-4xl"
        >
          ↓
        </motion.span>
      </motion.div>
        </motion.section>

        {/* Action Buttons Section */}
         <motion.section
      id="action-buttons"
      className="bg-[#F3EBE3]  w-full py-10 px-6 flex flex-col justify-center items-center"
      initial={{ opacity: 0, scale: 1 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Main Text */}
      <motion.p
        className="text-4xl md:text-[8vh] lg:text-[9vh] italic text-center font-serif text-gray-900 leading-snug max-w-3xl lg:max-w-5xl mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{ fontFamily: 'Literata' }}
      >
        <span className="block ">Share Your Story</span>
       
      </motion.p>

      {/* Stories Grid */}
      <div className=" w-full max-w-5xl px-4">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            className={`relative mb-5 bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 ${
              index % 2 === 0 ? "lg:ml-32 md:ml-32" : "lg:mr-32 md:mr-32"
            }`}
            initial={{ opacity: 0, x: index % 2 === 0 ? 200 : -200 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: "easeInOut", delay: index * 0.2 }}
            
          >
            {/* Tag */}
            <span className={`top-0 left-0  text-white font-bold px-4 py-2 rounded-br-lg text-sm rotate-90 ${
              index % 2 === 0 ? "bg-yellow-500" : "bg-blue-500"
            }`}>
              {story.tag}
            </span>

            {/* Content */}
            <p className="italic mb-4 mt-5  text-sm leading-relaxed text-gray-300">
              {story.content}{" "}
              <span className="text-blue-500 cursor-pointer hover:underline">
                <Link to={`/login`}>
                READ MORE
                </Link>
              </span>
            </p>

            {/* Author */}
            <p className="text-right text-gray-500 text-sm mt-4">
              - {story.author} <br /> {story.date}
            </p>
          </motion.div>
        ))}
      </div>
    </motion.section>

        {/* Journey Section */}
        <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: "easeOut" }}
      // viewport={{ once: true }}
      className="bg-black py-20 px-8 min-h-screen flex flex-col items-center justify-center"
    >
      {/* Section Title */}
      <motion.h2
        className="lg:text-6xl text-4xl font-serif mb-16  text-white italic text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        viewport={{once: true}}
        style={{fontFamily:'Literata'}}
      >
        Techstack Used
      </motion.h2>

      <div className="relative w-full max-w-4xl mx-auto">
        {/* Center Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-600 dark:bg-gray-700 h-full"></div>

        {/* Timeline List */}
        <ol className="relative flex flex-col">
          {timelineData.map((item, index) => (
            <motion.li
              key={index}
              className={`relative mb-8 flex w-full ${
                index % 2 === 0 ? "justify-start" : "justify-end"
              }`}
              initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut", delay: index * 0.2 }}
              // viewport={{ once: true }}
            >
              {/* Timeline Dot */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded-full border-2 border-white dark:border-gray-900"></div>

              {/* Timeline Card */}
              <div
                className={`bg-gray-900 text-white p-6 rounded-lg shadow-md w-[45%] ${
                  index % 2 === 0 ? "text-right" : "text-left"
                }`}
              >
                <time className="mb-1 italic text-sm font-normal leading-none text-gray-400">
                  {item.date}
                </time>
                <h3 className="text-sm lg:text-lg  font-semibold">{item.title}</h3>
                <p className="mb-4 lg:block hidden text-base font-normal text-gray-400">{item.desc}</p>

                {/* Learn More Button */}
               
              </div>
            </motion.li>
          ))}
        </ol>



      </div>
    </motion.section>

      </div>
      ) : (
        <div className="w-full ">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: 0.2 }}
    className="backdrop-blur-lg my-10 w-full max-w-8xl mx-auto rounded-2xl shadow-2xl p-6 bg-opacity-20 "
  >
    {/* Flexbox Container */}
    <div className="flex flex-wrap my-10 gap-6 justify-center">
      {posts.length === 0 ? (
        <motion.p
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1, delay: 0.1 }}
          className="text-gray-300 h-screen text-center w-full text-xl"
        >
          No posts available.
        </motion.p>
      ) : (
        [...posts].sort((a, b) => new Date(b.createdAt || b.$createdAt) - new Date(a.createdAt || a.$createdAt))
          .map((postItem, index) => (
            <motion.div
              key={postItem.$id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2, delay: 0.1 + index * 0.1 }}
              whileHover={{ scale: 1, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)" }}
              className="inline-flex transform transition-all duration-300 ease-in-out"
            >
              <TaleCard
                {...postItem}
                onDelete={() =>
                  setPosts((prev) =>
                    prev.filter((p) => p.$id !== postItem.$id)
                  )
                }
              />
            </motion.div>
          ))
      )}
    </div>
  </motion.div>
</div>
      )}
    </div>
  );
}

export default Home;
