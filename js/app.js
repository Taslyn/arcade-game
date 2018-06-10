// function to create a random integer in a given range
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Enemies our player must avoid
class Enemy {
    constructor() {
        const startPositions = [60, 145, 230];
        this.sprite = 'images/enemy-bug.png';
        this.x = 22;
        this.y = startPositions[getRandomInt(0,2)]; 
        this.speed = getRandomInt(1,10);
    }
    update(dt) {
        this.x += this.speed;
        // check for collision with player:
        if (this.y == player.y && this.x >= (player.x-87) && this.x <= player.x) {
            player.initializePlayer(); //bug touches player at player.x - 78
        }
    }
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// The player
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

let allEnemies = [];

setInterval(function addEnemy() {
    allEnemies.push(new Enemy());
}, 1000);

// remove enemies that are outside of game board:
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


document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
