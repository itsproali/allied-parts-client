import React from "react";
import apiClient from "../../apiClient";
import { useQuery } from "react-query";
import Loading from "../shared/Loading";

const Blog = () => {
  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery("blogs", () =>
    apiClient.get("https://allied-parts-manufacturing.herokuapp.com/blogs")
  );

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    console.log(error);
  }
  console.log(blogs);
  return (
    <div className="parent my-20">
      {blogs?.data?.map((blog, index) => (
        <div key={blog._id} className="my-6 mx-auto">
          <img src={blog.img} alt="Blog" className="my-4 mx-auto" />
          <h1 className="text-center my-4 text-3xl font-semibold">
            {index + 1} : {blog.question}
          </h1>
          <p className=" my-4 text-xl">
            <span className="font-bold text-xl">Ans: </span> {blog.answer}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Blog;
