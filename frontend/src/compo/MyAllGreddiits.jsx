import React, { useEffect, useState } from "react";
import { Flex, Text, Button, Modal, TextInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Loader } from "@mantine/core";

function MyAllGreddiits({ newadded }) {
  const [myGreds, setMyGreds] = useState([]);
  const [fetchingPages, setFetchingPages] = useState(false);
  const [handleBlockDlt, setHandleBlockDlt] = useState(false);
  const navigate = useNavigate();
  let token = localStorage.getItem("userToken");

  useEffect(() => {
    setFetchingPages(true);
    axios
      .get("http://localhost:5000/greddits/mine", {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      .then(function (response) {
        setMyGreds(response.data.greddits);
        setFetchingPages(false);
      })
      .catch((e) => setFetchingPages(false));
  }, [newadded]);

  const handleDlt = (id) => {
    setHandleBlockDlt(true);
    axios
      .delete(`http://localhost:5000/greddits/${id}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      .then(function (response) {
        let newGrads = myGreds?.filter(
          (grad) => grad._id !== response.data.deleted._id
        );
        setMyGreds(newGrads);
        setHandleBlockDlt(false);
      })
      .catch((e) => setHandleBlockDlt(false));
  };

  const handleOpen = (id) => {
    navigate(`/mygreddit/${id}`);
  };

  return (
    <Flex direction={"column"}>
      {fetchingPages ? (
        <Flex
          sx={{ width: "50vw", height: "60vh" }}
          justify={"center"}
          align={"center"}
        >
          <Loader size={60} />
        </Flex>
      ) : (
        myGreds?.map((page, i) => (
          <Flex
            key={i}
            direction={"column"}
            sx={{ border: "2px solid black", margin: 20, width: 800 }}
          >
            <Text>{`Name:: ${page.name}`}</Text>
            <Text>{`Description :: ${page.description}`}</Text>
            <Text>{`Number of people :: ${page.membersCount}`}</Text>
            <Text>{`Numbers of posts :: ${page.postsCount}`}</Text>
            <Text>{`Comma separated list of banned keywords ::`}</Text>
            <Flex>
              {page.bannedWords?.map((e, i) => (
                <Text key={i} sx={{ marginRight: "2px" }}>{`${e},`}</Text>
              ))}
            </Flex>
            <Flex
              sx={{ borderTop: "1px solid", padding: 5 }}
              justify={"space-around"}
              mt={5}
            >
              <Button
                color={"red"}
                onClick={() =>
                  handleBlockDlt ? () => {} : handleDlt(page._id)
                }
              >
                Delete
              </Button>
              <Button color={"blue"} onClick={() => handleOpen(page._id)}>
                Open
              </Button>
            </Flex>
          </Flex>
        ))
      )}
    </Flex>
  );
}

export default MyAllGreddiits;
