# Blog API

The **Blog API** is a **RESTful API** that allows users to register, log in, share, update, and delete blog posts. Users can also comment on, like, and view blogs in specific categories. This API provides basic functionality for blog management, offering a flexible and powerful infrastructure that developers can integrate into their applications.

## 🚀 Features

- **Registration**: Users can register on the application.
- **Login**: Registered users can log in.
- **Blog Posting**: Users can create new blog posts.
- **Blog Updating**: Users can update their existing blogs.
- **Blog Deleting**: Users can delete their blogs.
- **User Information Update**: Users can update their account information.
- **Like System**: Users can like other blogs.
- **Commenting**: Users can add comments to blogs.
- **Viewing by Categories**: Blogs can be listed by specific categories.
- **Search Function**: Users can search for blogs using specific keywords.

## 🛠 Technologies Used

- **Node.js** - Server-side development
- **Express.js** - API creation
- **MongoDB & Mongoose** - Database management
- **Swagger** - API documentation
- **dotenv** - Environment variable management
- **CORS** - Secure request handling
- **request-ip** - To obtain and manage user IP addresses

## 📂 API Endpoints (Routes)

| Endpoint      | Description               |
| ------------- | ------------------------- |
| `/auth`       | Authentication operations |
| `/users`      | User management           |
| `/categories` | Blog category management  |
| `/blogs`      | Blog operations           |
| `/comments`   | Blog comments             |
| `/documents`  | Document management       |
