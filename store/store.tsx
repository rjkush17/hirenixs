import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "@/store/slices/counterSlice";
import onbaordingRecer from "@/store/slices/onboardingSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    onboarding : onbaordingRecer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
