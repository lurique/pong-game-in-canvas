var App = App || {};

;(function() {

	App.Pong = {

		init: function() {
			this.setGame();
			this.setGamePrototypes();

			this.setKeyListener();
			this.setKeyListenerPrototypes();

			this.startGame = new this.Game();
		},

		setGame: function() {
			this.Game = function() {
				/*
				*	Set canvas variables
				*/
				this.canvas = document.getElementById('canvas');
				this.width = this.canvas.width;
				this.height = this.canvas.height;

				this.ctx = this.canvas.getContext('2d');
				this.ctx.fillStyle = "white";

				/*
				* Simple keylistener for keyPress conditions
				*/
				this.key = new KeyListener();

				/*
				* Defining player 1
				*/
				this.player1 = new Paddle(5, 0);
				this.player1.y = this.height / 2 - this.player1.height / 2;
				this.display1 = new Display(this.width / 4, 25);

				/*
				*	Defining player 2
				*/
				this.player2 = new Paddle(this.width - 5 - 2, 0);
				this.player2.y = this.height / 2 - this.player2.height / 2;
				this.display2 = new Display(this.width * 3 / 4, 25);

				/*
				*	Defining the ball
				*/
				this.ball = new Ball();
				this.ball.x = this.width / 2;
				this.ball.y = this.height / 2;
				this.ball.vy = Math.floor(Math.random() * 25 - 6);
				this.ball.vx = 7 - Math.abs(this.ball.vy);
			};
		},

		setGamePrototypes: function() {
			this.Game.prototype.draw = function() {
				this.ctx.clearRect(0, 0, this.width, this.height);
				this.ctx.fillRect(this.width / 2, 0, 2, this.height);

				this.ball.draw(this.ctx);

				this.player1.draw(this.ctx);
				this.player2.draw(this.ctx);
				this.display1.draw(this.ctx);
				this.display2.draw(this.ctx);
			}
		},


		setKeyListener: function() {
			this.KeyListener = function() {
				this.pressedKeys = [];

				this.keydown = function(e) {
					this.pressedKeys[e.keyCode] = true
				};

				this.keyup = function(e) {
					this.pressedKeys[e.keyCode] = false;
				};

				document.addEventListener("keydown", this.keydown.bind(this));
				document.addEventListener("keyup", this.keyup.bind(this));
			}
		},

		setKeyListenerPrototypes: function() {
			this.KeyListener.prototype.isPressed = function(key) {
				return this.pressedKeys[key] ? true : false;
			};

			this.KeyListener.prototype.addKeyPressListener = function(keyCode, callback) {
				document.addEventListener("keypress", function(e) {
					if (e.keyCode == keyCode)
						callback(e);
				});
			};
		}

	}

	document.addEventListener("DOMContentLoaded", function() {
		App.Pong.init();
	});

})();