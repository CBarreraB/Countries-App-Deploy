const { DataTypes } = require("sequelize");

// Definición del modelo "country" en la db

module.exports = (sequelize) => {
  // Definir el modelo
  sequelize.define(
    "country",
    {
      id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      // Otros campos del modelo Country
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      continents: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      capital: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      region: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subregion: {
        type: DataTypes.STRING,
      },
      area: {
        type: DataTypes.FLOAT, // Valor numerico con decimal
      },
      population: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: false, // No incluir campos createdAt o updateAt
    }
  );
};
