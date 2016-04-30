//=============================================================================
// Bailog Mail
// BMail.js
// Version: 0.1
//=============================================================================

//=============================================================================
 /*:
 * @plugindesc Mailbox Plugin - Includes inbox and daily gifts
 * @author Bailog
 */
//=============================================================================
 
//=============================================================================
//	Bailog_Mail_MsgWindow
//	Desc: Главное окно почтового ящика.
//============================================================================= 

var mailArray = [
    {
        "id": "0",
		"title": "Mail Test",
        "sender": "Bailog",
        "msg": "Testing mail send plugin"
    },
    {
        "id": "1",
		"title": "Big title overall yeah sure",
        "sender": "Bailog",
        "msg": "Big message contains a lot of text and have testing only purpose"
    },
	{
        "id": "3",
		"title": "кек",
        "sender": "Kto",
        "msg": "Chto"
    },
    {
        "id": "4",
		"title": "DLC",
        "sender": "EA",
        "msg": "only for -50$- 49.9999$ weekly DEAL!!!"
    }
];


//=============================================================================
//	Bailog_Mail_SelectWindow
//	Desc: Меню выбора ящика
//============================================================================= 

function Bailog_Mail_SelectWindow(){
	this.initialize.apply(this, arguments);
};

Bailog_Mail_SelectWindow.prototype = Object.create(Window_Command.prototype);
Bailog_Mail_SelectWindow.prototype.constructor = Bailog_Mail_SelectWindow;

Bailog_Mail_SelectWindow.prototype.initialize = function(x, y, width, height){
	width = Graphics.width / width;
	height = Graphics.height / height;
	Window_Command.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
	this.select(0);
    this.activate();
};

Bailog_Mail_SelectWindow.prototype.makeCommandList = function() {
    this.addCommand("Inbox", 'mail');
	this.addCommand("Gifts", 'reward');
};

/*Bailog_Mail_SelectWindow.prototype.windowWidth = function(){
	return Graphics.width /4 ;
};

Bailog_Mail_SelectWindow.prototype.windowHeight = function(){
	return Graphics.height /5 ;
};*/

Bailog_Mail_SelectWindow.prototype.clearCommandList = function() {
    this._list = [];
};

Bailog_Mail_SelectWindow.prototype.refresh = function() {
    this.clearCommandList();
    this.makeCommandList();
    this.createContents();
    Window_Command.prototype.refresh.call(this);
};



//=============================================================================
//	Bailog_Mail_Window
//	Desc: Список писем
//============================================================================= 

function Bailog_Mail_Window() {
    this.initialize.apply(this, arguments);
}

Bailog_Mail_Window.prototype = Object.create(Window_Command.prototype);
Bailog_Mail_Window.prototype.constructor = Bailog_Mail_Window;

Bailog_Mail_Window.prototype.initialize = function(x, y, width, height) {
    width = Graphics.width / width;
	height = Graphics.height / height;
	Window_Command.prototype.initialize.call(this, x, y, width, height); //Window_Selectable alt
    this.refresh();
    this.select(0);
};

Bailog_Mail_Window.prototype.makeCommandList = function() {
    var i = 0;
	for(i=0; i < mailArray.length; i++){
		console.log(mailArray[i].title);
		this.addCommand(mailArray[i].title, mailArray[i].id);
	}
};

Bailog_Mail_Window.prototype.refresh = function() {
	//this.clearCommandList();
    this.makeCommandList();
	this.createContents();
    Window_Command.prototype.refresh.call(this);
};



//=============================================================================
//	Bailog_Mail_MsgWindow
//	Desc: Содержание письма
//============================================================================= 

function Bailog_Mail_MsgWindow(){
	this.initialize.apply(this, arguments);
};

Bailog_Mail_MsgWindow.prototype = Object.create(Window_Base.prototype);
Bailog_Mail_MsgWindow.prototype.constructor = Bailog_Mail_MsgWindow;

Bailog_Mail_MsgWindow.prototype.initialize = function(x, y, width, height){
	width = Graphics.width / width;
	height = Graphics.height / height;
	//this._opening = false;
    //this._closing = false;
	Window_Base.prototype.initialize.call(this, x, y, width, height);
	this.refresh();
};

/*Bailog_Mail_MsgWindow.prototype.windowWidth = function(){
	return Graphics.width / 4 ;
};

Bailog_Mail_MsgWindow.prototype.windowHeight = function(){
	return Graphics.height / 3 ;
};*/

/*Bailog_Mail_MsgWindow.prototype.close = function() {
    if (!this.isClosed()) {
        this._closing = true;
    }
    this._opening = false;
};*/

Bailog_Mail_MsgWindow.prototype.refresh = function(){
	var x = this.textPadding();
	var width = this.contents.width - this.textPadding() * 2;
	this.contents.clear();
	this.showMessage(x,width);
};

Bailog_Mail_MsgWindow.prototype.showMessage = function(x,width){
	//var width = this.contents.width - this.textPadding() * 2;
	this.drawText("2123" + mailArray[0].sender, x, 0, width);
};














//============================================================================= 
//============================================================================= 
//============================================================================= 
//============================================================================= 




//=============================================================================
//	Bailog_Mail_Scene
//	Desc: Объект главного окна ящика
//=============================================================================

function Bailog_Mail_Scene(){
	this.initialize.apply(this, arguments);
};

Bailog_Mail_Scene.prototype = Object.create(Scene_MenuBase.prototype);
Bailog_Mail_Scene.prototype.constructor = Bailog_Mail_Scene;

Bailog_Mail_Scene.prototype.initialize = function(){
	Scene_MenuBase.prototype.initialize.call(this);
	//this.refresh();
};

Bailog_Mail_Scene.prototype.create = function(){
	Scene_MenuBase.prototype.create.call(this);
	this.createSelect();
};

Bailog_Mail_Scene.prototype.createSelect = function(){
	Scene_MenuBase.prototype.create.call(this);
	this._mboxselect = new Bailog_Mail_SelectWindow(0,0);
	this._mboxselect.x = Graphics.width / 2.8 ;
	this._mboxselect.y = Graphics.height / 3 ;
	this._mboxselect.setHandler('mail', this.commandMail.bind(this));
	this._mboxselect.setHandler('reward', this.commandReward.bind(this));
	this.addWindow(this._mboxselect);
};

Bailog_Mail_Scene.prototype.update = function(){
	Scene_MenuBase.prototype.update.call(this);
	if (Input.isTriggered('cancel')){
		SoundManager.playCancel();
		SceneManager.goto(Scene_Map);
	}
};

Bailog_Mail_Scene.prototype.start = function(){
	Scene_MenuBase.prototype.start.call(this);
	this._mboxselect.refresh();
};

Bailog_Mail_Scene.prototype.commandMail = function() {
    SceneManager.push(Bailog_Mail_Inbox);
};

Bailog_Mail_Scene.prototype.commandReward = function() {
    SceneManager.push(Bailog_Mail_Reward);
};



//=============================================================================
//	Bailog_Mail_Inbox
// 	Desc: Объект писем
//=============================================================================
function Bailog_Mail_Inbox(){
	this.initialize.apply(this, arguments);
};

Bailog_Mail_Inbox.prototype = Object.create(Scene_MenuBase.prototype);
Bailog_Mail_Inbox.prototype.constructor = Bailog_Mail_Inbox;

Bailog_Mail_Inbox.prototype.initialize = function(){
	Scene_MenuBase.prototype.initialize.call(this);
	//this.refresh();
};

Bailog_Mail_Inbox.prototype.create = function(){
	Scene_MenuBase.prototype.create.call(this);
	this.createSelect();
	this.createMessage();
};
 
Bailog_Mail_Inbox.prototype.createSelect = function(){
	Scene_MenuBase.prototype.create.call(this);
	this._mboxmailid = new Bailog_Mail_Window(0,0);
	this._mboxmailid.x = Graphics.width / 8 ;
	this._mboxmailid.y = Graphics.height / 8 ;
	this._mboxmailid.width = Graphics.width / 4 ;
	this._mboxmailid.height = Graphics.height / 1.35;
	this._mboxmailid.setHandler(mailArray[0].id, this.mailOpen.bind(this));
	/*var i = 0;
	for(i=0; i < mailArray.length; i++){
		this._mboxmailid.setHandler(mailArray[i].id, this.mailOpen.bind(this));
	}*/
	this.addWindow(this._mboxmailid);
	//this.createCommandWindow();
};

Bailog_Mail_Inbox.prototype.createMessage = function(){
	//Scene_MenuBase.prototype.create.call(this);
	this._mboxmsg = new Bailog_Mail_MsgWindow(0,0);
	this._mboxmsg.x = Graphics.width / 2.67 ;
	this._mboxmsg.y = Graphics.height / 8 ;
	this._mboxmsg.width = Graphics.width / 2;
	this._mboxmsg.height = Graphics.height / 1.35;
	this.addWindow(this._mboxmsg);
	//this.createCommandWindow();
};

Bailog_Mail_Inbox.prototype.update = function(){
	Scene_MenuBase.prototype.update.call(this);
	if (Input.isTriggered('cancel')){
		SoundManager.playCancel();
		SceneManager.goto(Scene_Map);
	}
};

Bailog_Mail_Inbox.prototype.start = function(){
	Scene_MenuBase.prototype.start.call(this);
	this._mboxmailid.refresh();
	this._mboxmsg.refresh();
};

Bailog_Mail_Inbox.prototype.mailOpen = function() {
	this._mboxmsg.refresh();
};




















//=============================================================================
//	Bailog_Mail_Reward
// 	Desc: Объект наград
//=============================================================================
/*function Bailog_Mail_Reward(){
	this.initialize.apply(this, arguments);
};

Bailog_Mail_Reward.prototype = Object.create(Scene_MenuBase.prototype);
Bailog_Mail_Reward.prototype.constructor = Bailog_Mail_MsgWindow;

Bailog_Mail_Reward.prototype.initialize = function(){
	Scene_MenuBase.prototype.initialize.call(this);
	//this.refresh();
};

Bailog_Mail_Reward.prototype.create = function(){
	Scene_MenuBase.prototype.create.call(this);
	this.createWindow();
	//this.createSelect();
};
 
Bailog_Mail_Reward.prototype.createWindow = function(){
	Scene_MenuBase.prototype.create.call(this);
	this._mboxmaillist = new Bailog_Mail_MsgWindow(0,0,2.5,3);
	this._mboxmaillist.x = Graphics.width / 4 ;
	this._mboxmaillist.y = Graphics.height / 4 ;
	//this._mboxmenuWindow.setHandler('mail', this.commandMail.bind(this));
	this.addWindow(this._mboxmaillist);
	//this.createCommandWindow();
};

Bailog_Mail_Reward.prototype.update = function(){
	Scene_MenuBase.prototype.update.call(this);
	if (Input.isTriggered('cancel')){
		SoundManager.playCancel();
		SceneManager.goto(Scene_Map);
	}
};

Bailog_Mail_Reward.prototype.start = function(){
	Scene_MenuBase.prototype.start.call(this);
	this._mboxmaillist.refresh();
};
*/