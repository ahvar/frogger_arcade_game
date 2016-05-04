// Enemies our player must avoid
var Enemy = function(x,y) {

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.iniLocation;
    this.random_speed = Math.floor(Math.random() * (300 - 80)) + 80;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
// Multiply any movement by the dt parameter to ensure game runs at the same speed for all computers.
Enemy.prototype.update = function(dt) {

	this.x = this.x + this.random_speed * dt;
	if (this.x > 600) {
		this.x = 0;
	} return;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// The Player class requires an update(), render() and
// a handleInput() method.
// function accepts x, y coordinates to determine position and defines what image to use
var Player = function(x,y) {
	this.sprite = 'images/char-boy.png';
	this.x = x;
	this.y = y;
};

// if the collision method returns true, then the resetPlayer method is called to reset the game
// the player cannot move outside of the boundaries of the canvas
// when the player reaches the water, the game is won and the player returns to the start position
Player.prototype.update = function(dt) {
	
	if (this.collision() === true) {
		this.resetPlayer();
	} else if (this.y <= 40 || this.x > 505) {
		this.resetPlayer();
	} else if (this.x < 40) {
		this.x = 0;
	} else if (this.x > 400) {
		this.x = 400;
	} else if (this.y < 40) {
		this.y = 0;
	} else if (this.y > 400) {
		this.y = 400;
	}
};

Player.prototype.render = function() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// the handleInput method adjusts the player's position based on input from the event listener
Player.prototype.handleInput = function(key) {
	switch (key) {
	case 'left':
		this.x = this.x - 40;
		break;
	case 'right':
		this.x = this.x + 40;
		break;
	case 'up':
		this.y = this.y - 40;
		break;
	case 'down':
		this.y = this.y + 40;
		break;
	}
}


//Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(450,100), new Enemy(-300,200), new Enemy(100,200)];

//Place the player object in a variable called player
var player = new Player(100,400);

// collision method iterates over allEnemies array  and tests the enemy at each index to see if its coordinates overlap
// with the player coordinates.  If so, it returns true, false otherwise.
Player.prototype.collision = function() {
	var p = this;
	var e = false;
	allEnemies.forEach(function(enemy){
		if(p.x < enemy.x + 35 && p.x + 33 > enemy.x && p.y < enemy.y + 35 && 
				p.y + 35 > enemy.y) {
			e = true;
		} else {
			f = false;
		}
	});
	return e;
}

// resets the player to the initial location
Player.prototype.resetPlayer = function() {
	
	{
		this.x = 200;
		this.y = 400;
		this.sprite = 'images/char-boy.png';
	}
}


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
