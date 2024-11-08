import { Navigate, Route, Routes } from "react-router-dom";
import SignIn from "./SignIn";

const Unauthenticated = () => {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="*" element={<Navigate replace to={"/"} />} />
    </Routes>
  );
};

export default Unauthenticated;
