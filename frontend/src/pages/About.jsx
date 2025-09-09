import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="min-h-screen">

      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-blue-50 via-white to-purple-50 border">
        <div className="absolute -top-10 -left-10 h-40 w-40 bg-blue-200/40 blur-3xl rounded-full" />
        <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-purple-200/40 blur-3xl rounded-full" />

        <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center px-6 md:px-10 py-10 md:py-14">
          <div className="order-2 md:order-1">
            <p className="text-sm tracking-wide text-blue-600 font-semibold">About Us</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-800 leading-snug">
              Guiding Students To The Right Colleges And Careers
            </h1>
            <p className="mt-4 text-gray-600 md:max-w-xl">
              We simplify college discovery and mentorship by bringing verified information, trusted guidance, and curated opportunities into one powerful platform built for Indian students.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">Verified Mentors</span>
              <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-purple-700">Curated Colleges</span>
              <span className="px-3 py-1 text-xs rounded-full bg-emerald-100 text-emerald-700">Actionable Guidance</span>
            </div>
          </div>

          <div className="order-1 md:order-2 flex justify-center">
            <img className="w-full md:max-w-[420px] rounded-xl shadow-md" src={assets.aboutus} alt="About us" />
          </div>
        </div>
      </div>

      {/* Why Choose Us - Feature Cards */}
      <div className="mt-12">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Why Choose <span className="text-primary">Us</span></h2>
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          <div className="group border rounded-xl p-6 hover:shadow-lg transition-all bg-white">
            <div className="h-10 w-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center text-lg font-bold">1</div>
            <h3 className="mt-4 font-semibold text-gray-800">Efficiency</h3>
            <p className="mt-2 text-sm text-gray-600">
              One-stop access to university information and mentorship to accelerate your decisions.
            </p>
          </div>
          <div className="group border rounded-xl p-6 hover:shadow-lg transition-all bg-white">
            <div className="h-10 w-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center text-lg font-bold">2</div>
            <h3 className="mt-4 font-semibold text-gray-800">Convenience</h3>
            <p className="mt-2 text-sm text-gray-600">
              A trusted network of mentors and regularly updated university data in one place.
            </p>
          </div>
          <div className="group border rounded-xl p-6 hover:shadow-lg transition-all bg-white">
            <div className="h-10 w-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center text-lg font-bold">3</div>
            <h3 className="mt-4 font-semibold text-gray-800">Personalization</h3>
            <p className="mt-2 text-sm text-gray-600">
              Tailored recommendations, reminders, and insights to match your goals.
            </p>
          </div>
        </div>
      </div>

      {/* Our Vision */}
      <div className="mt-12 grid md:grid-cols-2 gap-8 items-start">
        <div className="space-y-4">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-800">Our Vision</h2>
          <p className="text-gray-600 text-sm leading-relaxed">
            We aim to bridge the gap between students and higher education by offering trustworthy guidance and mentorship.
            From university exploration to career decisions, we support every critical step with clarity and confidence.
          </p>
          <ul className="mt-2 space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-primary" /> Verified data about Indian universities</li>
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-primary" /> Trusted mentors with real experience</li>
            <li className="flex items-start gap-2"><span className="mt-1 h-2 w-2 rounded-full bg-primary" /> Seamless booking and progress tracking</li>
          </ul>
        </div>
        <div className="border rounded-xl p-6 bg-white">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="p-4 rounded-lg bg-blue-50">
              <p className="text-2xl font-bold text-blue-700">50+</p>
              <p className="text-xs text-gray-600">Mentors</p>
            </div>
            <div className="p-4 rounded-lg bg-purple-50">
              <p className="text-2xl font-bold text-purple-700">1000+</p>
              <p className="text-xs text-gray-600">Students Guided</p>
            </div>
            <div className="p-4 rounded-lg bg-emerald-50">
              <p className="text-2xl font-bold text-emerald-700">200+</p>
              <p className="text-xs text-gray-600">Colleges Listed</p>
            </div>
          </div>
          <p className="mt-4 text-sm text-gray-600">
            Numbers are growing every month as more students and mentors join the platform.
          </p>
        </div>
      </div>

      {/* Call To Action */}
      <div className="my-14 border rounded-xl bg-gradient-to-r from-primary/10 to-blue-100 p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-gray-800">Ready to find your path?</h3>
          <p className="text-sm text-gray-600 mt-1">Explore mentors and colleges tailored to your interests.</p>
        </div>
        <div className="flex gap-3">
          <a href="/Mentors" className="px-5 py-2 rounded-md bg-primary text-white text-sm hover:opacity-95 transition">Explore Mentors</a>
          <a href="/College" className="px-5 py-2 rounded-md bg-white border text-sm hover:bg-gray-50 transition">Browse Colleges</a>
        </div>
      </div>

    </div>
  )
}

export default About
