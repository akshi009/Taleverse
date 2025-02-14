import { motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import postService from "../appwrite/Post.js";
import Input from "./Input.jsx";
import RTE from "./RTEtale.jsx";
import Select from "./Select.jsx";

function TalePostForm({ post1 }) {
  const userName = useSelector((state) => state.auth.userData);
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title: post1?.title || "",
        slug: post1?.slug || "",
        content: post1?.content || "",
        status: post1?.status || "active",
        tag: post1?.tag || "Other"
      },
    });

  const tagColors = {
    Love: "bg-pink-100 text-pink-800 dark:bg-pink-300",
    Sad: "bg-indigo-100 text-indigo-800 dark:bg-indigo-300",
    Happy: "bg-yellow-100 text-yellow-700 dark:bg-yellow-300",
    Angry: "bg-red-100 text-red-800 dark:bg-red-300",
    Emotional: "bg-purple-100 text-purple-800 dark:bg-purple-300",
    Dark: "bg-black text-white",
    Other: "bg-gray-100 text-gray-600 dark:bg-gray-300",
  };

  const tags = [
    { name: "Love", color: tagColors.Love },
    { name: "Sad", color: tagColors.Sad },
    { name: "Happy", color: tagColors.Happy },
    { name: "Angry", color: tagColors.Angry },
    { name: "Emotional", color: tagColors.Emotional },
    { name: "Dark", color: tagColors.Dark },
    { name: "Other", color: tagColors.Other },
  ];

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);
  const [error , setError] = useState('')

  const slugTransform = useCallback((value) => {
    return (
      value
        ?.trim()
        .toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-") || ""
    );
  }, []);

  const submit = async (data) => {
    if (!selecttag) {
      setError("Please select a tag before submitting.");
      return;}
    try {
      const postData = {
        ...data,
        userId: userData?.$id || "unknown",
        userName: userData?.name || "Anonymous",
      };

      console.log("Submitting post:", postData);

      const dbPost = post1?.$id
        ? await postService.updatePost(post1.$id, postData)
        : await postService.createPost(postData);

      if (dbPost) {
        navigate(`/`);
      } else {
        setError("Failed to create/update post");
      }
    } catch (error) {
      setError("Error while uploading file or processing post:", error);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title || ""), {
          shouldValidate: true,
        });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  const [selecttag, setSelecttag] = useState(post1?.tag );
  const handleselect = async(tag) => {
    
    setError('')
    try {
      setSelecttag(tag);
    setValue("tag", tag, { shouldValidate: true });
    } catch (error) {
      setError(error);
    }
    
  };

  return (
    <motion.form
      onSubmit={handleSubmit(submit)}
      className="max-w-5xl lg:mx-auto mx-10  mt-20 p-6 text-gray-700 bg-white shadow-xl rounded-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
        <motion.button
            
            type="button"
            onClick={() => navigate(-1)}
            className="justify-end w-full ml-auto text-right top-0 right-0 px-4 py-2 text-lg text-gray-700 font-semibold cursor-pointer hover:text-red-500 duration-300 transition ease-in-out"
          >
            X
          </motion.button>
      <div className="flex flex-col md:flex-row lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-gray-700 mb-6 text-center lg:text-left" style={{ fontFamily: 'Literata' }}>
            {post1 ? "Edit Your Story" : "Share Your Story"}
          </h2>
          <Input
            label="Username"
            placeholder={userName.name}
            className="mb-2  border-gray-300 text-gray-500 cursor-not-allowed"
            disabled
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Title"
              placeholder="Enter post title"
              {...register("title", { required: true })}
            />
            <Input
              label="Slug"
              placeholder="Generated slug"
              {...register("slug", { required: true })}
              onInput={(e) =>
                setValue("slug", slugTransform(e.currentTarget.value), {
                  shouldValidate: true,
                })
              }
            />
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Select a Tag:</h3>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <button
                  type="button"
                  key={tag.name}
                  className={`px-4 py-1 rounded-full text-sm font-medium cursor-pointer transition-all
                    ${tag.color} 
                    ${selecttag === tag.name ? "ring-2 ring-offset-2 ring-blue-500" : "opacity-80 hover:opacity-100"}`}
                  onClick={() => handleselect(tag.name)}
                >
                  {tag.name}
                </button>
              ))}
            </div>
            <input type="hidden" {...register("tag", { required: true })} value={selecttag} />
          </div>
          <Select
            options={["active", "inactive"]}
            label="Status"
            className="w-full sm:w-auto mt-5 "
            {...register("status", { required: true })}
          />
         
        </div>

        {/* Right Section */}
        <div className="flex-1 mb-3">
         
          <RTE
            label="Content"
            name="content"
            className='mb-3'
            control={control}
            defaultvalue={getValues("content")}
          />
        </div>
      </div>
        <div className="text-red-500">
{error}
        </div>
      <motion.button
            
            type="submit"
            className="px-6 py-2 mt-2 w-full md:w-1/2 lg:w-1/2 cursor-pointer text-white font-bold rounded-lg bg-blue-500 hover:bg-blue-600 transition hover:scale-98 "
          >
            {post1 ? "Update" : "Submit"}
          </motion.button>
    </motion.form>
  );
}

export default TalePostForm; 