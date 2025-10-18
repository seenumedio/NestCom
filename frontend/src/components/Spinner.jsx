import ClipLoader from 'react-spinners/ClipLoader'
import ScaleLoader from 'react-spinners/ScaleLoader'
function Spinner({ loading }) {
    const override = {
        display: 'block',
        margin: '100px auto'
    }
    return (
        <div className="flex justify-center items-center h-[60vh]">
            <ClipLoader
                color='#7f9cf5'
                loading={loading}
                cssOverride={override}
                size={150}
                speedMultiplier={0.5}
            />
        </div>
    )
}
export function Loader({ loading }) {
    const override = {
        display: 'block',
    }
    return (
        <div>
            <ScaleLoader
                color='#7f9cf5'
                loading={loading}
                cssOverride={override}
                barCount={10}
            />
        </div>
    )
}
export default Spinner