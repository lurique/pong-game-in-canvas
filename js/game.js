var App = App || {};

;(function() {
	
	App.Pong = {

		init: function() {
			this.defineVariables();
			this.buildGame();
		},

		defineVariables: function() {
			// Constants
			this.WIN_SCORE = 5;
			this.VICTORY = false;
			
			this.PADDLE_HEIGHT = 80;
			this.PADDLE_WIDTH = 8;

			this.GAMEMODE = false;
			this.VERSUS = false;
			this.START = false;
			
			this.FRAMES = 30;

			// Variables
			this.canvas = document.getElementById('canvas');
			this.ctx = this.canvas.getContext('2d');

			this.player1Score = 0;
			this.player2Score = 0;

			this.player1 = 0;
			this.player2 = 0;
			this.player1Y = this.canvas.height / 2 - this.PADDLE_HEIGHT / 2;
			this.player2Y = this.canvas.height / 2 - this.PADDLE_HEIGHT / 2;

			this.ballX = 50;
			this.ballY = this.ballX;
			this.ballSpeedX = 7;
			this.ballSpeedY = this.ballSpeedX / 2;
		},

		buildGame: function() {
			window.onload = function() {
				var self = App.Pong;

				window.addEventListener('keydown', function(key) {
					switch(key.keyCode) {
						case 87:
							self.player1Y += 35;
							break;

						case 83:
							self.player1Y -= 35;
							break;
					}
				});

				self.Modules.drawGamemode();

				if ( self.GAMEMODE == true ) {
					setInterval(function (){
						self.Modules.drawArena();
						self.Events.moveBall();

						if ( self.VERSUS == false ) {
							self.Events.versusCPU();
						} else {
							self.Events.versusHuman();
						}

					}, 1000 / self.FRAMES);
				}

			}
		},

		Modules: {
			drawGamemode: function() {
				var self = App.Pong;

				// Draw background
				this.colorRect(0, 0, self.canvas.width, self.canvas.height, 'black');

				// Draw separator
				this.colorRect(self.canvas.width / 2, 55, 1, self.canvas.height, 'white');

				// Draw buttons
				this.strokeRect((self.canvas.width / 3) - 150, (self.canvas.height / 2) - 20, 150, 40, 'white');
				this.strokeRect((self.canvas.width / 2) + 150, (self.canvas.height / 2) - 20, 150, 40, 'white');

				this.textRect('versus Human', self.canvas.width / 4 - 40, self.canvas.height / 2 + 3, 'white');
				this.textRect('versus CPU', self.canvas.width / 2 + 196, self.canvas.height / 2 + 3, 'white');

				// Draw title
				this.textRect('Choose your game', self.canvas.width / 2 - 40, 30, 'white');
			},

			drawArena: function() {
				var self = App.Pong;

				// Draw background
				this.colorRect(0, 0, self.canvas.width, self.canvas.height, 'black');

				// Draw separator
				this.colorRect(self.canvas.width / 2, 0, 1, self.canvas.height, 'white');

				// Draw nets
				this.strokeRect(-2, self.canvas.height / 3.9, 80, 220, 'white');
				this.strokeRect(self.canvas.width - 78, self.canvas.height / 3.9, 80, 220, 'white');

				// Draw paddles
				this.colorRect(0, self.player1Y, self.PADDLE_WIDTH, self.PADDLE_HEIGHT, 'white');
				this.colorRect(self.canvas.width - self.PADDLE_WIDTH, self.player2Y, self.PADDLE_WIDTH, self.PADDLE_HEIGHT, 'white');

				// Draw ball
				this.colorRect(self.ballX, self.ballY, 8, 8, 'white');

				// Draw number of goals
				this.textRect(self.player1Score, self.canvas.width / 2 - 50, 30, 'white');
				this.textRect(self.player2Score, self.canvas.width / 2 + 50, 30, 'white');
			},

			colorRect: function(left, top, width, height, color) {
				var self = App.Pong;

				self.ctx.fillStyle = color;
				self.ctx.fillRect(left, top, width, height);
			},

			strokeRect: function(left, top, width, height, color) {
				var self = App.Pong;

				self.ctx.strokeStyle = color;
				self.ctx.strokeRect(left, top, width, height);
			},

			textRect: function(text, left, top, color) {
				var self = App.Pong;

				self.fillStyle = color;
				self.ctx.fillText(text, left, top);
			}
		},

		Events: {
			versusCPU: function() {
				var self = App.Pong;

				// CPU
				self.player2Y = self.player2Y;

				if ( self.ballX > self.canvas.width / 2 ) {
					if ( self.player2Y < self.ballY - 35 ) {
						self.player2Y += 5;
					} else if ( self.player2Y > self.ballY - 35 ) {
						self.player2Y -= 5;
					}
				}
			},

			versusHuman: function() {
				var self = App.Pong;

				// In the future - Without keypress ghosting
			},

			moveBall: function() {
				var self = App.Pong;

				self.ballX = self.ballX + self.ballSpeedX;
				self.ballY = self.ballY + self.ballSpeedY;

				if ( self.ballX > self.canvas.width ) {
					self.player1Score++;

					this.resetBall();
				}

				if ( self.ballX < 0 ) {

					self.player2Score++;

					this.resetBall();

				}
			},

			resetBall: function() {
				var self = App.Pong;

				if ( self.player1Score >= self.WIN_SCORE || self.player2Score >= self.WIN_SCORE ) {
					self.VICTORY = true;
				}

				self.ballSpeedX = -self.ballSpeedX;
				self.ballX = self.canvas.width / 2;
				self.ballY = self.canvas.height / 2;
			},

		}

	}

	document.addEventListener('DOMContentLoaded', function() {
		App.Pong.init();
	});

})();