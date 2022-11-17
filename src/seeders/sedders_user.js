"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert("Users", [
      {
        email: "admin@gmail.com",
        password: "12345",
        firstName: "admin",
        lastName: "dz",
        address: "DA NANG",
        gender: 1,
        roleId: "R1",
        createdAt: new Date(),
        updatedAt: new Date(),
        phoneNumber: "123456789",
        positionId: null,
        image:
          "https://scontent.fdad1-2.fna.fbcdn.net/v/t39.30808-6/312929147_1775376369492751_5050191467061362469_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=09cbfe&_nc_ohc=K-OFGZ3AtZYAX8YoSdo&_nc_ht=scontent.fdad1-2.fna&oh=00_AfB4FVuY0RoaEn9NMx8-7ZW56bIYy_T0jUb68jrNGYRm_Q&oe=6373CECC",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  },
};
