import React, {useState} from "react";
import axios from "axios";
import "./CSS/LoginSignup.css";

const LoginSignUp = () => {
  const [isLogin, setIsLogin] = useState(false); // toggle login/signup
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        const res = await axios.post("https://ecommercewebsite-n94k.onrender.com/api/auth/login", {
          email,
          password,
        });
        localStorage.setItem("token", res.data.token);
        alert("Logged in successfully!");
        window.location.href = "/";
      } else {
        await axios.post("https://ecommercewebsite-n94k.onrender.com/api/auth/register", {
          name,
          email,
          password,
        });
        alert("User registered successfully! Please log in.");
        setIsLogin(true);
      }
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.message || "Something went wrong, try again."
      );
    }
  };
  
  return (
    <div className="login-signup">
      <div className="loginsignup-container">
        <h1>{ isLogin ? "Log in" : "Sign Up"}</h1>
        <div className="loginsignup-fields">
          {!isLogin && (
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          )}
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleSubmit}>Continue</button>
          {error && <p className="loginsignup-error">{error}</p>}
          <p className="loginsignup-login">
            {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
            <span onClick={() => setIsLogin(!isLogin)}>
              {isLogin ? "Sign up here" : "Login here"}
            </span>
          </p>
        </div>
        <div className="loginsignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignUp;
