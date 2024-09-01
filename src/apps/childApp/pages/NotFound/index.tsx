import { Link } from 'react-router-dom'

const No = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl md:text-6xl text-center font-bold mb-8">Page Not Found</h1>
    <Link to="/panel/jobs" className="bg-primary hover:bg-primary text-white font-bold py-3 px-6 rounded">
      Go Back to Homepage
    </Link>
  </div>
  )
}

export default No