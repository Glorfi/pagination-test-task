import { mainApi } from '@/shared/api/mainApi';
import { API_PATH } from '@/shared/constants/ApiPaths';
import { IGetCarsQueryParams, IGetCarsResponse } from '../model/types';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<IGetCarsResponse, IGetCarsQueryParams>({
      query: (params) => ({
        url: `${API_PATH.CARS}`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
        params
      }),
    }),
  }),
});

export const { useGetCarsQuery } = mainApiEndpoint;
