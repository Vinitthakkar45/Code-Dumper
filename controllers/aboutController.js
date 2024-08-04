const aboutController = (req, res) => {
    res.render('./pages/about',{ title: 'About' });
}

export {aboutController};