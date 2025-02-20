import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Contact = () => {
  const navigate = useNavigate();
  const { Mentors } = useContext(AppContext);

  return (
    <div>
      <div className="text-center text-2xl pt-10 text-[#707070]">
        <p>CONTACT <span className="text-gray-700 font-semibold">US</span></p>
      </div>

      <div className="my-10 flex flex-col justify-center md:flex-row gap-10 mb-28 text-sm">
        
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.873742274402!2d77.49449147496122!3d28.753186378592385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf574d18f2b6f%3A0x4a65c0bc0122eb2f!2sKIET%20Group%20of%20Institutions!5e0!3m2!1sen!2sin!4v1740084108474!5m2!1sen!2sin"
          width="460"
          height="350"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="font-semibold text-lg text-gray-600">OUR UNIVERSITY</p>
          <p className="text-gray-500">
            E-BLOCK <br /> KIET Group Of Institutions, Muradnagar, Ghaziabad
          </p>
          <p className="text-gray-500">
            Tel: 7455844034 <br /> Email: ashwinyadavrock@gmail.com
          </p>
          <p className="font-semibold text-lg text-gray-600">CAREERS</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>

          {Mentors.length > 0 ? (
            Mentors.slice(0, 10).map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  navigate(`/Meeting/${item._id}`);
                  window.scrollTo(0, 0);
                }}
                className="border border-black px-8 py-4 text-sm hover:bg-black hover:text-white transition-all duration-500"
              >
                Explore Jobs
              </button>
            ))
          ) : (
            <p className="text-gray-500">No mentors available at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Contact;
