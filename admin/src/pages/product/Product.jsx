import "./product.css";
import { Link, useLocation, useParams } from "react-router-dom";

import { Publish } from "@material-ui/icons";

export default function Product() {
  const { id } = useParams();
  // const movieId = window.location.pathname.split("/").pop();
  const location = useLocation();
  console.log("Entire location state:", location.state);
  const movie = location.state;

  console.log("Received data:", movie);

  console.log("Final Movie State:", movie);
  if (!movie) {
    // Handle the case where movie is undefined
    return <p>Loading...</p>;
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Movie</h1>
        <Link to="/newProduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={movie.img} alt="" className="productInfoImg" />
            <span className="productName">{movie.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productsInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">{movie._id}</span>
            </div>
            <div className="productsInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{movie.genre}</span>
            </div>
            <div className="productsInfoItem">
              <span className="productInfoKey">Year:</span>
              <span className="productInfoValue">{movie.year}</span>
            </div>
            <div className="productsInfoItem">
              <span className="productInfoKey">limit:</span>
              <span className="productInfoValue">{movie.limit}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Movie Title</label>
            <input type="text" placeholder={movie.title} />
            <label>Year</label>
            <input type="text" placeholder={movie.year} />
            <label>Genre</label>
            <input type="text" placeholder={movie.genre} />
            <label>Limit</label>
            <input type="file" placeholder={movie.trailer} />
            <label>Trailer</label>
            <input type="file" placeholder={movie.video} />
            <label>Video</label>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={movie.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
