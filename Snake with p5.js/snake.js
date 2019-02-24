// Remember the example of the Dog class. A class serves to model a category of objects.
// Classes are very powerful tools because they keep characteristics and behaviour pertaining to our object all in one place.
// This lets us think logically without having to worry about our code getting too messy.
// We store each class in a new file.
class Snake { // Begin code inside Snake class
    // NOTICE: Functions defined inside classes do not start with the function key word.
    // Compare this to sketch.js, where we do use the function keyword.

    // The constructor() function is an important function for every JS class.
    // It sets up the different elements of the class, and is automatically called when you say new <Class>() (in our case: "new Snake()" - see sketch.js for when we do this).
    constructor(canvasWidth, canvasHeight, gridScale) { // Begin constructor() code
        // Remember that the constructor() function is expecting the data we passed it in sketch.js (see setup()).
        // We'll take this information and store it as characteristics (formally "members") of the Snake class.
        this.canvasWidth = canvasWidth; // "this.___" tells JS to modify/use a class member. "this.canvasWidth" is a member; "canvasWidth" is the data passed to constructor().
        this.canvasHeight = canvasHeight; // Similarly.
        this.gridScale = gridScale;

        // We store the body of the snake in the form of an array.
        // While a normal variable holds one piece of data, an array is a list of different pieces of data.
        // We'll store the body as a list of the squares making up the body.
        // Each square is stored as a vector containing the (x,y) coordinates of the square on the grid, where a vector is just a pair of any 2 numbers.
        this.body = []; // Create an empty array as a class member called "this.body".

        // We calculate the dimensions of the grid so we can add the first square of the body at the middle of the grid.
        // The canvas is composed of a certain number of squares of length and width "gridScale".
        // Therefore, the grid width in number of squares is the canvas width divided by "gridScale".
        var gridWidth = floor(this.canvasWidth / this.gridScale); // NOTICE: We use the floor() function to round down our result - you can't have half a square!
        var gridHeight = floor(this.canvasHeight / this.gridScale);

        // The middle square will be halfway along the grid both width-wise and height-wise.
        // Therefore, the (x,y) coordinates of the middle square will be half the grid width and height.
        var x = floor(gridWidth / 2); // Again, notice the use of floor().
        var y = floor(gridHeight / 2);
        // We create the vector to store this square and add it to the body.
        this.body.unshift(createVector(x, y)); // [array].unshift() is a JS function to add something to the front of the array. We add our new square as the head of the snake.

        // We need to keep track of the speed of the snake so we know where it's moving.
        // We'll create variables to hold the speed of the snake in the x- and y-directions.
        // The speed will always be either -1, 0, or 1.
        // -1 indicates negative movement on the axis, 1 indicates positive movement on the axis, and 0 indicates no movement on the axis.
        // NOTICE: In a standard cartesian plane, the +y direction is up. Here, the +y direction is down, and the -y direction is up.
        this.xSpeed = 0; // Initialize x-speed to 0 so snake will not move along the x-axis when the game starts.
        this.ySpeed = 0; // Similarly for y-speed.
        // We only want to allow speed changes once per frame. This is because multiple speed changes in one frame will lead to strange glitches and bad gameplay.
        // Feel free to figure out for yourself how to disable this check and see what happens.
        this.speedChangedThisFrame = false; // Start it as false so movement can happen immediately

        // We'll need to use the food variable in sketch.js for logic later on in this file. We'll create a variable to hold a reference to it.
        // A reference just means that the "this.food" variable we create in Snake will be the same food as in sketch.js.
        this.food = null; // Create the variable with no value, expecting sketch.js to set it up once the food variable is created.

        this.dead = false; // This variable will keep track of whether or not the snake is dead. Obviously, the snake starts off alive. :)
        // The snake dies when hits a wall. It will be useful to us to calculate the borders coordinates of the grid so we can more easily check for death.
        // We find the x- and y-coordinates for the left, right, upwards, and downwards borders.
        // Recall that these coordinates will refer to the top left corner of a square in question, and that the +y direction is downwards.
        this.borderLeft = 0;
        this.borderRight = gridWidth - 1; // Remember that coordinates are 0-based in almost all programming languages. Make sure you can visualize why this works.
        this.borderUp = 0;
        this.borderDown = gridHeight - 1; // Similarly.
    } // End constructor() code

    // The update() function manages the game logic associated with the snake.
    // It will keep track of movement and growth.
    update() { // Begin update() code
        // First, reset the "this.speedChangedThisFrame" variable.
        // update() is called at the beginning of each frame; therefore, we reset this logical tracker for this frame.
        this.speedChangedThisFrame = false;

        // We'll need to use the old head of the snake in several different places in update(), so let's grab it and store it in a variable right away.
        var oldHead = this.body[0]; // We store the old head square in a variable. "this.body[0]" accesses the 1st square (arrays are 0-based) in the body - the head square.

        // Next, we move the snake. Our movement logic is relatively simple.
        // First, you determine where the head of the snake will be on the next frame using the x-speed and the y-speed.
        // Then, you add a square at that new head location, and remove the square at the tail location.
        // This is equivalent to moving the snake 1 square forward in its direction of movement.
        // However, as will be explained in the code block, we don't remove the tail square of the snake if the head of the snake is at the food.
        // Adding a new head at the front but not removing the tail will increase the length of the snake by 1, which is what we want to happen when the snake eats the food.

        // We check if the snake is currently moving. An English translation of the following line of code is:
        // "If this.xSpeed is not 0, OR this.ySpeed is not 0..."
        // The JS symbol for "is not" is "!=". The JS symbol for "OR" is "||".
        // Should our if statement return a value of True, we know that there is movement along at least one axis.
        if (this.xSpeed != 0 || this.ySpeed != 0) { // Begin code run when at least one axis has non-zero speed, indicating that the snake is moving somewhere
            // We check if the old head of the snake is at the same location as the food.
            // The JS symbol for "is equal to" is ==, and the JS symbol for "and" is "&&".
            // Train yourself to understand what this if statement means and does.
            if (oldHead.x == this.food.location.x && oldHead.y == this.food.location.y) { // Begin code run if head of snake is at same location as food.
                // As explained above, if the food is where the head is, we don't want to remove the tail - this way, the snake's length has a net increase of 1 square.
                this.food.newLocation(); // We've eaten the food, so we move it to a new location.
            } else { // "else" is JS that runs code when the "if" statement is wrong. In other words, the following code is run if the head of the snake is NOT at the food's location.
                this.body.pop(); // [array].pop() is a JS function to remove the last element of an array. This removes the tail square, as justified above.
            }

            // We figure out the coordinates of the location of the new head by adding the speed of the snake to the direction in question.
            var x = oldHead.x + this.xSpeed; // If the snake is moving in the +x direction, the new head will be 1 square to the right of the old one.
            var y = oldHead.y + this.ySpeed; // If the snake is moving in the +y direction, the new head will be 1 square below the old one.

            // Before adding the new head to the body, we check if the snake should die.
            // The first death check is for collision with the borders of the grid.
            // Recall that the JS symbol for "or" is "||", and that the less/greater than operators (< >) that we're used to work in JS too.
            // We check the x- and y-coordinates of the snake's new head against the borders we defined in constructor().
            if (x < this.borderLeft || x > this.borderRight || y < this.borderUp || y > this.borderDown) { // When interpreting this, keep in mind that the +y direction is downwards.
                this.dead = true; // We set the "this.dead" variable to true because the snake has collided and died.
            }

            // The next death check is to see if the snake is running over itself.
            // We do this by comparing the location of the new head to the locations of all the other squares in the body.
            // If the new head is at the same location as any other square, we know that the snake has run over itself.
            // See draw() for explanation of the [array].forEach() function.
            this.body.forEach(square => { // "square" will refer to the current square being checked.
                // Recall that the JS symbol for "and" is "==", and the JS symbol for "is equal to" is "==".
                if (square.x == x && square.y == y) { // Begin code if the current square being checked is at the same location as the new head.
                    this.dead = true; // Quite simply, register that the snake has run over itself and is therefore dead.
                }
            });

            this.body.unshift(createVector(x, y)); // Create the new head vector and add it to the front of the array.
        } // End code run when at least one axis has non-zero speed
    } // End update() code

    // The draw() function draws the snake. Obviously. :)
    draw() { // Begin draw() code
        // First, we've got to check if the snake is dead, and, if it is, just draw our red background instead.
        // As the snake is drawn after everything else, we know that the red background will cover the black background and the food, even if we've already drawn it.
        if (this.dead) { // Begin code run if snake is dead
            background(255, 0, 0); // See draw() in sketch.js for an explanation of background().
        } else { // See Snake.update() above for an explanation of else. The following code (to draw the snake) will run only if the snake is NOT dead.
            // There are many ways to go about drawing the snake, but the simplest is probably to draw each square individually.
            // We use the body.forEach() function to iterate over the elements of the body array.
            // Iteration means taking the elements of the body array one by one and running the same code for them.
            // Inside the forEach() function, we write "square => { ... }".
            // This is like making a function which will draw each function, and actually passing it to the forEach() function.
            // We're used to passing only data variables to functions. Now we're actually passing a function.
            this.body.forEach(square => { // Begin code inside our individual-square-drawing function (which actually has no name - formally "an anonymous function")
                // "square" is a variable which represents the current square that this individual-square function is processing.
                // First, to draw the square, we take the grid information used to save the square and translate it into canvas information.
                var x = square.x * this.gridScale; // Convince yourself that this scales up the grid x-coordinate to the canvas x-coordinate by multiplying by grid scale.
                var y = square.y * this.gridScale; // Similarly.

                // In p5.js, we first set the parameters of the drawing, and then actually draw our shape.
                strokeWeight(2); // Specify that the border should be 2 pixels thick on all sides.
                stroke(51, 51, 51); // Set the colour of the border in RGB values, as before. Feel free to personalize!
                fill(255, 255, 255); // Set the background colour to white - RGB(255, 255, 255). Again, don't be scared to modify.
                // Draw the square using the rect() function - short for rectangle.
                // The information passed is in this order: (1) x-coordinate and (2) y-coord of top-left corner, (3) width, (4) height.
                rect(x, y, this.gridScale, this.gridScale);
            }); // End code for our anonymous square-drawing function
        }
    } // End draw() code

    // The setSpeed() function sets the x- and y-speed of the snake. It's used exclusively by keyPressed() in sketch.js.
    setSpeed(xSpeed, ySpeed) {
        // Make sure the speed hasn't already been changed. The JS symbol for "not" is "!".
        if (!this.speedChangedThisFrame) { // Speed hasn't been changed yet this frame; allow speed to change.
            // Our next consideration is that the snake shouldn't be able to reverse directions; a right-headed snake should never be able to suddenly go left.
            // In other words, for example, if x-speed is -1, it shouldn't be changeable to 1.
            // The only acceptable change will have a magnitude of 1 (-1 <--> 0 or 0 <--> 1).
            // We take the absolute value of the difference between the current x-speed and the new x-speed. If it's 1, we're good to change the speed.
            // Recall that the JS symbol "==" means "is equal to".
            if (abs(this.xSpeed - xSpeed) == 1) { // The magnitude of the difference is 1; we can change the x-speed.
                this.xSpeed = xSpeed; // Set "this.xSpeed" to the new x-speed stored in "xSpeed".
                this.speedChangedThisFrame = true; // Mark that we've changed the speed this frame.
            }

            // Similarly for y-speed.
            if (abs(this.ySpeed - ySpeed) == 1) { // Magnitude of difference is 1; change the y-speed.
                this.ySpeed = ySpeed;
                this.speedChangedThisFrame = true; // Mark that we've changed the speed this frame.
            }
        }
    }
} // End Snake class