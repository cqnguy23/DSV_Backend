import Review from "../models/Review.model.js";

const reviewController = {};

reviewController.postReview = async (req, res, next) => {
  try {
    const { title, content, rating } = req.body;
    const userId = req.userId;
    const productId = req.params.id;
    const review = await Review.create({
      owner: productId,
      user: userId,
      title,
      content,
      rating: parseFloat(rating),
    });
    return res.status(200).send(review);
  } catch (err) {
    console.log(err);
  }
};

export default reviewController;
