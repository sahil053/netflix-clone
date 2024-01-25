import "./newList.css";
import { useEffect, useState, useContext } from "react";
import { storage, ref, uploadBytesResumable } from "../../firebase";
import { getDownloadURL } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "../../context/movieContext/MovieContext";
import { ListContext } from "../../context/listContext/ListContext";
import { getMovies } from "../../context/movieContext/apiCalls";
import { createListStart } from "../../context/listContext/ListActions";
import { createList } from "../../context/listContext/apiCalls";
import { useNavigate } from "react-router-dom";

export default function NewList() {
  const [list, setList] = useState(null);
  console.log("Rendering NewList:", list);
  const { dispatch } = useContext(ListContext);
  const { movies, dispatch: dispatchMovie } = useContext(MovieContext);
  const history = useNavigate();

  useEffect(() => {
    getMovies(dispatchMovie);
  }, [dispatchMovie]);

  const handleChange = (e) => {
    const value = e.target.value;
    setList({ ...list, [e.target.name]: value });
  };

  const handleSelect = (e) => {
    let value = Array.from(e.target.selectedOptions, (option) => option.value);
    setList({ ...list, [e.target.name]: value });
  };

  console.log(list);

  const handleSubmit = async (e) => {
    e.preventDefault();
    createList(list, dispatch);
    history("https://netflix-clone-ces1.onrender.com/api/lists");
  };

  return (
    <div className="newProduct">
      <div className="newProduct">
        <h1 className="newProductTitle">New List</h1>
        <form action="" className="newProductForm">
          <div className="formLeft">
            <div className="newProductItem">
              <label>Title</label>
              <input
                type="text"
                placeholder="Popular movies"
                name="title"
                onChange={handleChange}
              />
            </div>
            <div className="newProductItem">
              <label>Genre</label>
              <input
                type="text"
                placeholder="action"
                name="genre"
                onChange={handleChange}
              />
            </div>
            <div className="newProductItem">
              <label>Type</label>
              <select name="type" onChange={handleChange}>
                <option>Type</option>
                <option value="movie">Movie</option>
                <option value="series"> Series</option>
              </select>
            </div>
          </div>
          <div className="formRight">
            <div className="newProductItem">
              <label>Content</label>
              <select
                multiple
                name="content"
                onChange={handleSelect}
                style={{ height: "300px" }}
              >
                {movies.map((movie) => (
                  <option key={movie._id} value={movie._id}>
                    {movie.title}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button className="newProductButton" onClick={handleSubmit}>
            Create
          </button>
        </form>
      </div>
    </div>
  );
}
