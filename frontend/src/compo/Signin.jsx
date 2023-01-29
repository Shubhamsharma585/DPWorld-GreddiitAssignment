import React, { useEffect, useState } from "react";
import axios from "axios";
import { Loader, Flex, Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";

function Signin() {
  const navigate = useNavigate();
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

  const handleLogin = () => {
    if (email?.length <= 0 || pass?.length <= 0) {
      showNotification({
        title: "Invalid",
        message: `Credentials can't be empty! 🤥`,
        autoClose: 4000,
        color: "red",
      });
    } else {
      setLoading(true);
      axios
        .post("http://localhost:5000/login", {
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
            title: "Wrong Credentials",
            message: `${error.response.data.message}! 🤥`,
            autoClose: 4000,
            color: "orange",
          });
          setLoading(false);
        });
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column" }}>
      <h1 style={{ margin: "auto", marginTop: "60px" }}>Login</h1>
      <div
        style={{
          border: "2px solid black",
          width: "300px",
          height: "200px",
          margin: "auto",
          marginTop: "30px",
          display: "flex",
          //justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <input
          style={{
            margin: "auto",
            marginTop: "20px",
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
          placeholder="Password"
          value={pass}
          type={"password"}
          onChange={(e) => setPass(e.target.value)}
        />
        {loading ? (
          <Flex align={"center"} justify={"center"} sx={{ height: 60 }}>
            <Loader size={30} />
          </Flex>
        ) : (
          <Button sx={{ height: "50px" }} onClick={handleLogin}>
            {"Sign In"}
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
        onClick={() => navigate("/signup")}
      >
        Sign Up
      </button>
    </div>
  );
}

export default Signin;
