const Footer = () => {
  return (
    <div className='md:mx-10'>
      <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10  mt-40 text-sm'>

        <div>
          {/* <img className='mb-5 w-30 h-12' src="https://flowbite.com/docs/images/logo.svg" alt="" /> */}
          <p className='w-full md:w-2/3 text-gray-600 leading-6'> Our
            platform addresses this by offering a centralized
            hub where students can explore detailed
            information about colleges, including courses,
            faculty, infrastructure, and rankings. Additionally,
            the platform provides personalized consulting
            services through a Mentor Guidance System,
            allowing students to schedule one-on-one
            meetings with industry professionals or academic
            advisors for tailored career advice.</p>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>COMPANY</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>Home</li>
            <li>About us</li>
            <li>Delivery</li>
            <li>Privacy policy</li>
          </ul>
        </div>

        <div>
          <p className='text-xl font-medium mb-5'>GET IN TOUCH</p>
          <ul className='flex flex-col gap-2 text-gray-600'>
            <li>+91-9084539879</li>
            <li>prabhatsahrawat@gmail.com</li>
          </ul>
        </div>

      </div>

      <div>
        <hr />
        {/* <p className='py-5 text-sm text-center'>Copyright 2024 @ - All Right Reserved.</p> */}
        <p className='py-5 text-sm text-center'>Made with ❤️ by Prabhat.</p>
      </div>

    </div>
  )
}

export default Footer;
