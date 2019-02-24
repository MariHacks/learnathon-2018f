// This file, sketch.js, contains the functions that work directly with p5.js - setting up the game, drawing the game, and handling user input.
// In it, we'll keep track of all the moving parts of the game, such as the food and the snake.
// We'll also use it to store information on the dimensions of the game system.

// To start, we'll create variables that will store the size of our canvas and our grid, which we'll use to draw the game.
// Remember that a variable is a part of the memory's computer used to store one piece of information.
// We'll use one variable for each piece of information.
var canvasWidth = 700; // "var" means we're creating a variable; "=" stores a value in that variable. NOTICE THE SEMICOLON. All lines MUST end in a semicolon or { };
var canvasHeight = 500; // Similarly, create variable "canvasHeight" with value 500 pixels.

// Our grid will be made up of a rectangular matrix of squares.
var gridScale = 25; // This variable specifies the width and height in pixels of the squares we'll be using for our grid.

// Next, we create variables to keep track of the snake and the food.
var snake;
var food;
// Notice that we just declare the variables without assigning them values.
// This is because we wait until the setup() function to actually create the snake and the food.

// Remember that a function is a block of code designed to perform a specific task.
// For example, a toast() function could make you toast.

// The setup() function is a function that p5.js uses to set up all the different elements of the game before gameplay starts.
// We'll add code to set up the game area, the food, and the snake.
function setup() { // This opening curly brace means that we're beginning the code inside the function.
    createCanvas(canvasWidth, canvasHeight); // This creates a new canvas using the dimensional information we set up at the top.

    // In order to make the game playable at a reasonable pace, we limit the game's FPS count.
    // FPS stands for Frames Per Second, which is the frame rate - how many times per second the game updates and re-draws itself.
    // We'll limit the game to 6 FPS. Feel free to tweak this to your taste.
    frameRate(6); // frameRate() is a p5.js function to set the frame rate.

    // We create an instance of the Snake class and store it in our snake variable.
    // If a class is a category of object, an instance is an object in that category.
    // An instance of the Dog class could be Snoopy. An instance of the Cat class could be Garfield or the Cat in the Hat.
    // NOTICE: Class names are Capitalized, whereas variable names are not.
    snake = new Snake(canvasWidth, canvasHeight, gridScale); // We pass the Snake the information it will need to draw itself on the canvas.

    // Do the same to create and store a Food instance.
    food = new Food(canvasWidth, canvasHeight, gridScale); // Similarly, pass information necessary to draw the food.

    snake.food = food; // Pass the snake variable a reference to our food variable so it can use it in its logic. See Snake.constructor() for more details.
    food.snake = snake; // Pass snake to food; see Food.constructor().

    food.newLocation(); // Randomly generate a location for the food.
} // This closing curly brace means that we're ending the code inside the function.

// The draw() function is a function that p5.js uses to refresh the state of the game many times per second.
// We call it a loop because it runs a many times instead of just once.
// This function will keep track of movement, eating, and growing, and also draw the food and the snake.
function draw() { // Begin the code inside draw()
    // What we draw depends on whether the snake is alive or dead.
    // If it's dead, we just want to draw a plain red background.
    // If it's alive, we want to actually update and draw the game.
    if (snake.dead) { // Begin code if the snake is dead
        // We fill the canvas we've created in setup() with a red background.
        // To do this, we use p5.js's background() function, to which we pass 3 pieces of information: R, G, and B.
        // In programming and general informatics, we describe colors by the amount of red, green, and blue (RGB) in the picture.
        // These values are on a scale from 0 to 255. Red, therefore, is RGB(255, 0, 0) because it has only red in it. Let's do it!
        background(255, 0, 0);
    } else { // As explained in Snake.update(), "else" runs the following code if the opposite of the "if" is true - if the snake is NOT dead, the following will happen.
        // See above explanation of background().
        background(0, 0, 0);

        // Next, we update the game logic of the moving parts of the game.
        // As the snake moves, we update its logic by calling the update function inside the Snake class.
        snake.update();

        // Finally, we draw the elements of the game to the screen.
        // NOTICE: We draw the food before the snake.
        // This is because, if the snake is eating the food, we want to see the head of the snake and not the food.
        // Drawing the snake second will draw the snake over the food if the food and the snake overlap.
        food.draw();
        snake.draw();
    }
} // End draw() code

// The keyPressed() function is a p5.js function that gets called whenever the user presses a key on their keyboard.
// We'll use it to manage movement.
function keyPressed() {
    // We need to figure out what key was pressed so we can respond accordingly.

    // The following code checks if the key that was pressed was the left arrow.
    // "keyCode" is a p5.js variable that will contain the ID (identifier of the key that was pressed).
    // "LEFT_ARROW" is a p5.js variable that stores the specific ID of the left arrow key.
    if (keyCode == LEFT_ARROW) { // Begin code run if left arrow pressed
        snake.setSpeed(-1, 0); // We set the snake's x-speed to -1 and its y-speed to 0 - moving left.
    } // End left arrow code

    if (keyCode == RIGHT_ARROW) { // Begin right arrow code
        snake.setSpeed(1, 0); // We set the snake's x-speed to +1 and its y-speed to 0 - moving right.
    } // End right arrow code

    if (keyCode == UP_ARROW) {
        snake.setSpeed(0, -1); // We set the snake's x-speed to 0 and its y-speed to -1 - moving up. NOTICE: Remember that here, the +y direction is downwards.
    }

    if (keyCode == DOWN_ARROW) {
        snake.setSpeed(0, 1); // We set the snake's x-speed to 0 and its y-speed to 1 - moving down.
    }
}