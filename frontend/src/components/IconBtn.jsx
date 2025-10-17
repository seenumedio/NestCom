import { useState } from 'react'

export default function IconBtn({ Filled, Empty, children, handleClick, isEditing, isReplying, ...props }) {
  const [isActive, setIsActive] = useState(false);
  const active = typeof isEditing === 'boolean' 
  ? isEditing 
  : typeof isReplying === 'boolean' 
      ? isReplying 
      : isActive;
return (
    <button
      onClick={() => { setIsActive(prev => !prev); if (handleClick) handleClick() }}
      {...props}
      className='flex items-center cursor-pointer'
    >
      <span className={`${children != null ? "mr-1" : ""} ${Filled === Empty && 'text-red-400'}`}>
        {active ? <Filled /> : <Empty />}
      </span>
      {children}
    </button>
  )
}