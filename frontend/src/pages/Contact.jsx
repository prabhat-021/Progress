import { useNavigate } from "react-router-dom";

const Contact = () => {
  const navigate = useNavigate()

  return (
    <div>
      {/* Header */}
      <div className="text-center pt-10">
        <p className="text-2xl text-[#707070]">CONTACT <span className="text-gray-700 font-semibold">US</span></p>
        <p className="mt-2 text-sm text-gray-500">We would love to hear from you. Reach out anytime.</p>
      </div>

      {/* Content */}
      <div className="my-10 grid md:grid-cols-2 gap-8 mb-24 text-sm">

        {/* Left: Map + Info Cards */}
        <div className="space-y-6">
          <div className="overflow-hidden rounded-xl border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3497.873742274402!2d77.49449147496122!3d28.753186378592385!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cf574d18f2b6f%3A0x4a65c0bc0122eb2f!2sKIET%20Group%20of%20Institutions!5e0!3m2!1sen!2sin!4v1740084108474!5m2!1sen!2sin"
              width="100%"
              height="350"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="KIET Group of Institutions Location"
            ></iframe>
          </div>

          {/* Info Cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="rounded-xl border p-5 bg-white">
              <p className="font-semibold text-gray-700">Our University</p>
              <p className="mt-2 text-gray-500">
                E-BLOCK <br /> KIET Group Of Institutions, Muradnagar, Ghaziabad
              </p>
            </div>
            <div className="rounded-xl border p-5 bg-white">
              <p className="font-semibold text-gray-700">Contact</p>
              <p className="mt-2 text-gray-500">
                Tel: 7455844034 <br /> Email: ashwinyadavrock@gmail.com
              </p>
            </div>
          </div>
        </div>

        {/* Right: Contact Form */}
        <div className="rounded-xl border p-6 md:p-8 bg-white">
          <p className="font-semibold text-lg text-gray-700">Send us a message</p>
          <p className="text-gray-500 text-xs mt-1">We usually respond within 1-2 business days.</p>

          <form className="mt-6 space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Your Name</label>
                <input type="text" className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Email</label>
                <input type="email" className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30" placeholder="you@example.com" required />
              </div>
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Subject</label>
              <input type="text" className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30" placeholder="I want to know about..." />
            </div>
            <div>
              <label className="block text-xs text-gray-600 mb-1">Message</label>
              <textarea rows="5" className="w-full border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-primary/30" placeholder="Write your message..." />
            </div>
            <div className="flex items-center gap-3">
              <button className="bg-primary text-white px-6 py-2.5 rounded-md text-sm hover:opacity-95">Send Message</button>
              <button onClick={() => { navigate("/Mentors"); scrollTo(0, 0) }} className="border px-6 py-2.5 rounded-md text-sm hover:bg-black hover:text-white transition-all duration-300">Our Mentors</button>
            </div>
          </form>
        </div>

      </div>
    </div>
  );
};

export default Contact;
