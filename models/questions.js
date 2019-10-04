module.exports = function(sequelize, DataTypes) {
    var questions = sequelize.define("questions", {
       
      question: {
        type: DataTypes.STRING,
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

      solved: {
        type: DataTypes.BOOLEAN,
        defaultValue: () => {
          return false;
        }
      }

    });

    questions.associate = function(models) {
      questions.belongsTo(models.Users, {
        foreignKey: {
          allowNull: false
        }
      });
      // questions.hasMany(models.time, {
      //   onDelete: "cascade"
      // });
    };

    return questions;
  
  };