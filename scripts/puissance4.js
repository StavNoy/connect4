(function( $ ) {
	$.fn.puissance4 = function(options) {
		const settings = $.extend({
			rows: 7,
			cols: 7,
			color1: '#FF0000',
			color2: '#FFFF00'
		}, options);


		/* basic validation - early escape */
		if ((settings.rows < 4 && settings.cols < 4) || (settings.rows * settings.cols < 8)) {
			alert('specified grid is to small');
			return this;
		}

		/* variables */
		let currentPlayer = 'player1';
		let lastChangedPiece;
		/* @var grid_back - jQuery ul[col]li[row]*/
		const grid_back = [];
		const grid_front = $('<div />').addClass('game-grid');


		function findLastFreeI(colI) {
			for (let rowI = grid_back[colI].length -1; rowI >= 0; rowI++) {
				if (/player[12]/.test(grid_back[colI][rowI].attr('class'))) {
					return rowI;
				}
			}
			return -1;
		}

		function checkWin(colI, rowI, className) {
			function checkDirection(rowMod, colMod) {
				let inDirection = 0;
				for (let c = colI + colMod, r = rowI + rowMod; c < grid_back.length, r < grid_back[colI].length; c += colMod, r += rowMod) {
					if (!grid_back[colI][r].hasClass(className)) {
						break;
					}
					inDirection++;
				}
				return inDirection;
			}
			const win =  (1 + checkDirection(+1, 0) + checkDirection(-1, 0)) >= 4
				|| (1 + checkDirection(0, +1) + checkDirection(0, -1)) >= 4
				|| (1 + checkDirection(+1, +1) + checkDirection(-1, -1)) >= 4
				|| (1 + checkDirection(-1, +1) + checkDirection(+1, -1)) >= 4;

			if (win) {
				alert(currentPlayer + ' Won !');

			}
		}

		function addPiece(colI) {
			const rowC = grid_back[colI].length;
			return () => {
				const lastFreeI = findLastFreeI(colI);
				if (lastFreeI !== -1) {
					const lastFree = grid_back[colI][lastFreeI];
					lastFree.addClass(currentPlayer);
					checkWin(colI, lastFreeI, currentPlayer);
					currentPlayer = (currentPlayer === 'player1') ? 'player2' : 'player1';
					lastChangedPiece = lastFree;
				}
				return grid_back[colI];
			};
		}

		// const lastFree = col.children(":not([class*='player'])").last();



		/* setup */
		for (let colI = 0; colI < settings.cols; colI++) {
			const col = $('<ul />')
				.addClass('col')
				.click(addPiece(colI));
			grid_front.append(col);
			grid_back.push([]);
			for (let rowI = 0; rowI < settings.rows; rowI++) {
				const cell = $('<li />');
				col.append(cell);
				grid_back[colI].push(cell);
			}
		}



		return this;
	};
}( jQuery ));