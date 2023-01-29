import React, { useState } from "react";
import { Flex, Text, Button, Modal, TextInput, Radio } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function PublicGreddiit({ page }) {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let token = localStorage.getItem("userToken");

  const navigate = useNavigate();

  const [req, setReq] = useState(false);
  const [left, setLeft] = useState(false);

  const handleAct = () => {
    if (page?.members?.includes(userInfo._id)) {
      navigate(`/publicgreddit/${page._id}`);
    } else if (page?.memberRequests?.includes(userInfo._id) || req) {
    } else {
      axios
        .post(
          `http://localhost:5000/greddits/join/${page._id}`,
          {},
          {
            headers: {
              "Content-Type": "application/json",
              authorization: token,
            },
          }
        )
        .then(function (response) {
          setReq(true);
        });
    }
  };

  const handleRemove = () => {
    setLeft(true);
    axios
      .post(
        `http://localhost:5000/greddits/leave/${page._id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then(function (response) {
        setLeft(true);
      })
      .catch((e) => setLeft(false));
  };

  return (
    <Flex
      sx={{
        border: "1px solid black",
        width: 600,
        margin: "10px",
        padding: 15,
      }}
      direction={"column"}
      align={"left"}
      justify={"center"}
    >
      <Text>{`Name:: ${page.name}`}</Text>
      <Text>{`Description :: ${page.description}`}</Text>
      <Text>{`Number of people :: ${page.membersCount}`}</Text>
      <Text>{`Numbers of posts :: ${page.postsCount}`}</Text>
      <Text>{`Created on :: ${new Date(
        page.createdAt
      ).toLocaleString()}`}</Text>
      <Text>{`Comma separated list of banned keywords ::`}</Text>
      <Flex>
        {page.bannedWords?.map((e, i) => (
          <Text key={i} sx={{ marginRight: "2px" }}>{`${e},`}</Text>
        ))}
      </Flex>
      <Flex>
        {left ? null : (
          <Button
            sx={{ padding: 2, width: 200, margin: "auto" }}
            onClick={handleAct}
            color={
              page?.memberRequests?.includes(userInfo._id) || req
                ? "lime"
                : "blue"
            }
          >
            {page?.members?.includes(userInfo._id)
              ? "Open"
              : page?.memberRequests?.includes(userInfo._id) || req
              ? "Requested"
              : "Join"}
          </Button>
        )}
        {page?.members?.includes(userInfo._id) ? (
          <Button
            onClick={left ? () => {} : handleRemove}
            color={left ? "violet" : "red"}
            disabled={page.moderator._id === userInfo._id}
            sx={{ padding: 2, width: 200, margin: "auto" }}
          >
            {left ? "Already Left" : "Leave"}
          </Button>
        ) : null}
      </Flex>
    </Flex>
  );
}

export default PublicGreddiit;
