import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Tabs } from "@mantine/core";
import AppsIcon from "@mui/icons-material/Apps";
import CreatedGreddiitReports from "./CreatedGreddiitReports";
import CreatedGreddiitUsers from "./CreatedGreddiitUsers";
import CreatedGreddiitStats from "./CreatedGreddiitStats";
import CreatedGreddiitRequest from "./CreatedGreddiitRequest";
import Nav from "./Nav";

function CreatedGreddiit() {
  var { id } = useParams();
  const [pageDetail, setPageDetail] = useState({});
  const [pageStates, setPageStates] = useState({});
  const [fetchAgain, setFetchAgain] = useState(0);

  useEffect(() => {
    let token = localStorage.getItem("userToken");
    if (id) {
      axios
        .get(`http://localhost:5000/greddits/mine/${id}`, {
          headers: {
            "Content-Type": "application/json",
            authorization: token,
          },
        })
        .then((res) => {
          setPageDetail(res.data.greddit);
          setPageStates(res.data.stats);
        })
        .catch((_err) => {});
    }
  }, [id, fetchAgain]);

  return (
    <>
      <Nav />
      <Tabs defaultValue="Users">
        <Tabs.List>
          <Tabs.Tab value="Users" icon={<AppsIcon size={14} />}>
            Users Page
          </Tabs.Tab>
          <Tabs.Tab value="Request" icon={<AppsIcon size={14} />}>
            Request Page
          </Tabs.Tab>
          <Tabs.Tab value="Stats" icon={<AppsIcon size={14} />}>
            Stats Page
          </Tabs.Tab>
          <Tabs.Tab value="Reports" icon={<AppsIcon size={14} />}>
            Reports Page
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="Users" pt="xs">
          <CreatedGreddiitUsers pageDetail={pageDetail} />
        </Tabs.Panel>

        <Tabs.Panel value="Request" pt="xs">
          <CreatedGreddiitRequest
            pageDetail={pageDetail}
            setFetchAgain={setFetchAgain}
          />
        </Tabs.Panel>

        <Tabs.Panel value="Stats" pt="xs">
          <CreatedGreddiitStats
            pageDetail={pageDetail}
            pageStates={pageStates}
          />
        </Tabs.Panel>

        <Tabs.Panel value="Reports" pt="xs">
          <CreatedGreddiitReports pageDetail={pageDetail} />
        </Tabs.Panel>
      </Tabs>
    </>
  );
}

export default CreatedGreddiit;
