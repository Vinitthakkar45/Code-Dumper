import { blogPosts } from './newPostController.js';

const homeController = (req, res) => {
    res.render('./pages/index',{ title: 'Home Page' , blogPosts: blogPosts});
}

export {homeController};