// See snake.js for an explanation of the class.
class Food {
    // See snake.js for an explanation of the purpose of constructor().
    constructor(canvasWidth, canvasHeight, gridScale) {
        // See constructor() in snake.js for an explanation of the following five lines of code.
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.gridScale = gridScale;
        this.gridWidth = floor(this.canvasWidth / this.gridScale); // Here, we save gridWidth as a "this." member variable so we can use it newLocation().
        this.gridHeight = floor(this.canvasHeight / this.gridScale); // Similarly.

        this.location = null; // Create a variable to store our location (as a vector) but don't add a value yet (null essentially means nothing).

        this.snake = null; // Variable to store a reference to our snake variable from sketch.js; see snake.js at "this.food = null" for a fuller explanation.
    }

    // We don't need an update() function because the food is static except when the snake touches it.
    // We prefer to keep the overall update logic as simple as possible, so we'll let the Snake class handle the intersection of snake and food as it has an update() function anyway.

    // draw() will draw the food.
    draw() {
        // See Snake.draw() for an explanation of the code used here.
        // NOTICE: Here, we don't use a forEach() function because the food only ever has one square to draw.

        var x = this.location.x * this.gridScale; // Scale grid coordinates up to canvas coordinates; see snake.js
        var y = this.location.y * this.gridScale; // Similarly

        strokeWeight(2); // Set border thickness to 2 pixels
        stroke(51, 51, 51); // Set border color to RGB(51, 51, 51) - again, feel free to customize this!
        fill(0, 0, 255); // Set fill colour to blue. Customize!! :)

        rect(x, y, this.gridScale, this.gridScale); // Draw rectangle with top-left corner at (x, y), width "this.gridScale", and height "this.gridScale".
    }

    // We know the food is placed at a random location when:
    //   (a) The game starts;
    //   (b) The snake eats the food.
    // Let's create a function called newLocation() which will randomly generate a new location for the food.
    // This will make game logic easier to manage and also make our code more legible - "food.newLocation()" has an obvious intention and effect.
    newLocation() { // Begin code run when newLocation() is called
        // random() is a p5js function that returns a random number depending on what information you provide it.
        // random([a]) return a random decimal number from 0 up to (but not including) a.
        // So, random(5) would return any number in [0,5[ or [0,5) depending on how you write interval notation. :)
        // We use floor() because you can't have a fractional or decimal location.
        // NOTICE: It's impossible to overstate just how essential a skill reading documentation is to any programmer.
        // I highly encourage you to read the documentation for the random() function and learn about other ways it can be used.
        // Documentation at: https://p5js.org/reference/#/p5/random

        // We create the x- and y-coordinates for the new location.
        var x = floor(random(this.gridWidth)); // x will be a random number between 0 and (grid width - 1). This ensures that it will be a valid top left corner.
        var y = floor(random(this.gridHeight)); // Similarly with 0 to (grid height - 1). See above explanation of random() for why (grid height - 1) and not simply (grid height).
        this.location = createVector(x, y); // Store new location as a vector in our "this.location" variable

        // We have a pretty big problem here. If the food is randomly placed at the same location as the snake, the snake will automatically eat it - free points!
        // This is bad game behaviour, but, luckily, it's a pretty easy fix.

        // We check if our randomly generated x- and y-coordinates are equal to the x- and y-coordinates of the head of the snake.
        var snakeHead = this.snake.body[0]; // "this.body[0]" accesses the 1st square (arrays are 0-based) in the body - the head square.

        // The following of code translates to:
        // If the food's x-coordinate is equal to the snake head's x-coordinate, AND the food's y-coordinate is equal to the snake head's y-coordinate, do what's in the {}'s.
        // The JS symbol for "is equal to" is "==". The JS symbol for "and" is "&&".
        if (x == snakeHead.x && y == snakeHead.y) { // Begin code run if both x- and y-coordinates are equal between snake head and food
            // This is going to be a bit confusing, but it's totally allowed and a very effective strategy.
            // We're going to actually run the newLocation() function from inside the newLocation() function.
            // This ia a programming tool called recursion, and it's very powerful as long as you're careful about it.
            this.newLocation(); // Run newLocation() again to try randomly generating a different location.
        } // End if code
    } // End newLocation()
}