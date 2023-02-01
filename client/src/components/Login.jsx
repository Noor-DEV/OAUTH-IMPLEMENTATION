import { useEffect } from "react";
import GoogleButton from "react-google-button";

const Login = (props) => {
  useEffect(() => {
    fetch("http://localhost:8080/wow", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => console.log(data, "....data from localhost...."));
  });
  return (
    <div>
      <GoogleButton onClick={props.redirectToGoogleSSO} />
    </div>
  );
};

export default Login;
