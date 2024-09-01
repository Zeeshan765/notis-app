import { Link } from 'react-router-dom';

interface NotFoundProps {
  isLanding: Boolean;
}

const NotFound: React.FC<NotFoundProps> = ({ isLanding }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl md:text-6xl text-center font-bold mb-8">
        Page Not Found
      </h1>
      {isLanding ? (
        <>
          <Link
            to="/"
            className="bg-primary hover:bg-primary text-white font-bold py-3 px-6 rounded"
          >
            Go Back to Homepage
          </Link>
        </>
      ) : (
        <>
          <Link
            to="/panel/users"
            className="bg-primary hover:bg-primary text-white font-bold py-3 px-6 rounded"
          >
            Go Back to Homepage
          </Link>
        </>
      )}
      \
    </div>
  );
};

export default NotFound;
