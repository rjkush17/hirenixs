import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export interface OnboardingType {
    userID: string | undefined;
    title?: string;
    bio?: string;
    skills?: string[];
    role?: string;
    experience?: {
        company: string;
        title: string;
        description: string;
        startDate: Date;
        endDate: Date;
    }[];
    education?: {
        institute: string;
        course: string;
        startDate: Date;
        endDate: Date;
        description: string;
    }[];
    social?: {
        platform: string;
        url: string;
    }[];
}
const initialState: OnboardingType = {
    userID: undefined,
};

export const OnboardingSlice = createSlice({
    name: "onboarding",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<Partial<OnboardingType>>) => {
            Object.assign(state, action.payload);
            console.log("new state is => ", current(state));
            return state;
        },
        setUserID: (state, action: PayloadAction<string>) => {
            state.userID = action.payload;
        },
    },
});

export const { updateState } = OnboardingSlice.actions;
export default OnboardingSlice.reducer;
