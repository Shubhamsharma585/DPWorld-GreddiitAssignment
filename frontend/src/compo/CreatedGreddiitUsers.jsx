import React, { memo, useEffect, useState } from "react";
import { Flex, Text } from "@mantine/core";

function CreatedGreddiitUsers({ pageDetail }) {
  const [unblocked, setUnblocked] = useState([]);
  const [blocked, setBlocked] = useState([]);

  useEffect(() => {
    const filterObjectsById = (members, ids) => {
      const matched = [];
      const unmatched = [];
      members?.forEach((member) => {
        if (ids.includes(member._id)) {
          matched.push(member);
        } else {
          unmatched.push(member);
        }
      });
      setUnblocked(unmatched);
      setBlocked(matched);
    };

    if (pageDetail) {
      filterObjectsById(pageDetail.members, pageDetail.blockedMembers);
    }
  }, [pageDetail]);

  return (
    <Flex direction={"column"}>
      <Text sx={{ backgroundColor: "#AA336A", color: "white" }}>
        UnBlocked Users
      </Text>
      {unblocked?.map((mem, i) => {
        return (
          <Flex
            key={i}
            sx={{ border: "1px solid", margin: 10, width: 300, padding: 20 }}
          >
            <Text>{`${mem.firstName} ${mem.lastName}`}</Text>
          </Flex>
        );
      })}
      <Text sx={{ backgroundColor: "#AA336A", color: "white" }}>
        Blocked Users
      </Text>
      {blocked?.map((mem, i) => {
        return (
          <Flex
            key={i}
            sx={{ border: "1px solid", margin: 10, width: 300, padding: 20 }}
          >
            <Text>{`${mem.firstName} ${mem.lastName}`}</Text>
          </Flex>
        );
      })}
    </Flex>
  );
}

export default memo(CreatedGreddiitUsers);
