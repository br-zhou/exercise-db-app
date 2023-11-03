import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <div>
      <h1>An Error Occurred</h1>
      <h4>404 Not Found</h4>
      <p>
        Click <Link to="/">here</Link> to return to the home page
      </p>
    </div>
  );
};

export default ErrorPage;