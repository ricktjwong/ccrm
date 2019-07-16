const user = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    name: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
    },
  });
  
  User.associate = models => {
    User.hasMany(models.Case, { onDelete: 'CASCADE' })
  }

  return User;
};

module.exports = user;
