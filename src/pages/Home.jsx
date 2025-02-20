import { useEffect } from "react";
import Categories from "../components/Categories";
import LatestColletion from "../components/LatestColletion";

const Home = () => {
  useEffect(() => {
    document.title = "AS Denim";
  }, []);
  return (
    <div className="pt-36">
      <Categories />
      <LatestColletion />
    </div>
  );
};

export default Home;
