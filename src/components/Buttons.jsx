import { ArrowRight } from 'lucide-react'
import React from 'react'
import { Link } from 'react-router'

const Buttons = ({text,view}) => {
  return (
     <div className="relative group">
            <Link className="bg-[#bc8f14] hover:shadow-md text-white font-bold py-2 px-6 rounded-lg overflow-hidden relative z-10 flex items-center">
              <span className="relative z-20 flex items-center">{text}<ArrowRight className={`ml-2 h-4 w-4 ${view}`} /></span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-full transition-transform duration-1000 ease-in-out z-10" />
            </Link>
          </div>
  )
}

export default Buttons