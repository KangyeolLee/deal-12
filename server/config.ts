// get the client
const mysql = require('mysql2');

// create the connection to database
const config = {
  host: '54.180.140.194',
  port: '3306',
  user: 'kg',
  password: '12345678',
  database: 'woowamarket',
};

// console.log('asdf');

export const getCategories = () => {
  return new Promise((resolve, reject) => {
    const connection = mysql.createConnection(config);
    const query = `SELECT * FROM category`;
    connection.query(query, (err: any, results: any) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
      connection.end();
    });
  });
};

// const getLocations = () => {
//   return new Promise((resolve, reject) => {
//     const connection = mysql.createConnection(config);
//     let query = `SELECT * FROM location`;
//     connection.query(query, (err:any, results:any) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//       connection.end();
//     });
//   });
// };

// // 홈화면
// const getAllPosts = (locId) => {
//   return new Promise((resolve, reject) => {
//     const connection = mysql.createConnection(config);
//     let query = `SELECT * FROM post WHERE post.locId = ${locId}`;
//     connection.query(query, (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//       connection.end();
//     });
//   });
// };
// const getPostsByCategoryId = (locId, categoryId) => {
//   return new Promise((resolve, reject) => {
//     const connection = mysql.createConnection(config);
//     let query = `SELECT * FROM post WHERE post.locId = ${locId} AND post.categoryId = ${categoryId}`;
//     connection.query(query, (err, results) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(results);
//       }
//       connection.end();
//     });
//   });
// };

// // 회원가입
// const addUser = (userId, locId) => {
//   return new Promise((resolve, reject) => {
//     const connection = mysql.createConnection(config);
//     new Promise((resolve, reject) => {
//       connection.query(
//         `SELECT * FROM user WHERE user.userId = ${userId}`,
//         (err, results) => {
//           if (err) reject(err);
//           resolve(results);
//         }
//       );
//     }).then((r) => {
//       if (r) {
//         const query = `INSERT INTO user (userId, locId) VALUES('${userId}', '${locId}')`;
//         connection.query(query, (err, results) => {
//           if (err) {
//             reject(err);
//           } else {
//             resolve(results);
//           }
//           connection.end();
//         });
//       }
//     });
//   });
// };

// // 글 정보
// const getPost = (postId) => {
//   return new Promise((resolve, reject) => {
//     const connection = mysql.createConnection(config);
//     connection.query(
//       `SELECT * FROM post WHERE post.id = ${postId}`,
//       (err, results) => {
//         if (err) reject(err);
//         resolve(results);
//         connection.end();
//       }
//     );
//   });
// };

// // 글 쓰기
// const addPost = () => {};

// // 글 수정

// // 내 판매목록
// const getSellList = () => {};

// // 내 채팅목록
// const getAllChatList = () => {};
// const getChatsByChatroomId = () => {};

// // 파는 물건 채팅목록
// const getChatListByPostId = () => {};

// // 채팅 나가기
// const removeChatJoined = () => {};

// // 내 관심목록
// const getLikeList = () => {};
