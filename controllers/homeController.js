import { blogPosts } from './newPostController.js';

const homeController = (req, res) => {
    res.render('./pages/index',{ title: 'Code Ditcher' , blogPosts: blogPosts});
}

export {homeController};