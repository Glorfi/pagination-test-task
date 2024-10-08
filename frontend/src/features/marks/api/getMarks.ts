import { mainApi } from '@/shared/api/mainApi';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { IGetMarksResponse } from '../model/types';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getMarks: builder.query<IGetMarksResponse, void>({
      query: (body) => ({
        url: `${API_PATH.MARKS}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
        body,
       }),
    }),
  }),
});

export const { useGetMarksQuery } = mainApiEndpoint;
