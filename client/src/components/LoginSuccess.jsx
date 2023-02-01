import React from "react";

const LoginSuccess = () => {
  React.useEffect(() => {
    setTimeout(() => {
      window.close();
    }, 2500);
  }, []);
  return (
    <div>
      <h1>React-SSO</h1>
      <h1>It was a success Loging In</h1>
    </div>
  );
};

export default LoginSuccess;
