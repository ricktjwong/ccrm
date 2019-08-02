const client = (sequelize, DataTypes) => {
  const Client = sequelize.define('client', {
    name: DataTypes.STRING,
    dob: DataTypes.DATE,
    email: DataTypes.STRING,
    nric: DataTypes.STRING,
    nricAddress: DataTypes.STRING,
    address: DataTypes.STRING,
    gender: DataTypes.STRING,
    nationality: DataTypes.STRING,
    race: DataTypes.STRING,
    maritalStatus: DataTypes.STRING,
    employmentStatus: DataTypes.STRING,
    grossHouseholdIncome: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
  }, { underscored: true })

  return Client
}

module.exports = client
