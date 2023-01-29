import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Text, Button } from "@mantine/core";
import Nav from "./Nav";
import axios from "axios";
import { showNotification } from "@mantine/notifications";

function SavedPosts() {
  const [saved, setSaved] = useState([]);
  const navigate = useNavigate();
  let token = localStorage.getItem("userToken");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    } else {
      axios
        .get(`http://localhost:5000/posts/savedposts/mine`, {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        })
        .then((res) => {
          setSaved(res.data.savedPosts);
        });
    }
  }, []);

  const handleRemoveSaved = (postId) => {
    axios
      .delete(`http://localhost:5000/posts/save/${postId}`, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      .then(function (response) {
        setSaved(response.data.savedPosts);
        showNotification({
          title: "Removed Successfully",
          message: `Saved post deleted`,
          autoClose: 4000,
          color: "orange",
        });
      });
  };

  return (
    <>
      <Nav />
      <Flex direction={"column"} gap={"20px"} sx={{ padding: "20px" }}>
        {saved.length > 0 ? (
          saved?.map((post, i) => {
            return (
              <Flex
                key={i}
                sx={{
                  border: "1px solid black",
                  minHeight: 200,
                  width: "50vw",
                  backgroundColor: "lightblue",
                  margin: "20px 80px",
                }}
                direction={"column"}
                justify={"space-between"}
              >
                <Flex direction={"column"} sx={{ padding: "5px" }}>
                  <Flex direction={"column"}>
                    <Text
                      sx={{ fontSize: 30 }}
                    >{`${post.user.firstName} ${post.user.lastName}`}</Text>
                    <Text>{post.createdAt}</Text>
                  </Flex>
                  <Text>{post.content}</Text>
                </Flex>

                <Flex direction={"column"}>
                  <Flex
                    sx={{ border: "1px solid black", marginTop: "20px" }}
                    justify={"space-around"}
                  >
                    <Text>{`Like:: ${post.likes.length}`}</Text>
                    <Text>{`Dislike:: ${post.dislikes.length}`}</Text>
                    <Text>{`Comments:: ${post.comments.length}`}</Text>
                  </Flex>
                  <Button
                    sx={{ margin: "auto" }}
                    onClick={() => handleRemoveSaved(post._id)}
                  >
                    Remove
                  </Button>
                </Flex>
              </Flex>
            );
          })
        ) : (
          <Flex align={"center"} justify={"center"}>
            <Text>No Saved Posts yet</Text>
          </Flex>
        )}
      </Flex>
    </>
  );
}

export default SavedPosts;
