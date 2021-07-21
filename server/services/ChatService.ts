import { execQuery } from '../database/database';
import {
  CREATE_CHAT,
  CREATE_CHATJOINED,
  CREATE_CHATROOM,
  FIND_CHATROOM_BY_BUYER_ID_SELLER_ID,
  GET_CHATJOINED_BY_ROOM_ID,
  GET_CHATROOMS_BY_CHATJOINED,
  GET_CHATROOMS_BY_POST_ID,
  GET_CHATS_BY_CHATROOM_ID,
  UPDATE_LAST_TEXT,
} from '../queries/chat';

export const ChatService = {
  // api 필요
  // 문의하기 눌렀을 때 채팅방 생성 || 가져오기
  getChatRoom: async ({
    buyer_id,
    seller_id,
    post_id,
    room_id,
  }: {
    post_id: number;
    buyer_id: number;
    seller_id: number;
    room_id: number;
  }) => {
    const data = await execQuery(
      FIND_CHATROOM_BY_BUYER_ID_SELLER_ID({ buyer_id, seller_id })
    );

    if (data) {
      return data;
    } else {
      await execQuery(CREATE_CHATROOM({ post_id, buyer_id, seller_id }));
      await execQuery(CREATE_CHATJOINED({ room_id, user_id: buyer_id }));

      const data = await execQuery(
        FIND_CHATROOM_BY_BUYER_ID_SELLER_ID({ buyer_id, seller_id })
      );

      return data;
    }
  },

  // api 필요
  // 해당 룸에 대한 채팅들
  getChatsByChatroomId: async ({ room_id }: { room_id: number }) => {
    const data = await execQuery(GET_CHATS_BY_CHATROOM_ID({ room_id }));
    return data;
  },

  // api 필요
  // 내가 쓴 포스트에 대한 채팅목록
  getChatroomsByPostId: async ({
    post_id,
    user_id,
  }: {
    post_id: number;
    user_id: number;
  }) => {
    const data = await execQuery(
      GET_CHATROOMS_BY_POST_ID({ post_id, user_id })
    );
    return data;
  },

  // 서버에서만 사용 (컨트롤러 필요없음)
  // 채팅 생성
  createChat: async ({
    room_id,
    seller_id,
    text,
    user_id,
  }: {
    room_id: number;
    seller_id: number;
    text: string;
    user_id: number;
  }) => {
    const data = await execQuery(
      GET_CHATJOINED_BY_ROOM_ID({ room_id, user_id: seller_id })
    );
    if (!data) {
      // 상대방에 대한 joined 생성
      await execQuery(CREATE_CHATJOINED({ room_id, user_id: seller_id }));
    }
    await execQuery(CREATE_CHAT({ room_id, text, user_id }));
    await execQuery(UPDATE_LAST_TEXT({ room_id, text }));
  },

  // api 필요
  // 내가 참여한 채팅목록
  getChatsByChatjoined: async ({
    room_id,
    user_id,
  }: {
    room_id: number;
    user_id: number;
  }) => {
    const data = await execQuery(
      GET_CHATROOMS_BY_CHATJOINED({ room_id, user_id })
    );
    return data;
  },
};
