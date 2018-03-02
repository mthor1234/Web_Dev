// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size){
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.color = color;
    this.size = size;
}

Ball.prototype.draw = function(){
    ctx.beginPath();    // States that we want to draw a shape
    ctx.fillStyle = this.color; // Define the color that we want the shape to be
    
    // Define the arc (x, y center, radius of arc, Start angle, end angle in radians)
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); 
    ctx.fill(); // Finish the drawing
    
}


// Update the ball's velocities.
// Redirect ball velocity if it hits the edge of canvas
Ball.prototype.update = function(){
    if ((this.x + this.size) >= width){
        this.velX = -(this.velX);
    }
    if ((this.x + this.size) <= 0){
        this.velX = -(this.velX);
    }
    if ((this.y + this.size) >= height){
        this.velY = -(this.velY);
    }
    if ((this.y + this.size) <= 0){
        this.velY = -(this.velY);
    }
    
    this.x += this.velX;
    this.y += this.velY;
}


// Change color of balls when they collide
Ball.prototype.collisionDetect = function(){
    for ( var j = 0; j < balls.length; j++){
        if ( ! ( this === balls[j])){
            var dx = this.x - balls[j].x;
            var dy = this.y - balls[j].y;
            
            var distance = Math.sqrt(dx * dx + dy * dy);
            
            if(distance < this.size + balls[j].size){
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
            
        }
    }
}

// Holds our balls
var balls = [];


// Animation loop
function loop(){
    // Repaints over the canvas so old ball drawings don't appear
    ctx.fillStyle = 'rgba(0, 0, 0, 0.50)';
    ctx.fillRect(0, 0, width, height);
    
    
    while(balls.length < 25){
        var ball = new Ball(
        random(0, width),
        random(0, height),
        random(-7, 7),
        random(-7, 7),
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        random(10, 20)
        );
        balls.push(ball);
    }
    
    for( var i = 0; i < balls.length; i++){
        balls[i].draw();
        balls[i].update();
        balls[i].collisionDetect();
    }
    
    requestAnimationFrame(loop);
}

loop();