var App = App || {};

;(function() {

	App.Pong = {

		init: function() {
			this.defineVariables();
			this.defineModules();
			this.defineEvents();
		},

		defineVariables: function() {
			// Variables
			this.canvas = document.getElementById('canvas');
			this.ctx = this.canvas.getContext('2d');

			this.player1Score = 0;
			this.player2Score = 0;

			// Constants
			this.FRAMES = 30;
			this.WIN_SCORE = 5;
			this.VICTORY = false;
			this.VERSUS = false;
		},

		defineModules: function() {
			window.onload = function() {
				var self = App.Pong;

				self.Modules.drawArena();
			}
		},

		Modules: {
			drawArena: function() {
				var self = App.Pong;

				// Draw the background
				self.ctx.fillStyle = '#000';
				self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);

				// Draw arena division
				self.ctx.fillStyle = '#FFF';
				self.ctx.fillRect(self.canvas.width / 2, 0, 1, self.canvas.height);


			},
		},

		defineEvents: function() {
			
		},

		Events: {
			resetBall: function() {
				var self = App.Pong;

				if ( self.player1Score >= self.WIN_SCORE || self.player2Score >= self.WIN_SCORE ) {
					self.VICTORY = true;
				}

				self.ballSpeedX = -self.ballSpeedX;
				self.ballX = self.canvas.width / 2;
				self.ballY = self.canvas.height / 2;
			},

			startCPU: function() {
				var self = App.Pong;

				var paddleCenter = self.paddle2Y + (self.PADDLE_HEIGHT / 2);

				if ( paddleCenter < self.ballY - 35 ) {
					paddle2Y = paddle2Y + 6;
				} else if ( paddleCenter > ballY + 35 ) {
					paddle2Y = paddle2Y - 6;
				}
			},

			startMultiplayer: function() {
				var self = App.Pong;


			},
		}

	}

	document.addEventListener('DOMContentLoaded', function() {
		App.Pong.init();
	});

})();