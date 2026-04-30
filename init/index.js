const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("/Users/ASUS/OneDrive/Desktop/Wanderlust MP/models/listing.js");

const MONGO_URL = process.env.ATLASDB_URL;

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "69ee19890357d273ad897989",
    category: "Rooms",
  }));
  await Listing.insertMany(initData.data);
  console.log("data was initialized");
};

initDB();
