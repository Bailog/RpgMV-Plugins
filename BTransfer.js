//=============================================================================
// Bailog DungeonGenerator
// BDG.js
// Version: 0.2
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc Генератор подземелий.
 * @help 
 * Ивент с вызовом generateRoom() создает подземелье. 
 *
 * Ивент с вызовом changeRoom(direction) где direction:
 * - UP : Перемещение на комнату выше
 * - DOWN : Перемещение на комнату ниже
 * - LEFT : Перемещение на комнату левее
 * - RIGHT : Перемещение на комнату правее
 *
 * room types:
 * empty
 * generated
 * spawn
 * boss
 *
 * entrance types:
 * empty
 * open
 * closed
 * 
 * @author Bailog
 */
//=============================================================================

// === Параметры ===
var i, j, roll;
var bx = 43, by = 45; // start point, coords
var bm = 9, bn = 9; // room arr params 
var roomRow = 4, roomCol = 4;
var roomCount = 1;
var BDng = [];
for (var i = 0; i < bm; i++){
	BDng[i] = [];
	for (var j = 0; j < bn; j++) 
		BDng[i][j] = {
			type: 'empty',
			left: 'locked',
			right: 'locked',
			up: 'locked',
			down: 'locked',
			doors: 0
		};
}




function generateRoom(){	
	doorRoll = Math.floor(Math.random()*3+2);
	do{
		roll = Math.floor(Math.random()*4);
		if (roll == 0 && BDng[4][4].up == 'locked') {
			BDng[4][4].up = 'open';
			BDng[4-1][4].down = 'open';
			BDng[4][4].doors += 1;
			BDng[4-1][4].doors += 1;
		}
		if (roll == 1 && BDng[4][4].down == 'locked') {
			BDng[4][4].down = 'open';
			BDng[4+1][4].up = 'open';
			BDng[4][4].doors += 1;
			BDng[4+1][4].doors += 1;
		}
		if (roll == 2 && BDng[4][4].left == 'locked') {
			BDng[4][4].left = 'open';
			BDng[4][4-1].right = 'open';
			BDng[4][4].doors += 1;
			BDng[4][4-1].doors += 1;
		}
		if (roll == 3 && BDng[4][4].right == 'locked') {
			BDng[4][4].right = 'open';		
			BDng[4][4+1].left = 'open';
			BDng[4][4].doors += 1;
			BDng[4][4+1].doors += 1;
		}
	}
	while (BDng[4][4].doors < doorRoll);
	BDng[4][4].type = 'spawn';
	showDoor();
	
	
	do{
		for (i = 0; i < bm-1; i++) for (j = 0; j < bn-1; j++){ 
			if (BDng[i][j].doors > 0 && BDng[i][j].type == 'empty'){
				doorRoll = Math.floor(Math.random()*3+1);
					do{
						roll = Math.floor(Math.random()*4);
						if (roll == 0 && BDng[i][j].up == 'locked') {
							BDng[i][j].up = 'open';
							BDng[i-1][j].down = 'open';
							BDng[i][j].doors += 1;
							BDng[i-1][j].doors += 1;
							//BDng[i-1][j].type = 'generated';
						}
						if (roll == 1 && BDng[i][j].down == 'locked') {
							BDng[i][j].down = 'open';
							BDng[i+1][j].up = 'open';
							BDng[i][j].doors += 1;
							BDng[i+1][j].doors += 1;
							//BDng[i+1][j].type = 'generated';
						}
						if (roll == 2 && BDng[i][j].left == 'locked') {
							BDng[i][j].left = 'open';
							BDng[i][j-1].right = 'open';
							BDng[i][j].doors += 1;
							BDng[i][j-1].doors += 1;
							//BDng[i][j-1].type = 'generated';
						}
						if (roll == 3 && BDng[i][j].right == 'locked') {
							BDng[i][j].right = 'open';		
							BDng[i][j+1].left = 'open';
							BDng[i][j].doors += 1;
							BDng[i][j+1].doors += 1;
							//BDng[i][j+1].type = 'generated';
						}
					}
					while (BDng[i][j].doors < doorRoll);
					roomCount += 1;
					BDng[i][j].type = 'generated';
			} 
		}
	}
	while (roomCount < 20);
	
// === Ввод ограничений, избежание выхода из-за границ ===
	for (i = 0; i < bm; i++) for (j = 0; j < bn; j++){
		if (i == 0)  BDng[i][j].up = 'locked';
		if (j == 0)  BDng[i][j].left = 'locked';
		if (i == bm-1) BDng[i][j].down = 'locked';
		if (j == bn-1) BDng[i][j].right = 'locked';
	}
	
}


// === Проверка, зачищена ли комната ===
function checkClearRoom(){
	if (BDng[roomRow][roomCol].type == 'generated'){
		roll = Math.floor(Math.random()*10);
		if (roll > 7){
			BattleManager.setup(1, false, false);
			$gamePlayer.makeEncounterCount();
			SceneManager.push(Scene_Battle);
		}	
	}
	BDng[roomRow][roomCol].type = 'clear';
}

//=== Возращение значения доступности двери ===
function showDoor(){
	//if (direction == 0){
	if (BDng[roomRow][roomCol].up != 'locked') $gameVariables.setValue(21, 1);
	else $gameVariables.setValue(21, 0);
	if (BDng[roomRow][roomCol].down != 'locked') $gameVariables.setValue(22, 1);
	else $gameVariables.setValue(22, 0);
	if (BDng[roomRow][roomCol].left != 'locked') $gameVariables.setValue(23, 1);  
	else $gameVariables.setValue(23, 0);
	if (BDng[roomRow][roomCol].right != 'locked') $gameVariables.setValue(24, 1);  
	else $gameVariables.setValue(24, 0);
	//return BDng[roomRow][roomCol].up;
	//if (direction == 1) return BDng[roomRow][roomCol].down;
	//if (direction == 2) return BDng[roomRow][roomCol].left;
	//if (direction == 3) return BDng[roomRow][roomCol].right;
}

function moveDoor(){
	$gameMap.event(38).setPosition(bx, by-3); //up
	$gameMap.event(35).setPosition(bx, by+3); //down
	$gameMap.event(39).setPosition(bx-3, by); //left
	$gameMap.event(37).setPosition(bx+3, by); //right
}

// === Перемещение м/у комнатами ===
function changeRoom(direction){
		if (direction == 'UP'){
			if (BDng[roomRow][roomCol].up != 'locked'){
				by = by - 9;
				roomRow--;
				$gamePlayer.reserveTransfer(10, bx, by+2, 2, 0);
				checkClearRoom();
			}
		}
		if (direction == 'DOWN'){
			if (BDng[roomRow][roomCol].down != 'locked'){
				by = by + 9;
				roomRow++;
				$gamePlayer.reserveTransfer(10, bx, by-2, 2, 0);
				checkClearRoom();
			}
		}
		if (direction == 'LEFT'){
			if (BDng[roomRow][roomCol].left != 'locked'){
				bx = bx - 8;
				roomCol--;	
				$gamePlayer.reserveTransfer(10, bx+2, by, 2, 0);
				checkClearRoom();
			}
		}
		if (direction == 'RIGHT'){
			if (BDng[roomRow][roomCol].right != 'locked'){
				bx = bx + 8;
				roomCol++;	
				$gamePlayer.reserveTransfer(10, bx-2, by, 2, 0);
				checkClearRoom();
			}
		}
		moveDoor();
		showDoor();
		
}
