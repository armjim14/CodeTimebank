module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("Users", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [2, 70]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    github: {
      type: DataTypes.STRING,
      allowNull: false
    },
    discord: {
      type: DataTypes.STRING,
      allowNull: false
    },
    skype: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  return User;
};
