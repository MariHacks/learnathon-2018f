# Intro to Programming in Python

> By Raffi Hotter and Wilfred Mason
>
> Sunday, November 11, 2018 from 11:30 AM - 12:30 PM

Here you'll find all the source code from the workshop.

If you have any questions, feel free to shoot us an email at raphael.hotter@gmail.com or wilfredmason4@yahoo.ca.

We will write our code on [Repl.it](repl.it). Sign up for an account and select Python3 and you're good to go!

Here are the slides: [Link](link)

Here is the full code:
* [Beginner]()
* [Intermediate]()

Skip to a section:

- [Print empty tic-tac-toe board](#01)
- [User input and variables](#02)
- [Lists](#03)
- [`if` statements for checking the board](#04)
- [`while` loops for repeated user input](#05)

<a name = "01"></a>

### Print empty tic-tac-toe board

```python
# Print an empty board
print(" 0 | 1 | 2 ")
print(" 3 | 4 | 5 ")
print(" 6 | 7 | 8 ")
```

<a name = "02"></a>

### User input and variables
```python
player = 'X'
boardPosition = input("{}, chose your position (0-8): ".format(player))
boardPosition = int(boardPosition)
```

<a name = "03"></a>
### Lists
```python
wilfredsList = ["Bananas", "Strawberries", "Tomatoes"] # note: the quotes just mean "this is a word" (not a number)
print(wilfredList[0]) # prints Bananas
wilfredsList[0] = "Ice cream"
print(wilfredList[0]) # prints Ice cream
```
For tic-tac-toe:
```python
board = ['0','1','2','3','4','5','6','7','8']
board[3] = 'X'
print(board[3]) # prints X
```

[Solution to printing custom board exercise](https://github.com/marihacks/learnathon-solutions/blob/master/if-statement.md)

<a name = "04"></a>
### `if` statements for checking the board
Check for horizontal lines:
```python
if (board[0] == board[1] == board[2]) or \
   (board[3] == board[4] == board[5]) or \
   (board[6] == board[7] == board[8]):
    print('{} wins!'.format(player))
```

<a name = "05"></a>
### `while` loops for repeated user input

```python
board = ['0','1','2','3','4','5','6','7','8']
player = 'X'

count = 1
while True:
    # Get user input
    x = input("{}, chose your position (0-8): ".format(player))
    x = int(x)

    # Put X into board
    board[x] = player

    # Print the board
    print("") # prints empty line
    print("Let's play tic tac toe!")
    print("")
    print(" {} | {} | {} ".format(board[0],board[1],board[2]))
    print(" {} | {} | {} ".format(board[3],board[4],board[5]))
    print(" {} | {} | {} ".format(board[6],board[7],board[8]))
    print("") # prints empty line

    # Check if there is a winner
    if (board[0] == board[1] == board[2]) or \
       (board[3] == board[4] == board[5]) or \
       (board[6] == board[7] == board[8]) or \
       (board[0] == board[3] == board[6]) or \
       (board[1] == board[4] == board[7]) or \
       (board[2] == board[5] == board[8]) or \
       (board[0] == board[4] == board[8]) or \
       (board[2] == board[4] == board[6]):
       print('{} wins!'.format(player))
       break
    
    # Check for tie
    elif count == 9:
        print('Tie game.')
        break
    
    # Switch players
    else:
        if player == 'X':
            player = 'O'
        else:
            player = 'X'
    count += 1

```
