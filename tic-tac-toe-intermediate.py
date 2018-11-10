# Print the board
def print_board(board):
    print("\nLet's play tic tac toe!\n")
    print(" {} | {} | {} ".format(board[0],board[1],board[2]))
    print(" {} | {} | {} ".format(board[3],board[4],board[5]))
    print(" {} | {} | {} ".format(board[6],board[7],board[8]))
    print("") # prints empty line


# Check if there is a winner using the functions below
def isWinner(board):
    if checkHorizontal(board) or checkVertical(board) or checkDiagonal(board):
        return True

# Horizontally
def checkHorizontal(board):
    for i in range(0,7,3):
        # check if all horizontal elements are equal to each other (and are not just spaces)
        if board[i] == board[i+1] == board[i+2]:
            return True

# Vertically
def checkVertical(board):
    for i in range(0,3,1):
        if board[i] == board[i+3] == board[i+6]:
            return True

# Diagonally
def checkDiagonal(board):
    if board[0] == board[4] == board[8] or board[2] == board[4] == board[6]:
        return True

# Initialize board array
board = ['0','1','2','3','4','5','6','7','8']
player = 'X'

# Preliminary print
print_board(board)


count = 1
while True:
    # Get user input
    x = input("{}, chose your position (0-8): ".format(player))
    x = int(x)

    # Put X into board
    board[x] = player
    print_board(board)

    if isWinner(board):
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
