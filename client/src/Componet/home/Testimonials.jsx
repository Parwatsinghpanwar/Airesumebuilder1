import React from 'react'
import Title from './Title'
import { BookUser, BookUserIcon } from 'lucide-react'

const Testimonials = () => {
  return (
    <div id='Testimonials ' className='flex flex-col  items-center my-10 scroll-mt-12'>


            <div className="flex items-center gap-2 text-sm text-green-800 bg-green-400/10  rounded-full px-6 py-1.5">
                <BookUserIcon width={14} />
                <span>Testimonials</span>
            </div>
            <Title title="Don't just take our words " description="Hear what our users say about us .we're always looking for ways to improve. If you have a positive experience with us ,leave a review." />

    </div>
  )
}

export default Testimonials