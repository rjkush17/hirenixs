import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { partialRecord } from "zod";

export interface OnboardingType {
    userID: string;
    title?: string;
    bio?: string;
    skills?: string[];
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
    userID: "xzy",
};

export const OnboardingSlice = createSlice({
    name: "onboarding",
    initialState,
    reducers: {
        updateState: (state, action: PayloadAction<Partial<OnboardingType>>) => {
            Object.assign(state, action.payload);
            console.log("new state is => ", state);
            return state;
        },
    },
});

export const { updateState} = OnboardingSlice.actions;
export default OnboardingSlice.reducer;
