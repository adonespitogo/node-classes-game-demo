const { UsersController } = require("./controllers/user-controller.js");

const usersCtrl = new UsersController();

usersCtrl.starGameLoop();
