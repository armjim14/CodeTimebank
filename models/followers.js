module.exports = function (sequelize, DataTypes) {
    var followers = sequelize.define("followers", {

        followerId: {
            type: DataTypes.INTEGER,
            defaultValue: () => {
                return 0;
            }
        }

    });

    followers.associate = function (models) {
        followers.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        })
    };

    return followers;

};