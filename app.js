var context; //where the canvas is being created
var shape = new Object(); 
var board; //2d array
var score; //score of user
var pac_color; // pacman charecter color 
var start_time; // starting time of the game
var time_elapsed; //time left to play OR time from start
var interval; //responsible for update position

$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	var cnt = 200; //num
	var food_remain = 50; //total food left on board
	var pacman_remain = 1; //boolean , how many time to draw the pacman
	start_time = new Date();
	// 0=empty 1= 25-Food, 2=pacman, 3=15-Food, 4=wall, 5=5-Food, 6=life
	for (var i = 0; i < 20; i++) {
		board[i] = new Array();
		//put obstacles in (i=3,j=3) and (i=3,j=4) and (i=3,j=5), (i=6,j=1) and (i=6,j=2)
		for (var j = 0; j < 10; j++) {
			if(placeWalls(i,j)){
				board[i][j] = 4;
			}
            else {
				var randomNum = Math.random();
				if (randomNum <= (1.0 * food_remain) / cnt) {
					food_remain--;
					board[i][j] = 1;
				} else if (randomNum < (1.0 * (pacman_remain + food_remain)) / cnt) { //place the pacman on board where there is no food
					shape.i = i;
					shape.j = j;
					pacman_remain--;
					board[i][j] = 2;
				} else {
					board[i][j] = 0;
				}
				cnt--;
			}
		}
	}
	while (food_remain > 0) {
		var emptyCell = findRandomEmptyCell(board);
		board[emptyCell[0]][emptyCell[1]] = 1;
		food_remain--;
	}
	keysDown = {};
	addEventListener(
		"keydown",
		function(e) {
			keysDown[e.keyCode] = true;
		},
		false
	);
	addEventListener(
		"keyup",
		function(e) {
			keysDown[e.keyCode] = false;
		},
		false
	);
	interval = setInterval(UpdatePosition, 250); //update posision to all charecters every 250 mili sec
}

function placeWalls(i,j){
        return (i === 2 && j === 1) || (i === 3 && j === 1) || (i === 2 && j === 2) || (i === 3 && j === 2) || (i === 2 && j === 5)
        || (i === 2 && j === 6) || (i === 2 && j === 7) || (i === 3 && j === 6) || (i === 6 && j === 5) || (i === 6 && j === 6)
        || (i === 7 && j === 0) || (i === 8 && j === 0) || (i === 9 && j === 0) || (i === 7 && j === 1) || (i === 8 && j === 1)
        || (i === 9 && j === 1) || (i === 8 && j === 2) || (i === 11 && j === 3) || (i === 12 && j === 3) || (i === 13 && j === 3)
        || (i === 12 && j === 4) || (i === 11 && j === 5) || (i === 12 && j === 5) || (i === 13 && j === 5) || (i === 15 && j === 6)
        || (i === 16 && j === 6) || (i === 15 && j === 7) || (i === 16 && j === 7) || (i === 17 && j === 2) || (i === 18 && j === 2)
        || (i === 17 && j === 3) || (i === 18 && j === 3);
    }

function findRandomEmptyCell(board) {
	var i = Math.floor(Math.random() * 9 + 1);
	var j = Math.floor(Math.random() * 9 + 1);
	while (board[i][j] != 0) {
		i = Math.floor(Math.random() * 9 + 1);
		j = Math.floor(Math.random() * 9 + 1);
	}
	return [i, j];
}

function GetKeyPressed() {
	if (keysDown[38]) {
		return 1;
	}
	if (keysDown[40]) {
		return 2;
	}
	if (keysDown[37]) {
		return 3;
	}
	if (keysDown[39]) {
		return 4;
	}
}

function Draw() {
	canvas.width = canvas.width; //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
				context.beginPath();
				context.arc(center.x, center.y, 30, 0.15 * Math.PI, 1.85 * Math.PI); // half circle
				context.lineTo(center.x, center.y);
				context.fillStyle = pac_color; //color
				context.fill();
				context.beginPath();
				context.arc(center.x + 5, center.y - 15, 5, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 1) {
				context.beginPath();
				context.arc(center.x, center.y, 15, 0, 2 * Math.PI); // circle
				context.fillStyle = "black"; //color
				context.fill();
			} else if (board[i][j] == 4) {
				context.beginPath();
				context.rect(center.x - 30, center.y - 30, 60, 60);
				context.fillStyle = "grey"; //color
				context.fill();
			}
		}
	}
}

function UpdatePosition() {
	board[shape.i][shape.j] = 0; //coordinates of pacman - delete the pacman and put 0
	var x = GetKeyPressed(); //get key pressed by user
	if (x == 1) {
		if (shape.j > 0 && board[shape.i][shape.j - 1] != 4) { //check move down
			shape.j--; // update position
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
		}
	}
	if (x == 4) {
		if (shape.i < 9 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
		}
	}
	if (board[shape.i][shape.j] == 1) { //if the new position is food, update score
		score++;
	}
	board[shape.i][shape.j] = 2;
	var currentTime = new Date(); //to define next line
	time_elapsed = (currentTime - start_time) / 1000;
	if (score >= 20 && time_elapsed <= 10) {
		pac_color = "green";
	}
	if (score == 50) {
		window.clearInterval(interval);
		window.alert("Game completed");
	} else {
		Draw();
	}
}

function registerEnterFunction(element) {
		$("#welcome").hide();
		$("#login").hide();
		$("#register").show();
	 	$("#gameSettings").hide();
    	$("#gamePlay").hide();	
		$("#about").hide();
	}

	function loginEnterFunction(element) {
		$("#welcome").hide();
		$("#login").show();
		$("#register").hide();
	 	$("#gameSettings").hide();
    	$("#gamePlay").hide();	
		$("#about").hide();
	}

	function homePageFunction(element) {
		$("#welcome").show();
		$("#login").hide();
		$("#register").hide();
	 	$("#gameSettings").hide();
    	$("#gamePlay").hide();	
		$("#about").hide();
	}


	function startGameFunction(element) {
		$("#welcome").hide();
		$("#login").hide();
		$("#register").hide();
	 	$("#gameSettings").hide();
    	$("#gamePlay").show();	
		$("#about").hide();
	}

	function gotoSettings(element) {
		$("#welcome").hide();
		$("#login").hide();
		$("#register").hide();
	 	$("#gameSettings").show();
    	$("#gamePlay").hide();	
		$("#about").hide();
	}

	function gotoAbout(element) {
		$("#welcome").hide();
		$("#login").hide();
		$("#register").hide();
	 	$("#gameSettings").hide();
    	$("#gamePlay").hide();	
		$("#about").show();
	}