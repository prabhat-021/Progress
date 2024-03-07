import React from 'react'
import img2 from '../assets/download.jpeg'
const Card_1 = ({name,imglink,price}) => {
    return (
      <div className='shadow-2xl p-5 min-w-[250px] rounded-xl flex flex-col bg-stone-600 '>

        <img src={img2} alt="" className='rounded-2xl ' />
        <div className='text-xl text-my-blue font-bold flex justify-center mt-3 '>{name}</div>
        <div className=' text-my-grey font-bold flex justify-center mt-3 '>Best Engineering College</div>
        <div className=' text-my-grey font-bold flex justify-center mt-1 '>in Uttar Pradesh</div>
        <div className='text-xl text-my-blue font-bold flex justify-center mt-3 '>{price}​</div>
      </div>
    )
  }


export default Card_1