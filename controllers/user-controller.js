const rl = require("readline");
const { UserModel } = require("../models/user-model.js");

class UsersController {
  constructor() {
    this.readline = rl.createInterface({
      input: process.stdin,
      output: process.stdout,
    });
  }

  initPlayers() {
    var philip = new UserModel();
    philip.first_name = "Philip";
    philip.last_name = "Bontia";
    philip.age = 29;
    philip.attack = 500;

    var ado = new UserModel();
    ado.first_name = "Ado";
    ado.last_name = "Pitogo";
    ado.age = 32;
    ado.defense = 100;
    ado.life = 200;

    this.player1 = philip;
    this.player2 = ado;
  }

  switchPlayer() {
    if (this.current_player === undefined) {
      // select random player
      this.current_player = Math.random() > 0.5 ? this.player1 : this.player2;
    } else {
      this.current_player =
        this.current_player === this.player1 ? this.player2 : this.player1;
    }
  }

  getInput(question) {
    return new Promise((resolve, reject) => {
      this.readline.question(question, (ans) => {
        resolve(ans);
      });
    });
  }

  async starGameLoop() {
    this.initPlayers();

    while (this.player1.life > 0 && this.player2.life > 0) {
      this.switchPlayer();
      // action can be attack or heal
      // get action from stdin
      console.log("Current Player: " + this.current_player.getFullName());

      var toAttackPlayer =
        this.current_player === this.player1 ? this.player2 : this.player1;

      var action = await this.getInput("Enter action (attack/heal): ");
      if (action === "attack") {
        // get target from stdin
        this.current_player.doAttack(toAttackPlayer);
      } else {
        var points = await this.getInput("Enter heal points: ");
        this.current_player.doHeal(points);
      }

      console.log(`
          User Stats:
\t ${this.player1.getFullName()}: ${this.player1.life} life
\t ${this.player2.getFullName()}: ${this.player2.life} life
          `);
    }

    if (this.player1.life > 0) {
      console.log(this.player1.getFullName() + " wins!");
    } else {
      console.log(this.player2.getFullName() + " wins!");
    }

    var continuePlaying = await this.getInput(
      "Do you want to play again? (yes/no)",
    );

    if (continuePlaying === "yes") {
      this.starGameLoop();
    } else {
      this.readline.close();
      process.exit(0);
    }
  }
}

exports.UsersController = UsersController;
