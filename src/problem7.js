/**
 * 기능 목록
 * 1. user, friends, visitor 데이터를 입력 받는다.
 * 2. friends 배열에서 user 가 포함된 배열을 찾아 myFriends 배열에 추가하고, friends 배열에서 제거한다.
 * 3. friends 배열에서 myFriends 데이터가 포함되어 있는 배열을 찾는다.
 *   3-1. 아이디 A가 myFriends에 존재하고 Map 객체 키값에 아이디 B가 없으면 Map 객체에 (아이디 B, 10)을 저장한다.
 *   3-2. 아이디 A가 myFriends에 존재하고 Map 객체 키값에 아이디 B가 있으면 value에 10을 추가한다.
 *   3-3. 아이디 B가 myFriends에 존재하고 Map 객체 키값에 아이디 A가 없으면 Map 객체에 (아이디 A, 10)을 저장한다.
 *   3-4. 아이디 B가 myFriends에 존재하고 Map 객체 키값에 아이디 A가 있으면 value에 10을 추가한다.
 * 4. visitors 배열을 순회한다.
 *   4-1. 아이디가 Map 객체 키값에 존재하면 value에 1을 추가한다.
 *   4-2. 아이디가 Map 객체 키값에 존재하지 않고 myFriends 에 존재하지 않으면 Map 객체에 (아이디, 1)을 저장한다.
 *   4-3. 아이디가 myFriends 에 존재하면 패스
 * 5. Map 객체를 이름 순으로 정렬한다.
 * 6. Map 객체를 점수 순으로 정렬한다.
 * 7. Map 객체의 key 값을 순서대로 result 배열에 추가한다.
 * 8. result 배열의 크기가 5이하가 되도록 자른 후 return 한다.
 */

/**
 * @enum {number}
 */
const POINT = {
  OTHERS_FRIEND: 10,
  VISITOR: 1,
};

/**
 * @param {Map<string, number>} map
 * @param {string} target
 * @param {POINT} point
 */
function setPointInMap(map, target, point) {
  if (map.has(target)) {
    map.set(target, map.get(target) + point);
  } else {
    map.set(target, point);
  }
}

/**
 * @param {string} user
 * @param {[string, string][]} friends
 * @returns {{myFriends: string[], othersFriends: [string, string][]}}
 */
function findMyFriends(user, friends) {
  const myFriends = [];
  const othersFriends = friends.filter((friend) => {
    if (friend[0] === user) {
      myFriends.push(friend[1]);
      return false;
    }
    if (friend[1] === user) {
      myFriends.push(friend[0]);
      return false;
    }
    return true;
  });

  return {
    myFriends,
    othersFriends,
  };
}

/**
 * @param {Map<string, number>} map
 * @param {string[]} myFriends
 * @param {[string, string][]} othersFriends
 */
function addOthersFriendsPoints(map, myFriends, othersFriends) {
  othersFriends.forEach((friend) => {
    const [first, second] = friend;
    if (myFriends.includes(first)) {
      setPointInMap(map, second, POINT.OTHERS_FRIEND);
    }
    if (myFriends.includes(second)) {
      setPointInMap(map, first, POINT.OTHERS_FRIEND);
    }
  });
}

/**
 * @param {Map<string, number>} map
 * @param {string[]} myFriends
 * @param {string[]} visitors
 */
function addVisitorsPoints(map, myFriends, visitors) {
  visitors.forEach((visitor) => {
    if (!myFriends.includes(visitor)) {
      setPointInMap(map, visitor, 1);
    }
  });
}

/**
 * @param {string} user
 * @param {[string, string][]} friends
 * @param {string[]} visitors
 * @returns {string[]} result
 */
function problem7(user, friends, visitors) {
  const map = new Map();
  const { myFriends, othersFriends } = findMyFriends(user, friends);
  addOthersFriendsPoints(map, myFriends, othersFriends);
  addVisitorsPoints(map, myFriends, visitors);
  const result = [...map]
    .sort()
    .sort((a, b) => b[1] - a[1])
    .map((data) => data[0])
    .slice(0, 5);
  return result;
}

module.exports = problem7;
