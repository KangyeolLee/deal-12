// 문의하기 눌렀을 때 존재하는 채팅방인지
export const FIND_CHATROOM_BY_BUYER_ID_SELLER_ID = ({
  buyer_id,
  seller_id,
}: {
  buyer_id: number;
  seller_id: number;
}) => `
    SELECT * FROM chatRoom
    WHERE chatRoom.buyer_id = ${buyer_id} AND chatRoom.seller_id = ${seller_id};
`;

// 없으면 새로운 룸 생성
export const CREATE_CHATROOM = ({
  post_id,
  buyer_id,
  seller_id,
}: {
  post_id: number;
  buyer_id: number;
  seller_id: number;
}) => `
    INSERT INTO chatRoom(post_id, seller_id, buyer_id)
    VALUES(${post_id}, ${buyer_id}, ${seller_id});
`;

// 룸 생성과 동시에 생성
export const CREATE_CHATJOINED = ({
  room_id,
  user_id,
}: {
  room_id: number;
  user_id: number;
}) => `
    INSERT INTO chatJoined(room_id, user_id)
    VALUES(${room_id}, ${user_id});
`;

// 채팅방 나가기
export const DELETE_CHATJOINED = ({
  room_id,
  user_id,
}: {
  room_id: number;
  user_id: number;
}) => `
    DELETE FROM chatJoined
    WHERE chatJoined.room_id = ${room_id} AND chatJoined.user_id = ${user_id};
`;

// 다른 사용자가 채팅방을 나갔는지 확인하기 위함 (상대방에 대한 joined 새로 생성위함)
export const GET_CHATJOINED_BY_ROOM_ID = ({
  room_id,
  user_id,
}: {
  room_id: number;
  user_id: number;
}) => `
    SELECT * FROM chatJoined
    WHERE chatJoined.room_id = ${room_id} 
    AND NOT chatJoined.user_id = ${user_id};
`;

// 서버쪽에서 emit 감지했을 때 메세지 저장
export const CREATE_CHAT = ({
  room_id,
  text,
  user_id,
}: {
  room_id: number;
  text: string;
  user_id: number;
}) => `
    INSERT INTO chat (room_id, text, user_id) 
    VALUES (${room_id}, '${text}', ${user_id});
`;

// 메세지 생성되면 last_text 업데이트
export const UPDATE_LAST_TEXT = ({
  room_id,
  text,
}: {
  room_id: number;
  text: string;
}) => `
    UPDATE chatRoom SET last_text = '${text}'
    WHERE id = ${room_id}
`;

// 내가 참여한 채팅목록 확인 -> 제일 최근 채팅 가져와야 함
export const GET_CHATROOMS_BY_CHATJOINED = ({
  room_id,
  user_id,
}: {
  room_id: number;
  user_id: number;
}) => `
    SELECT post.thumbnail, seller_id, buyer_id chatRoom.last_text FROM chatJoined
    JOIN chatRoom ON chatRoom.id = ${room_id}
    JOIN post ON post.id = chatRoom.post_id
    WHERE chatJoined.room_id = ${room_id} chatJoined.user_id = ${user_id};
`;

// 해당 room에 대한 채팅들
export const GET_CHATS_BY_CHATROOM_ID = ({ room_id }: { room_id: number }) => `
    SELECT * FROM chat
    WHERE chat.room_id = ${room_id};
`;

// 내가 쓴 포스트에 대한 채팅목록 확인 -> 제일 최근 채팅 가져와야 함
export const GET_CHATROOMS_BY_POST_ID = ({
  post_id,
  user_id,
}: {
  post_id: number;
  user_id: number;
}) => `
    SELECT post.thumbnail, buyer_id last_text FROM chatRoom
    JOIN post ON post.id = ${post_id}
    WHERE chatRoom.post_id = ${post_id} AND chatRoom.seller_id = ${user_id};
`;
