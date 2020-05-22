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
    limits: { fileSize: 20 * 1024 * 1024 }
});

const postController = require("../../Controllers/post");

const router = express.Router();


router.post("/", upload.single('file'), async (req, res, next) => {

    const data = req.body;
    const file = req.file;

    const post = {
        ...data
    };

    if(file && file.filename){
        post.src = file.filename
    }

    const result = await postController.createPost({post});
    return res.json(result);

});

router.get("/", async (req, res, next) => {
    const result = await postController.getPost();
    return res.json(result);
});

router.put("/:postId", upload.single('file'), async (req, res, next) => {
    const password = req.body.password;
    const check = await postController.check(password, req.params.postId);

    if (!result) {
        res.json({
            message: "hmmm"
        })
    }

    return res.json({
        deleted: req.params.postId
    })
});

router.delete("/:postId", async (req, res, next) => {
    const postId = req.params.postId;
    const password = req.params.password

    const check = await postController.check(password, req.params.postId);
    const result = await postController.deletePost(req.params.postId)

})


module.exports = router;