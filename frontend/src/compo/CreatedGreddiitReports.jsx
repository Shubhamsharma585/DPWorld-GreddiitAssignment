import React, { memo, useEffect, useState } from "react";
import { Flex, Text, Button, Modal, TextInput } from "@mantine/core";
import axios from "axios";
import { showNotification } from "@mantine/notifications";

function CreatedGreddiitReports({ pageDetail }) {
  let token = localStorage.getItem("userToken");
  const [reports, setReports] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(0);
  const [loading, setLoading] = useState(false);

  const ignoredReports = reports?.filter((rep) => rep.status === "ignored");
  const unprocessedReports = reports?.filter(
    (rep) => rep.status === "unprocessed"
  );
  const blockedUserPosts = reports?.filter(
    (rep) => rep.status === "blockedUser"
  );
  const deletedPosts = reports?.filter((rep) => rep.status === "deletedPost");

  useEffect(() => {
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
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false);
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageDetail, fetchAgain]);

  const handleBlock = (reportId) => {
    setLoading(true);
    axios
      .post(
        `http://localhost:5000/reports/blockUser/${reportId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      )
      .then(function (response) {
        setFetchAgain((e) => e + 1);
        showNotification({
          title: "User Blocked Successfully",
          message: ``,
          autoClose: 4000,
        });
      })
      .catch((e) => setLoading(false));
  };

  const handleDelete = (reportId) => {
    setLoading(true);
    axios
      .post(
        `reports/deletePost/${reportId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      )
      .then(function (response) {
        setFetchAgain((e) => e + 1);
        showNotification({
          title: "Post Deleted Successfully",
          message: ``,
          autoClose: 4000,
        });
      })
      .catch((e) => setLoading(false));
  };

  const handleIgnore = (reportId) => {
    setLoading(true);
    axios
      .post(
        `http://localhost:5000/reports/ignoreReport/${reportId}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        }
      )
      .then(function (response) {
        setFetchAgain((e) => e + 1);
        showNotification({
          title: "Post Ignored",
          message: ``,
          autoClose: 4000,
        });
      })
      .catch((e) => setLoading(false));
  };

  return (
    <Flex>
      {reports?.length > 0 ? (
        <Flex direction={"column"}>
          <Text
            sx={{
              border: "1px solid",
              textAlign: "center",
              backgroundColor: "beige",
            }}
          >
            Unprocessed Reports
          </Text>
          {unprocessedReports?.map((report, i) => {
            return (
              <Flex
                key={i}
                direction={"column"}
                sx={{
                  border: "1px solid",
                  width: 400,
                  margin: 10,
                  padding: 8,
                  borderRadius: 8,
                }}
              >
                <Text>{`ReportedBy:: ${report.reportedBy.firstName} ${report.reportedBy.lastName}`}</Text>
                <Text>{`Whom to Report:: ${report.reportedUser.firstName} ${report.reportedUser.lastName}`}</Text>
                <Text>{`Concern:: ${report.concernText}`}</Text>
                <Text>{`Text of post:: ${report.post.content}`}</Text>
                <Flex justify={"space-around"} sx={{ marginTop: 20 }}>
                  <Button
                    color={"grape"}
                    onClick={() => (loading ? {} : handleBlock(report._id))}
                  >
                    Block User
                  </Button>
                  <Button
                    color={"teal"}
                    onClick={() => (loading ? {} : handleDelete(report._id))}
                  >
                    Delete Post
                  </Button>
                  <Button
                    onClick={() => (loading ? {} : handleIgnore(report._id))}
                  >
                    Ignore
                  </Button>
                </Flex>
              </Flex>
            );
          })}
          <Text
            sx={{
              border: "1px solid",
              textAlign: "center",
              backgroundColor: "beige",
            }}
          >
            Ignored Reports
          </Text>
          {ignoredReports?.map((report, i) => (
            <Flex
              key={i}
              direction={"column"}
              sx={{
                border: "1px solid",
                width: 400,
                margin: 10,
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text>{`ReportedBy:: ${report.reportedBy.firstName} ${report.reportedBy.lastName}`}</Text>
              <Text>{`Whom to Report:: ${report.reportedUser.firstName} ${report.reportedUser.lastName}`}</Text>
              <Text>{`Concern:: ${report.concernText}`}</Text>
              <Text>{`Text of post:: ${report.post.content}`}</Text>
            </Flex>
          ))}
          <Text
            sx={{
              border: "1px solid",
              textAlign: "center",
              backgroundColor: "beige",
            }}
          >
            Blocked User Posts
          </Text>
          {blockedUserPosts?.map((report, i) => (
            <Flex
              key={i}
              direction={"column"}
              sx={{
                border: "1px solid",
                width: 400,
                margin: 10,
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text>{`ReportedBy:: ${report.reportedBy.firstName} ${report.reportedBy.lastName}`}</Text>
              <Text>{`Whom to Report:: ${report.reportedUser.firstName} ${report.reportedUser.lastName}`}</Text>
              <Text>{`Concern:: ${report.concernText}`}</Text>
              <Text>{`Text of post:: ${report.post.content}`}</Text>
            </Flex>
          ))}
          <Text
            sx={{
              border: "1px solid",
              textAlign: "center",
              backgroundColor: "beige",
            }}
          >
            Deleted Posts
          </Text>
          {deletedPosts?.map((report, i) => (
            <Flex
              key={i}
              direction={"column"}
              sx={{
                border: "1px solid",
                width: 400,
                margin: 10,
                padding: 8,
                borderRadius: 8,
              }}
            >
              <Text>{`ReportedBy:: ${report.reportedBy.firstName} ${report.reportedBy.lastName}`}</Text>
              <Text>{`Whom to Report:: ${report.reportedUser.firstName} ${report.reportedUser.lastName}`}</Text>
              <Text>{`Concern:: ${report.concernText}`}</Text>
              <Text>{`Text of post:: ${report.post.content}`}</Text>
            </Flex>
          ))}
        </Flex>
      ) : (
        <Flex>
          <Text>No Reports so far</Text>
        </Flex>
      )}
    </Flex>
  );
}

export default memo(CreatedGreddiitReports);
