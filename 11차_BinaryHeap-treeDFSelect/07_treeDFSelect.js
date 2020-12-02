/*
 *
 * 주어진 Tree 클래스에 `DFSelect` 메소드를 구현하세요.
 *
 * DFSelect 매소드의 요구사항은 아래와 같습니다.
 *  1. filter 함수를 매개변수로 받습니다.
 *  2. tree 의 각 node는 해당 filter 함수를 깊이 우선 방식으로 호출합니다.
 *  3. filter 함수를 만족(return true)하는 tree의 node를 1차원 배열로 반환합니다.
 *
 *
 * 예시 :
 *   let root1 = new Tree(1);
 *   let branch2 = root1.addChild(2);
 *   let branch3 = root1.addChild(3);
 *   let leaf4 = branch2.addChild(4);
 *   let leaf5 = branch2.addChild(5);
 *   let leaf6 = branch3.addChild(6);
 *   let leaf7 = branch3.addChild(7);
 *   root1.DFSelect(function (value, depth) {
 *     return value % 2;
 *   })
 *   // [1, 5, 3, 7]
 *
 *   root1.DFSelect(function (value, depth) {
 *     return depth === 1;
 *   })
 *   // [2, 3]
 *
 */

/*
 * value를 저장하는 기본적인 tree입니다.
 */

let Tree = function (value) {
  this.value = value;
  this.children = [];
};

Tree.prototype.DFSelect = function (filter) {
  // TODO: Your code here!
  let answer = [];
  let depthOfTree = 0; // 최초 depth : 0

  if (filter(this.value, depthOfTree)) {
    // root 에서 filter를 한번 일단 돌려봐서, true 이면,
    answer.push(this.value); // root의 value를 answer에 push한다.
  }

  depthOfTree++; // root에서는 처리했으니, 다음 깊이로 들어가기 위해, 깊이 값을 하나 늘려주고

  function recursionFilter(node, depth) {
    // root의 children(하위 node들) 탐색을 위해,
    for (let i = 0; i < node.children.length; i++) {
      if (filter(node.children[i].value, depth)) {
        // 하위 노드에서 filter 조건에 맞으면,
        answer.push(node.children[i].value); // 역시 answer에 push하고,
      }
      recursionFilter(node.children[i], depth + 1); // 한 줄 더 깊이 들어가서 재실행.
    }
  }

  recursionFilter(this, depthOfTree); // this 자체는 위에서 일단 먼저 실행했고, 이거는 this의 자식들을 탐색하기 위한 것.

  return answer;
};

/*
 * 이 아래로는 아무 것도 변경하지 않아도 됩니다. 자유롭게 참고하세요.
 */

/*
 * child를 추가합니다.
 * (Tree가 아닌 값이 들어올 경우, Tree 객체 형태로 변환 후 추가합니다.)
 */
Tree.prototype.addChild = function (child) {
  if (!child || !(child instanceof Tree)) {
    child = new Tree(child);
  }

  if (!this.isDescendant(child)) {
    this.children.push(child);
  } else {
    throw new Error('That child is already a child of this tree');
  }
  // 편의를 위해 추가된 child node를 return합니다.
  return child;
};

/*
 * 주어진 tree가 이미 해당 tree 혹은 sub tree의 child인지 확인합니다.
 */
Tree.prototype.isDescendant = function (child) {
  if (this.children.indexOf(child) !== -1) {
    // `child`는 해당 트리와 연결된 하위 노드를 의미합니다.
    return true;
  } else {
    for (let i = 0; i < this.children.length; i++) {
      if (this.children[i].isDescendant(child)) {
        return true;
      }
    }
    return false;
  }
};

/*
 * child를 삭제합니다.
 */
Tree.prototype.removeChild = function (child) {
  let index = this.children.indexOf(child);
  if (index !== -1) {
    // child를 삭제합니다.
    this.children.splice(index, 1);
  } else {
    throw new Error('That node is not an immediate child of this tree');
  }
};
