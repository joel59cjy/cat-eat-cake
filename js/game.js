// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 618;
canvas.height = 648;
document.body.appendChild(canvas);

// Background image
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/sky.jpg";

// Hero image
var heroReady = false;
var heroImage = new Image();
heroImage.onload = function () {
	heroReady = true;
};
heroImage.src = "images/cat.png";

// cake image
var cakeReady = false;
var cakeImage = new Image();
cakeImage.onload = function () {
	cakeReady = true;
};
cakeImage.src = "images/cake.png";

// Game objects  游戏对象
var hero = {
	speed: 300 // movement in pixels per second 每秒移动的像素
};
var cake = {};
var cakesCaught = 0;

// Handle keyboard controls  处理按键
var keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

// Reset the game when the player catches a cake
var reset = function () {
	clearInterval(cakespeed);
	// Throw the cake somewhere on the screen randomly  当用户抓住一只怪物后开始新一轮游戏
	cake.x = 32 + (Math.random() * (canvas.width - 64));
	cake.y = 64
	//cake.speed
    
    var cakespeed;
    
    cakespeed = setInterval(function () {
        cake.y = cake.y + 15;
        if (cake.y >= (canvas.height - 70-32))
        {
            if (
                hero.x <= (cake.x + 32)
                && cake.x <= (hero.x + 32)
               
            ) {

                ++cakesCaught;

               

            }

        clearInterval(cakespeed);
        reset();
        }
        
  }
       , 70);
    
    
};

// Update game objects
var update = function (modifier) {
	if (37 in keysDown) { // Player holding left
		hero.x -= hero.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		hero.x += hero.speed * modifier;
	}

	// Are they touching?
	
};

// Draw everything
var render = function () {
	if (bgReady) {
		ctx.drawImage(bgImage, 0, 0);
	}

	if (heroReady) {
		ctx.drawImage(heroImage, hero.x, hero.y);
	}

	if (cakeReady) {
		ctx.drawImage(cakeImage, cake.x, cake.y);
	}

	// Score
	//ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.fillStyle = "orange";
	ctx.font = "24px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
		ctx.fillText("蛋糕数: " + cakesCaught, 32, 32);
};

// The main game loop
var main = function () {
	var now = Date.now();
	var delta = now - then;

	update(delta / 1000);
	render();

	then = now;

	// Request to do this again ASAP
	requestAnimationFrame(main);
};

// Cross-browser support for requestAnimationFrame
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;

// Let's play this game!
var then = Date.now();

hero.x = canvas.width / 2;
hero.y = canvas.height - 100;

reset();
main();