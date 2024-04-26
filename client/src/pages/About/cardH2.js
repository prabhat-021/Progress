import React from 'react'

function cardH2({imageUrl,count,name}) {
  return (
    <div className='text-size-adjust-100 tap-highlight-color-transparent text-sm font-normal leading-4 text-gray-700 text-left font-din box-border w-full pr-15 pl-15 flex flex-col items-center justify-center max-w-1/4'>
        <span className='text-size-adjust-100 tap-highlight-color-transparent text-sm font-normal text-gray-700 text-left font-din box-border mb-4 inline-block leading-normal w-28 h-20'>
        <img src={imageUrl} alt="Mission Quality" />
        </span>
        <p className='text-size-adjust-100 tap-highlight-color-transparent leading-4 text-gray-700 text-left font-din box-border mt-9 mb-4 font-bold text-lg'>
          <span>{count}</span>
          <p className='text-size-adjust-100 tap-highlight-color-transparent font-normal leading-4 text-gray-700 text-left font-din box-border mb-4 text-sm'>{name}</p>
        </p>
    </div>
  )
}

export default cardH2