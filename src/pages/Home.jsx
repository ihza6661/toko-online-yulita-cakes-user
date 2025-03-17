import { useEffect } from "react";
import Categories from "../components/Categories";
import LatestColletion from "../components/LatestColletion";
import Hero from "../components/Hero";
import NewsletterBox from "../components/NewsletterBox";

const Home = () => {
  useEffect(() => {
    document.title = "Yulita Cakes";
  }, []);
  return (
    <div className="pt-32">
      {/* <Hero /> */}
      <Categories />
      <LatestColletion />
      {/* <NewsletterBox /> */}
    </div>
  );
};

export default Home;
