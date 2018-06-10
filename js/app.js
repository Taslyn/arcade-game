// Enemies our player must avoid
/*var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};*/

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
class Enemy {
    constructor() {
        const startPositions = [60, 145, 230];
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = startPositions[getRandomInt(0,2)]; //60 145 230 (+85)
        this.speed = getRandomInt(1,10);
    }
    update(dt) {
        this.x += this.speed;
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

/* about game field:
for Player: 59 < y < 401; -1 < x < 401
*/

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor() {
    this.sprite = 'images/char-boy.png';
    this.initializePlayer();
  }
  initializePlayer() {
    this.x = 300;
    this.y = 400; 
  }
  update(dt) {
  }
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
  handleInput(direction) {
    switch(direction) {
        case 'left':
            if (this.x > 0) {
                this.x -= 100;
            }
            break;
        case 'up':
            if (this.y > 60) {
                this.y -= 85;
            } else { //case when Player reached the water
                this.initializePlayer();
            }
            break;
        case 'right':
            if (this.x < 400) {
                this.x += 100;
            }
            break;
        case 'down':
            if (this.y < 400) {
                this.y += 85;
            }
            break;
    }
  }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];

setInterval(function addEnemy() {
    allEnemies.push(new Enemy());
}, 1000);

setInterval(function() {
    allEnemies.forEach(function removeUnnecessaryEnemies(enemy, i) {
        if (enemy.x > 600) {
            console.log('Enemy number ' + i + ' will be removed.')
            allEnemies.splice(i,1);
        }
    })
    console.log('remaining number of Enemies: ' + allEnemies.push());
}, 5000);

let player = new Player();


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
