const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
  const allListings = await Listing.find({});
  res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  // // using isAuthenticate as middleware
  res.render("listings/new.ejs");
};

module.exports.showListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({
      path: "reviews",
      populate: {
        path: "author",
      },
    })
    .populate("owner");

  console.log(listing);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    res.redirect("/listings");
  } else {
    res.render("listings/show.ejs", { listing });
  }
};
module.exports.filter = async (req, res) => {
  let selected = req.query.selected;
  const allListings = await Listing.find({ category: selected });
  res.render("listings/index.ejs", { allListings, selected });
};

module.exports.createListing = async (req, res) => {
  // let {title, description, image, price, location, country} = req.body;
  //other better way (see name in new.ejs)
  // let listing = req.body; // this will return js object key as listing and values as values of form
  // let listing = req.body.listing; // this will return listing key object
  // console.log(listing);

  // try {
  //     const newListing = new Listing(req.body.listing); // directly creating instance for db
  //     await newListing.save();
  //     res.redirect("/listings");
  // } catch(err){
  //     next(err);
  // };
  // if(!req.body.listing){
  //     throw new ExpressError(400, "Send valid data for listing")
  // }
  let url = req.file.path;
  let filename = req.file.filename;
  // console.log(url, "  ", filename);
  const newListing = new Listing(req.body.listing); // directly creating instance for db
  // console.log(req.user);
  newListing.owner = req.user._id; // using sessions detail to add owner info
  newListing.image = { url, filename };
  // if(!newListing.description){
  //     throw new ExpressError(400, "description is missing")
  // }
  await newListing.save();
  req.flash("success", "Listing Added");
  res.redirect("/listings");
};

module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing you requested for does not exist!");
    return res.redirect("/listings");
  }
  let originalImageUrl = listing.image.url;
  originalImageUrl = originalImageUrl.replace("/upload", "/upload/w_250");
  res.render("listings/edit.ejs", { listing, originalImageUrl });
};

module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  // const update = req.body.listing;
  // if(!req.body.listing){
  //     throw new ExpressError(400, "Send valid data for listing")
  // }
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
    await listing.save();
  }

  req.flash("success", "Listing Updated");
  res.redirect(`/listings/${id}`);
};

module.exports.destroyListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  console.log(deletedListing);
  req.flash("success", "Listing Deleted");
  res.redirect("/listings");
};
