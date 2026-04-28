# Wanderlust

An Airbnb-inspired web application where users can explore listings, create their own stays, and share reviews. Built with a full-stack JavaScript architecture using Node.js and MongoDB.

# Live Demo

🔗 https://your-render-url.onrender.com

# Features

- User Authentication (Login/Register)
- Create, Edit & Delete Listings
- Add & Manage Reviews
- Image Upload using Cloudinary
- Centralized Error Handling
- MVC Architecture
- Responsive UI with EJS templates

# Tech Stack

#### Backend

- Node.js
- Express.js
  ####Frontend
- EJS (Embedded JavaScript Templates)
- CSS
- Vanilla JavaScript

#### Database

- MongoDB with Mongoose

#### Authentication

- Passport.js
- passport-local
- passport-local-mongoose

#### Cloud Services

- Cloudinary (for image storage)

#### Other Tools

- dotenv (environment variables)
- Joi (schema validation)
- Custom middleware

# Project Structure

├── controllers/ # Route logic (listings, users, reviews) <br>
├── init/ # Initial DB setup / seed data <br>
├── models/ # Mongoose models <br>
├── public/ <br>
│ ├── css/ # Stylesheets <br>
│ └── js/ # Client-side JS <br>
├── routes/ <br>
│ ├── listing.js # Listing routes <br>
│ ├── review.js # Review routes <br>
│ └── user.js # User routes <br>
├── utils/ <br>
│ ├── ExpressError.js # Custom error class <br>
│ └── wrapAsync.js # Async error handler <br>
├── views/ <br>
│ ├── includes/ # Partials (header, footer) <br>
│ ├── layouts/ # Layout templates <br>
│ ├── listings/ # Listing pages <br>
│ ├── users/ # User pages <br>
│ └── error.ejs # Error page <br>
├── .env # Environment variables <br>
├── app.js # Main server file <br>
├── cloudConfig.js # Cloudinary configuration <br>
├── middleware.js # Custom middleware <br>
├── schema.js # Joi validation schemas <br>
├── package.json # Dependencies & scripts

# Installation & Setup

1. Clone the repository
   git clone https://github.com/your-username/wanderlust.git <br>
   cd wanderlust
2. Install dependencies
   npm install
3. Create a .env file
   CLOUD_NAME= <br>
   CLOUD_API_KEY= <br>
   CLOUD_API_SECRET= <br>
   ATLASDB_URL= <br>
   SECRET= <br>
4. Run the application
   node app.js (or npx nodemon app.js)

# Key Concepts Used

- MVC Architecture
- RESTful Routing
- Middleware & Custom Error Handling
- Authentication with Passport
- Server-Side Rendering (EJS)
- Image Upload & Cloud Storage
- Data Validation with Joi

# Error Handling

- Custom error class: ExpressError
- Async wrapper: wrapAsync
- Centralized error middleware
- User-friendly error page (error.ejs)

# Deployment

- Hosted on Render
- Environment variables securely configured
- Cloudinary integrated for media storage

# Future Improvements

- Wishlist / Favorites feature
- Advanced search & filters
- Messaging between users
- Admin dashboard
- Map integration (Mapbox / Google Maps)

# Author

Satyam Poddar
