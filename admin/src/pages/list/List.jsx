import "./list.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { Publish } from "@material-ui/icons";

export default function List() {
  const { id } = useParams();
  const location = useLocation();
  console.log("Entire location state:", location.state);
  const list = location.state.list;

  console.log("Received data:", list);

  console.log("Final Movie State:", list);
  if (!list) {
    // Handle the case where movie is undefined
    return <p>Loading...</p>;
  }

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">List</h1>
        <Link to="/newList">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{list.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productsInfoItem">
              <span className="productInfoKey">Id:</span>
              <span className="productInfoValue">{list._id}</span>
            </div>
            <div className="productsInfoItem">
              <span className="productInfoKey">Genre:</span>
              <span className="productInfoValue">{list.genre}</span>
            </div>
            <div className="productsInfoItem">
              <span className="productInfoKey">Type:</span>
              <span className="productInfoValue">{list.type}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>List Title</label>
            <input type="text" defaultValue={list.title} />
            <label>Type</label>
            <input type="text" defaultValue={list.type} />
            <label>Genre</label>
            <input type="text" defaultValue={list.genre} />
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={list.img} alt="" className="productUploadImg" />
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
