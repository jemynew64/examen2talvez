"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Users",
      [
        {
          name: "JemalLeonDuenas",
          lastname: "Leon",
          email: "admin@hotmail.com",
          password: "123456789", // Asegúrate de usar un hash en producción
          isAdmin: true,
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
