import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { Flex, Text, Button, Modal, TextInput } from "@mantine/core";
import { showNotification } from "@mantine/notifications";

function PublicViewRightScreen({
  id,
  pageDetail,
  setFetchAgain,
  pageUserData,
}) {
  const { posts, blockedMembers, moderator } = pageDetail;

  return (
    <Flex
      direction={"column"}
      sx={{ border: "1px solid black", height: "90vh", overflow: "scroll" }}
    >
      {posts?.map((post) => {
        return (
          <Post
            post={post}
            key={post._id}
            gredditId={id}
            setFetchAgain={setFetchAgain}
            blockedMembers={blockedMembers}
            moderator={moderator}
            pageUserData={pageUserData}
          />
        );
      })}
    </Flex>
  );
}

function Post({
  post,
  gredditId,
  setFetchAgain,
  blockedMembers,
  moderator,
  pageUserData,
}) {
  let userInfo = JSON.parse(localStorage.getItem("userInfo"));
  let token = localStorage.getItem("userToken");

  const { followedUsers, reportedPosts, savedPosts } = pageUserData;

  const [opened, setOpened] = useState(false);
  const [openedReport, setOpenedReport] = useState(false);
  const [commentTxt, setCommentTxt] = useState("");
  const [concernTxt, setConcernTxt] = useState("");
  const [loading, setLoading] = useState(false);

  const [localLikes, setLocalLikes] = useState([]);
  const [localDisLikes, setLocalDisLikes] = useState([]);

  const [alreadyReported, setAlreadyReported] = useState(false);
  const [alreadyFollowed, setAlreadyFollowed] = useState(false);
  const [alreadySaved, setAlreadySaved] = useState(false);

  useEffect(() => {
    if (followedUsers.includes(post.user._id)) {
      setAlreadyFollowed(true);
    }
    if (reportedPosts.includes(post._id)) {
      setAlreadyReported(true);
    }
    if (savedPosts.includes(post._id)) {
      setAlreadySaved(true);
    }
  }, [followedUsers, reportedPosts, savedPosts, post]);

  let isBlockedUser = blockedMembers.includes(post.user._id);
  let isAdmin = userInfo._id === moderator._id;
  let postUserId = post.user._id;
  let likedByMe =
    post.likes.includes(userInfo._id) || localLikes.includes(post._id);
  let dislikedByMe =
    post.dislikes.includes(userInfo._id) || localDisLikes.includes(post._id);

  const handleFollowUser = (userId) => {
    setAlreadyFollowed(true);
    axios
      .post(
        "http://localhost:5000/user-connections",
        {
          follows: userId,
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
          title: `Followed User`,
          message: `Followed Successfully`,
          autoClose: 4000,
        });
      });
  };

  const handleSavePost = (postId) => {
    setAlreadySaved(true);
    axios
      .post(
        `http://localhost:5000/posts/save/${postId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      )
      .then(function (response) {
        showNotification({
          title: `Post Saved in your saved posts`,
          message: `Saved Successfully`,
          autoClose: 4000,
        });
      });
  };

  const handleLikePost = (postId) => {
    setLoading(true);
    axios
      .post(
        `http://localhost:5000/posts/${postId}/likes`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then(function (response) {
        setLocalLikes(() => [...localLikes, postId]);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  const handleDislikePost = (postId) => {
    setLoading(true);
    axios
      .post(
        `http://localhost:5000/posts/${postId}/dislikes`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then(function (response) {
        setLocalDisLikes(() => [...localDisLikes, postId]);
        setLoading(false);
      })
      .catch((e) => setLoading(false));
  };

  const handleCommentPost = (postId) => {
    setOpened(false);
    setCommentTxt("");
    setLoading(true);

    axios
      .post(
        `http://localhost:5000/posts/${postId}/comments`,
        {
          content: commentTxt,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      )
      .then(function (response) {
        setLoading(false);
        setFetchAgain((e) => e + 1);
        showNotification({
          title: "Comment Added Successfully",
          message: ``,
          autoClose: 4000,
        });
      })
      .catch((e) => setLoading(false));
  };

  const handleReport = (gredditId, postId, reportedUserId) => {
    setAlreadyReported(true);
    setOpenedReport(false);
    let payload = {
      concernText: concernTxt,
      gredditId: gredditId,
      postId: postId,
      userId: reportedUserId,
    };
    axios
      .post("http://localhost:5000/reports", payload, {
        headers: {
          "Content-Type": "application/json",
          authorization: token,
        },
      })
      .then(function (response) {
        showNotification({
          title: "Reported This Post",
          message: `Reported Successfully`,
          autoClose: 4000,
        });
        setConcernTxt("");
      });
  };

  const openCommentModal = (gredditId, postId) => {
    setOpened(true);
  };

  return (
    <Flex
      sx={{
        border: "1px solid black",
        width: "50vw",
        backgroundColor: "lightblue",
        margin: "20px 80px",
      }}
      direction={"column"}
    >
      <Flex direction={"column"}>
        <Flex justify={"right"} gap="10px" sx={{ padding: 10 }}>
          {userInfo._id === postUserId ? null : (
            <Button
              disabled={alreadyReported}
              onClick={() => (loading ? {} : setOpenedReport(true))}
            >
              {alreadyReported ? "Reported" : "Report Post"}
            </Button>
          )}
          {userInfo._id === postUserId ? null : (
            <Button
              disabled={alreadyFollowed}
              onClick={() => (loading ? {} : handleFollowUser(post.user._id))}
            >
              {alreadyFollowed ? "Following" : "Follow User"}
            </Button>
          )}
          <Button
            disabled={alreadySaved}
            onClick={() => (loading ? {} : handleSavePost(post._id))}
          >
            {alreadySaved ? "Saved" : "Save"}
          </Button>
        </Flex>
        <Text
          sx={{
            color: isBlockedUser ? "darkred" : "black",
            fontSize: 20,
            fontWeight: 500,
            border: "1px solid black",
          }}
        >
          {isBlockedUser && !isAdmin
            ? "Blocked User"
            : `Name: ${post.user.firstName} ${post.user.lastName}`}
        </Text>
        <Text
          sx={{ border: "1px solid black", color: "gray" }}
        >{`User Name: ${post.user.username}`}</Text>
        <Text>{post.content}</Text>
      </Flex>

      <Flex
        sx={{ borderTop: "1px solid black", marginTop: "20px" }}
        justify={"space-around"}
      >
        <Text
          sx={{
            cursor: "pointer",
            color: `${likedByMe ? `darkgreen` : `gray`}`,
            fontWeight: `${likedByMe ? 700 : 500}`,
          }}
          onClick={() => (likedByMe ? {} : handleLikePost(post._id))}
        >{`${likedByMe ? `Liked` : `Like`}:: ${
          likedByMe && localLikes.includes(post._id)
            ? post.likes.length + 1
            : post.likes.length
        }`}</Text>
        <Text
          sx={{
            cursor: "pointer",
            color: `${dislikedByMe ? `red` : `gray`}`,
            fontWeight: `${dislikedByMe ? 700 : 500}`,
          }}
          onClick={() => (dislikedByMe ? {} : handleDislikePost(post._id))}
        >{`Dislike:: ${
          dislikedByMe && localDisLikes.includes(post._id)
            ? post.dislikes.length + 1
            : post.dislikes.length
        }`}</Text>
        <Text
          sx={{ cursor: "pointer", color: "gray" }}
          onClick={() => openCommentModal(post._id)}
        >{`Comments:: ${post.comments.length}`}</Text>
      </Flex>

      <Flex sx={{ border: "1px solid black" }} direction={"column"}>
        {post.comments.map((com, i) => (
          <Flex
            direction={"column"}
            key={i}
            sx={{ backgroundColor: "skyblue" }}
          >
            <Text color={"dimmed"}>{`Comment by:- ${com.user.firstName}`}</Text>
            <Text>{com.content}</Text>
          </Flex>
        ))}
      </Flex>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title="Add a Comment"
      >
        <TextInput
          value={commentTxt}
          onChange={(e) => {
            setCommentTxt(e.target.value);
          }}
          placeholder="Today is a very good day..."
          label="Post Something"
        />
        <Button
          onClick={() => handleCommentPost(post._id)}
          sx={{ marginTop: "20px" }}
        >
          Comment
        </Button>
      </Modal>
      <Modal
        opened={openedReport}
        onClose={() => setOpenedReport(false)}
        title="Report This Post"
      >
        <TextInput
          value={concernTxt}
          onChange={(e) => {
            setConcernTxt(e.target.value);
          }}
          placeholder="Today is a very good day..."
          label="Post Something"
        />
        <Button
          onClick={() => handleReport(gredditId, post._id, post.user._id)}
          sx={{ marginTop: "20px" }}
        >
          Report
        </Button>
      </Modal>
    </Flex>
  );
}

export default memo(PublicViewRightScreen);
