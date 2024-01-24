const router = require("express").Router();
const Movie = require("../models/Movie");
const verify = require("../verifyToken");

//CREATE

router.post("/", verify, async (req, res) => {
  if (req.user.isAdmin) {
    const newMovie = new Movie(req.body);
    try {
      const savedMovie = await newMovie.save();
      res.status(201).json(savedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you are not allowed!");
  }
});

//UPDATE

router.put("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      const updatedMovie = await Movie.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );

      res.status(200).json(updatedMovie);
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you are not allowed!");
  }
});

//DELETE

router.delete("/:id", verify, async (req, res) => {
  if (req.user.isAdmin) {
    try {
      await Movie.findByIdAndDelete(req.params.id);
      res.status(200).json("the movie has been deleted");
    } catch (error) {
      res.status(500).json(error);
    }
  } else {
    res.status(403).json("you are not allowed!");
  }
});

// //GET

// router.get("/find/:id", verify, async (req, res) => {
//   try {
//     const movie = await Movie.findById(req.params.id);
//     res.status(200).json(movie);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// });

//GET

router.get("/find/:id", verify, async (req, res) => {
  try {
    const movie = await Movie.findById(req.params.id);
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json(error);
  }
});

//GET RANDOM

router.get("/random", verify, async (req, res) => {
  const type = req.query.type;
  try {
    let matchStage;
    if (type === "series") {
      matchStage = { $match: { isSeries: true } };
    } else {
      matchStage = { $match: { isSeries: false } };
    }

    const movie = await Movie.aggregate([matchStage, { $sample: { size: 1 } }]);

    if (movie.length === 0) {
      res
        .status(404)
        .json({ message: "No movies found based on the criteria." });
    } else {
      res.status(200).json(movie);
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

//GET ALL

router.get("/", verify, async (req, res) => {
  const typeQuery = req.query.type;
  const genreQuery = req.query.genre;
  let pipeline = [];

  // Match stage to filter based on type and genre
  if (typeQuery) {
    pipeline.push({ $match: { type: typeQuery } });
  }
  if (genreQuery) {
    pipeline.push({ $match: { genre: genreQuery } });
  }

  // Add the $sample stage to randomly select documents
  pipeline.push({ $sample: { size: 30 } });

  try {
    // Use the aggregate function with the pipeline
    const list = await Movie.aggregate(pipeline);

    res.status(200).json(list);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
