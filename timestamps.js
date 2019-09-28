module.exports = function(sequelize, DataTypes) {
    var timestamps = sequelize.define("timestamps", {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          len: [2, 70]
        }
      },
      create_time: {
        type: DataTypes.STRING,
        allowNull: false
      },
      update_time: {
        type: DataTypes.STRING,
        allowNull: false
      },
      id: {
        type: DataTypes.STRING,
        allowNull: false
      },
      skype: {
      
    );
    return User;
  };