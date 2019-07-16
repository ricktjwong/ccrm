const msf_case = (sequelize, DataTypes) => {
  const Case = sequelize.define('case', {
    client_name: DataTypes.STRING,
  })

  Case.associate = models => {
    Case.belongsTo(models.User);
  }

  return Case;
}

module.exports = msf_case
