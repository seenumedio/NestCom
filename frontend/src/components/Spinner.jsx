import ClipLoader from 'react-spinners/ClipLoader'

function Spinner({ loading }) {
    const override = {
        display: 'auto',
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

export default Spinner