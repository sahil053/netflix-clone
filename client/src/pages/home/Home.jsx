import Navbar from "../../components/navbar/Navbar";
import Featured from "../../components/featured/Featured";
import List from "../../components/list/List";
import "./home.scss";
import { useEffect, useState } from "react";
import axios from "axios";

const Home = ({ type }) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try {
        const apiUrl = `https://netflix-clone-ces1.onrender.com/api/lists${
          type ? "?type=" + type : ""
        }${genre ? "&genre=" + genre : ""}`;

        console.log("API URL:", apiUrl);

        const res = await axios.get(apiUrl, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });

        console.log("Data from server:", res.data);

        setLists(res.data);
      } catch (error) {
        console.error("Error fetching lists:", error);
        // Handle the error, show a user-friendly message, or take appropriate action.
      }
    };

    getRandomLists();
  }, [type, genre]);

  return (
    <div className="home">
      <Navbar />
      <Featured type={type} setGenre={setGenre} />
      {lists.map((list) => (
        <List key={list._id} list={list} />
      ))}
    </div>
  );
};

export default Home;
