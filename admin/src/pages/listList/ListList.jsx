import "./listList.css";
import { DeleteOutline } from "@material-ui/icons";
import { DataGrid } from "@material-ui/data-grid";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ListContext } from "../../context/listContext/ListContext";
import { deleteList, getLists } from "./../../context/listContext/apiCalls";

export default function ListList() {
  const [data, setData] = useState(productRows);
  const { lists, dispatch } = useContext(ListContext);

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (id) => {
    deleteList(id, dispatch);
  };

  console.log(lists);

  const columns = [
    { field: "_id", headerName: "ID", width: 250 },
    { field: "title", headerName: "title", width: 250 },
    { field: "genre", headerName: "Genre", width: 150 },
    { field: "type", headerName: "type", width: 150 },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link
              to={{
                pathname: `https://netflix-clone-ces1.onrender.com/api/list/${params.row._id}`,
                state: params.row,
              }}
            >
              <button className="productListEdit">Edit</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row._id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="productList">
      {lists ? (
        <DataGrid
          rows={lists}
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
