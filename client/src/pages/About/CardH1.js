import React from 'react'
// import missionQualityImage from './herosectionimages/mission.svg';


function CardH1({imageUrl,title,text}) {
  return (
    <>
        <div className='box-border w-1/2 h-{400px} mt-5 p-4'>
              <div class="h-96 box-border justify-center items-center p-2 border-none flex shadow-md bg-white ">
                <div className='box-border items-center justify-center flex flex-col p-6 leading-6 pt-16 pb-16 '>
                  <span className='w-16 h-26 inline-block mb-4'>
                  <img src={imageUrl} alt="Mission Quality" />
                  </span>
                  <h3 className='uppercase dark:text-gray-900 text-opacity-60 text-xl font-semibold mb-2 mt-0 leading-6'>{title}</h3>
                  <p className='text-6 leading-7 text-gray-800 text-lg text-center mb-0 mt-0 font-normal text-opacity-70'>{text}

                  </p>
                </div>
              </div>
            </div>
    </>
  )
}

export default CardH1