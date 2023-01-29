import React, { useEffect, useState } from "react";
import { Flex, Text, Table } from "@mantine/core";
import axios from "axios";

function CreatedGreddiitStats({ pageDetail, pageStates }) {
  let token = localStorage.getItem("userToken");

  const [postsVsDate, setPostsVsDate] = useState([]);
  const [reports, setReports] = useState([]);

  const deletedPosts = reports?.filter((rep) => rep.status === "deletedPost");

  useEffect(() => {
    if (pageStates?.postsByDate) {
      let data = Object.entries(pageStates?.postsByDate)?.map(
        ([date, value]) => ({ date, value })
      );
      setPostsVsDate(data);
    }
    if (pageDetail?._id) {
      axios
        .get(`http://localhost:5000/reports/${pageDetail._id}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        })
        .then(function (response) {
          setReports(response.data.reports);
        });
    }
  }, [pageStates, pageDetail]);

  return (
    <Flex direction={"column"} sx={{ marginBottom: 300 }}>
      <Flex sx={{}}>
        <Flex
          direction={"column"}
          sx={{
            border: "1px solid",
            minHeight: 500,
            width: "50%",
            padding: 12,
          }}
        >
          <Text>Members vs time</Text>
        </Flex>

        <Flex
          direction={"column"}
          sx={{
            border: "1px solid",
            minHeight: 500,
            width: "50%",
            padding: 12,
          }}
        >
          <Text> (Number of daily posts) vs date</Text>
          <Table>
            <thead>
              <tr>
                <th>Post Date</th>
                <th>Number of daily posts</th>
              </tr>
            </thead>
            <tbody>
              {postsVsDate?.map((element) => (
                <tr key={element.date}>
                  <td>
                    <Text sx={{ fontSize: 18 }}>{element.date}</Text>
                  </td>
                  <td>
                    <Text sx={{ fontSize: 20 }}>{element.value.length}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Flex>
      </Flex>

      <Flex sx={{}}>
        <Flex
          direction={"column"}
          sx={{
            border: "1px solid",
            minHeight: 500,
            width: "50%",
            padding: 12,
          }}
        >
          <Text>
            Daily visitors vs date (visitors are counted by the number of people
            clicking the sub greddiit link)
          </Text>
          <Table>
            <thead>
              <tr>
                <th>Post Date</th>
                <th>Number of daily posts</th>
              </tr>
            </thead>
            <tbody>
              {postsVsDate?.map((element) => (
                <tr key={element.date}>
                  <td>
                    <Text sx={{ fontSize: 18 }}>{element.date}</Text>
                  </td>
                  <td>
                    <Text sx={{ fontSize: 20 }}>{element.value.length}</Text>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Flex>

        <Flex
          direction={"column"}
          sx={{
            border: "1px solid",
            minHeight: 500,
            width: "50%",
            padding: 12,
          }}
        >
          <Text>(Number of reported posts) vs actually deleted posts</Text>
          <Flex
            sx={{
              border: "1px solid",
              height: 200,
              width: 400,
              margin: "auto",
              padding: "0px",
            }}
            direction={"row"}
            justify={"space-around"}
          >
            <Text
              sx={{
                fontSize: 100,
                margin: "0px",
                border: "1px solid",
                padding: "20px 50px",
              }}
              color={"blue"}
            >
              {reports?.length}
            </Text>
            <Text
              sx={{
                fontSize: 100,
                margin: "0px",
                border: "1px solid",
                padding: "20px 50px",
              }}
              color={"maroon"}
            >
              {deletedPosts?.length}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}

export default CreatedGreddiitStats;
