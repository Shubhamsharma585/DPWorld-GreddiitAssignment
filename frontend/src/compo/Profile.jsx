import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Button, Modal } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import { Loader } from "@mantine/core";
import Nav from "./Nav";

function Profile() {
  const navigate = useNavigate();
  let token = localStorage.getItem("userToken");

  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);

  const [opened, setOpened] = useState(false);

  const [nfname, setnFname] = useState("");
  const [nlname, setnLname] = useState("");

  const [updates, setUpdates] = useState("");
  const [fetchAgain, setFetchAgain] = useState(0);

  const [openedFollowing, setOpenedFollowing] = useState(false);
  const [openedFollower, setOpenedFollower] = useState(false);

  const [allfollowers, setAllFollowers] = useState([]);
  const [allfollowings, setAllFollowings] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      setLoading(true);
      axios
        .get("http://localhost:5000/users", {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        })
        .then(function (response) {
          setUser(response.data.user);
          setnFname(response.data.user.firstName);
          setnLname(response.data.user.lastName);
          setLoading(false);
          localStorage.setItem("userInfo", JSON.stringify(response.data.user));
        })
        .catch((e) => setLoading(false));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updates, fetchAgain]);

  const handleEdit = () => {
    setOpened(true);
  };

  const handleUpdate = () => {
    if (nfname?.length < 1 || nlname?.length < 1) {
      showNotification({
        title: "Invalid",
        message: `Names can't be empty! 🤥`,
        autoClose: 4000,
      });
    } else {
      axios
        .post(
          "http://localhost:5000/users",
          {
            firstName: nfname,
            lastName: nlname,
          },
          {
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
          }
        )
        .then(function (response) {
          setUpdates(response.data.user);
        })
        .catch(function (error) {
          showNotification({
            title: "Error",
            message: `${error.response.data.message}! 🤥`,
            autoClose: 4000,
          });
        });
    }
    setOpened(false);
  };

  const handleFollowers = () => {
    setOpenedFollower(true);

    axios
      .get("http://localhost:5000/user-connections?type=follower", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      .then(function (response) {
        setAllFollowers(response.data.followers);
      });
  };

  const handleFollowings = () => {
    setOpenedFollowing(true);
    axios
      .get("http://localhost:5000/user-connections?type=following", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      .then(function (response) {
        setAllFollowings(response.data.followings);
      });
  };

  const handledis = (id) => {
    setLoading(true);
    axios
      .delete(`http://localhost:5000/user-connections/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      .then(function (response) {
        setFetchAgain((e) => e + 1);
        setOpenedFollowing(false);
        setOpenedFollower(false);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  return (
    <>
      <Nav />
      {loading ? (
        <Flex align={"center"} justify={"center"} sx={{ marginTop: 120 }}>
          <Loader size={60} />
        </Flex>
      ) : (
        <Flex
          direction={"column"}
          align={"center"}
          sx={{
            border: "1px solid black",
            margin: "auto",
            marginTop: "100px",
            width: "400px",
          }}
        >
          {user?.firstName ? (
            <>
              <h2>{`First Name:: ${user.firstName}`}</h2>
              <h2>{`Last Name:: ${user.lastName}`}</h2>
              <h2>{`User Name:: ${user.username}`}</h2>
              <Button onClick={handleEdit}>EDIT</Button>
              <Flex gap={"40px"}>
                <h2
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={handleFollowers}
                >
                  {`Followers:: ${user.followerCount}`}{" "}
                </h2>
                <h2
                  style={{ color: "blue", cursor: "pointer" }}
                  onClick={handleFollowings}
                >{`Followings:: ${user.followingCount}`}</h2>
              </Flex>
            </>
          ) : null}
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Update yourself!"
          >
            <>
              <input
                value={nfname}
                onChange={(e) => setnFname(e.target.value)}
              />
              <input
                value={nlname}
                onChange={(e) => setnLname(e.target.value)}
              />
              <Button onClick={handleUpdate}>Update</Button>
            </>
          </Modal>

          <Modal
            opened={openedFollowing}
            onClose={() => setOpenedFollowing(false)}
            title="Followings!"
          >
            <>
              {allfollowings.map((itm, i) => {
                return (
                  <Flex align={"center"} justify={"space-between"} key={i}>
                    <h4>{itm?.follows?.username}</h4>
                    <Button onClick={() => (loading ? {} : handledis(itm._id))}>
                      {"Unfollow"}
                    </Button>
                  </Flex>
                );
              })}
            </>
          </Modal>
          <Modal
            opened={openedFollower}
            onClose={() => setOpenedFollower(false)}
            title="Followers!"
          >
            <>
              {allfollowers?.map((itm, i) => {
                return (
                  <Flex align={"center"} justify={"space-between"} key={i}>
                    <h4>{itm?.user?.username}</h4>
                    <Button onClick={() => (loading ? {} : handledis(itm._id))}>
                      {"Remove"}
                    </Button>
                  </Flex>
                );
              })}
            </>
          </Modal>
        </Flex>
      )}
    </>
  );
}

export default Profile;
