import "./App.css";
import Router from "./Router/Router";
import { BrowserRouter } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";

function App() {
  return (
    <BrowserRouter>
      <MantineProvider withNormalizeCSS withGlobalStyles>
        <NotificationsProvider>
          <Router />
        </NotificationsProvider>
      </MantineProvider>
    </BrowserRouter>
  );
}

export default App;
