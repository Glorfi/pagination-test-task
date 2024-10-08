import { Innertube } from 'youtubei.js/web';
import { IParseCaptionBodyRequest } from '../interfaces/requests/ParseCaption.js';
import { NextFunction, Response } from 'express';
import { Transcripts } from '../db/mongoConnector.js';

export async function parseSubtitles(
  req: IParseCaptionBodyRequest,
  res: Response,
  next: NextFunction
) {
  try {
    const youtube = await Innertube.create({
      lang: 'ru',
      location: 'RU',
      retrieve_player: false,
    });

    const videoId = req.body.videoId;
    const info = await youtube.getInfo(videoId);
    const lang = info.streaming_data?.formats[0].language;

    const transcriptData = await info.getTranscript();
  //  res.send(transcriptData)

    if (
      !transcriptData ||
      !transcriptData.transcript?.content?.body?.initial_segments
    ) {
      throw new Error('Transcript data is unavailable.');
    }

    const subtitleList =
      transcriptData.transcript.content.body.initial_segments.map((segment) => {
        return {
          text: segment.snippet.text,
          start: segment.start_ms,
          end: segment.end_ms,
        };
      });

    if (!info.primary_info || !info.primary_info.title?.runs?.length) {
      throw new Error('Primary info or title is unavailable.');
    }

    const transcriptEntity = {
      title: info.primary_info.title.runs[0]?.text || 'Unknown Title',
      videoId: videoId,
      subtitleList,
    };

    const transcriptRecord = await Transcripts.create(transcriptEntity);
    res.send(transcriptRecord);
  } catch (error) {
    next(error);
  }
}
