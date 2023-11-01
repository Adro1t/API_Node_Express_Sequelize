/* This function defines a Sequelize model called "Record" with three attributes: "name", "email", and "number". */
module.exports = (sequelize, DataTypes) => {
  const Record = sequelize.define("record", {
    name: {
      type: DataTypes.STRING,
      allowNull: false, // Name is required and cannot be null
      validate: {
        is: {
          args: /^[a-zA-Z]+$/,
          msg: "Name can only contain alphabets (both uppercase and lowercase)",
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false, // Email is required and cannot be null
      validate: {
        isEmail: {
          msg: "Email must be a valid email address",
        },
      },
    },
    phone_number: {
      type: DataTypes.STRING, // Assuming it's a phone number
      validate: {
        is: {
          args: /^[0-9-]+$/,
          msg: "Phone number should only contain digits and hyphens signs",
        },
      },
    },
  });

  return Record;
};
