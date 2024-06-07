import React from "react"
import '../../styles/popup-message.css'

interface props {
  message: string
  visible: boolean
  image: string
}

export const DoneMessage: React.FC<props> = ({ message, visible, image }) => {
  return (
    <div className={`fixed top-10 left-0 w-full text-center transition-all ${visible ? 'animate-slide-in-grow' : 'animate-fade-out'} z-50`}>
      <div className="flex items-center w-80 p-3 font-semibold rounded-lg m-auto shadow-lg -shadow--color-black-shadow border -border--color-semidark-violet -bg--color-form-background-semi-white">
        <p className="">{message}</p>
        <img src={image} className="w-8 m-auto mr-0" />
      </div>
    </div>
  )
}