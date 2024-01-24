import "./productList.css";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { MovieContext } from "./../../context/movieContext/MovieContext";
import { deleteMovie, getMovies } from "./../../context/movieContext/apiCalls";

export default function ProductList() {
  const [data, setData] = useState(productRows);
  const { movies, dispatch } = useContext(MovieContext);

  useEffect(() => {
    getMovies(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteMovie(id, dispatch);
  };

  console.log(movies);

  const columns = [
    { field: "_id", headerName: "ID", width: 90 },
    {
      field: "movie",
      headerName: "Movie",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="productListitem">
            <img className="productListImg" src={params.row.img} alt="" />
            {params.row.title}
          </div>
        );
      },
    },
    { field: "genre", headerName: "Genre", width: 120 },
    { field: "year", headerName: "year", width: 120 },
    { field: "limit", headerName: "limit", width: 120 },
    { field: "isSeries", headerName: "isSeries", width: 120 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: `/product/${params.row._id}`, //{+ params.row._id},
                state: params.row,
              }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            {/* <Link to={`/product/${params.row._id}`}>
              <button className="productListEdit">Edit</button>
            </Link> */}
            <DeleteOutline
              className="productListDelete"
              onClick={
                () => handleDelete(params.row.id)
                // onClick={() =>
                //   (handleDelete = (id) => {
                //     // Call the deleteMovies function from your API calls file
                //     deleteMovies(id, dispatch);
                //   })
              }
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      {movies ? (
        <DataGrid
          rows={movies}
          disableSelectionOnClick
          columns={columns}
          pageSize={15}
          checkboxSelection
          getRowId={(r) => r._id}
        />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
