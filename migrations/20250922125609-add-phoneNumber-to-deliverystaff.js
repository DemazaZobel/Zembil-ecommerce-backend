export async function up(queryInterface, Sequelize) {
  await queryInterface.addColumn("deliverystaff", "phonenumber", {
    type: Sequelize.STRING(20),
    allowNull: false,
  });
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.removeColumn("deliverystaff", "phonenumber");
}
