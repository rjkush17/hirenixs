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
    education: {
        institute: string;
        course: string;
        startDate: {
            month: number;
            year: number;
        };
        endDate: {
            month: number;
            year: number;
        };
        description?: string;
    }[];
    social?: {
        platform: string;
        url: string;
    }[];
}
const initialState: OnboardingType = {
    userID: undefined,
    education: [],
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
        addEducation: (
            state,
            action: PayloadAction<OnboardingType["education"][number]>,
        ) => {
            state.education?.push(action.payload);
            console.log("new state is => ", current(state));
        },
        removeEducation: (state, action: PayloadAction<number>) => {
            state.education = state.education.filter((_, i) => i !== action.payload);
        },
        setUserID: (state, action: PayloadAction<string>) => {
            state.userID = action.payload;
        },
    },
});

export const { updateState, addEducation, setUserID, removeEducation } = OnboardingSlice.actions;
export default OnboardingSlice.reducer;
