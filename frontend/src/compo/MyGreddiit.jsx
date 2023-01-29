import React, { useEffect, useState } from "react";
import { Flex, Button, Modal, TextInput } from "@mantine/core";
import MyAllGreddiits from "./MyAllGreddiits";
import { useNavigate } from "react-router-dom";
import { showNotification } from "@mantine/notifications";
import axios from "axios";
import Nav from "./Nav";

function MyGreddiit() {
  const navigate = useNavigate();
  let token = localStorage.getItem("userToken");

  const [opened, setOpened] = useState(false);

  const [nname, setNname] = useState("");
  const [nDesc, setNDesc] = useState("");
  const [nTags, setNTags] = useState("");
  const [nBanned, setNBanned] = useState("");
  const [newadded, setNewadded] = useState();

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  });

  const handleCreateNew = () => {
    setOpened(false);
    let token = localStorage.getItem("userToken");

    let banned = nBanned?.split(",");
    let tagges = nTags?.split(",");

    for (let i = 0; i < banned.length; i++) {
      if (banned[i].trim().split(" ").length > 1) {
        showNotification({
          title: "Follow banned words rules",
          message: `${"banned words should be single words separeted by comma"}`,
          autoClose: 4000,
        });
        return;
      }
    }

    for (let j = 0; j < tagges.length; j++) {
      if (tagges[j].trim().split(" ").length > 1) {
        showNotification({
          title: "Follow tags rules",
          message: `${"tags should be single words separeted by comma"}`,
          autoClose: 4000,
        });
        return;
      }
    }

    axios
      .post(
        "http://localhost:5000/greddits",
        {
          name: nname,
          description: nDesc,
          bannedWords: nBanned.split(",").map((e) => e.trim()),
          tags: nTags.split(",").map((e) => e.trim()),
        },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      )
      .then(function (response) {
        setNewadded(response);
        showNotification({
          title: "Greddiit created",
          message: `${"you have created a new Greddiit"}`,
          autoClose: 4000,
        });
      });
  };

  return (
    <>
      <Nav />
      <Flex direction={"column"} justify={"center"} align={"center"} sx={{}}>
        <Button sx={{ margin: "20px" }} onClick={() => setOpened(true)}>
          Create New Sub Greddiit
        </Button>
        <MyAllGreddiits newadded={newadded} />
        <Modal
          opened={opened}
          onClose={() => setOpened(false)}
          title="Page Details!"
        >
          <>
            <TextInput
              value={nname}
              onChange={(e) => setNname(e.target.value)}
              placeholder="name"
              label="Full Name"
              withAsterisk
            />
            <TextInput
              placeholder="this is about..."
              label="Description"
              withAsterisk
              value={nDesc}
              onChange={(e) => setNDesc(e.target.value)}
            />
            <TextInput
              value={nTags}
              onChange={(e) => setNTags(e.target.value)}
              placeholder=""
              label="Tags (comma separeted)"
              withAsterisk
            />
            <TextInput
              value={nBanned}
              onChange={(e) => setNBanned(e.target.value)}
              placeholder=""
              label="Banned Keywords (comma separeted)"
              withAsterisk
            />
            <Button onClick={handleCreateNew}>Create</Button>
          </>
        </Modal>
      </Flex>
    </>
  );
}

export default MyGreddiit;
