const createPostController = (req, res) => {
    res.render('./pages/createPost',{ title: 'Create Post' });
}

export {createPostController};