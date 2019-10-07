module.exports = function (sequelize, DataTypes) {
  var questions = sequelize.define("questions", {
    question: {
      type: DataTypes.TEXT,
      allowNull: false
    },

    language: {
      type: DataTypes.STRING,
      allowNull: false
    },

    topic: {
      type: DataTypes.STRING,
      allowNull: false
    },

    repo: {
      type: DataTypes.STRING,
      allowNull: true
    },

    solved: {
      type: DataTypes.BOOLEAN,
      defaultValue: () => {
        return false;
      }
    }
  });

    questions.associate = function (models) {
      questions.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });
      questions.hasMany(models.time, {
      });
    };
    return questions;
  };