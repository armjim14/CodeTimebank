module.exports = function(sequelize, DataTypes) {
    var timestamps = sequelize.define("timestamps", {
      Time_earned: {
        type: DataTypes.STRING,
      },
      Time_Lost: {
        type: DataTypes.STRING,
      }
      
    });
    
    return timestamps;
  
  };