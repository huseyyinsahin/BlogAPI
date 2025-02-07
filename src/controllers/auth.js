"use strict";

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with E -Post and Password.'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "email": "aaa@example.com",
                    "password": "1234",
                }
            }
        */

    const { email, password } = req.body;

    if (email && password) {
      const user = await User.findOne({ email });

      if (user && user.password == passwordEncrypt(password)) {
        if (user.isActive) {
          let tokenData = await Token.findOne({ userId: user._id });

          if (!tokenData)
            tokenData = await Token.create({
              userId: user._id,
              token: passwordEncrypt(user._id + Date.now()),
            });

          res.status(200).send({
            error: false,
            token: tokenData.token,
            user,
          });
        } else {
          res.errorStatusCode = 401;
          throw new Error("This account is not active.");
        }
      } else {
        res.errorStatusCode = 401;
        throw new Error("Wrong email or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter email and password.");
    }
  },

  logout: async (req, res) => {
    /*
        #swagger.tags = ['Authentication']
        #swagger.summary = 'Logout'
    */

    const auth = req.headers?.authorization || null;
    const tokenKey = auth ? auth.split(" ") : null;

    if (tokenKey && tokenKey[0] == "Token") {
      let deleted = await Token.deleteOne({ token: tokenKey[1] });
      res.status(200).send({
        message: "logout: token deleted",
        deleted,
      });
    }
  },
};
