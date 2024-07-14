import React from 'react'
import { Children } from 'react';

export default function ConteinerDragg({ children }: any) {
    return (
        <div className='w-56 min-h-16 h-fit shadow-lg bg-white border-2 border-gray-200 rounded-md dark:bg-zinc-900 dark:text-white dark:border-zinc-900' >
            <div className='p-4'>
                {children}
            </div>
        </div>
    )
}
