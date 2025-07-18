import React from 'react'

export const StatsSection = () => {
  return (
    <section className="px-10 py-16 bg-gradient-to-bl from-[#fff7e0] to-[#f5d58c]/10 text-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <h3 className="text-[#996f04] text-3xl md:tetx-4xl font-bold mb-2">1000+</h3>
                <p className="text-gray-700">Happy Clients</p>
              </div>
              <div>
                <h3 className="text-[#996f04] text-3xl md:tetx-4xl font-bold mb-2">4.5+</h3>
                <p className="text-gray-700">Average Rating</p>
              </div>
              <div>
                <h3 className="text-[#996f04] text-3xl md:tetx-4xl font-bold mb-2">500+</h3>
                <p className="text-gray-700">Premium Products</p>
              </div>
              <div>
                <h3 className="text-[#996f04] text-3xl md:tetx-4xl font-bold mb-2">100+</h3>
                <p className="text-gray-700">Corporate Partners</p>
              </div>
            </div>
    </section>
  )
}

