import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import post from "../appwrite/Post";
import JokeCard from "./JokeCard";

function Home() {
  const auth = useSelector((state) => state.auth.status);
  const heroRef = useRef(null);
  const actionRef = useRef(null);
  // const journeyRef = useRef(null);

  // Parallax effect for Hero section
  const { scrollYProgress: heroScroll } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroParallax = useTransform(heroScroll, [0, 1], [0, -200]);

  // Parallax effect for Action section
  const { scrollYProgress: actionScroll } = useScroll({
    target: actionRef,
    offset: ["start center", "end center"],
  });
  const actionParallax = useTransform(actionScroll, [0, 1], [50, 0]); // More dynamic effect

  // Parallax effect for Journey section

  // const { scrollYProgress: journeyScroll } = useScroll({
  //   target: journeyRef,
  //   offset: ["start center", "end center"],
  // });
  // const journeyParallax = useTransform(journeyScroll, [0, 1], [100, -100]);


  // useEffect(() => {
  //   return scrollYProgress.onChange((latest) =>
  //     // console.log("Scroll Progress:", latest)
  //   );
  // }, [scrollYProgress]);

  const [joke, setJoke] = useState("");
  const [posts, setPosts] = useState([]);

  const fetchJoke = async () => {
    try {
      const response = await fetch(
        "https://official-joke-api.appspot.com/random_joke"
      );
      const data = await response.json();
      setJoke(`${data.setup} - ${data.punchline}`);
    } catch (e) {
      console.error("Error fetching joke:", e);
      setJoke("Failed to fetch a joke. Try again later! 😅");
    }
  };

  useEffect(() => {
    fetchJoke();
    post
      .getAllPost()
      .then((response) => {
        if (response?.documents) {
          setPosts(response.documents);
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
      date: "GitHub",
      title: "Hosting",
      desc: "Deployed and managed the project with GitHub Pages and continuous integration workflows.",
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
  ref={actionRef}
  style={{ y: actionParallax }}
  id="action-buttons"
  className="bg-[#F3EBE3] h-screen w-full px-6 flex flex-col justify-center items-center"
  initial={{ opacity: 0, scale: 1 }}
  whileInView={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
>
  {/* Main Text */}
  <motion.p
    className="text-[5vh] md:text-[8vh] lg:text-[9vh] italic text-center font-serif text-gray-900 leading-snug max-w-3xl lg:max-w-5xl"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.2 }} 
    style={{ fontFamily: 'Literata' }}
  >
    <span className="block ">Your enchanted realm,</span>
    <span className="block ">to <span className="font-bold text-gray-800">escape</span>, to <span className="font-bold text-gray-800">explore</span>,</span>
    <span className="block">and to <span className="font-bold text-gray-800">create</span>.</span>
  </motion.p>

  {/* Interactive Buttons */}
  <motion.div
    className="flex items-center mt-20  justify-center px-14 text-md lg:text-[5vh] mx-14"
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 1, delay: 0.4 }}
    style={{ fontFamily: 'Literata' }}
  >
    {["Dream ✧ Create", "Refine ✧ Enchant", "Share the Magic"].map((text, index) => (
      <div key={index} className="flex items-center ">
        <motion.div
          className="px-6 py-3 bg-black  text-white rounded-xl shadow-lg transition-transform hover:scale-110 hover:shadow-2xl"
          whileHover={{ scale: 1.0 }}
          whileTap={{ scale: 0.95 }}
        >
          {text}
        </motion.div>
        {index < 2 && <span className="text-black text-2xl">→</span>}
      </div>
    ))}
  </motion.div>
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
              className={`relative mb-12 flex w-full ${
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
                <time className="mb-1 text-sm font-normal leading-none text-gray-400">
                  {item.date}
                </time>
                <h3 className="text-sm lg:text-lg  font-semibold">{item.title}</h3>
                <p className="mb-4 lg:block hidden text-base font-normal text-gray-300">{item.desc}</p>

                {/* Learn More Button */}
               
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </motion.section>





      </div>
      ) : (
        <div className="grid grid-cols-1 w-3/4 justify-center mx-auto md:grid-row-2 gap-10 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="h-52 bg-blue-500/20 rounded-2xl shadow-xl p-6 flex flex-col justify-center items-center text-center"
          >
            <h1 className="text-4xl font-extrabold text-white mb-4">
              Random Joke 🤣
            </h1>
            <p className="text-lg text-gray-100 italic">{joke}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={fetchJoke}
              className="mt-6 bg-white text-black px-6 py-3 rounded-lg font-semibold transition cursor-pointer hover:bg-gradient-to-r hover:from-green-500 hover:to-blue-500 shadow-md duration-300 ease-in-out hover:text-white"
            >
              Get New Joke 🔄
            </motion.button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="backdrop-blur-lg p-6 w-full rounded-2xl shadow-lg transition-transform"
          >
            <h1 className="text-4xl font-bold text-white mb-6">Latest Posts</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.length === 0 ? (
                <p className="text-gray-300">No posts available.</p>
              ) : (
                posts.map((postItem) => (
                  <JokeCard
                    key={postItem.$id}
                    {...postItem}
                    onDelete={() =>
                      setPosts((prev) =>
                        prev.filter((p) => p.$id !== postItem.$id)
                      )
                    }
                  />
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
