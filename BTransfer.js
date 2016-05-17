//=============================================================================
// Bailog Transfer
// BTransfer.js
// Version: Development state
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc Трансфер м/у комнатами подземелья.
 * @help Ивент с вызовом changeRoom(direction) где direction:
 * - UP : Перемещение на комнату выше
 * - DOWN : Перемещение на комнату ниже
 * - LEFT : Перемещение на комнату левее
 * - RIGHT : Перемещение на комнату правее
 * @author Bailog
 */
//=============================================================================

// === Параметры ===
var bx = 8, by = 9; // start point, coords
var bn = 4, bm = 3; // room arr params
var roomRow = 0, roomCol = 0;
//var CurrentRoom = [0][0];
var RoomArr = [];
var roll;
for (var i = 0; i < bm; i++){
	RoomArr[i] = [];
	for (var j = 0; j < bn; j++) RoomArr[i][j] = true;
}
RoomArr[0][0] = false;

// === Проверка, зачищена ли комната ===
function checkClearRoom(){
	if (RoomArr[roomRow][roomCol]){
		roll = Math.floor(Math.random()*10);
		if (roll > 6){
			BattleManager.setup(1, false, false);
			$gamePlayer.makeEncounterCount();
			SceneManager.push(Scene_Battle);
		}	
	}
	RoomArr[roomRow][roomCol] = false;
}
// =================================

// === Перемещение м/у комнатами ===
function changeRoom(direction){
	if (direction == 'UP'){
		by = by - 9;
		//CurrentRoom = [i--][j];
		roomRow--;
		checkClearRoom();
		$gamePlayer.reserveTransfer(10, bx, by+2, 5, 0);
	}
	if (direction == 'DOWN'){
		by = by + 9;
		//CurrentRoom = [i++][j];
		roomRow++;
		checkClearRoom();
		$gamePlayer.reserveTransfer(10, bx, by-2, 5, 0);
	}
	if (direction == 'LEFT'){
		bx = bx - 8;
		//CurrentRoom = [i][j--];
		roomCol--;
		checkClearRoom();
		$gamePlayer.reserveTransfer(10, bx+2, by, 5, 0);
	}
	if (direction == 'RIGHT'){
		bx = bx + 8;
		//CurrentRoom = [i][j++];
		roomCol++;
		checkClearRoom();
		$gamePlayer.reserveTransfer(10, bx-2, by, 5, 0);
	}
}
