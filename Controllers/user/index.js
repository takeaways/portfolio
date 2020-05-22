const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken");

const db = require("../../Models");

const _checkExistMember = async (email) => {
    return await db.user.findOne({
        where: {
            email,
        }
    })
}

const login = async ({ query }) => {
    try {
        const exist = await db.user.findOne({
            where: {
                email: query.email
            }
        });

        if (!exist) {
            throw Error("None Exist Member.")
        }

        const match = await bcrypt.compareSync(query.password, exist.password);

        if (!match) {
            throw Error("Not Matched Password")
        }

        const jsoned = exist.toJSON();

        delete jsoned.password

        const accessToken = jwt.sign({
            id: jsoned.id,
            name: jsoned.name,
            email: jsoned.email
        }, 'jwt_private_key', { expiresIn: "24h" })

        return {
            accessToken,
            jsoned
        }
    } catch (error) {
        throw error;
    }
}

const postUser = async ({ user }) => {
    try {

        const email = user.email;
        const password = await bcrypt.hash(user.password, 12);
        const name = user.name;

        const check = await _checkExistMember(email);
        if (check) {
            throw Error("Aready Exist Member's Email.");
        }

        const newUser = await db.user.create({
            email,
            password,
            name
        })

        const jsoned = newUser.toJSON();

        delete jsoned.password;

        return jsoned;

    } catch (error) {
        throw error;
    }
}







module.exports = {
    login: login,
    postUser: postUser,
}