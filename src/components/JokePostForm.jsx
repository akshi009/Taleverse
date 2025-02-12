import { motion } from "framer-motion";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import postService from "../appwrite/Post.js";

import Input from "../components/Input.jsx";
import RTE from "../components/RTEjoke.jsx";
import Select from "../components/Select.jsx";

function JokePostForm({ post1 }) {
  const userName = useSelector((state) => state.auth.userData);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    getValues,
  } = useForm({
    defaultValues: {
      title: post1?.title || "",
      slug: post1?.slug || "",
      content: post1?.content || "",
      status: post1?.status || "active",
    },
  });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

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
        console.error("Failed to create/update post");
      }
    } catch (error) {
      console.error("Error while uploading file or processing post:", error);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title || ""), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <motion.form
      onSubmit={handleSubmit(submit)}
      className="max-w-3xl mx-auto p-6 bg-white shadow-xl rounded-lg border border-gray-200"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Form Header */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
        {post1 ? "Edit Joke Post" : "Create a New Joke Post"}
      </h2>

      {/* User Info */}
      <div className="mb-4">
        <Input
          label="Username"
          placeholder={userName.name}
          className="mb-2 bg-gray-100 border-gray-300 text-gray-500 cursor-not-allowed"
          {...register("title", { required: true })}
          disabled
        />
      </div>

      {/* Title & Slug Inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Title"
          placeholder="Enter post title"
          className="focus:ring focus:ring-blue-300"
          {...register("title", { required: true })}
        />
        <Input
          label="Slug"
          placeholder="Generated slug"
          className="focus:ring focus:ring-blue-300"
          {...register("slug", { required: true })}
          onInput={(e) =>
            setValue("slug", slugTransform(e.currentTarget.value), {
              shouldValidate: true,
            })
          }
        />
      </div>

      {/* Content Editor */}
      <div className="mt-4">
        <RTE
          label="Content"
          name="content"
          control={control}
          defaultvalue={getValues("content")}
        />
      </div>

      {/* Status & Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between">
        <Select
          options={["active", "inactive"]}
          label="Status"
          className="w-full sm:w-auto focus:ring focus:ring-blue-300"
          {...register("status", { required: true })}
        />

        <div className="flex gap-4 mt-4 sm:mt-0">
          {/* Cancel Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            onClick={() => navigate(-1)}
            className="px-6 py-2 bg-gray-400 text-white font-bold rounded-lg transition hover:bg-gray-500"
          >
            Cancel
          </motion.button>

          {/* Submit/Update Button */}
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className={`px-6 py-2 text-white font-bold rounded-lg transition ${
              post1 ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {post1 ? "Update" : "Submit"}
          </motion.button>
        </div>
      </div>
    </motion.form>
  );
}

export default JokePostForm;
