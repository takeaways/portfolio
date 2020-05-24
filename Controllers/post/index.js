const bcrypt = require("bcrypt");
const db = require("../../Models");

const postMessage = {
    notFoundPost: "Not Found Post.",
    invalidPassword: "Password Required.",
    notMatchedPassword: "Not Matched Password."
};

const _getPostById = async ({ postId }) => {
    return db.Post.findOne({
        where: {
            id: postId
        }
    })
};
const _getPosts = async () => {
    return db.Post.findAll({
        order: [
            ['id', 'DESC'],
            // ['name', 'ASC'],
        ],
        attributes: ['id', 'author', 'title', 'content'],
        include: [{
            model: db.Image,
            attributes: ['src']
        }]
    })
}
const _check = async ({ postId, password }) => {
    const post = await db.Post.findOne({
        where: {
            id: postId
        }
    });
    if (!post) {
        throw Error(postMessage.notFoundPost);
    }

    const jsonPost = post.toJSON();
    console.log(jsonPost)
    console.log(password)
    const match = await bcrypt.compareSync(password, jsonPost.password);
    return !!match;
};


module.exports = {

    getPost: async ({ postId }) => {
        try {
            if (postId) {
                return await _getPostById({ postId });
            }
            return await _getPosts();
        } catch (error) {
            throw error;
        }
    },
    deletePost: async ({ postId, password }) => {
        try {

            if (!password) {
                throw Error(postMessage.invalidPassword);
            }

            const match = await _check({ postId, password });
            if (!match) {
                throw Error(postMessage.notMatchedPassword)
            }

            return await db.Post.destroy({
                where: { id: postId }
            });
        } catch (error) {
            throw error;
        }
    },
    createPost: async ({ post }) => {
        try {

            const hashed = await bcrypt.hash(post.password, 12);
            const query = {
                title: post.title,
                content: post.content,
                author: post.author,
                password: hashed
            };

            const newPost = await db.Post.create(query);
            if (post.src) {
                const newImage = await db.Image.create({
                    src: post.src
                });
                await newPost.addImage(newImage);
            }
            return db.Post.findOne({
                where: {
                    id: newPost.id
                },
                include: [{
                    model: db.Image,
                    attributes: ['src']
                }],
                attributes: ['id', 'author', 'title', 'content']
            })
            // { title: 'asd', content: 'asd', author: 'asd', password: 'asd' ,filename}
        } catch (error) {
            throw error;
        }
    },
    updatePost: async ({ post, postId }) => {

        try {

            const match = await _check({ postId, password: post.password });

            if (!match) {
                throw Error(postMessage.notMatchedPassword);
            }

            const query = {
                title: post.title, content: post.content,
            };

            const existPost = await db.Post.findOne({
                where: {
                    id: postId
                },
                include: [{
                    model: db.Image
                }]
            });
            const jsonPost = existPost.toJSON();
            const imgId = jsonPost.Images[0].id;

            if (imgId) {
                if (post.src) {
                    console.log("imgID: ", imgId)
                    const updated = await db.Image.update({
                        src: post.src
                    }, {
                        where: {
                            id: imgId.toString()
                        }
                    });
                    console.log("updated :", updated)
                }
            } else {
                const newImg = await db.Image.create({
                    src: post.src
                });
                await post.addImage(newImg);
            }

            await db.Post.update(query, { where: { id: postId } });

            return db.Post.findOne({
                where: {
                    id: postId
                },
                include: [{
                    model: db.Image,
                    attributes: ['src']
                }],
                attributes: ['id', 'author', 'title', 'content']
            });
        } catch (error) {
            throw error;
        }
    },

};