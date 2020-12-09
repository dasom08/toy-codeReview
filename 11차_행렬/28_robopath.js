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
    return !!this[i][j]; //이말은 방문을 안한 경우는 원래의 값인 false로 리턴된다는 의미 , 즉 true이면 이미 방문햇다는 의미
  };
  return board;
};

var robotPaths = function (n, board, i, j) {
  //한번도 겹치지 않고 최종루트에 도달하는 방법의 수를 리턴하는 것이다.
  //1. 일단 리턴할 값을 정의 & 그리고 위의 함수를 통해 가로 세로 각각 n의 값을 가지는 보드를 정의
  //2. 리턴할 값에 +1을 해줄 경우는, 각 행과 열의 값이 보드의 행과 열의 길이값의 -1보다 작을때 즉 각 인덱스의 끝값에 있을때이다.//이런경우에는 현재의 이동을 종료하고 새로 이동
  //3. 그리고 말의 위치가 보드 위의 범위를 벗어나는 경우도 종료시켜주기
  //4. 보드를 방문하면 toggle 함수를 통해 해당 위치가 false에서 true로 바뀐다.
  //5. 따라서 지금 위치가 true인 경우,
  if (n <= 1) {
    return 1;
  }
  let result = 0;
  let newBoard = new makeBoard(n);

  function moveBoard(i, j) {
    if (i === n - 1 && j === n - 1) {
      result++;
      return;
    }
    if (i < 0 || j < 0) {
      return;
    }
    if (i >= n || j >= n) {
      return;
    }
    //이미 방문한 위치인 경우, 종료
    if (newBoard.hasBeenVisited(i, j)) {
      return;
    } else {
      newBoard.togglePiece(i, j); //토글로 방문 처리, 값은 true
      //좌우위아래를 재귀함수를 통해, 이동할수있는지 점검
      moveBoard(i, j + 1);
      moveBoard(i + 1, j);
      moveBoard(i - 1, j);
      moveBoard(i, j - 1);
      newBoard.togglePiece(i, j); //다음경로 이동을 위해 다시 false로 돌려둔다.
    }
  }

  moveBoard(0, 0);
  return result;
};

//nXn 에서 4X4라면
// 행은 i / 열은 j
/*[[f,f,f,f],
   [f,f,f,f],
   [f,f,f,f],
   [f,f,f,f]]
  */
