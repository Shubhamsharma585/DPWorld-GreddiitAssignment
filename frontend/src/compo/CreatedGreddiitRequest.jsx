import React, { useState } from "react";
import { Flex, Text, Button, Modal, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import axios from "axios";

function CreatedGreddiitRequest({ pageDetail, setFetchAgain }) {
  const { memberRequests } = pageDetail;
  const [blockReq, setBlockReq] = useState(false);
  let token = localStorage.getItem("userToken");

  const handleAccept = (reqId) => {
    setBlockReq(true);
    axios
      .post(
        "http://localhost:5000/greddits/accept",
        {
          gredditId: pageDetail._id,
          requestId: reqId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      )
      .then(function (response) {
        showNotification({
          title: "Accepted",
          message: `Added User Successfully`,
          autoClose: 4000,
        });
        setFetchAgain((x) => x + 1);
        setBlockReq(false);
      });
  };

  const handleDeny = (reqId) => {
    setBlockReq(true);
    axios
      .post(
        "http://localhost:5000/greddits/reject",
        {
          gredditId: pageDetail._id,
          requestId: reqId,
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      )
      .then(function (response) {
        showNotification({
          title: "Removed User from Request",
          message: `Denied User to Join Successfully`,
          autoClose: 4000,
        });
        setBlockReq(false);
        setFetchAgain((x) => x + 1);
      });
  };

  return (
    <Flex
      direction={"column"}
      sx={{
        padding: "30px",
        border: "1px solid black",
        height: "500px",
        overflow: "scroll",
      }}
    >
      {memberRequests?.length > 0 ? (
        memberRequests?.map((req, i) => {
          return (
            <Flex
              key={i}
              sx={{
                border: "1px solid",
                width: 300,
                padding: "10px",
                margin: 10,
                backgroundColor: "#AA336A",
                color: "white",
                borderRadius: 8,
              }}
              direction={"column"}
            >
              <Text>{`${req.firstName} ${req.lastName}`}</Text>
              <Flex sx={{ marginTop: "20px" }} justify={"space-around"}>
                <Button
                  onClick={blockReq ? () => {} : () => handleAccept(req._id)}
                >
                  Accept
                </Button>
                <Button
                  onClick={blockReq ? () => {} : () => handleDeny(req._id)}
                >
                  Deny
                </Button>
              </Flex>
            </Flex>
          );
        })
      ) : (
        <Flex justify={"center"}>
          <Text>No Joining Requests So far</Text>
        </Flex>
      )}
    </Flex>
  );
}

export default CreatedGreddiitRequest;
