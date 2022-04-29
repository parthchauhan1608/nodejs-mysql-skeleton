'use strict';
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { PHONE_NUMBER_VERIFICATION_STATUS, GENDER, STATUS, UNIT_PREFERENCE } = require("../../constants/model");

module.exports = (sequelize, DataTypes) => {
    const users = sequelize.define("users", {
        uuid: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        firstName: {
            allowNull: false,
            type: DataTypes.STRING(255)
        },
        lastName: {
            allowNull: false,
            type: DataTypes.STRING(255)
        },
        email: {
            allowNull: false,
            type: DataTypes.STRING(255)
        },
        password: {
            allowNull: true,
            type: DataTypes.STRING(255)
        },
        phoneNumberCode: {
            type: DataTypes.SMALLINT(5).UNSIGNED,
            allowNull: true
        },
        phoneNumber: {
            type: DataTypes.INTEGER(11).UNSIGNED,
            allowNull: true
        },
        isPhoneNumberVerified: {
            type: DataTypes.ENUM,
            values: _.values(PHONE_NUMBER_VERIFICATION_STATUS),
            defaultValue: PHONE_NUMBER_VERIFICATION_STATUS.PENDING,
            allowNull: false
        },
        profileImage: {
            type: DataTypes.STRING(255),
            allowNull: true
        },
        gender: {
            type: DataTypes.ENUM,
            values: _.values(GENDER),
            defaultValue: GENDER.MALE,
            allowNull: false
        },
        dateOfBirth: {
            allowNull: false,
            type: DataTypes.DATEONLY,
            comment: "Format: YYYY-MM-DD"
        },
        unitPreferance: {
            type: DataTypes.ENUM,
            values: _.values(UNIT_PREFERENCE),
            defaultValue: UNIT_PREFERENCE.METRIC,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM,
            values: _.values(STATUS),
            defaultValue: STATUS.ACTIVE,
            allowNull: false
        }
    }, {
        paranoid: true,
        timestamps: true,
        hooks: {
            beforeCreate: (user) => {
                user.uuid = uuidv4();
            },
        }
    });

    users.associate = models => {
        // association define here
    };

    return users;
};