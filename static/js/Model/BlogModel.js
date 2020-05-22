
new Vue({
    el: '#blog',
    data: {
        title: '',
        content: '',
        author: '',
        password: '',
        deletePassword: '',
        posts: []
    },
    created() {
        //instance 생성시 실행된다.
        (async () => {
            await this.getPost();
        })();

    },
    methods: {
        onSubmit(e) {
            if (!this.title || !this.content || !this.author || !this.password) {
                return alert("입력값을 확인해주세요.")
            }

            const data = {
                title: this.title,
                content: this.content,
                author: this.author,
                password: this.password
            }

            this.create(data)
            this.reset()
        },
        reset() {
            this.title = ""
            this.content = ""
            this.author = ""
            this.password = ""
        },
        async create(data) {
            const res = await axios.post("/post", data, {});
            this.posts.unshift(res.data)
        },
        async getPost() {
            const res = await axios.get("/post", {});
            res.data.forEach(p => {
                this.posts.push(p)
            })

        },
        async deletePost(id) {
            const res = await axios.put(`/post/${id}`, {
                password: this.deletePassword
            });
            const result = res.data;
            if (result.deleted) {
                const index = this.posts.findIndex(p => p.id === parseInt(result.deleted, 10));

                this.posts.splice(index, 1)
            }
        },


    },
})