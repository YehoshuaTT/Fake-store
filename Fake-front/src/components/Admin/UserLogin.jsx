import { useState } from "react";
import axios from "axios";

function UserLogin({ setCanLog, canLog }) {
  const [currentForm, setCurrentForm] = useState("Login");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [fName, setFName] = useState("");
  const [lName, setLName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [cannotPress, setCannotPress] = useState(true);

  const canPrees = () => {
    let user = {
      email: email,
      password: pass,
      fName: fName,
      lname: lName,
      gender: gender,
      dob: dob,
    };

    if (currentForm == "Login") {
      if (user.email == email && user.password == pass) setCannotPress(false);
    } else {
      for (let i = 0; i < Object.keys(user).length; i++) {
        if (user[Object.keys(user)[i]] == "") break;
        if (i == Object.keys(user).length - 1) setCannotPress(false);
      }
    }
  };

  const handelSubmit = async (e) => {
    e.preventDefault();
    const baseUrl = "http://localhost:3001";

    if (currentForm === "Register") {
      let user = {
        email: email,
        password: pass,
        fName: fName.toLowerCase(),
        lName: lName.toLowerCase(),
        gender: gender,
        dob: dob,
      };
      const { data } = await axios.post(`${baseUrl}/user/register`, user);
      console.log(data);
      if (data) setCurrentForm("Login");
    } else {
      const user = {
        email,
        password: pass,
      };
      const response = await axios.post(`${baseUrl}/user/login`, user);
      console.log(response);
      localStorage.setItem("token", response.data.token);

      if (response.status == "200") {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("email", email);
        console.log("great, authenticattion passed");
        setCanLog(!canLog);
      }
    }
  };

  return (
    <div className="user-login-interface">
      <h1 id="login-h1">Your Playlist</h1>
      <h6 id="by">By Yehoshua T.</h6>
      <h4 id="login-h4">login</h4>
      <form id="login-form" onSubmit={handelSubmit}>
        {currentForm === "Register" ? (
          <>
            {" "}
            <label htmlFor="fName">First Name</label>
            <input
              className="login-input"
              pattern="[^0-9]*"
              title="Only a-z characters"
              required="required"
              type="fName"
              placeholder="First Name"
              name="First Name"
              onChange={(e) => {
                setFName(e.target.value);
                canPrees();
              }}
            ></input>
            <label htmlFor="lname">Last Name</label>
            <input
              className="login-input"
              type="lname"
              pattern="[^0-9]*"
              title="Only a-z characters"
              required="required"
              placeholder="Last Name"
              name="Last Name"
              onChange={(e) => {
                setLName(e.target.value);
                canPrees();
              }}
            ></input>
          </>
        ) : null}
        <label htmlFor="email">Email</label>
        <input
          className="login-input"
          type="email"
          placeholder="YourEmail@gmail.com"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
            canPrees();
          }}
        ></input>
        <label htmlFor="password">Password</label>
        <input
          className="login-input"
          type="password"
          pattern=".{3,}"
          title="Three or more characters"
          placeholder="*********"
          id="passwor-input"
          name="password"
          onChange={(e) => {
            setPass(e.target.value);
            canPrees();
          }}
        ></input>

        {currentForm === "Register" ? (
          <>
            <label htmlFor="dob">Birth Date</label>
            <input
              id="date-input"
              className="login-input"
              required="required"
              type="date"
              placeholder="DD/MM/YYYY"
              name="date"
              onChange={(e) => {
                setDob(e.target.value);
                canPrees();
              }}
            ></input>
            <div id="gender-div">
              <label htmlFor="gender">Gender</label>
              <select
                required="required"
                className="login-input"
                id="cars"
                onChange={(e) => {
                  canPrees();
                  setGender(e.target.value);
                }}
              >
                <option value="">Gender</option>
                <option value="male"> male</option>
                <option value="female"> female</option>
              </select>
            </div>{" "}
          </>
        ) : null}
        <button id="login-button" disabled={cannotPress}>
          {" "}
          {`${currentForm}`}{" "}
        </button>
      </form>
      {currentForm === "Login" ? (
        <>
          <button
            className="reg-log-button"
            onClick={() => setCurrentForm("Register")}
          >
            {" "}
            Not registerd? click here{" "}
          </button>
        </>
      ) : (
        <>
          <button
            className="reg-log-button"
            onClick={() => setCurrentForm("Login")}
          >
            {" "}
            Registerd? click to login{" "}
          </button>
        </>
      )}
    </div>
  );
}

export default UserLogin;
