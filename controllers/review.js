const Listing = require("../models/listing.js");
const Review = require("../models/reviews.js");

module.exports.createreview = async (req, res) => {
  let { id } = req.params;
  console.log(id);
  let listing = await Listing.findById(id);
  let newReview = new Review(req.body.review);
  newReview.author = req.user._id; // asigning reviews auther
  console.log(newReview);
  listing.reviews.push(newReview);

  await newReview.save();
  await listing.save();
  // console.log("review added");
  // res.send("review added");
  req.flash("success", "New Review added");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyReview = async (req, res) => {
  let { id, reviewId } = req.params;
  await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
  await Review.findByIdAndDelete(reviewId);
  req.flash("success", "Review Deleted");
  res.redirect(`/listings/${id}`);
};
