import { configureStore } from "@reduxjs/toolkit";
import onbaordingRecer from "@/store/slices/onboardingSlice";
import onboardingStepChecker from "@/store/slices/onboardinhStepChecker";

export const store = configureStore({
    reducer: {
        onboarding: onbaordingRecer,
        onboardingStepChecker: onboardingStepChecker,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
