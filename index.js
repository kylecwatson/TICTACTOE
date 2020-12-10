// This first section of code creates the basic format for the game board//

var BoardSize = 3,
  CLEAR ='',
  boxes = [],
  turn = 'X',
  score,
  moves;


  //This next function launches the game and formats the board//

function init() {
  var board = document.createElement('table');
  board.setAttribute('border', 1);
  board.setAttribute('cellspacing', 0);

  var identifier = 1;
  for (var i = 0; i < BoardSize; i++) {
    var row = document.createElement('tr');
    board.appendChild(row);

    for (var x = 0; x < BoardSize; x++) {
      var cell = document.createElement('td');
      cell.setAttribute('height', 50);
      cell.setAttribute('width', 50);
      cell.setAttribute('align', 'center');
      cell.classList.add('column' + x, 'row' + i);

      if (i == x) {
        cell.classList.add('List1');
      }

      if (x == BoardSize - i - 1) {
        cell.classList.add('List2');
      }
      
      cell.identifier = identifier;
      cell.addEventListener('click', set);
      row.appendChild(cell);
    }
  }


  document.getElementById('tictactoe').appendChild(board);
  restartGame();
}

// This section checks the board for a row of 3 of either X or O for a win//

function win(clicked) {
  var clickFunction = clicked.className.split(/\s+/);

  for (var i = 0; i < clickFunction.length; i++) {
    var winTest = '.' + clickFunction[i];
    var items = contains('#tictactoe ' + winTest, turn);

    if (items.length == BoardSize) {
      return true;
    }
  }
  return false;
}

//Helper function which helps the initiate the turn format X>O>X>O//

function contains(selector, text) {
  var elements = document.querySelectorAll(selector);
  return [].filter.call(elements, function (element) {
    return RegExp(text).test(element.textContent);
  });
}


//This function resets the game, which will be used when a tie/win is made//

function restartGame() {
  score = {
    'X': 0,
    'O': 0
  };
    turn = 'X';
    moves = 0;
  boxes.forEach(function (square) {
    square.innerHTML = CLEAR;
  });
}

//This function updates the turn count on every click, which will lead to an eventual win/tie//

function set() {
  if (this.innerHTML !== CLEAR) {
    return;
  }

  this.innerHTML = turn;
  moves += 1;
  score[turn] += this.identifier;
  if (win(this)) {
    alert('Player ' + turn + ' Wins');
    restartGame();
  } else if (moves === BoardSize * BoardSize) {
    alert('It is a tie');
    restartGame();
  } else {
    turn = turn === 'X' ? 'O' : 'X';
    document.getElementById('turn').textContent = 'Player ' + turn;
  }
}

init();