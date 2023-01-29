import React from "react";
import { Routes, Route } from "react-router-dom";
import Nav from "../compo/Nav";
import SavedPosts from "../compo/SavedPosts";
import Signin from "../compo/Signin";
import Signup from "../compo/Signup";
import Profile from "../compo/Profile";
import MyGreddiit from "../compo/MyGreddiit";
import CreatedGreddiit from "../compo/CreatedGreddiit";
import AllUsersGreddiit from "../compo/AllUsersGreddiit";
import GreddiitPublicView from '../compo/GreddiitPublicView';
import Welcome from "../compo/Welcome";

function Router() {
  return (
    <>
      
      <Routes>
        <Route path="/" element={<Welcome/>} />
        <Route path="*" element={<></>} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/mygreddit" element={<MyGreddiit />} />
        <Route path="/allusersgreddit" element={<AllUsersGreddiit />} />
        <Route path="/mygreddit/:id" element={<CreatedGreddiit />} />
        <Route path="/publicgreddit/:id" element={<GreddiitPublicView />} />
        <Route path="/savedposts" element={<SavedPosts/>} />

      </Routes>
    </>
  );
}

export default Router;
