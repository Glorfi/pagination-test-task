import { NextFunction, Response } from 'express';
import Innertube from 'youtubei.js';
import { IParseCaptionBodyRequest } from '../interfaces/requests/ParseCaption.js';
import { send } from 'process';

export async function getDuration(
  req: IParseCaptionBodyRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const youtube = await Innertube.create({
      lang: 'en',
      location: 'US',
      retrieve_player: false,
    });

    const videoId = req.body.videoId;
    const info = await youtube.getInfo(videoId);
    // res.send(lang);
    res.send({ duration: info.basic_info.duration, videoId });
  } catch (error) {
    next(error);
  }
}
