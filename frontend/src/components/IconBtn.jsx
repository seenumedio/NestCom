import { useState } from 'react'

export default function IconBtn({ Filled, Empty, children, handleClick, ...props }) {
  const [isActive, setIsActive] = useState(false);
  return (
    <button
      onClick={() => {setIsActive(prev => !prev); handleClick()}}
      {...props}
      className='flex items-center cursor-pointer'
    >
      <span className={`${children != null ? "mr-1" : ""} ${Filled===Empty && 'text-red-400'}`}>
        {isActive ? <Filled /> : <Empty />}
      </span>
      {children}
    </button>
  )
}