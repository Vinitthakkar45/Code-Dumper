import slugify from "slugify";
import path from "path";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import escapeHtml from 'escape-html';

const maxSlugLength = 30;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let id = 0;
let blogPosts = [];

const newPostController = async (req, res) => {
    try {
        id++;
        let { title, description } = req.body;
        title = title.trim();
        const slug = slugify(title, { lower: true, strict: true }).slice(0, maxSlugLength);
        const newPostPath = path.join(__dirname, '../views/posts', `${slug + id}.ejs`);

        blogPosts.push({ id: id, title: title, slug: slug });

        const postContent = `
            <%- include('../partials/header', { title: "${escapeHtml(title)}" }) %>
            <div class="blog-container">
                <h1 class="new-post-title">${title}</h1>
                <div class="new-post-desc">
                    <pre>${escapeHtml(description)}</pre>
                </div>
            </div>
            <%- include('../partials/footer') %>
        `;

        await fs.writeFile(newPostPath, postContent);
        res.redirect(`./posts/${slug + id}`);
    } catch (err) {
        console.error(err);
        res.status(500).send('Internal Server Error');
    }
};

const newPostgetController = (req, res) => {
    console.log(req.params);
    const postSlug = req.params.postSlug;
    res.render(`posts/${postSlug}`);
};

const deleteController = async (req, res) => {
    try {
        const postId = parseInt(req.body.postId, 10);
        const postTitle = req.body.postTitle;

        console.log(`Received postId: ${req.body.postId}, parsed postId: ${postId}, postTitle: ${postTitle}`);

        const post = blogPosts.find(post => post.id === postId);

        if (post) {
            const postSlug = slugify(postTitle, { lower: true, strict: true }).slice(0, maxSlugLength);
            const filePath = path.join(__dirname, '../views/posts', `${postSlug + postId}.ejs`);

            await fs.unlink(filePath);
            console.log(`Successfully deleted file: ${filePath}`);

            blogPosts = blogPosts.filter(post => post.id !== postId);
            res.redirect('/');
        } else {
            console.log('Post not found');
            res.status(404).send('Post not found');
        }
    } catch (err) {
        console.error(`Failed to delete file: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
};

const updateController = async (req, res) => {
    try {
        const postId = parseInt(req.body.postId, 10);
        const postTitle = req.body.postTitle;
        let { newTitle, newDescription } = req.body;
        newTitle = newTitle.trim();

        if (typeof newTitle !== 'string' || newTitle === '') {
            return res.status(400).send('Invalid title');
        }

        const oldPostSlug = slugify(postTitle, { lower: true, strict: true }).slice(0, maxSlugLength);
        const newPostSlug = slugify(newTitle, { lower: true, strict: true }).slice(0, maxSlugLength);

        console.log(`Updating postId: ${postId}, oldTitle: ${postTitle}, newTitle: ${newTitle}`);

        const postIndex = blogPosts.findIndex(post => post.id === postId);

        if (postIndex !== -1) {
            const oldFilePath = path.join(__dirname, '../views/posts', `${oldPostSlug + postId}.ejs`);
            const newFilePath = path.join(__dirname, '../views/posts', `${newPostSlug + postId}.ejs`);

            const updatedContent = `
                <%- include('../partials/header', { title: "${escapeHtml(newTitle)}" }) %>
                <div class="blog-container">
                    <h1 class="new-post-title">${newTitle}</h1>
                    <div class="new-post-desc">
                        <pre>${escapeHtml(newDescription)}</pre>
                    </div>
                </div>
                <%- include('../partials/footer') %>
            `;

            await fs.unlink(oldFilePath);
            await fs.writeFile(newFilePath, updatedContent);
            blogPosts[postIndex] = { id: postId, title: newTitle, slug: newPostSlug };
            res.redirect(`/posts/${newPostSlug + postId}`);
        } else {
            res.status(404).send('Post not found');
        }
    } catch (err) {
        console.error(`Failed to process file: ${err.message}`);
        res.status(500).send('Internal Server Error');
    }
};

export { newPostController, newPostgetController, deleteController, updateController, blogPosts };
