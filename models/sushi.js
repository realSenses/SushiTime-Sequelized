module.exports = function(sequelize, DataTypes) {
  var sushis = sequelize.define("sushis", {
    sushi_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    eaten: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false
    }
  });

  sushis.associate = function(models) {

    sushis.belongsTo(models.Customer, {
      foreignKey: {
        allowNull: false
      }
    });
  };


  return sushis;
};