const request = require('request')

const getContests = (user1, user2, callback) => {
  const contestListUrl = `https://codeforces.com/api/contest.list`;
  const userOneUrl = `https://codeforces.com/api/user.rating?handle=${user1}`;
  const userTwoUrl = `https://codeforces.com/api/user.rating?handle=${user2}`;

  let contestList = [];
  let userContests = [];
  let uniqueContests = [];

  request({ url: userOneUrl, json: true }, (error, { body }) => {
    if (error) {
      return callback('Unable to connect to the network services :(', undefined);
    } else if (body.status === "FAILED") {
      return callback(body.comment, undefined);
    } else {
      const res = body.result;
      for (let i = 0; i < res.length; i++) {
        userContests.push({
          contestId: res[i].contestId,
          contestName: res[i].contestName
        });
      }
    }

    request({ url: userTwoUrl, json: true }, (error, { body }) => {
      if (error) {
        return callback('Unable to connect to the network services :(', undefined);
      } else if (body.status === "FAILED") {
        return callback(body.comment, undefined);
      } else {
        const res = body.result;
        for (let i = 0; i < res.length; i++) {
          userContests.push({
            contestId: res[i].contestId,
            contestName: res[i].contestName
          });
        }
      }

      const getUniqueContests = (arr, key) => {
        return [...new Map(arr.map(item => [item[key], item])).values()];
      }
      uniqueContests = getUniqueContests(userContests, 'contestId');


      request({ url: contestListUrl, json: true }, (error, { body }) => {
        if (error) {
          callback('Unable to connect to the network services :(', undefined);
        } else {
          const res = body.result;
          for (let i = 0; i < 30; i++) {
            if (res[i].phase === "FINISHED") {
              contestList.push({
                contestId: res[i].id,
                contestName: res[i].name
              });
            }
          }
        }

        const removeByKey = (arr, key, value) => {
          let i = arr.length;
          while (i--) {
            if (arr[i]
              && arr[i].hasOwnProperty(key)
              && (arguments.length > 2 && arr[i][key] === value)) {
              arr.splice(i, 1);
            }
          }
          return arr;
        }

        for (let i = 0; i < uniqueContests.length; i++) {
          removeByKey(contestList, 'contestId', uniqueContests[i].contestId);
        }
        callback(undefined, contestList);
      });
    });
  });
}

module.exports = getContests;



// ================================================== Test Code ==================================================

// getContests('fluffy123', 'rez_', (error, data) => {
//   console.log('Error', error);
//   console.log('Data', data);
// });

// ================================================== Test Code ==================================================