import React from 'react'

const Title = ({title, description}) => {
  return (
    <div className='text-center mt-6 txt-slate-700'>
    <h1 className='text-3x1 sm:text-4x1 font-medium'>{title}</h1>
    <p className='max-sm max-w-2x1 mt-4 text-slate-500'>{description}</p>


    </div>
  )
}

export default Title