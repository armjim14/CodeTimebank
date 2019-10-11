module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define("Users", {
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
    },
    hirable: {
      type: DataTypes.STRING,
      allowNull: false
    },
    securityQuestion: {
      type: DataTypes.STRING,
      allowNull: false
    },
    securityAnswer: {
      type: DataTypes.STRING,
      allowNull: false
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  });

  Users.associate = function(models) {
    Users.hasMany(models.questions, {
      onDelete: "cascade"
    });
    Users.hasMany(models.time, {
      onDelete: "cascade"
    });
  };

  return Users;
};
