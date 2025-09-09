import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <div className="mt-6 rounded-xl border bg-gradient-to-b from-gray-50 to-white">
      <div className="flex flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-10 md:gap-14 p-8 md:p-10 text-sm">

        <div>
          <div className="flex items-center gap-3">
            <img className="w-12 h-12 rounded" src={assets.navIcon} alt="logo" />
            <p className="text-lg font-semibold text-gray-800">College Search</p>
          </div>
          <p className="mt-3 w-full md:w-4/5 text-gray-600 leading-6">
            Explore detailed information about colleges, courses, infrastructure, and rankings. Book one-on-one mentorship sessions for tailored career guidance.
          </p>

          <div className="mt-4 flex items-center gap-3 text-xs text-gray-500">
            <span className="px-2 py-1 rounded-full bg-blue-100 text-blue-700">Guidance</span>
            <span className="px-2 py-1 rounded-full bg-purple-100 text-purple-700">Mentorship</span>
            <span className="px-2 py-1 rounded-full bg-emerald-100 text-emerald-700">Colleges</span>
          </div>
        </div>

        <div>
          <p className="text-base font-semibold mb-4 text-gray-800">Company</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li><a className="hover:text-gray-900" href="/">Home</a></li>
            <li><a className="hover:text-gray-900" href="/about">About us</a></li>
            <li><a className="hover:text-gray-900" href="/Mentors">Mentors</a></li>
            <li><a className="hover:text-gray-900" href="/College">Colleges</a></li>
            <li><a className="hover:text-gray-900" href="/contact">Contact</a></li>
          </ul>
        </div>

        <div>
          <p className="text-base font-semibold mb-4 text-gray-800">Get in touch</p>
          <ul className="flex flex-col gap-2 text-gray-600">
            <li><a className="hover:text-gray-900" href="tel:+918445580308">+91-8445580308</a></li>
            <li><a className="hover:text-gray-900" href="mailto:theprabhatsehrawat@gmail.com">theprabhatsehrawat@gmail.com</a></li>
          </ul>

          <div className="mt-4 flex items-center gap-3">
            <a href="#" className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-500 hover:text-gray-900">in</a>
            <a href="#" className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-500 hover:text-gray-900">X</a>
            <a href="#" className="w-8 h-8 rounded-full border flex items-center justify-center text-gray-500 hover:text-gray-900">G</a>
          </div>
        </div>

      </div>

      <div className="border-t px-6 md:px-10 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-gray-500">
        <p>Made with ❤️ by Prabhat</p>
        <p>© {new Date().getFullYear()} College Search. All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer;
