import slugify from "slugify";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let id = 0;
let blogPosts = [];

const newPostController = (req, res) => {
    id++;
    const { title, description } = req.body;
    const slug = slugify(title, { lower: true });
    const newPostPath = path.join(__dirname, '../views/posts', `${slug + id}.ejs`);

    blogPosts.push({ id: id, title: title, slug: slug });

    const postContent = `
        <%- include('../partials/header', { title: "${title}" }) %>
        <h1 class="new-post-title">${title}</h1>
        <p class="new-post-desc">${description}</p>
        <%- include('../partials/footer') %>
    `;

    fs.writeFile(newPostPath, postContent, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Internal Server Error');
        } else {
            res.redirect(`./posts/${slug + id}`);
        }
    });
};

const newPostgetController = (req, res) => {
    const postSlug = req.params.postSlug;
    res.render(`posts/${postSlug}`);
};

const deleteController = (req, res) => {
    const postId = parseInt(req.body.postId, 10);
    const postTitle = req.body.postTitle;

    console.log(`Received postId: ${req.body.postId}, parsed postId: ${postId}, postTitle: ${postTitle}`);

    const post = blogPosts.find(post => post.id === postId);

    if (post) {
        const filePath = path.join(__dirname, '../views/posts', `${postTitle + postId}.ejs`);

        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete file: ${filePath}`, err);
            } else {
                console.log(`Successfully deleted file: ${filePath}`);
            }

            blogPosts = blogPosts.filter(post => post.id !== postId);

            res.redirect('/');
        });
    } else {
        console.log('Post not found');
        res.status(404).send('Post not found');
    }
};

const updateController = (req, res) => {
    const postId = parseInt(req.body.postId, 10);
    const postTitle = req.body.postTitle;
    const { newTitle, newDescription } = req.body;

    if (typeof newTitle !== 'string' || newTitle.trim() === '') {
        return res.status(400).send('Invalid title');
    }

    const oldPostSlug = postTitle.replace(/\s/g, "-");
    const newPostSlug = slugify(newTitle, { lower: true });

    console.log(`Updating postId: ${postId}, oldTitle: ${postTitle}, newTitle: ${newTitle}`);

    const postIndex = blogPosts.findIndex(post => post.id === postId);

    if (postIndex !== -1) {
        const oldFilePath = path.join(__dirname, '../views/posts', `${oldPostSlug + postId}.ejs`);
        const newFilePath = path.join(__dirname, '../views/posts', `${newPostSlug + postId}.ejs`);

        const updatedContent = `
            <%- include('../partials/header', { title: "${newTitle}" }) %>
            <h1 class="new-post-title">${newTitle}</h1>
            <p class="new-post-desc">${newDescription}</p>
            <%- include('../partials/footer') %>
        `;

        fs.unlink(oldFilePath, (err) => {
            if (err) {
                console.error(`Failed to delete old file: ${oldFilePath}`, err);
                res.status(500).send('Internal Server Error');
                return;
            }

            fs.writeFile(newFilePath, updatedContent, (err) => {
                if (err) {
                    console.error(err);
                    res.status(500).send('Internal Server Error');
                } else {
                    blogPosts[postIndex] = { id: postId, title: newTitle, slug: newPostSlug };
                    res.redirect(`./posts/${newPostSlug + postId}`);
                }
            });
        });
    } else {
        res.status(404).send('Post not found');
    }
};

export { newPostController, newPostgetController, deleteController, updateController, blogPosts };
