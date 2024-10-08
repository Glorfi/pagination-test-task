import { mainApi } from '@/shared/api/mainApi';
import { API_PATH } from '@/shared/constants/ApiPaths';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getCars: builder.query<any, any>({
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
