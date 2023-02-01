import { useContext } from "react";
import { AppContext } from "./Context";
import { Routes, Route, Link } from "react-router-dom";
import GoogleButton from "react-google-button";
import LoginSuccess from "./components/LoginSuccess.jsx";
import Login from "./components/Login";
import "./App.css";
function App() {
  const {} = useContext(AppContext);
  const fetchAuthUser = async () => {
    const USER_URL = "http://localhost:8080/auth/user";

    fetch(USER_URL, { headers: { credentials: "include" } })
      .then((res) => {
        console.log(res, ".......res.........");
        if (!res.ok) {
          throw new Error(`${res.status} ${res.statusText} ${res.type}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log(data, "........properly authed......");
      })
      .catch((err) => {
        console.log(err, ".......not properly authed.......");
      });
  };
  const redirectToGoogleSSO = async () => {
    console.log("REDIRECT2GOOGLESSO....................");
    const googleLoginURL = "http://localhost:8080/login/google";
    let timer;
    const newWindow = window.open(
      googleLoginURL,
      "_blank",
      "width=400,height=300"
    );
    if (newWindow) {
      timer = setInterval(() => {
        if (newWindow.closed) {
          console.log("we're AUTHENTICATED....");
          fetchAuthUser();
          if (timer) {
            clearInterval(timer);
          }
        }
      }, 500);
    }
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1>Hello WORLD!!</h1>
              <br />
              <div>
                <Link
                  to="/login"
                  style={{
                    color: "#0f0",
                    fontSize: "1.7rem",
                  }}
                >
                  Login
                </Link>
              </div>
            </>
          }
        />
        <Route
          path="/login"
          element={<Login redirectToGoogleSSO={redirectToGoogleSSO} />}
        />
        <Route
          path="/login/error"
          element={<h1>Error authenticating with GOOGLE!!</h1>}
        />
        <Route path="/login/success" element={<LoginSuccess />} />
        <Route path="/pro" element={<h1>Hello PROFILE!!</h1>} />
      </Routes>
    </div>
  );
}

export default App;
