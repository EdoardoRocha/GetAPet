const mongoose = require("../db/conn");
const { Schema } = mongoose;

const User = mongoose.model(
  "User",
  new Schema(
    {
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      image: {
        type: String
      },
      phone: {
        type: String,
        required: true,
      },
    },
    {
      //Aqui ele cria duas infos novas: createdAt e o updateAt como no sequelize
      timestamps: true,
    },
  ),
);

module.exports = User;
