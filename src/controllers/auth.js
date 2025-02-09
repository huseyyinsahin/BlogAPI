"use strict";

const User = require("../models/user");
const Token = require("../models/token");
const passwordEncrypt = require("../helpers/passwordEncrypt");

module.exports = {
  login: async (req, res) => {
    /*
            #swagger.tags = ["Authentication"]
            #swagger.summary = "Login"
            #swagger.description = 'Login with username/E-Post and Password.'
            #swagger.parameters["body"] = {
                in: "body",
                required: true,
                schema: {
                    "email": "aaa@example.com",
                    "password": "1234",
                }
            }
        */

    const { username, email, password } = req.body;

    if ((username || email) && password) {
      const data = await User.findOne({ $or: [{ email }, { username }] });

      if (data && data.password == passwordEncrypt(password)) {
        if (data.isActive) {
          let tokenData = await Token.findOne({ userId: data._id });

          if (!tokenData)
            tokenData = await Token.create({
              userId: data._id,
              token: passwordEncrypt(data._id + Date.now()),
            });

          const user = await User.findById(data._id).select({ password: 0 });

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
        throw new Error("Wrong username/email or password.");
      }
    } else {
      res.errorStatusCode = 401;
      throw new Error("Please enter username/email and password.");
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
