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

		$('.puissance4').remove();

		/* variables */
		let currentPlayer = 'player1';
		const history = [];
		const grid_back = []; //* @var grid_back - jQuery [col]li[row]*/

		/* elements */
		const gameArea = $('<div />').addClass('puissance4');
		gameArea.append($ ('<style />').attr('type', 'text/css')
			.text(`.puissance4 .player1 {color: ${options.color1}; } .puissance4 .player2 {color: ${options.color2};}`));
		const grid_front = $('<div />').addClass('game-grid');
		const turn = $('<h3 />').text('player1 ').addClass('player 1');
		const undo = $('<button />').text('undo').click(() => {
			const lastPiece = history.pop();
			if (lastPiece) {
				lastPiece.removeClass('player1 player2');
				currentPlayer = currentPlayer === 'player1' ? 'player2' : 'player1';
			}
		});


		function findLastFreeI(colI) {
			for (let rowI = grid_back[colI].length -1; rowI >= 0; rowI--) {
				if (!/player[12]/.test(grid_back[colI][rowI].attr('class'))) {
					return rowI;
				}
			}
			return -1;
		}

		function between_0_and(limitInt, subjectInt) {
			return (subjectInt >= 0 && subjectInt < limitInt) || (subjectInt <= 0 && subjectInt > limitInt);
		}

		function checkWin(colI, rowI, className) {

			function checkDirection(rowMod, colMod) {

				let inDirection = 0;
				for (let r = rowI + rowMod, c = colI + colMod; between_0_and(grid_back[colI].length, r) && between_0_and(grid_back.length, c); r += rowMod, c += colMod) {
					if (!grid_back[c][r].hasClass(className)) {
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
				gameArea.find('button, ul').each(function(index){
					$(this).prop('disabled',true).prop('onclick', null).off('click');
				});
			}
		}

		function addPiece(colI) {
			return () => {
				const lastFreeI = findLastFreeI(colI);
				if (lastFreeI !== -1) {
					const lastFree = grid_back[colI][lastFreeI];
					lastFree.addClass(currentPlayer);
					checkWin(colI, lastFreeI, currentPlayer);
					currentPlayer = (currentPlayer === 'player1') ? 'player2' : 'player1';
					turn.text(currentPlayer).toggleClass('player1 player2');
					history.push(lastFree);
				}
				return grid_back[colI];
			};
		}

		// const lastFree = col.children(":not([class*='player'])").last();

		/* setup */
		for (let colI = 0; colI < settings.cols; colI++) {
			grid_back.push([]);
			const col = $('<ul />')
				.addClass('col')
				.click(addPiece(colI));
			grid_front.append(col);
			for (let rowI = 0; rowI < settings.rows; rowI++) {
				const cell = $('<li />').text('X');
				grid_back[colI].push(cell);
				col.append(cell);
			}
		}

		$('body').append((gameArea).append(turn).append(grid_front).append(undo));
		return this;
	};
}( jQuery ));
