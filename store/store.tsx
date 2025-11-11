import { configureStore } from "@reduxjs/toolkit";
import onbaordingRecer from "@/store/slices/onboardingSlice";

export const store = configureStore({
  reducer: {
    onboarding : onbaordingRecer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
