import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import { Loader, Flex, Button } from "@mantine/core";

function Signup() {
  const navigate = useNavigate();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let token = localStorage.getItem("userToken");
    if (token) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleRegi = () => {
    if (
      userName?.length <= 0 ||
      fname?.length <= 0 ||
      lname?.length <= 0 ||
      email?.length <= 0 ||
      pass?.length <= 0
    ) {
      showNotification({
        title: "Invalid",
        message: `Credentials can't be empty! 🤥`,
        autoClose: 4000,
      });
    } else {
      setLoading(true);
      axios
        .post("http://localhost:5000/signup", {
          firstName: fname,
          lastName: lname,
          username: userName,
          email: email,
          password: pass,
        })
        .then(function (response) {
          localStorage.setItem("userInfo", JSON.stringify(response.data.user));
          localStorage.setItem("userToken", response.data.token);
          navigate("/");
          setLoading(false);
        })
        .catch(function (error) {
          showNotification({
            title: "Failed to create",
            message: `${error.response.data.message}! 🤥`,
            autoClose: 4000,
          });
          setLoading(false);
        });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ margin: "auto", marginTop: "60px" }}>Registration </h1>
      <div
        style={{
          border: "2px solid black",
          width: "300px",
          height: "400px",
          margin: "auto",
          marginTop: "30px",
          display: "flex",
          //justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <input
          style={{
            height: "30px",
            width: "250px",
            margin: "auto",
            marginTop: "10px",
          }}
          placeholder="First Name"
          value={fname}
          onChange={(e) => setFname(e.target.value)}
        />
        <input
          style={{
            margin: "auto",
            marginTop: "10px",
            height: "30px",
            width: "250px",
          }}
          placeholder="Last Name"
          value={lname}
          onChange={(e) => setLname(e.target.value)}
        />
        <input
          style={{
            margin: "auto",
            marginTop: "10px",
            height: "30px",
            width: "250px",
          }}
          placeholder="User Name"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
        />
        <input
          style={{
            margin: "auto",
            marginTop: "10px",
            height: "30px",
            width: "250px",
          }}
          placeholder="Email"
          type={"email"}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          style={{
            margin: "auto",
            marginTop: "10px",
            height: "30px",
            width: "250px",
          }}
          type={"password"}
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
        {loading ? (
          <Flex align={"center"} justify={"center"} sx={{ height: 60 }}>
            <Loader size={30} />
          </Flex>
        ) : (
          <Button sx={{ height: "50px" }} onClick={handleRegi}>
            {"Sign Up"}
          </Button>
        )}
      </div>
      <button
        style={{
          height: "50px",
          width: "300px",
          margin: "auto",
          marginTop: "20px",
        }}
        onClick={() => navigate("/signin")}
      >
        Sign In
      </button>
    </div>
  );
}

export default Signup;
