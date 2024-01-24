import { InfoOutlined, PlayArrow } from "@material-ui/icons";
import "./featured.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

export default function Featured({ type, setGenre }) {
  const [content, setContent] = useState({});
  const [movie, setMovie] = useState({});

  useEffect(() => {
    const getRandomContent = async () => {
      try {
        const res = await axios.get(`/movies/random?type=${type}/`, {
          headers: {
            token:
              "Bearer " + JSON.parse(localStorage.getItem("user")).accessToken,
          },
        });
        setContent(res.data[0]);
      } catch (error) {
        console.log(error);
      }
    };
    getRandomContent();
  }, [type]);
  // console.log(content);
  return (
    <div className="featured">
      {type && (
        <div className="category">
          <span>{type === "movies" ? "Movies" : "Series"}</span>
          <select
            name="genre"
            id="genre"
            onChange={(e) => setGenre(e.target.value)}
          >
            <option>Genre</option>
            <option value="adventure">adventure</option>
            <option value="comedy">comedy</option>
            <option value="crime">crime</option>
            <option value="fantasy">fantasy</option>
            <option value="historical">historical</option>
            <option value="horror">horror</option>
            <option value="romance">romance</option>
            <option value="sci-fi">sci-fi</option>
            <option value="thriller">thriller</option>
            <option value="western">western</option>
            <option value="drama">drama</option>
            <option value="documentary">documentary</option>
          </select>
        </div>
      )}
      <img src={content.img} alt="" />

      <div className="info">
        <img src={content.imgTitle} alt="" />

        <span className="desc">{content.desc}</span>
        <div className="buttons">
          <Link to="/watch" state={{ movie: content }}>
            <button className="play">
              <PlayArrow />
              <span>Play</span>
            </button>
          </Link>
          <button className="more">
            <InfoOutlined />
            <span>Info</span>
          </button>
        </div>
      </div>
    </div>
  );
}
