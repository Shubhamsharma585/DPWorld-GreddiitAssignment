import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import LogoutIcon from "@mui/icons-material/Logout";
import { Flex } from "@mantine/core";
import SaveIcon from '@mui/icons-material/Save';

function Nav() {
  const navigate = useNavigate();
  useEffect(() => {
    let token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    navigate("/signin");
    localStorage.clear();
  };

  return (
    <div
      style={{
        border: "2px solid black",
        height: "50px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Flex
        sx={{ cursor: "pointer" }}
        align={"center"}
        onClick={() => navigate("/profile")}
      >
        <AccountBoxIcon />
        <p>Profile</p>
      </Flex>

      <Flex
        sx={{ cursor: "pointer" }}
        align={"center"}
        onClick={() => navigate("/mygreddit")}
      >
        <AccountBalanceWalletIcon />
        <p>My Greddit Page</p>
      </Flex>

      <Flex
        sx={{ cursor: "pointer" }}
        align={"center"}
        onClick={() => navigate("/allusersgreddit")}
      >
        <AccountBalanceWalletIcon />
        <p>All Greddit Page</p>
      </Flex>

      <Flex
        sx={{ cursor: "pointer" }}
        align={"center"}
        onClick={() => navigate("/savedposts")}
      >
        <SaveIcon />
        <p>Saved Posts Page</p>
      </Flex>

      <Flex
        sx={{ cursor: "pointer" }}
        align={"center"}
        onClick={() => logout()}
      >
        <LogoutIcon />
        <p>LogOut</p>
      </Flex>
    </div>
  );
}

export default Nav;
