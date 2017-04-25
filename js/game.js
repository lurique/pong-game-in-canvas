var App = App || {};

;(function() {

	App.Game = {
	
		player1: 40,
		player2: 40,
		points: 10,
		rounds: 100,
		ballx: 50,
		bally: 50,
		ballDimension: 5,


		init: function() {
			this.createGame();
		},

		createGame: function() {
			this.canvas = document.getElementById('canvas');
			this.ctx = this.canvas.getContext('2d');

			setInterval(update, 1000/30);

			function update() {
				ballx+=xv;
				bally+=yv;

				if ( bally < 0 && yv < 0 ) {
					yv=-yv;
				}

				ctx.fillStyle = '#000';
				ctx.fillRect(0, 0, canvas.width, canvas.height);
				ctx.fillStyle = '#FFF';
				ctx.fillRect(0, player1, points, player2);
				ctx.fillRect(canvas.width-points, player2, points, rounds);
				ctx.fillRect(ballx-ballDimension/2, bally-ballDimension/2, ballDimension, ballDimension);
			}
		},

	}

})();