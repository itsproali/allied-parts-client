import React from "react";
import GrdButton from "../shared/GrdButton";

const Portfolio = () => {
  return (
    <div className="parent my-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
        <div data-aos="zoom-in-down" data-aos-duration="1500">
          <img
            className="w-5/6 mx-auto"
            src="https://i.ibb.co/tQzmzMS/mdali-yellow-bg-profile.png"
            alt="Mohammad Ali"
          />
        </div>
        <div data-aos="zoom-in-up" data-aos-duration="1500">
          <h1 className="active text-5xl font-semibold">Mohammad Ali</h1>
          <h3 className="text-xl font-semibold text-primary">
            Junior Front-end Developer
          </h3>
          <div className="text-slate-600 my-6">
            <p className="">
              Hi Dear, I am Mohammad Ali. I am a junior Front-end web developer
              (still learning). I can build any eye catchy dynamic website
              using:
            </p>
            <ul className="list-disc ml-4">
              <li>HTML</li>
              <li>CSS(Vanilla, Bootstrap, Tailwind)</li>
              <li>JavaScript</li>
              <li>ReactJS</li>
              <li>Firebase</li>
              <li>MongoDB</li>
            </ul>
          </div>
          <a href="https://www.linkedin.com/in/itsproali/" target="blank">
            <GrdButton>Contact Me</GrdButton>
          </a>
        </div>
      </div>
      <div className="mt-16">
        <h1 className="text-center text-3xl font-semibold mb-8 text-primary">
          Here is my Recent Projects
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://i.ibb.co/FDVj4b9/Screenshot-10.png"
                alt="Website"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Caring Doctors</h2>
              <p>
                A Doctors Portal Website for Booking Appointment for patient.
              </p>
              <div className="card-actions justify-end">
                <a href="https://caring-doctors-portal.web.app/" target="blank">
                  <button className="btn btn-primary">Visit Now</button>
                </a>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://i.ibb.co/TgQxHfd/Screenshot-1.png"
                alt="Website"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Super Bike Warehouse</h2>
              <p>A Warehouse Website for maintaining bike supply business.</p>
              <div className="card-actions justify-end">
                <a href="https://super-bike-warehouse.web.app//" target="blank">
                  <button className="btn btn-primary">Visit Now</button>
                </a>
              </div>
            </div>
          </div>

          <div className="card bg-base-100 shadow-xl">
            <figure>
              <img
                src="https://i.ibb.co/M8TZJ7F/Screenshot-2.png"
                alt="Website"
              />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Ema John</h2>
              <p>
                An E-commerce website. Where you will be able to buy products.
              </p>
              <div className="card-actions justify-end">
                <a href="https://ema-john-itsproali.web.app/" target="blank">
                  <button className="btn btn-primary">Visit Now</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
