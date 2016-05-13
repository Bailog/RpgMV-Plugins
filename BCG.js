//=============================================================================
// Bailog Character Generator
// BCG.js
// Version: 0.2
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc Алгоритм рандомной генерации персонажей. Включает в себя
 * создание класса, пола, имени, выбор графики и генерацию пассивных умений.
 * @help
 * Классы:
 * 1 - Рыцарь
 * 6 - Плут
 * 11 - Архимаг
 * 16 - Клирик
 * Имена:
 * Мужские: Массив MaleName
 * Женские: Массив FemaleName
 * @author Bailog
 */
//=============================================================================

var MaleName = ['Ридверг','Регард','Когрин','Мантон','Барклай','Торвальд'];
var FemaleName = ['Марга','Тарна','Аделин','Мия','Нора','Райна'];

function randomInteger(min, max){
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function generateClass(act, skill, wep, arm){
	$gameActors.actor(act).learnSkill(skill);
	$gameParty.gainItem($dataWeapons[wep], 1);
	$gameParty.gainItem($dataArmors[arm], 1);
	$gameActors.actor(act).changeEquip(0, $dataWeapons[wep]);
	$gameActors.actor(act).changeEquip(3, $dataArmors[arm]);
	$gameActors.actor(act).gainMp(1000)
	$gameActors.actor(act).gainHp(1000)
}

function generateCharacters() {
for (var i = 1; i <= $gameVariables.value(1); i++){
	$gameActors.actor(i).clearProfileStatusText();
	for(var k = 3 ; k<=40; k++) $gameActors.actor(i).forgetSkill(k);
	var role = i;
	var charClass;
	var roll;
	
	// === Выбор класса ===
	if (role == 1) {
		charClass = 1;
		$gameActors.actor(i).changeClass(charClass, false);
	}
	
	if (role == 2){
		if ($gameVariables.value(1) == 2) {
			roll = randomInteger(2,4);
		}
		if ($gameVariables.value(1) == 3) {
			roll = randomInteger(2,3);
		}
		if ($gameVariables.value(1) == 4) {
			charClass = randomInteger(6,7);
			roll = 0;
		}
		if (roll == 2) charClass = randomInteger(6,6);
		if (roll == 3) charClass = 11;
		if (roll == 4) charClass = 16;
		
		$gameActors.actor(i).changeClass(charClass, false);
	}
	// ======================
	
	// === Создание стартовых скиллов и шмота для класса ===
	if ($gameActors.actor(i).currentClass().id == 1) generateClass(i, 10, 1, 1);
	if ($gameActors.actor(i).currentClass().id == 6) generateClass(i, 20, 2, 2);
	if ($gameActors.actor(i).currentClass().id == 11) generateClass(i, 30, 3, 3);
	if ($gameActors.actor(i).currentClass().id == 16) generateClass(i, 40, 3, 3);
	// =====================================================
	
	// === Создание пола персонажа, его имя, и спрайты ===
	roll = Math.floor(Math.random()*2);
	if (roll == 0){ 
		roll = Math.floor(Math.random()*6);
		$gameActors.actor(i).setName(MaleName[roll]);
		roll = randomInteger(0,0);
		$gameActors.actor(i).setFaceImage(String(charClass), roll);
		$gameActors.actor(i).setCharacterImage(String(charClass), roll);
		$gameActors.actor(i).setBattlerImage(String(charClass)+ '_' + String(roll));
	}
	
	if (roll == 1){
		roll = Math.floor(Math.random()*6); 
		$gameActors.actor(i).setName(FemaleName[roll]);
		roll = randomInteger(4,4);
		$gameActors.actor(i).setFaceImage(String(charClass), roll);
		$gameActors.actor(i).setCharacterImage(String(charClass), roll);
		$gameActors.actor(i).setBattlerImage(String(charClass)+ '_' + String(roll));
	}
	// =========================================
	
	// === Генератор пассивок ===
	var traitArr = Array(4);
	var min = 22;
	var max = 28;
	var len = max - min;
	max = len - traitArr.length;
	traitArr.length = len;
	for (var a = traitArr.length-1; 0 <= a; a--){
		if(a < max) {break;}
		var b = Math.floor(Math.random() * a),
		c = void 0 === traitArr[b] ? (b + min) : traitArr[b];
		traitArr[b] = void 0 === traitArr[a] ? (a + min) : traitArr[a];
		traitArr[a] = c;
	}
	traitArr.reverse();
	traitArr.length -= max;
	
	for (var j = 0; j < 3; j++){
		if (traitArr[j] == 22){
			$gameActors.actor(i).addProfileStatusText('passivki indev');
			
		}
	}
	// =========================================
}
	
};