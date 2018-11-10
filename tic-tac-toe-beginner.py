# Version without functions and for loops

# Print the board
print("") # prints empty line
print("Let's play tic tac toe!")
print("")
print(" 0 | 1 | 2 ")
print(" 3 | 4 | 5 ")
print(" 6 | 7 | 8 ")
print("") # prints empty line

# Initialize board list
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
