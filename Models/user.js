module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: {
                type: DataTypes.STRING(20),
                allowNull: false
            },
            email: {
                type: DataTypes.STRING(20),
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false
            }
        },
        {
            charset: 'utf8',
            collate: 'utf8_general_ci'
        }
    );

    User.associate = db => {
        db.User.hasMany(db.Post);
        return User;
    };

    return User

}