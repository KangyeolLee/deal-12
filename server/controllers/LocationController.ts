import { Request, Response, NextFunction } from 'express';
import { LocationService } from '../services/LocationService';

const getLocations = async (req: Request, res: Response) => {
  try {
    const result = await LocationService.findLocations();
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getLocationsByUserNickname = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await LocationService.findLocationsByUserNickname({
      nickname: req.user.id,
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
