new Vue({
    el: "#login",
    data: {
        password: '',
        email: ''
    },
    created() {

    },
    methods: {
        async onLogin(e) {
            const email = this.email;
            const password = this.password;
            const query = {
                email,
                password
            }
            const user = await this.login({ query });
            console.log(user)
            if (user.accessToken) {
                document.cookie = `mayb=${user.accessToken}`
            }
        },
        async login({ query }) {
            try {
                const res = await axios.post("/user/login", query, {});
                return res.data.data
            } catch (error) {
                console.log(error)
            }
        },
        async setToken(token) {
            setCookie("mayb", token, {});
        }
    },
})