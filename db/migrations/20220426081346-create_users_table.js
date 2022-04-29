'use strict';
const _ = require('lodash');
const Constants = require('../../constants/model');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER.UNSIGNED
      },
      uuid: {
        type: Sequelize.UUID,
        index: true,
        allowNull: false
      },
      firstName: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      lastName: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(255),
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      phoneNumberCode: {
        type: Sequelize.SMALLINT(5).UNSIGNED,
        allowNull: true
      },
      phoneNumber: {
        type: Sequelize.INTEGER(11).UNSIGNED,
        allowNull: true
      },
      isPhoneNumberVerified: {
        type: Sequelize.ENUM,
        values: _.values(Constants.PHONE_NUMBER_VERIFICATION_STATUS),
        defaultValue: Constants.PHONE_NUMBER_VERIFICATION_STATUS.PENDING,
        allowNull: false
      },
      profileImage: {
        type: Sequelize.STRING(255),
        allowNull: true
      },
      gender: {
        type: Sequelize.ENUM,
        values: _.values(Constants.GENDER),
        defaultValue: Constants.GENDER.MALE,
        allowNull: false
      },
      dateOfBirth: {
        allowNull: false,
        type: Sequelize.DATEONLY,
        comment: "Format: YYYY-MM-DD"
      },
      unitPreferance: {
        type: Sequelize.ENUM,
        values: _.values(Constants.UNIT_PREFERENCE),
        defaultValue: Constants.UNIT_PREFERENCE.METRIC,
        allowNull: false
      },
      status: {
        type: Sequelize.ENUM,
        values: _.values(Constants.STATUS),
        defaultValue: Constants.STATUS.ACTIVE,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        allowNull: true,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, _Sequelize) => {
    return queryInterface.dropTable('users');
  }
};
