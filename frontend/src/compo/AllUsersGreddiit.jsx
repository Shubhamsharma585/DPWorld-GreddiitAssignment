import React, { memo, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Flex, Text, Button, TextInput } from "@mantine/core";
import Fuse from "fuse.js";
import { Loader } from "@mantine/core";
import PublicGreddiit from "./PublicGreddiit";
import Nav from "./Nav";

function AllUsersGreddiit() {
  const navigate = useNavigate();
  const [fetchingPages, setFetchingPages] = useState(false);

  const [all, setAll] = useState([]);
  const [relatedResults, setRelatedResults] = useState([]);
  const [finalRes, setFinalRes] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [namesort, setNamesort] = useState(false);
  const [followsort, setFollowsort] = useState(false);
  const [datesort, setDatesort] = useState(false);

  useEffect(() => {
    setFinalRes(relatedResults?.length > 0 ? relatedResults : all);
  }, [relatedResults, all]);

  //Sorting
  const handleSortName = (e) => {
    setNamesort(e);
    if (e) {
      if (relatedResults?.length > 0) {
        let nsorted = relatedResults.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase()
            ? 1
            : b.name.toLowerCase() > a.name.toLowerCase()
            ? -1
            : 0
        );
        setRelatedResults(nsorted);
      } else {
        let nsorted = all.sort((a, b) =>
          a.name.toLowerCase() > b.name.toLowerCase()
            ? 1
            : b.name.toLowerCase() > a.name.toLowerCase()
            ? -1
            : 0
        );
        setRelatedResults(nsorted);
      }
    }
  };

  const handleSortFollower = (e) => {
    setFollowsort(e);
    if (e) {
      if (relatedResults?.length > 0) {
        let nsorted = relatedResults?.sort(
          (a, b) => b.membersCount - a.membersCount
        );
        setRelatedResults(nsorted);
      } else {
        let nsorted = all.sort((a, b) => b.membersCount - a.membersCount);
        setRelatedResults(nsorted);
      }
    }
  };

  const handleSortDate = (e) => {
    setDatesort(e);
    if (e) {
      if (relatedResults?.length > 0) {
        let nsorted = relatedResults.sort((a, b) => {
          var dateA = new Date(a.createdAt);
          var dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        setRelatedResults(nsorted);
      } else {
        let nsorted = all.sort((a, b) => {
          var dateA = new Date(a.createdAt);
          var dateB = new Date(b.createdAt);
          return dateB - dateA;
        });
        setRelatedResults(nsorted);
      }
    }
  };

  //Filter by
  const handleFilter = (tag) => {
    if (tag === "") {
      setRelatedResults([]);
    } else {
      let filtered = all?.filter((page) => page?.tags?.includes(tag));
      setRelatedResults(filtered);
    }
  };

  //Fuzzy Search
  const options = {
    includeScore: true,
    keys: ["name"],
  };
  const fuse = new Fuse(all ? all : [], options);

  const handleSearch = (value) => {
    setSearchText(value);
    const res = fuse.search(value);
    const resn = res.map((e) => e.item);
    setRelatedResults(resn.slice(0, 5));
  };

  useEffect(() => {
    let token = localStorage.getItem("userToken");
    if (!token) {
      navigate("/signin");
    }
    if (all.length <= 0) {
      setFetchingPages(true);
      let userInfo = JSON.parse(localStorage.getItem("userInfo"));
      axios
        .get("http://localhost:5000/greddits", {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        })
        .then(function (response) {
          let res = response.data.greddits;
          let filteredArrJoined = res.filter((page) =>
            page.members?.includes(userInfo._id)
          );
          let filteredArrNJoined = res.filter(
            (page) => !page.members?.includes(userInfo._id)
          );
          let arr = [...filteredArrJoined, ...filteredArrNJoined];
          setAll(arr);
          setFetchingPages(false);
        })
        .catch(function (error) {
          setFetchingPages(false);
        });
    }
  }, []);

  return (
    <>
      <Nav />
      <Flex align={"center"} direction={"row"} gap={40} sx={{ padding: 20 }}>
        <Flex
          align={"center"}
          direction={"column"}
          justify={""}
          sx={{ width: 350, border: "1px solid", minHeight: 500 }}
        >
          <TextInput
            value={searchText}
            onChange={(e) => {
              handleSearch(e.target.value);
            }}
            placeholder="Search with a name"
            label="Fuse Search with Name"
          />
          <Flex
            align={"center"}
            direction={"column"}
            sx={{ margin: "40px 40px" }}
          >
            <Text sx={{ fontWeight: 700 }}>Sort</Text>
            <Text>(Can select multiple also)</Text>
            <label for="Name">Name</label>
            <input
              type="checkbox"
              id="Name"
              checked={namesort}
              onChange={(event) => handleSortName(event.target.checked)}
            />
            <label for="Followers">Followers</label>
            <input
              type="checkbox"
              id="Followers"
              checked={followsort}
              onChange={(event) => handleSortFollower(event.target.checked)}
            />
            <label for="creation">Creation Date</label>
            <input
              type="checkbox"
              id="creation"
              checked={datesort}
              onChange={(event) => handleSortDate(event.target.checked)}
            />
          </Flex>

          <Flex
            align={"center"}
            direction={"column"}
            sx={{ margin: "40px 40px" }}
            gap={20}
          >
            <Text>Filter By</Text>
            <Flex gap={20}>
              <Button onClick={() => handleFilter("drama")}>Drama</Button>
              <Button onClick={() => handleFilter("comedy")}>Comedy</Button>
              <Button onClick={() => handleFilter("horror")}>Horror</Button>
            </Flex>
            <Button color={"violet"} onClick={() => handleFilter("")}>
              Clear Filter
            </Button>
          </Flex>
        </Flex>
        <Flex
          align={"center"}
          direction={"column"}
          sx={{ height: 600, border: "1px solid", overflow: "scroll" }}
        >
          {fetchingPages ? (
            <Flex
              sx={{ width: "50vw", height: "60vh" }}
              justify={"center"}
              align={"center"}
            >
              <Loader size={60} />
            </Flex>
          ) : (
            finalRes.map((page, i) => {
              return <PublicGreddiit key={i} page={page} />;
            })
          )}
        </Flex>
      </Flex>
    </>
  );
}

export default memo(AllUsersGreddiit);
