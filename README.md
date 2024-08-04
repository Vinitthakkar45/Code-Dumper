# Blog Application

This is a simple blog application built with Node.js, Express.js, and EJS. It allows users to create, update, and delete blog posts. The application uses the file system to store the blog post content.

## Features

- Create new blog posts
- Update existing blog posts
- Delete blog posts
- View individual blog posts

## Technologies Used

- Node.js
- Express.js
- EJS (Embedded JavaScript templating)
- Bootstrap (for styling)
- File System (for storing blog posts)

## Getting Started

### Prerequisites

- Node.js installed on your machine. You can download it from [here](https://nodejs.org/).

### Installation

1. Clone the repository

    ```sh
    git clone https://github.com/yourusername/blog-application.git
    cd blog-application
    ```

2. Install the dependencies

    ```sh
    npm install
    ```

### Running the Application

1. Start the server

    ```sh
    npm start
    ```

2. Open your browser and go to `http://localhost:3000`

## Usage

### Creating a New Post

1. Click on the "Create Post" link in the navigation bar.
2. Fill in the title and description of the post.
3. Click "Submit" to create the post.

### Updating a Post

1. Navigate to the home page.
2. Click on the "Update" button next to the post you want to update.
3. Fill in the new title and description.
4. Click "Submit" to update the post.

### Deleting a Post

1. Navigate to the home page.
2. Click on the "Delete" button next to the post you want to delete.

## File Structure

## File Structure

blog-application/
    controllers/
        homeController.js
        aboutController.js
        contactController.js
        createPostController.js
        newPostController.js
    public/
        css/
            styles.css
        js/
            script.js
    routes/
        web.js
    views/
        partials/
            header.ejs
            footer.ejs
        posts/
            (generated post files)
        about.ejs
        contact.ejs
        createPost.ejs
        index.ejs
        newPost.ejs
    .gitignore
    package.json
    README.md
    server.js


## Contributing

If you want to contribute to this project, feel free to fork the repository and submit a pull request. Please make sure to follow the code style and include appropriate tests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Express](https://expressjs.com/)
- [EJS](https://ejs.co/)
- [Bootstrap](https://getbootstrap.com/)
