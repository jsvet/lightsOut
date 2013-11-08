var Game = {
	stage : new createjs.Stage($("#stage") ),
	tileSrcs : ["img/small-dark-mushroom.png", "img/small-mushroom.png"],
	tiles : [],
	offsetX : 22,
	offsetY : 22,
	winTileType: 0,
	currentLevel : 0,
	clicks : 0
};

Game.levels = [
{ /* Level 1*/
	perfect : 5,
	good : 8,
	ok : 12,
	grid: [
		[1, 0, 0, 0, 0],
		[0, 1, 0, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0],
		[0, 0, 0, 0, 1]
	]
},
{/* Level 2*/
	perfect : 5,
	good : 8,
	ok : 12,
	grid: [
		[0, 0, 0, 0, 1],
		[0, 0, 0, 1, 0],
		[0, 0, 1, 0, 0],
		[0, 1, 0, 0, 0],
		[1, 0, 0, 0, 0]
	]
},
{/* Level 3*/
	perfect : 5,
	good : 8,
	ok : 12,
	grid: [
		[1, 0, 0, 0, 0],
		[0, 1, 0, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0],
		[0, 0, 0, 0, 1]
	]
},
{/* Level 4*/
	perfect : 5,
	good : 8,
	ok : 12,
	grid: [
		[1, 0, 0, 0, 0],
		[0, 1, 0, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0],
		[0, 0, 0, 0, 1]
	]
},
{/* Level 5*/
	perfect : 5,
	good : 8,
	ok : 12,
	grid: [
		[1, 0, 0, 0, 0],
		[0, 1, 0, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0],
		[0, 0, 0, 0, 1]
	]
},
{/* Level 6*/
	perfect : 5,
	good : 8,
	ok : 12,
	grid: [
		[1, 0, 0, 0, 0],
		[0, 1, 0, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0],
		[0, 0, 0, 0, 1]
	]
},
{/* Level 7*/
	perfect : 5,
	good : 8,
	ok : 12,
	grid: [
		[1, 0, 0, 0, 0],
		[0, 1, 0, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0],
		[0, 0, 0, 0, 1]
	]
},
{/* Level 8*/
	perfect : 5,
	good : 8,
	ok : 12,
	grid: [
		[1, 0, 0, 0, 0],
		[0, 1, 0, 0, 0],
		[0, 0, 1, 0, 0],
		[0, 0, 0, 1, 0],
		[0, 0, 0, 0, 1]
	]
}
];

winLevelState = [
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0],
	[0, 0, 0, 0, 0]
];

Game.Tile = function (myX, myY, myType){
	var my = new createjs.Bitmap(Game.tileSrcs[myType]);
	my.type = myType;
	my.posX = myX;
	my.posY = myY;
	my.x = my.posX * my.image.width + Game.offsetX;
	my.y = my.posY * my.image.height + Game.offsetY;
	
	my.update = function (){
		my.image.src = Game.tileSrcs[my.type];
	};
	
	my.addEventListener("mousedown", function(){
		var i, tempTile, tilesToToggle;
		tilesToToggle = Game.getTilesToToggle(my.posY, my.posX);
		for (i=0; i<tilesToToggle.length; i+=1){
			tempTile = tilesToToggle[i];
			tempTile.toggle();
		}
	});
	
	my.toggle = function(){
		if (my.type === 1){
			my.type = 0;
		} else {
			my.type = 1;
		}
		Game.update();
	};
	return my;
};

Game.getTilesToToggle = function (ty, tx){
	var toggleThese = [],
		tileLeft,
		tileRight,
		tileAbove,
		tileBelow,
		currentTile = Game.tiles[ty][tx];
	toggleThese.push(currentTile);
	if(tx - 1 >= 0){
		tileLeft = Game.tiles[ty][tx - 1];
		toggleThese.push(tileLeft);
	}
	if(tx + 1 <= 4){
		tileRight = Game.tiles[ty][tx + 1];
		toggleThese.push(tileRight);
	}
	if(ty - 1 >= 0){
		tileAbove = Game.tiles[ty -1][tx];
		toggleThese.push(tileAbove);
	}
	if(ty + 1 <= 4){
		tileBelow = Game.tiles[ty + 1][tx];
		toggleThese.push(tileBelow);
	}
	return toggleThese;
};

Game.isLevelOver = function(){
	var isWon = true, col, row;
	for (row = 0; row < Game.tiles.length; row += 1){
		for (col = 0; col < Game.tiles[row].length; col += 1){
			tile = Game.tiles[row][col];
			if (tile.type !== 0){
			isWon = false;
			break;
			}
		}
	}
	return isWon;
};

Game.levelOver = function(){
	console.log("LEVEL COMPLETED");
};

Game.showNextLevelBtn = function (){
	var btn = new createjs.Text("NEXT LEVEL >>", "18px Arial", "#FFF"),
		hitarea = new createjs.Shape(),
		hitW = btn.getMeasuredWidth(),
		hitH = btn.getMeasuredHeight(),
		hitX,
		hitY;
	
	btn.x = 100;
	btn.y = 100;
	hitX = btn.x;
	hitY = btn.y;
	
	hitarea.graphics.beginFill("#069").drawRect(hitX,hitY,hitW,hitH);
	
	Game.stage.addChild(hitarea);
	Game.stage.addChild(btn);
	Game.stage.update();
	return hitarea;	
};

Game.showLevelOver = function(){
	Game.stage.removeAllChildren();
	var hitarea = Game.showNextLevelBtn();
	
	Game.tiles = [];
	Game.currentLevel += 1;
	
	hitarea.addEventListener("mousedown", function(){
		Game.stage.removeAllChildren();
		Game.initModel();
	});
};

Game.update = function() {
	var row, col, tile;
	for (row = 0; row < Game.tiles.length; row += 1){
		for (col = 0; col < Game.tiles[row].length; col += 1){
			tile = Game.tiles[row][col];
			tile.update();
		}
	}
	if(Game.isLevelOver()){
		Game.levelOver();
		Game.showLevelOver();
	}
	Game.stage.update();
};

Game.initModel = function (){
	var type, col, row, tileRow, tile;
	Game.level = Game.levels[Game.currentLevel].grid;
	for (row =0; row < Game.level.length; row +=1){
		tileRow = [];
		for (col=0; col <Game.level[row].length; col +=1){
			type = Game.level[row][col];
			tile = new Game.Tile(col, row, type);
			tileRow.push(tile);
			Game.stage.addChild(tile);
		}
		Game.tiles.push(tileRow);
	}
	Game.stage.update();
};

Game.preloader = new createjs.LoadQueue(false);
Game.preloader.addEventListener("complete", Game.initModel);
Game.preloader.loadManifest(Game.tileSrcs);



