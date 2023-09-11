import React, { useState } from "react";
import Categories from "../../components/Categories/Categories";
import Rooms from "../../components/Rooms/Rooms";

const Home = () => {
  const [selected, setSelected] = useState("all");
  console.log(selected);
  const handleCategories = (category) => {
    setSelected(category);
  };
  return (
    <>
      <Categories handleCategories={handleCategories} selected={selected} />
      <Rooms selected={selected} />
    </>
  );
};

export default Home;
