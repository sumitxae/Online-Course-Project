import { list } from "postcss";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import DashBoard from "./components/DashBoard";
import List from "./components/List";
import { useDispatch, useSelector } from "react-redux";
import { getCourses } from "./store/actions/courseAction";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getCourses());
  }, []);
  return (
    <div>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/details/:id" element={<Details />} />
        <Route path="/dashboard" element={<DashBoard />} />
      </Routes>
    </div>
  );
};

export default App;
