/**
 *
 *  A robot located at the top left corner of a 5x5 grid is trying to reach the
 *  bottom right corner. The robot can move either up, down, left, or right,
 *  but cannot visit the same spot twice. How many possible unique paths are
 *  there to the bottom right corner?
 *
 *  make your solution work for a grid of any size.
 *
 */

// A Board class will be useful

var makeBoard = function (n) {
  var board = [];
  for (var i = 0; i < n; i++) {
    board.push([]);
    for (var j = 0; j < n; j++) {
      board[i].push(false);
    }
  }
  board.togglePiece = function (i, j) {
    this[i][j] = !this[i][j];
  };
  board.hasBeenVisited = function (i, j) {
    return !!this[i][j];
  };
  return board;
};

// "board, i, j" 매개변수는 왜 있는 것인가?
// 어차피 board는 n 매개변수만으로 만들 수 있고, 어차피 좌상단의 (0,0)에서 시작하는데...?
// 테스트케이스에서도 robotPaths 함수는 n 매개변수 1개만 받는 것 같은데?
var robotPaths = function (n, board, i, j) {
  /* todo */

  if (n === 1) {
    return n;
  }

  let answer = 0; // 최종 리턴할 결과값을 미리 선언함
  let newBoard = new makeBoard(n); // n X n 의 게임판(배열 안의 배열 형태임)을 만들어주는 함수. 모든 칸이 false로 채워져 있다.

  // newBoard.togglePiece(0, 0);  // 시작점인 첫 칸을 true로 바꿔주고 시작한다.
  // 앞선 시도에서는 이걸 재귀함수 밖에서 주고 시작했는데,
  // 이 처리를 재귀함수 안에서 해줘야 하는 듯...

  function findNextRoute(i, j) {
    if (i === n - 1 && j === n - 1) {
      answer++; // 끝에 도달하면(경로를 하나 찾았으면),
      return; // answer 하나 올려주고 마무리.
    }

    if (i < 0 || j < 0) {
      return;
    } // 칸을 넘어가면,
    if (i >= n || j >= n) {
      return;
    } // 그만해라.

    if (newBoard.hasBeenVisited(i, j)) {
      // 이미 방문한 자리이면,
      return; //  그만해라.
    } else {
      newBoard.togglePiece(i, j); // 방문한 자리를 true로 토글.

      findNextRoute(i, j + 1); // 그 우측 자리 체크.
      findNextRoute(i + 1, j); // 그 아래 자리 체크.
      findNextRoute(i, j - 1); // 그 좌측 자리 체크.
      findNextRoute(i - 1, j); // 그 위 자리 체크.

      newBoard.togglePiece(i, j);
      // 다음번의 다른 경우의 수를 위해, 다시 false로 토글.
    }
  }

  findNextRoute(0, 0);

  return answer;
};

/* 아래와 같이 해봤는데 실패했음... 결국 구글검색함
  // https://repl.it/@Jcamp12/Robot-Paths#main.js


// "board, i, j" 매개변수는 왜 있는 것인가?
// 어차피 board는 n 매개변수만으로 만들 수 있고, 어차피 좌상단의 (0,0)에서 시작하는데...?
// 테스트케이스에서도 robotPaths 함수는 n 매개변수 1개만 받는 것 같은데?
var robotPaths = function(n, board, i, j) {
  
  
  if (n === 1){
    return n;
  }
  
  let answer = 0; // 최종 리턴할 결과값을 미리 선언함
  let newBoard = new makeBoard(n); // n X n 의 게임판(배열 안의 배열 형태임)을 만들어주는 함수. 모든 칸이 false로 채워져 있다. 
  
  newBoard.togglePiece(0, 0);  // 시작점인 첫 칸을 true로 바꿔주고 시작한다.

  debugger;
  function findNextRoute (i, j) {
    if (newBoard[i] === undefined || newBoard[i][j] === undefined) {
      return;
    }

    else if (!newBoard.hasBeenVisited(i, j+1)) {
      if (newBoard[i] === undefined || newBoard[i][j+1] === undefined) { return; }
      if (newBoard.hasBeenVisited(i, j+1)) { return; }
      newBoard.togglePiece(i, j+1);
      findNextRoute(i, j+1);
    }

    else if (!newBoard.hasBeenVisited(i, j-1)) {
      if (newBoard[i] === undefined || newBoard[i][j-1] === undefined) { return; }
      if (newBoard.hasBeenVisited(i, j-1)) { return; }
      newBoard.togglePiece(i, j-1);
      findNextRoute(i, j-1);
    }

    else if (!newBoard.hasBeenVisited(i+1, j)) {
      if (newBoard[i+1] === undefined || newBoard[i][j+1] === undefined) { return; }
      if (newBoard.hasBeenVisited(i+1, j)) { return; }
      newBoard.togglePiece(i+1, j);
      findNextRoute(i+1, j);
    }

    else if (!newBoard.hasBeenVisited(i-1, j)) {
      if (newBoard[i-1] === undefined || newBoard[i][j+1] === undefined) { return; }
      if (newBoard.hasBeenVisited(i-1, j)) { return; }
      newBoard.togglePiece(i-1, j);
      findNextRoute(i-1, j);
    }

    if (newBoard.hasBeenVisited(n, n) === true) {
      answer++;
    }
  }

  findNextRoute(0, 0)

  return answer;

}

*/
