import { blogPosts } from './newPostController.js';

const homeController = (req, res) => {
    res.render('./pages/index',{ title: 'Code Dumper' , blogPosts: blogPosts});
}

export {homeController};