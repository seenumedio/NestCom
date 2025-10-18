import { useState } from 'react'

export default function IconBtn({ Filled, Empty, color, handleClick, isEditing, isReplying, ...props }) {
  const [isActive, setIsActive] = useState(false);
  const active = typeof isEditing === 'boolean'
    ? isEditing
    : typeof isReplying === 'boolean'
      ? isReplying
      : isActive;
  return (
    <button
      onClick={() => { setIsActive(prev => !prev); if (handleClick) handleClick(); }}
      {...props}
      className='flex items-center cursor-pointer'
    >
      <span className={color}>
        {active ? <Filled /> : <Empty />}
      </span>
    </button>
  )
}