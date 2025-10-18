import { useState } from 'react'
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';
function PostCard({ post }) {
    const [isHovered, setIsHovered] = useState(false);
    const [topLeft, bottomLeft, bottomRight, initial] = [{ x: 40, y: 40, opacity: 0 }, { x: 40, y: -40, opacity: 0 }, { x: -80, y: -40, opacity: 0 }, { x: 0, y: 0, opacity: 1 }];
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/post/${post._id}`);
    }

    return (
        <motion.div
            className='w-auto max-h-150 flex justify-center relative hover:mb-6 p-2 rounded-2xl overflow-hidden hover:overflow-visible'
            onHoverStart={() => { setIsHovered(true) }}
            onHoverEnd={() => { setIsHovered(false) }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <motion.img
                src={post.image}
                className='w-full min-h-50 text-white object-fill rounded-[inherit] text-center cursor-pointer'
                animate={{ opacity: isHovered ? 0.75 : 1 }}
                transition={{ duration: 0.3 }}
                onClick={handleClick}
            />
            <motion.button
                className='cursor-pointer px-4 py-2 hover:scale-102 hover:shadow-md rounded-md font-bold absolute bottom-[-18px] '
                style={{
                    background: 'linear-gradient(to right, skyblue, cyan)'
                }}
                initial={{ y: -40, opacity: 0 }}
                animate={isHovered ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={handleClick}
            >
                More Info
            </motion.button>
            <motion.button
                className='h-10 w-10 cursor-pointer hover:scale-104 hover:shadow-md absolute top-4 left-4 bg-cover bg-center bg-[url(/src/assets/FavIcon.png)]'
                initial={topLeft}
                animate={isHovered ? initial : topLeft}
                transition={{ duration: 0.3 }}
            >
            </motion.button>

            <motion.div
                initial={bottomLeft}
                animate={isHovered ? initial : bottomLeft}
                transition={{ duration: 0.3 }}
                className='absolute bottom-4 left-4'
            >
                <button
                    className='cursor-pointer h-10 w-10 hover:scale-104 hover:shadow-lg  bg-contain bg-center bg-[url(/src/assets/ArrowUp.png)]'
                >
                </button>
                <button
                    className='cursor-pointer h-10 w-10 hover:scale-108 hover:shadow-md bg-no-repeat bg-contain bg-center bg-[url(/src/assets/ArrowDown.png)]'
                >
                </button>
            </motion.div>
            <motion.button
                className='cursor-pointer h-10 w-10 hover:scale-102 hover:shadow-md absolute bottom-4 right-4 bg-cover bg-center bg-[url(/src/assets/CommentIcon.png)]'
                initial={bottomRight}
                animate={isHovered ? initial : bottomRight}
                transition={{ duration: 0.3 }}
            >
            </motion.button>

        </motion.div>
    )
}

export default PostCard