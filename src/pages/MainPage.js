import { Navigate } from "react-router-dom";

const MainPage = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      {token ? (
        <Navigate to="todo" replace />
      ) : (
        <Navigate to="signin" replace />
      )}
    </>
  );
};

export default MainPage;
