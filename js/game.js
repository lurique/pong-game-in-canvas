var App = App || {};

;(function() {

	App.Pong = {

		init: function() {
			this.setCanvas();
			this.prepGame();
		},

		setCanvas: function() {
			this.canvas = document.getElementById('canvas');
			this.ctx = this.canvas.getContext('2d');
		},

		prepGame: function() {
			var self = App.Pong;

			self.ctx.fillStyle = "#000";
		}

	}

	document.addEventListener('DOMContentLoaded', function() {
		App.Pong.init();
	});

})();