const bcrypt = require("bcrypt");
const db = require("../../Models");


module.exports = {
    createPost: async ({post}) => {
        try {

            const password = await bcrypt.hash(post.password, 12)
            const query = {
                title:post.title,
                content:post.content,
                author:post.author,
                password
            };

            const newPost = await db.Post.create(query);
            console.log(post)
            if(post.src){
                const newImage = await db.Image.create({
                    src:post.src
                });
                await newPost.addImage(newImage);
            }
            return db.Post.findOne({
                where:{
                    id:newPost.id
                },
                include:[{
                    model:db.Image,
                    attributes:['src']
                }],
                attributes:['id','author','title','content']
            })
            // { title: 'asd', content: 'asd', author: 'asd', password: 'asd' ,filename}
        } catch (error) {
            throw error;
        }
    },
    getPost: async () => {
        try {
            return await db.Post.findAll({
                order: [
                    ['id', 'DESC'],
                    // ['name', 'ASC'],
                ],
                attributes:['id','author','title','content'],
                include:[{
                    model:db.Image,
                    attributes:['src']
                }]
            })
        } catch (error) {
            throw error;
        }
    },
    deletePost: async (id) => {
        try {
            return await db.post.destroy({
                where: { id }
            })
        } catch (error) {
            throw error;
        }
    },
    check: async (password, id) => {
        const post = await db.post.findOne({
            where: {
                id
            }
        });
        console.log(post)
        return false;
    }
};