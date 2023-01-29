import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Flex, Text, Button, Modal, TextInput, Avatar } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import PublicViewRightScreen from "./PublicViewRightScreen";
import Nav from "./Nav";

function GreddiitPublicView() {
  var { id } = useParams();
  const [pageDetail, setPageDetail] = useState({});
  const [pageUserData, setPageUserData] = useState({});
  const [opened, setOpened] = useState(false);
  const [postTxt, setPostTxt] = useState("");
  const [fetchAgain, setFetchAgain] = useState(0);
  let token = localStorage.getItem("userToken");

  useEffect(() => {
    let token = localStorage.getItem("userToken");
    if (id) {
      axios
        .get(`http://localhost:5000/greddits/${id}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        })
        .then((res) => {
          setPageDetail(res.data.greddit);
          setPageUserData(res.data.userData);
        })
        .catch((_err) => {});
    }
  }, [id, fetchAgain]);

  const hasKeywords = (str, keywords) => {
    str = new Set(str.toLowerCase().split(" "));
    keywords = new Set(keywords.map((word) => word.toLowerCase()));
    return [...keywords].some((word) => str.has(word));
  };

  const handlePost = () => {
    setOpened(false);

    if (hasKeywords(postTxt, pageDetail.bannedWords)) {
      showNotification({
        title: "Alert",
        message: `your post has certain banned keywords`,
        autoClose: 2000,
        color: "red",
      });
    }

    axios
      .post(
        "http://localhost:5000/posts",
        {
          greddit: id,
          content: postTxt,
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
          title: "Posted",
          message: `Post Successfully`,
          autoClose: 4000,
        });
        setPageDetail({
          ...pageDetail,
          posts: [...pageDetail.posts, response.data.post],
        });
        setPostTxt("");
      })
      .catch(function (_error) {});
  };

  return (
    <>
      <Nav />
      <Flex>
        <Flex
          direction={"column"}
          sx={{ padding: "30px", border: "1px solid black" }}
        >
          <Avatar
            size={300}
            src="https://w0.peakpx.com/wallpaper/592/98/HD-wallpaper-buddha-buddha-purnima.jpg"
            alt="it's me"
          />
          <Text>{`Name:: ${pageDetail.name}`}</Text>
          <Text>{`Description:: ${pageDetail.description}`}</Text>
          <Flex
            direction={"column"}
            sx={{
              border: "1px solid",
              borderRadius: 4,
              padding: 8,
              backgroundColor: "black",
              color: "white",
            }}
          >
            <Text>{"Banned Keywords"}</Text>
            {pageDetail.bannedWords?.map((e, i) => {
              return (
                <Text key={i} color={"red"}>
                  {e}
                </Text>
              );
            })}
          </Flex>
          <Button sx={{ marginTop: "30px" }} onClick={() => setOpened(true)}>
            Create Post
          </Button>
          <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Make a Post"
          >
            <TextInput
              value={postTxt}
              onChange={(e) => {
                setPostTxt(e.target.value);
              }}
              placeholder="Today is a very good day..."
              label="Post Something"
            />
            <Button onClick={handlePost} sx={{ marginTop: "20px" }}>
              POST
            </Button>
          </Modal>
        </Flex>
        <PublicViewRightScreen
          id={id}
          pageDetail={pageDetail}
          setFetchAgain={setFetchAgain}
          pageUserData={pageUserData}
        />
      </Flex>
    </>
  );
}

export default GreddiitPublicView;
