import React from 'react'
import img2 from '../assets/cardimg.avif'
const Card_1 = ({ name, imglink, price }) => {
    return (
        <div>


            <div class="max-w-xs   rounded-lg shadow bg-stone-700 ">
                <a href="#">
                    <img class="rounded-t-lg w-full" src={img2} alt="" />
                </a>
                <div class="p-5">
                    <a href="#">
                        <h5 class="mb-2 text-2xl font-bold tracking-tight text-black">{name}</h5>
                    </a>
                    <p class="mb-3 font-normal text-black ">Best Engineering College In Uttar Pradesh</p>
                    <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center  bg-stone-900 rounded-lg hover:bg-stone-800 text-white  hover:text-black">
                        Read more
                        <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                        </svg>
                    </a>
                </div>
            </div>

        </div>
        // <div className='shadow-xl p-5 min-w-[250px] rounded-xl flex flex-col bg-stone-700 '>

        //   <img src={img2} alt="" className='rounded-2xl  overflow-hidden bg-[#0c0c0c] bg-fixed ' />
        //   <div className='text-xl text-my-blue font-bold flex justify-center mt-3 '>{name}</div>
        //   <div className=' text-my-grey font-bold flex justify-center mt-3 '>Best Engineering College</div>
        //   <div className=' text-my-grey font-bold flex justify-center mt-1 '>in Uttar Pradesh</div>
        //   <div className='text-xl text-my-blue font-bold flex justify-center mt-3 '>{price}​</div>
        // </div>
    )
}


export default Card_1