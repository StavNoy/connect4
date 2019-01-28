(function( $ ) {
	$.fn.puissance4 = function(options) {
		const settings = $.extend({
			rows: 7,
			cols: 7,
			color1: '#FF0000',
			color2: '#FFFF00'
		}, options);

		if ((settings.rows < 4 && settings.cols < 4) || (settings.rows * settings.cols < 8)) {
			alert('specified grid is to small');
			return this;
		}

		let currentPlayer = 1;
		let lastChangedPiece;

		const grid_back = [];
		const grid_front = $('<div />').addClass('game-grid');

		for (let i = 0; i < settings.cols; i++) {
			grid_front.append($('<ul />').addClass('col').click(() => {
				const lastFree = this.children(":not([class*='player'])").last();
				if (lastFree.length > 0) {
					lastFree.toggleClass(' .player' + currentPlayer);
					currentPlayer = (currentPlayer === 1) ? 2 : 1;
					lastChangedPiece = lastFree;
					//TODO animation;
				}
			}));
		}

		return this;
	};
}( jQuery ));