import React from "react";
import toast from "react-hot-toast";

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success("We are happy to see you connected with us");
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.message.value = "";
  };
  return (
    //    bg-gradient-to-r from-slate-800 to-slate-900
    <div className="px-4 sm:px-24 my-24 py-12">
      <h2 className="text-secondary text-center ">Contact Us</h2>
      <h1 className="text-4xl text-center text-primary mb-8">
        Stay Connected with us
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center ">
        <form className="w-full bg-slate-200 p-6" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Enter Your Name"
            className="input block w-full focus:outline-primary bg-white"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Enter Your Email"
            className="input block w-full focus:outline-primary bg-white my-4"
            required
          />
          <textarea
            name="message"
            cols="30"
            rows="4"
            className="textarea focus:outline-primary block w-full mb-4"
            required
            placeholder="Your Message"
          ></textarea>
          <input
            type="submit"
            value="Send"
            className="block btn w-full btn-primary"
          />
        </form>
        <div className="hidden md:block">
          <img src="https://i.ibb.co/cNbxGqd/contact-us.jpg" alt="Contact" />
        </div>
      </div>
    </div>
  );
};

export default Contact;
