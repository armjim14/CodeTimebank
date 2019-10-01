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
      allowNull: true
    },
    skype: {
      type: DataTypes.STRING,
      allowNull: true
    },
    credits: {
      type: DataTypes.INTEGER,
      defaultValue: () => {
        return 0;
      }
    }
  });

  Users.associate = function(models) {
    Users.hasMany(models.questions, {
      onDelete: "cascade"
    });
  };

  return Users;
};
