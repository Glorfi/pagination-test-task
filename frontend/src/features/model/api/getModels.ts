import { mainApi } from '@/shared/api/mainApi';
import { API_PATH } from '@/shared/constants/ApiPaths';

const mainApiEndpoint = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getModels: builder.query<string[], string>({
      query: (mark) => ({
        url: `${API_PATH.CARS}/${mark}/models`,
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET',
      }),
    }),
  }),
});

export const { useLazyGetModelsQuery } = mainApiEndpoint;
