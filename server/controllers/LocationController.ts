import { Request, Response, NextFunction } from 'express';
import { LocationService } from '../services/LocationService';

const getLocations = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const result = await LocationService.findLocations();
    return res.status(200).json({
      result,
    });
  } catch (error) {
    next(error);
  }
};

const getLocationsByUserNickname = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { user } = req;
    console.log(user);
    const result = await LocationService.findLocationsByUserNickname({
      nickname: user.nickname,
    });
    console.log(result);
    return res.status(200).json({
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
