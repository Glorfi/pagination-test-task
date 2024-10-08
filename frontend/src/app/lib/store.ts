import { mainApi } from '@/shared/api/mainApi';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: { [mainApi.reducerPath]: mainApi.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(mainApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
export type AppStore = ReturnType<typeof configureStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
//export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = typeof store.dispatch;
