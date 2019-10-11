module.exports = function(sequelize, DataTypes) {
  var time = sequelize.define("time", {
    Time: {
      type: DataTypes.INTEGER,
      defaultValue: () => {
        return 0;
      }
    }
  });

  time.associate = function(models) {
    time.belongsTo(models.Users, {
      foreignKey: {
        allowNull: false
      }
    });
    time.belongsTo(models.questions, {
      foreignKey: {
        allowNull: true
      }
    });
  };

  return time;
};
