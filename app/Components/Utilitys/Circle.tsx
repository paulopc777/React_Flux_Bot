import React from 'react'

function CircleGreen() {

    return (
        <div className=' bg-green-300 rounded-full w-4  h-4 flex items-center justify-center animate-pulse ' >
            <div className='bg-green-600 rounded-full w-2  h-2' />
        </div >
    )
}

function CircleRed() {
    return (
        <div className=' bg-red-300 rounded-full w-4  h-4 flex items-center justify-center animate-pulse ' >
            <div className='bg-red-600 rounded-full w-2  h-2' />
        </div >
    )
}

interface Visible {
    Visible: boolean
}

export default function CircleInfo({ Visible }: Visible) {

    return (
        <>
            <div className='ml-1 transition-all'>
                {Visible ? <CircleRed /> : <CircleGreen />}
            </div>

        </>

    )
}
