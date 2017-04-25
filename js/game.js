var App = App || {};

;(function() {

	App.Pong = {

		init: function() {
			this.setGame();
			this.setGamePrototypes();

			this.setPaddle();
			this.setPaddlePrototype();

			this.setBall();
			this.setBallPrototype();

			this.setDisplay();
			this.setDisplayPrototypes();

			this.setKeyListener();
			this.setKeyListenerPrototypes();

			this.setLoop();

			this.startGame = new this.Game();
		},

		setGame: function() {
			var self = App.Pong;

			this.Game = function() {
				// Defining canvas variables
				this.canvas = document.getElementById('canvas');
				this.width = this.canvas.width;
				this.height = this.canvas.height;

				this.ctx = this.canvas.getContext('2d');
				this.ctx.fillStyle = "white";

				// Starting keyListener
				this.key = new self.KeyListener();

				// Defining player 1
				this.player1 = new self.Paddle(5, 0);
				this.player1.y = this.height / 2 - this.player1.height / 2;
				this.display1 = new self.Display(this.width / 4, 25);

				
				// Defining player 2
				this.player2 = new self.Paddle(this.width - 5 - 2, 0);
				this.player2.y = this.height / 2 - this.player2.height / 2;
				this.display2 = new self.Display(this.width * 3 / 4, 25);

				// Defining ball
				this.ball = new self.Ball();
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
			};

			this.Game.prototype.update = function() {
				if ( this.paused )
					return;

				this.ball.update();
				this.display1.value = this.player1.score;
				this.display2.value = this.player2.score;

				// Key binding for player 1 - W and S
				if ( this.keys.isPressed(83) ) {
					this.player1.y = Math.min(this.height - this.player1.height, this.player1.y + 4);
				} else if ( this.keys.isPressed(87) ) {
					this.player1.y = Math.max(0, this.player1.y - 4);
				}

				// Key binding for player 2 - Arrow up and Arrow down
				if ( this.keys.isPressed(40) ) {
					this.player2.y = Math.min(this.height - this.player2.height, this.player2.y + 4);
				} else if ( this.keys.isPressed(38) ) {
					this.player2.y = Math.max(0, this.player2.y - 4);
				}

				// Set conditions and movement for ball
				if ( this.ball.vx > 0 ) {
					if ( this.player2.x <= this.ball.x + this.ball.width && this.player2.x > this.ball.x - this.ball.vx + this.ball.width ) {
						var collisionDiff = this.ball.x + this.ball.width - this.player2.x;
						var k = collisionDiff / this.ball.vx;
						var y = this.ball.vy * k + (this.ball.y - this.ball.vy);

						if ( y >= this.player2.y && y + this.ball.height <= this.player2.y + this.player2.height ) {
							this.ball.x = this.player2.x - this.ball.width;
							this.ball.y = Math.floor(this.ball.y - this.ball.vy + this.ball.vy * k);
							this.ball.vx = -this.ball.vx;
						}
					}
				} else {
					if ( this.player1.x + this.player1.width >= this.ball.x ) {
						var collisionDiff = this.player1.x + this.player1.width - this.ball.x;
						var k = collisionDiff / -this.ball.vx;
						var y = this.ball.vy * k + (this.ball.y - this.ball.vy);

						if ( y >= this.player1.y && y + this.ball.height <= this.player1.y + this.player1.height ) {
							this.ball.x = this.player1.x + this.player1.width;
							this.ball.y = Math.floor(this.ball.y - this.ball.vy + this.ball.vy * k);
							this.ball.vx = -this.ball.vx;
						}
					}
				}

				if ( (this.ball.vy < 0 && this.ball.y < 0) || (this.ball.vy > 0 && this.ball.y + this.ball.height > this.height) ) {
					this.ball.vy = -this.ball.vy;
				}

				if ( this.ball.x >= this.width ) {
					this.score(this.player1);
				} else if ( this.ball.x + this.ball.width <= 0 ) {
					this.score(this.player2);
				}
			};

			this.Game.prototype.score = function(p) {
				p.score++;

				var player = p == this.player1 ? 0 : 1;

				this.ball.x = this.width / 2;
				this.ball.y = p.y + p.height / 2;

				this.ball.vy = Math.floor(Math.random() * 12 - 6);
				this.ball.vx = 7 - Math.abs(this.ball.vy);

				if ( player == 1 )
					this.ball.bx *= -1;
			};
		},

		/*
		* Setting paddle properties
		*/
		setPaddle: function() {
			this.Paddle = function(x, y) {
				this.x = x;
				this.y = y;
				this.width = 2;
				this.height = 28;
				this.score = 0;
			}
		},

		setPaddlePrototype: function() {
			this.Paddle.prototype.draw = function(p) {
				p.fillRect(this.x, this.y, this.width, this.height);
			}
		},

		/*
		* Setting ball properties
		*/
		setBall: function() {
			this.Ball = function() {
				this.x = 0;
				this.y = 0;
				this.vx = 0;
				this.vy = 0;
				this.width = 4;
				this.height = 4;
			}
		},

		setBallPrototype: function() {
			this.Ball.prototype.update = function() {
				this.x += this.vx;
				this.y += this.vy;
			};

			this.Ball.prototype.draw = function(p) {
				p.fillRect(this.x, this.y, this.width, this.height);
			}
		},

		/*
		* Setting display properties
		*/
		setDisplay: function() {
			var self = App.Pong;

			this.Display = function() {
				this.x = 0;
				this.y = 0;
				this.value = 0;
			}
		},

		setDisplayPrototypes: function() {
			this.Display.prototype.draw = function(p) {
				p.fillText(this.value, this.x, this.y);
			}
		},

		/*
		* Setting keyListener properties
		*/
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
		},

		setLoop: function() {
			var self = App.Pong;

			function Loop() {
				self.Game.update;
				self.Game.draw;

				setTimeout(Loop, 1000/30);
			};

			Loop();
		}

	}

	document.addEventListener("DOMContentLoaded", function() {
		App.Pong.init();
	});

})();