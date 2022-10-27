/**
 * 기능 목록
 * 1. 게임을 시작하고 페이지 데이터들을 입력 받는다.
 * 2. 포비와 크롱의 페이지가 유효한지 확인한다.
 *   2-1. 왼쪽 페이지가 홀수가 아니면 "예외사항", 5번으로
 *   2-2. 왼쪽 페이지가 1보다 작거나 같으면(시작 면) "예외사항", 5번으로
 *   2-3. 오른쪽 페이지가 400보다 크거나 같으면(마지막 면) "예외사항", 5번으로
 *   2-4. (왼쪽 페이지 + 1)과 오른쪽 페이지가 다르면 "예외사항", 5번으로
 *   2-5. (왼쪽 페이지 + 1)과 오른쪽 페이지가 같으면 3번으로
 * 3. 포비와 크롱 각각 가장 큰 수를 계산한다.
 *   3-1. 왼쪽 페이지 번호의 각 자리 수 더하기
 *   3-2. 왼쪽 페이지 번호의 각 자리 수 곱하기
 *   3-3. 오른쪽 페이지 번호의 각 자리 수 더하기
 *   3-4. 오른쪽 페이지 번호의 각 자리 수 곱하기
 *   3-5. 네 결과 중 가장 큰 값을 본인의 점수로 한다.
 * 4. 포비와 크롱의 점수를 비교한다.
 *   4-1. 포비 점수 > 크롱 점수: "포비 승"
 *   4-2. 포비 점수 < 크롱 점수: "크롱 승"
 *   4-3. 포비 점수 === 크롱 점수: "무승부"
 * 5. 포비 승: 1, 크롱 승: 2, 무승부: 0, 예외사항: -1 을 return한다. (종료)
 */

class Game {
  RESULT = {
    POBI_WIN: 1,
    CRONG_WIN: 2,
    DRAW: 0,
    EXCEPTION: -1,
  };

  constructor(pobi, crong) {
    this.pobi = new Pages(pobi);
    this.crong = new Pages(crong);
    this.result = null;
  }

  start() {
    if (this.checkValidPages()) {
      return;
    }
    this.result = this.RESULT.EXCEPTION;
  }

  checkValidPages() {
    return this.pobi.isValid() && this.crong.isValid();
  }
}

class Pages {
  constructor(player) {
    const [left, right] = player;
    this.left = left;
    this.right = right;
  }

  isValid() {
    if (this.left % 2 !== 1 || this.left < 1 || this.left > 399) {
      return false;
    }
    return this.left === this.right - 1;
  }
}

/**
 * @param {[number, number]} pobi
 * @param {[number, number]} crong
 * @returns {number}
 */
function problem1(pobi, crong) {
  const game = new Game(pobi, crong);
  game.start();
  const result = game.result;
  return result;
}

console.log(problem1([97, 98], [197, 198]));
console.log(problem1([131, 132], [211, 212]));
console.log(problem1([99, 102], [211, 212]));
console.log(problem1([0, 1], [211, 212]));
console.log(problem1([401, 402], [211, 212]));
console.log(problem1([99, 100], [211, 212]));
console.log(problem1(["a", "b"], [211, 212]));

module.exports = problem1;
