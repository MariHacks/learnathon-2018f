# Intro to Programming in Python

> By Raffi Hotter and Wilfred Mason
>
> Sunday, November 11, 2018 from 11:30 AM - 12:30 PM

Here you'll find all the source code from the workshop.

If you have any questions, feel free to shoot us an email at raphael.hotter@gmail.com or wilfredmason4@yahoo.ca.

We will write our code on [Repl.it](repl.it). Sign up for an account and select Python3 and you're good to go!



Skip to a section:

- [Hello world](#01)
- [Hello, name](#02)
- [Print empty tic-tac-toe board](#03)
- [Add X and O to board](#04)
- [Let user add an X to the board](#05)
- [Check for winner](#06)
- [Intro to `if` statement](#07)
- [A faster way to check for winner](#08)
- [Intro to `for` loops](#09)
- [Checking for diagonal lines](#10)
- [A cleaner and more efficient way to organize code](#11)
- [Putting everything into functions](#12)
- [Getting user input continuously](#13)
- [Adding players](#14)
- [Check for tie and call it a game](#15)

<a name = "01"></a>



### Outline

- Show "Tic tac toe demo", get two people to come up and play
- Ask teams (of 3) to break down the problem into it's components
- Teams come up and present their code (for checking if there is a tic-tac-toe winner)



### Hello world

```python
print("Hello, world.")
```

<a name = "02"></a>

### Hello, name

```python
name = input("What is your name? ")
print("Hello, %s" % name)
```

<a name = "03"></a>

### Print empty tic-tac-toe board

```python
# Print an empty board

print("  |  |  ")
print("  |  |  ")
print("  |  |  ")
```

<a name = "04"></a>

### Add X and O to board

```python
# Create an array of 9 spaces to represent our board
board = [' ']*9
print(board)

# Show change of value
board[0] = 'X'

print("\nLet's play tic tac toe!\n")
print(" %s | %s | %s "   % (board[0],board[1],board[2]))
print(" %s | %s | %s "   % (board[3],board[4],board[5]))
print(" %s | %s | %s \n" % (board[6],board[7],board[8]))
```

<a name = "05"></a>

### Let user add an X to the board

```python
# Initialize board array
board = [' ']*9

boardPosition = input('Give me a number from 0-8: ')
boardPosition = int(boardPosition)

board[boardPosition] = 'X'

print("\nLet's play tic tac toe!\n")
print(" %s | %s | %s "   % (board[0],board[1],board[2]))
print(" %s | %s | %s "   % (board[3],board[4],board[5]))
print(" %s | %s | %s \n" % (board[6],board[7],board[8]))
```

<a name = "06"></a>

### Check for winner

```python
# Pick some configuration for board
board = ['X', 'X', 'X',
         'O', 'O', ' ',
         ' ', ' ', ' ' ]

# Print the board
print("\nLet's play tic tac toe!\n")
print(" %s | %s | %s "  % (board[0],board[1],board[2]))
print(" %s | %s | %s "   % (board[3],board[4],board[5]))
print(" %s | %s | %s \n" % (board[6],board[7],board[8]))

# Check if there is a winner
    # You're a winner if you have three spots occupied horizontally, vertically, or diagonally

# Horizontally
if board[0] == board[1] == board[2] and board[0]!= ' ':
    print('There is a winner')
if board[3] == board[4] == board[5] and board[3]!=' ':
    print('There is a winner')
if board[6] == board[7] == board[8] and board[6]!=' ':
    print('There is a winner')
```

<a name = "07"></a>

### Intro to `if` statements

```python
guess = input("Give me a number between 1 and 5: ")
guess = int(guess)

myNumber = 3

if guess == myNumber:
    print("Yay")
else:
    print("You suck.")
```

[Solution to if statement exercise](https://github.com/marihacks/learnathon-solutions/blob/master/if-statement.md)

<a name = "08"></a>

### A faster way to check for winner

```python
# Pick some configuration for board
board = ['X', 'X', 'X',
         'O', 'O', ' ',
         ' ', ' ', ' ' ]

# Print the board
print("\nLet's play tic tac toe!\n")
print(" %s | %s | %s "  % (board[0],board[1],board[2]))
print(" %s | %s | %s "   % (board[3],board[4],board[5]))
print(" %s | %s | %s \n" % (board[6],board[7],board[8]))

# Check if there is a winner
    # You're a winner if you have three spots occupied horizontally, vertically, or diagonally

# Horizontally
for i in range(0,7,3):
    if board[i] == board[i+1] == board[i+2] and board[i] != ' ':
        print("There is a winner")
```

<a name = "09"></a>

### Intro to `for` loops

```python
for i in range(0,100):
    print('Raffi, %i' % i)
```

[Solution to vertical check exercise](https://github.com/marihacks/learnathon-solutions/blob/master/vertical-check.md)

<a name = "10"></a>

### Checking for diagonal lines

```python
# Pick some configuration for board
board = ['X', 'X', 'X',
         'O', 'O', 'O',
         ' ', ' ', ' ' ]

# Print the board
print("\nLet's play tic tac toe!\n")
print(" %s | %s | %s "  % (board[0],board[1],board[2]))
print(" %s | %s | %s "   % (board[3],board[4],board[5]))
print(" %s | %s | %s \n" % (board[6],board[7],board[8]))

# Check if there is a winner
    # You're a winner if you have three spots occupied horizontally, vertically, or diagonally

# Horizontally
for i in range(0,7,3):
    if board[i] == board[i+1] == board[i+2] and board[i] != ' ':
        print("There is a winner")

# Vertically
for i in range(0,3,1):
    if board[i] == board[i+3] == board[i+6] and board[i] != ' ':
        print("There is a winner")

# Diagonally
if board[0] == board[4] == board[8] and board[0] != ' ':
    print("There is a winner")

if board[2] == board[4] == board[6] and board[2] != ' ':
    print("There is a winner")
```

<a name = "11"></a>

### A cleaner and more efficient way to organize code

~~~python
def factorial(n):
    if  n == 0:
        return 1
    else:
        fact = 1
        for r in range(n, 1, -1):
            fact = fact*r
        return fact
``````
[Solution to minimum value in a list exercise](https://github.com/marihacks/learnathon-solutions/blob/master/min-value.md)

<a name = "12"></a>
### Putting everything into functions
```python

# Pick some configuration for board
board = ['X', 'X', 'X',
         'O', 'O', 'O',
         ' ', ' ', ' ' ]

# Print the board
def print_board(board):
    print("\nLet's play tic tac toe!\n")
    print(" %s | %s | %s "   % (board[0],board[1],board[2]))
    print(" %s | %s | %s "   % (board[3],board[4],board[5]))
    print(" %s | %s | %s \n" % (board[6],board[7],board[8]))

# Check if there is a winner
    # You're a winner if you have three spots occupied horizontally, vertically, or diagonally

# Horizontally
def checkHorizontal(board):
    for i in range(0,7,3):
        if board[i] == board[i+1] == board[i+2] and board[i] != ' ':
            return True

# Vertically
def checkVertical(board):
    for i in range(0,3,1):
        if board[i] == board[i+3] == board[i+6] and board[i] != ' ':
            return True

# Diagonally
def checkDiagonal(board):
    if board[0] == board[4] == board[8] and board[0] != ' ' or (board[2] == board[4] == board[6] and board[2] != ' '):
        return True

# Check if there is a winner using the functions from above
def isWinner(board):
    if checkHorizontal(board) or checkVertical(board) or checkDiagonal(board):
        return True

# Let's try it
if isWinner(board):
    print('There is a winner!')
~~~

<a name = "13"></a>

### Getting user input continuously

```python
# Print the board
def print_board(board):
    print("\nLet's play tic tac toe!\n")
    print(" %s | %s | %s "   % (board[0],board[1],board[2]))
    print(" %s | %s | %s "   % (board[3],board[4],board[5]))
    print(" %s | %s | %s \n" % (board[6],board[7],board[8]))

# Check if there is a winner

# Horizontally
def checkHorizontal(board):
    for i in range(0,7,3):
        if board[i] == board[i+1] == board[i+2] and board[i] != ' ':
            return True

# Vertically
def checkVertical(board):
    for i in range(0,3,1):
        if board[i] == board[i+3] == board[i+6] and board[i] != ' ':
            return True

# Diagonally
def checkDiagonal(board):
    if board[0] == board[4] == board[8] and board[0] != ' ' or (board[2] == board[4] == board[6] and board[2] != ' '):
        return True

# Check if there is a winner using the functions from above
def isWinner(board):
    if checkHorizontal(board) or checkVertical(board) or checkDiagonal(board):
        return True

# Initialize board array
board = [' ']*9

# Preliminary print
print_board(board)

while True:	
    # Get user input
    x = input("Give me a number from 1-9: ")
    x = int(x)

    # Put X into board
    board[x-1] = 'X'
    print_board(board)

    if isWinner(board):
        print('You win!')
        break

```

<a name = "14"></a>

### Adding players

```python
# Print the board
def print_board(board):
    print("\nLet's play tic tac toe!\n")
    print(" %s | %s | %s "   % (board[0],board[1],board[2]))
    print(" %s | %s | %s "   % (board[3],board[4],board[5]))
    print(" %s | %s | %s \n" % (board[6],board[7],board[8]))

# Check if there is a winner

# Horizontally
def checkHorizontal(board):
    for i in range(0,7,3):
        if board[i] == board[i+1] == board[i+2] and board[i] != ' ':
            return True

# Vertically
def checkVertical(board):
    for i in range(0,3,1):
        if board[i] == board[i+3] == board[i+6] and board[i] != ' ':
            return True

# Diagonally
def checkDiagonal(board):
    if board[0] == board[4] == board[8] and board[0] != ' ' or (board[2] == board[4] == board[6] and board[2] != ' '):
        return True

# Check if there is a winner using the functions from above
def isWinner(board):
    if checkHorizontal(board) or checkVertical(board) or checkDiagonal(board):
        return True

# Initialize board array
board = [' ']*9
player = 'X'

# Preliminary print
print_board(board)

while True:
    # Get user input
    x = input("Give me a number from 1-9: ")
    x = int(x)

    # Put X into board
    board[x-1] = player
    print_board(board)
    
    if isWinner(board):
        print('You win!')
	break
	
    # Switch players
    else:
	if player == 'X':
	    player = 'O'
        else:
            player = 'X'
```

<a name = "15"></a>

### Check for tie and call it a game.

```python
# Print the board
def print_board(board):
    print("\nLet's play tic tac toe!\n")
    print(" %s | %s | %s "   % (board[0],board[1],board[2]))
    print(" %s | %s | %s "   % (board[3],board[4],board[5]))
    print(" %s | %s | %s \n" % (board[6],board[7],board[8]))

# Check if there is a winner

# Horizontally
def checkHorizontal(board):
    for i in range(0,7,3):
        if board[i] == board[i+1] == board[i+2] and board[i] != ' ':
            return True

# Vertically
def checkVertical(board):
    for i in range(0,3,1):
        if board[i] == board[i+3] == board[i+6] and board[i] != ' ':
            return True

# Diagonally
def checkDiagonal(board):
    if board[0] == board[4] == board[8] and board[0] != ' ' or (board[2] == board[4] == board[6] and board[2] != ' '):
        return True

# Check if there is a winner using the functions from above
def isWinner(board):
    if checkHorizontal(board) or checkVertical(board) or checkDiagonal(board):
        return True

# Initialize board array
board = [' ']*9
player = 'X'

# Preliminary print
print_board(board)

while True:
    # Get user input
    x = input("Give me a number from 1-9: ")
    x = int(x)

    # Put X into board
    board[x-1] = player
    print_board(board)
    
    if isWinner(board):
        print('You win!')
	break
    
    # Check for tie
    elif ' ' not in board:
        print('Tie game.')
        break
    
    # Switch players
    else:
	if player == 'X':
	    player = 'O'
        else:
            player = 'X'
```
