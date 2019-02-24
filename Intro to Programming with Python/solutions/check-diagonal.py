player = 'X'
if (board[0] == board[4] == board[8]) or (board[2] == board[4] == board[6]):
  print("{} wins!".format(player))
