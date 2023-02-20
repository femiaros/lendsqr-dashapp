import lendsqr_vector from "../svgs/lendsqr_vector.svg"
import PulseLoader from 'react-spinners/BeatLoader'

const LoadScreen = () => {
const defaultColor = "#39CDCC"

  return (
    <section className="load-screen">
        <img src={lendsqr_vector} alt="svg-center" />
        
        <div className="load-screen__loader">
            <PulseLoader
                className="icon"
                color={defaultColor}
                size={35}
                aria-label="Loading Spinner"
                data-testid="Screen loader"
            />
        </div>
    </section>
  )
}

export default LoadScreen