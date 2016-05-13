//=============================================================================
// Bailog Character Generator
// BCG.js
// Version: 0.1
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc CharacterGenerator
 * @author Bailog
 */
//=============================================================================

var MaleName = ['Ридверг','Регад','Когрин','Мантон','Барклай','Торвальд'];
var FemaleName = ['Марга','Тарна','Аделин','Мия','Нора','Райна'];

function randomInteger(min, max) {
    var rand = min + Math.random() * (max + 1 - min);
    rand = Math.floor(rand);
    return rand;
}

function generateCharacters() {
for (var i = 1; i <= $gameVariables.value(1); i++){
	$gameActors.actor(i).clearProfileStatusText();
	for(var k = 3 ; k<=20; k++) $gameActors.actor(i).forgetSkill(k);

	var role = i;
	var charClass;
	var roll;
	
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
	
	if ($gameActors.actor(i).currentClass().id == 1){
		$gameActors.actor(i).learnSkill(4);
		$gameParty.gainItem($dataWeapons[1], 1);
		$gameActors.actor(i).changeEquip(0, $dataWeapons[1]);
	} 
	if ($gameActors.actor(i).currentClass().id == 6){
		$gameActors.actor(i).learnSkill(11);
		$gameParty.gainItem($dataWeapons[2], 1);
		$gameActors.actor(i).changeEquip(0, $dataWeapons[2]);
	} 
	if ($gameActors.actor(i).currentClass().id == 11){
		$gameActors.actor(i).learnSkill(9);
		$gameParty.gainItem($dataWeapons[3], 1);
		$gameActors.actor(i).changeEquip(0, $dataWeapons[3]);
	} 
	if ($gameActors.actor(i).currentClass().id == 16){
		$gameActors.actor(i).learnSkill(12);
		$gameParty.gainItem($dataWeapons[3], 1);
		$gameActors.actor(i).changeEquip(0, $dataWeapons[3]);
	} 
	
	
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
			$gameActors.actor(i).addProfileStatusText('passivki');
			
		}
	}
}

};
