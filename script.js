document.addEventListener('DOMContentLoaded', function() {

	let rows = 10;
	let snakes = [{head:17, tail: 7}, {head: 54, tail: 34},{head:62, tail:19},{head:87, tail:36},{head:92, tail:73},{head:95, tail:75}];
	let ladders = [{start: 4, end: 14}, {start: 9, end: 31}, {start: 21, end: 42}, {start: 28, end: 84}, {start: 51, end: 67}, {start: 72, end: 91}];
	let player1Score = 0;
	let player2Score = 0;
	let switchChance = false;
	document.querySelector('.turn').innerHTML = "Player 1 plays";
	document.querySelector('.dice-mat').classList.add('player-1');

	for(i = rows*rows-1; i >= 0; i--) {
		let ele = document.createElement('div');
		ele.setAttribute('class', "square");

		if(parseInt((i/10))%2 == 1) {
			ele.setAttribute('id', i);
			ele.innerHTML = i+1;
		}
		else {
			if(i < 10) {
				ele.setAttribute('id', 9-i);
				ele.innerHTML = 9-i+1;
			}
			else {
				ele.setAttribute('id', (2*(parseInt(i/10))+1)*10-i-1);
				ele.innerHTML = (2*(parseInt(i/10))+1)*10-i;
			}
		}

		document.querySelector('.grid').appendChild(ele);
	}

	document.querySelector('.dice').addEventListener('click', function() {
		let num = Math.ceil(Math.random()*6);
		document.querySelector('.dice').innerHTML = num;
		play(num);
	})

	function play(num) {
		if(!switchChance) {
			document.querySelector('.dice-mat').classList.add('player-2');
			document.querySelector('.dice-mat').classList.remove('player-1');
			if(document.querySelector('.player-1-active')) {
				document.querySelector('.player-1-active').classList.remove('player-1-active');
			}
			player1Score = player1Score + num;
			let calculateSquare = calculateNextSquare(player1Score);
			if(calculateSquare) {
				player1Score = parseInt(document.getElementById(calculateSquare).innerHTML);
			}
			document.getElementById(player1Score-1).classList.add('player-1-active');
		}
		else {
			document.querySelector('.dice-mat').classList.add('player-1');
			document.querySelector('.dice-mat').classList.remove('player-2');
			if(document.querySelector('.player-2-active')) {
				document.querySelector('.player-2-active').classList.remove('player-2-active');
			}
			player2Score = player2Score + num;
			let calculateSquare = calculateNextSquare(player2Score);
			if(calculateSquare) {
				player2Score = parseInt(document.getElementById(calculateSquare).innerHTML);
			}
			document.getElementById(player2Score-1).classList.add('player-2-active');
		}
		switchChance = !switchChance;
	}

	function calculateNextSquare(score) {
		let currentSquare = document.getElementById(score-1);
		let value = null;

		snakes.filter(function(snake) {
			if(snake.head == score-1) {
				value =  snake.tail;
			}
		})

		ladders.filter(function(ladder) {
			if(ladder.start == score-1) {
				value =  ladder.end;
			}
		})

		return value;
	}

})