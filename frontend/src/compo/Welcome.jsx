import React from "react";
import { Flex, Text } from "@mantine/core";
import Nav from "./Nav";

function Welcome() {
  return (
    <>
    <Nav />
    <Flex direction={"column"} align="center" justify={"center"}>
      <Text sx={{ fontWeight: 800, fontSize: "50px", marginTop: "100px" }}>
        Welcome
      </Text>
      <Text sx={{ fontWeight: 800, fontSize: "20px", marginTop: "30px" }}>
        Use Nav bar to navigate in the pages
      </Text>
    </Flex>
    </>
    
  );
}

export default Welcome;
