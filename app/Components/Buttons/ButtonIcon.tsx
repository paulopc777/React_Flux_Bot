import React from 'react'

export default function ButtonIcon({ text, w, icons, onclick }: any) {
    return (
        <button className={`bg-[#2fac66] rounded-xl shadow-sm hover:bg-slate-700 transition-all w-10 p-1 h-10  ${w} `} onClick={onclick}>
            <img src={`${icons}`} alt="Add" className='w-full p-1 ' />
        </button>
    )
}