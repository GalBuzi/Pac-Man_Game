var context; //where the canvas is being created
var shape = new Object(); 
var board; //2d array
var score; //score of user
var pac_color; // pacman charecter color 
var start_time; // starting time of the game
var time_elapsed; //time left to play OR time from start
var interval; //responsible for update position
var monsters; //array contain the monsters
var monstersNum; //the number of monsterts in the game
var intervalMonsters;
var pac_direction;


class gameMonster{
	constructor(x,y,url){
		this.x= x;
		this.y=y;
		this.img = new Image();
		this.img.src = url;
	}
}



$(document).ready(function() {
	context = canvas.getContext("2d");
	Start();
});

function Start() {
	board = new Array();
	score = 0;
	pac_color = "yellow";
	pac_direction=1;
	monsters =[];
	monstersNum =4;
	var cnt = 200; //num
	var food_remain = 50; //total food left on board
	var pacman_remain = 1; //boolean , how many time to draw the pacman
	start_time = new Date();
	// 0=empty 1= 25-Food, 2=pacman, 3=15-Food, 4=wall, 5=5-Food, 6=life
	createMonsters();
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
	keysDown = {}; //dictionary of keys and codes
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
	intervalMonsters =setInterval(moveMonsters,300);
}

function createMonsters(){
	monsters.push(new gameMonster(19,9,"Blue_Monster.png"));
	monsters.push(new gameMonster(0,0,"Red_Monster.png"));
	monsters.push(new gameMonster(0,9,"Pink_Monster.png"));
	monsters.push(new gameMonster(19,0,"Orange_Monster.png"));
	
}

function placeWalls(i,j){
        return (i === 2 && j === 1) || (i === 3 && j === 1) || (i === 2 && j === 2) || (i === 3 && j === 2) || (i === 2 && j === 5)
        || (i === 2 && j === 6) || (i === 2 && j === 7) || (i === 3 && j === 6) || (i === 6 && j === 5) || (i === 6 && j === 6)
        || (i === 9 && j === 9) || (i === 9 && j === 8) || (i === 9 && j === 7) || (i === 7 && j === 1) || (i === 8 && j === 1)
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
	context.clearRect(0, 0, canvas.width, canvas.height); //clean board
	lblScore.value = score;
	lblTime.value = time_elapsed;
	for (var i = 0; i < 20; i++) {
		for (var j = 0; j < 10; j++) {
			var center = new Object();
			center.x = i * 60 + 30;
			center.y = j * 60 + 30;
			if (board[i][j] == 2) {
                var canvasss = document.getElementById("canvas");
                var contttext = canvasss.getContext("2d");
                if(pac_direction==1){//up
                	var img = document.getElementById("up");
                    contttext.drawImage(img, center.x-25 , center.y-25 ,50,50);
                }
                else if(pac_direction==2){ //down
                	var img = document.getElementById("down");
                    contttext.drawImage(img, center.x-25 , center.y-25 ,50,50);
                }
                else if(pac_direction==4){ //right
                	var img = document.getElementById("right");
                    contttext.drawImage(img, center.x-25 , center.y-25 ,50,50);
                }else if(pac_direction==3){ //left
                	var img = document.getElementById("left");
                    contttext.drawImage(img, center.x-25 , center.y-25 ,50,50);
                }
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

			//draw monsters
			for(var k =0; k < monsters.length; k++){
            	if(monsters[k].x === i && monsters[k].y === j)
                    context.drawImage(monsters[k].img,i*60,j*60,60,60);
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
			pac_direction=1;
		}
	}
	if (x == 2) {
		if (shape.j < 9 && board[shape.i][shape.j + 1] != 4) {
			shape.j++;
			pac_direction=2;
		}
	}
	if (x == 3) {
		if (shape.i > 0 && board[shape.i - 1][shape.j] != 4) {
			shape.i--;
			pac_direction=3;
		}
	}
	if (x == 4) {
		if (shape.i < 19 && board[shape.i + 1][shape.j] != 4) {
			shape.i++;
			pac_direction=4;
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


function moveMonsters() {
	var monster;
	var minDistance = Number.POSITIVE_INFINITY;
	var minDistToPacman;
	var minX;
	var minY;
	var randMove;
	var optionalPositions;
	var randMoveIndex;

	//move Monsters
	for (var i = 0; i <= monsters.length; i++) {
		randMove = Math.random();
		monster = monsters[i];
		if (randMove > 0.5) {
			//explore other posiotion (far from pac-man)
			optionalPositions = getPossiblePositions(monster.x, monster.y);
			if(optionalPositions.length>0) {
				randMoveIndex = Math.floor(Math.random() * Math.floor(optionalPositions.length));
					minX=optionalPositions[randMoveIndex][0];
					minY=optionalPositions[randMoveIndex][1];
				}
			}
		else{
			//explore posiotion (close to pac-man)		
			//right
			if (isPositionValid(monster.x + 1, monster.y)) {
				mDist = checkDistanceFromPac(monster.x + 1, monster.y);
				if (minDistToPacman < minDistance) {
					minDistance = minDistToPacman;
					minX = monster.x + 1;
					minY = monster.y;
				}
			}//left
			if (isPositionValid(monster.x - 1, monster.y)) {
				minDistToPacman = checkDistanceFromPac(monster.x - 1, monster.y);
				if (minDistToPacman < minDistance) {
					minDistance = minDistToPacman;
					minX = monster.x - 1;
					minY = monster.y;
				}
			}//down
			if (isPositionValid(monster.x, monster.y + 1)) {
				minDistToPacman = checkDistanceFromPac(monster.x, monster.y + 1);
				if (minDistToPacman < minDistance) {
					minDistance = minDistToPacman;
					minX = monster.x;
					minY = monster.y + 1;
				}
			}//up
			if (isPositionValid(monster.x, monster.y - 1)) {
				minDistToPacman = checkDistanceFromPac(monster.x, monster.y - 1);
				if (minDistToPacman < minDistance) {
					minDistance = minDistToPacman;
					minX = monster.x;
					minY = monster.y - 1;
				}
			}
		 }

		if ((i === 0) ||
			(i === 1 && (minX !== monsters[0].x || minY !== monsters[0].y)) ||
			(i === 2 && (minX !== monsters[0].x || minY !== monsters[0].y) && 
			(minX !== monsters[1].x || minY !== monsters[1].y)) ||
			(i === 3 && (minX !== monsters[0].x || minY !== monsters[0].y) && 
			(minX !== monsters[1].x || minY !== monsters[1].y)) && 
			(minX !== monsters[2].x || minY !== monsters[2].y)) 
			{
			monster.x = minX;
			monster.y = minY;
		}
		//    monster caught pacman
		minDistance = Number.POSITIVE_INFINITY;
	}
}


function getPossiblePositions(x,y){
	var possibleMoves = [];
	//checkDown
	if (isPositionValid(x,y - 1)){
		possibleMoves.push([x,y-1]);
	}
	//checkUp
	if (isPositionValid(x,y + 1)){
		possibleMoves.push([x,y+1]);
	}
	//checkRight
	if (isPositionValid(x+1,y)){
		possibleMoves.push([x+1,y]);
	}
	//CheckLeft
	if (isPositionValid(x-1,y)){
		possibleMoves.push([x-1,y]);
	}
	return possibleMoves;
}


/*checks whether [x,y] are out game boundaries and whether they contains a wall*/
function isPositionValid(x,y){
    return (x<20 && x>=0 && y<10 && y>=0 && board[x][y]!==4);
}

/*compute distance from pacman*/
function checkDistanceFromPac(x,y){
    var ans= Math.sqrt(Math.pow(x-shape.i,2)+Math.pow(y-shape.j,2));
    return ans;
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