var App = App || {};

;(function() {

	'use strict';

	App.Pong = {

		// Common variables
		width: window.innerWidth,
		height: window.innerHeight,

		// Pong elements
		player1: '',
		player2: '',
		ballX: 10,
		ballY: 10,

		init: function() {
			this.cacheSelectors();
			this.setModules();
		},

		cacheSelectors: function() {
			this.canvas = document.getElementById('canvas');
			this.ctx = this.canvas.getContext('2d');
		},

		setModules: function() {
			window.onload = function() {
				var self = App.Pong;

				self.Modules.buildArena();

				setInterval(self.Modules.buildArena, 10);
			}
		},

		Modules: {
			buildArena: function() {
				var self = App.Pong;

				self.ballX += 1;

				// Build the arena background
				self.ctx.fillStyle = '#000';
				self.ctx.fillRect(0, 0, self.canvas.width, self.canvas.height);

				// Build division of the arena
				self.ctx.fillStyle = '#FFF';
				self.ctx.fillRect(self.canvas.width / 2, 0, 1, self.canvas.height);

				// Build goal area
				self.ctx.strokeStyle = '#FFF';
				self.ctx.strokeRect(-2, self.canvas.height / 4, 80, self.canvas.height / 2);
				self.ctx.strokeStyle = '#FFF';
				self.ctx.strokeRect(self.canvas.width - 78, self.canvas.height / 4, 80, self.canvas.height / 2);

				// Create ball
				self.ctx.fillStyle = '#FFF';
				self.ctx.fillRect(self.ballX, self.ballX, 5, 5);
			}
		}

	}

	document.addEventListener('DOMContentLoaded', function() {
		App.Pong.init();
	});

})();