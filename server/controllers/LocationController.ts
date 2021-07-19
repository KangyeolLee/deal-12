import { Request, Response, NextFunction } from 'express';
import { LocationService } from '../services/LocationService';

const getLocations = async (req: Request, res: Response) => {
  try {
    const result = await LocationService.findLocations();
    res.status(200).json({
      message: 'ok',
      result,
    });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getLocationsByUserNickname = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const nickname = req.body.nickname || '우아한나그네';
    const result = await LocationService.findLocationsByUserNickname({
      nickname,
    });
    res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const LocationController = {
  getLocations,
  getLocationsByUserNickname,
};
