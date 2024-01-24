import "./newProduct.css";
import { useEffect, useState, useContext } from "react";
import { storage, ref, uploadBytesResumable } from "../../firebase";
import { getDownloadURL } from "firebase/storage";
import { createMovie } from "../../context/movieContext/apiCalls";
import { MovieContext } from "./../../context/movieContext/MovieContext";

export default function NewProduct() {
  const [movie, setMovie] = useState(null);
  const [img, setImg] = useState(null);
  const [imgTitle, setImgTitle] = useState(null);
  const [imgSm, setImgSm] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [video, setVideo] = useState(null);
  const [uploaded, setUploaded] = useState(0);

  const { dispatch } = useContext(MovieContext);

  const handleChange = (e) => {
    const value = e.target.value;
    setMovie({ ...movie, [e.target.name]: value });
  };

  const upload = async (items) => {
    const uploadedFiles = [];

    // Use Promise.all to wait for all uploads to complete
    await Promise.all(
      items.map(async (item) => {
        const timestamp = new Date().getTime();
        const uniqueFileName = `${timestamp}_${item.file.name}`;
        const storageRef = ref(storage, `/items/${uniqueFileName}`);
        const uploadTask = uploadBytesResumable(storageRef, item.file);

        try {
          await uploadTask;

          // Get the download URL after successful upload
          const downloadURL = await getDownloadURL(storageRef);

          // Add information to the uploadedFiles array
          uploadedFiles.push({
            label: item.label,
            downloadURL: downloadURL,
          });
        } catch (error) {
          console.error("Error during file upload:", error);
          // Handle the error as needed
        }
      })
    );

    return uploadedFiles;
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const uploadedFiles = await upload([
        { file: img, label: "img" },
        { file: imgTitle, label: "imgTitle" },
        { file: imgSm, label: "imgSm" },
        { file: trailer, label: "trailer" },
        { file: video, label: "video" },
      ]);

      uploadedFiles.forEach((file, index) => {
        const label = file.label;
        const downloadURL = file.downloadURL;

        setMovie((prev) => ({
          ...prev,
          [label]: downloadURL,
        }));
      });

      // After all files are successfully uploaded
      // Call createMovie function
      createMovie(movie, dispatch);
    } catch (error) {
      console.error("Error during file upload:", error);
      // Handle the error as needed
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Ensure all files are uploaded before creating the movie
    if (uploaded === 5) {
      createMovie(movie, dispatch);
    } else {
      // Handle not all files uploaded scenario
      console.error("Not all files uploaded.");
    }
  };

  return (
    <div className="newProduct">
      <div className="newProduct">
        <h1 className="newProductTitle">New Movie</h1>
        <form action="" className="newProductForm">
          <div className="newProductItem">
            <label>Image</label>
            <input
              type="file"
              id="img"
              name="img"
              onChange={(e) => setImg(e.target.files[0])}
            />
          </div>
          <div className="newProductItem">
            <label>Title Image</label>
            <input
              type="file"
              id="imgTitle"
              name="imgTitle"
              onChange={(e) => setImgTitle(e.target.files[0])}
            />
          </div>
          <div className="newProductItem">
            <label>Thumbnail Image</label>
            <input
              type="file"
              id="imgSm"
              name="imgSm"
              onChange={(e) => setImgSm(e.target.files[0])}
            />
          </div>
          <div className="newProductItem">
            <label>Title</label>
            <input
              type="text"
              placeholder="John Wick"
              name="title"
              onChange={handleChange}
            />
          </div>
          <div className="newProductItem">
            <label>Description</label>
            <input
              type="text"
              placeholder="description"
              name="desc"
              onChange={handleChange}
            />
          </div>
          <div className="newProductItem">
            <label>Year</label>
            <input
              type="text"
              placeholder="Year"
              name="year"
              onChange={handleChange}
            />
          </div>
          <div className="newProductItem">
            <label>Genre</label>
            <input
              type="text"
              placeholder="Genre"
              name="genre"
              onChange={handleChange}
            />
          </div>
          <div className="newProductItem">
            <label>Duration</label>
            <input
              type="text"
              placeholder="Duration"
              name="duration"
              onChange={handleChange}
            />
          </div>
          <div className="newProductItem">
            <label>Limit</label>
            <input
              type="text"
              placeholder="limit"
              name="limit"
              onChange={handleChange}
            />
          </div>
          <div className="newProductItem">
            <label>Is Series?</label>
            <select
              className="newProductSelect"
              name="isSeries"
              id="isSeries"
              onChange={handleChange}
            >
              <option value="yes">No</option>
              <option value="no">Yes</option>
            </select>
          </div>
          <div className="newProductItem">
            <label>Trailer</label>
            <input
              type="file"
              name="trailer"
              onChange={(e) => setTrailer(e.target.files[0])}
            />
          </div>
          <div className="newProductItem">
            <label>Video</label>
            <input
              type="file"
              name="video"
              onChange={(e) => setVideo(e.target.files[0])}
            />
          </div>
          {uploaded === 5 ? (
            <button className="newProductButton" onClick={handleSubmit}>
              Create
            </button>
          ) : (
            <button className="newProductButton" onClick={handleUpload}>
              Upload
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
