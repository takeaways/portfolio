module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define(
        'Post',
        {
            title: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: false
            },
            author: {
                type: DataTypes.STRING(10),
                allowNull: false
            },
            tag: {
                type: DataTypes.String(20),
                allowNull: false
            },
            password: {
                type: DataTypes.STRING(20),
                allowNull: false
            }
        },
        {
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci'
        }
    );

    Post.associate = db => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Image)
    };

    return Post;
};
