const express = require("express");
const multer = require("multer");
const path = require('path');

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'Uploads');
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            const basename = path.basename(file.originalname, ext);
            cb(null, basename + new Date().valueOf() + ext);
        }
    }),
    limits: {fileSize: 20 * 1024 * 1024}
});

const postController = require("../../Controllers/post");

const router = express.Router();


router.post("/", upload.single('file'), async (req, res, next) => {
    try {

        const data = req.body;
        const file = req.file;

        const post = {
            ...data
        };

        if (file && file.filename) {
            post.src = file.filename
        }

        const result = await postController.createPost({post});
        return res.jsend.success(result);

    } catch (e) {
        res.jsend.error({
            message: e.message
        });
    }
});

//query postId
router.get("/", async (req, res, next) => {
    try {

        const postId = req.query.postId;
        const result = await postController.getPost({postId});
        return res.jsend.success(result);

    } catch (e) {
        res.jsend.error({
            message: e.message
        });
    }
});

router.put("/", upload.single('file'), async (req, res, next) => {

    try {


        const data = req.body;
        const file = req.file;
        const postId= req.query.postId;


        const post = {
            ...data
        };

        if (file && file.filename) {
            post.src = file.filename
        }


        const result = await postController.updatePost({post:post,postId});
        return res.jsend.success(result);

    } catch (e) {
        res.jsend.error({
            message: e.message
        });
    }
});

router.delete("/:postId", async (req, res, next) => {
    const postId = req.params.postId;
    const password = req.params.password

    const check = await postController.check(password, req.params.postId);
    const result = await postController.deletePost(req.params.postId)

})


module.exports = router;