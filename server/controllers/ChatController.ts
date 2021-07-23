import { Response, NextFunction } from 'express';
import { ChatService } from '../services/ChatService';
import { PostService } from '../services/post/PostService';

// 문의하기
const getChatRoom = async (req: any, res: Response, next: NextFunction) => {
  const { id: buyer_id } = req.user;
  const { seller_id, post_id } = req.body;
  try {
    const result = await ChatService.findChatRoom({
      buyer_id,
      seller_id,
      post_id,
    });
    return res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

// 판매글의 채팅목록
const getChatRoomsByPostId = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id: user_id } = req.user;
  try {
    const result = await ChatService.findChatroomsByPostId({
      user_id,
    });
    return res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

// 유저의 채팅목록
const getChatRoomsByUserId = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id: user_id } = req.user;
  try {
    const result = await ChatService.findChatRoomsByUserId({ user_id });
    return res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

// 해당 방의 채팅들
const getChatsByChatRoomId = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id: user_id } = req.user;
  const { chatroomId } = req.params;
  try {
    const result = await ChatService.findChatsByChatroomId({
      room_id: chatroomId,
      user_id,
    });
    return res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

// 채팅 읽음
const resetUnreactChatsCount = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id: user_id } = req.user;
  const { chatroomId } = req.params;
  try {
    await ChatService.resetUnreadChatsCount({
      room_id: chatroomId,
      user_id,
    });
    return res.status(200).json({
      message: 'update success',
    });
  } catch (error) {
    next(error);
  }
};

const deleteChatJoined = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id: user_id } = req.user;
  const { chatroomId: room_id } = req.params;
  try {
    await ChatService.deleteChatJoined({ room_id, user_id });
    return res.status(200).json({
      message: 'delete success',
    });
  } catch (error) {
    next(error);
  }
};

export const ChatController = {
  getChatRoom,
  getChatRoomsByPostId,
  getChatsByChatRoomId,
  getChatRoomsByUserId,
  deleteChatJoined,
  resetUnreactChatsCount,
};
