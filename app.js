new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: []
    },
    methods: {
        startGame: function () {
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            // var max = 10;
            // var min = 3;
            // var damage = Math.max(Math.floor(Math.random() * max) + 1, min);
            // var damage = this.calculateDamage(3, 10);
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            // if (this.monsterHealth <= 0) {
            //     alert('You won!');
            //     this.gameIsRunning = false;
            //     return;
            // }

            // max = 12;
            // min = 5;
            // damage = Math.max(Math.floor(Math.random() * max) + 1, min);
            // this.playerHealth -= damage;

            this.monsterAttacks();
            // this.playerHealth -= this.calculateDamage(5, 12);

            // if (this.playerHealth <= 0) {
            //     alert('You lost!');
            //     this.gameIsRunning = false;
            // } no need this is a repeat
            // this.checkWin();
        },
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20)
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'Player hits Monster hard for ' + damage
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
        },
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.turns.unshift({
                isPlayer: true,
                text: 'Player heals for 10'
            });
            this.monsterAttacks();
        },
        giveUp: function () {
            this.gameIsRunning = false;
        },
        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.checkWin();
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits Player for ' + damage
            });
        },
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max) + 1, min);
        },
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You won! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                // alert('You won!');
                // this.gameIsRunning = false; as refactoring so not required
                return true;
            } else if (this.playerHealth <= 0) {
                if (confirm('You lost! New Game?')) {
                    this.startGame();
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            return false;
        }

    }
});