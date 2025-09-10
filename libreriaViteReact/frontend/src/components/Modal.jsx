import React from 'react'

export default function Modal({ isOpen, onClose, children }) {
if(!isOpen) return null;

    return (
        <div className='text-black fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50'>
            <div className='bg-white rounded p-6 max-w-lg w-full relative'>
                <button
                    className='absolute top-2 right-2 text-gray-500 text-xl'
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>
    )
}
