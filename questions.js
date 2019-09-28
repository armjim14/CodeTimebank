module.exports = function(sequelize, DataTypes) {
    var questions = sequelize.define("questions", {
       
        User: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 70]
        }
      },

      programming_language: {
        type: DataTypes.STRING,
        allowNull: false
      },
      experience: {
        type: DataTypes.STRING,
        allowNull: false
      },
      github: {
        type: DataTypes.STRING,
        allowNull: false
      },
      timebank: {
        type: DataTypes.STRING,
        allowNull: false
      },
      need_help: {
        type: DataTypes.STRING,
        allowNull: false
      }
    });
    return User;
  };
  