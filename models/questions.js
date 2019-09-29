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

      comfort: {
        type: DataTypes.STRING,
        allowNull: false
      }

    });

    // questions.associate = function(models) {
    //   questions.belongsTo(models.Users, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
    // };

    return questions;
  
  };
  