import { Response, NextFunction } from 'express';
import { ChatService } from '../services/ChatService';

// 문의하기
const getChatRoom = async (req: any, res: Response, next: NextFunction) => {
  const { id: buyer_id } = req.user;
  const { seller_id, post_id } = req.body;
  console.log(req.user, req.body);
  try {
    const result = await ChatService.getChatRoom({
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
const getChatRoomByPostId = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const { id: user_id } = req.user;
  const { postId: post_id } = req.params;
  try {
    const result = await ChatService.getChatroomsByPostId({
      post_id,
      user_id,
    });
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
  const { room_id } = req.body;
  try {
    const result = await ChatService.getChatsByChatroomId({ room_id });
    return res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const ChatController = {
  getChatRoom,
  getChatRoomByPostId,
  getChatsByChatRoomId,
};
