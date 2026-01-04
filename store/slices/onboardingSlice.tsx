import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

export interface OnboardingType {
    userID: string | undefined;
    title?: string;
    bio?: string;
    skills?: string[];
    role?: string;
    experience: {
        company: string;
        title: string;
        description?: string;
        isPresent?: boolean;
        startDate: {
            month: number;
            year: number;
        };
        endDate?: {
            month: number;
            year: number;
        };
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
    social: {
        platform: string;
        url: string;
    }[];
}
const initialState: OnboardingType = {
    userID: undefined,
    education: [],
    skills: [],
    experience: [],
    social: [],
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
        addExperience: (
            state,
            action: PayloadAction<OnboardingType["experience"][number]>,
        ) => {
            state.experience?.push(action.payload);
            console.log("new state is => ", current(state));
        },
        removeExperience: (state, action: PayloadAction<number>) => {
            state.experience = state.experience.filter(
                (_, i) => i !== action.payload,
            );
        },
        setUserID: (state, action: PayloadAction<string>) => {
            state.userID = action.payload;
        },
        addskills: (state, action: PayloadAction<string>) => {
            const isIncluded = state.skills?.includes(action.payload);
            if (!isIncluded) state.skills?.push(action.payload);
        },
        removeSkills: (state, action: PayloadAction<number>) => {
            state.skills = state.skills?.filter((_, i) => i !== action.payload);
        },
        addSocialLinks: (
            state,
            action: PayloadAction<OnboardingType["social"][number]>,
        ) => {
            state.social?.push(action.payload);
            console.log("New state is => ", current(state));
        },
        removeSocialLinks: (state, action: PayloadAction<number>) => {
            state.social = state.social?.filter((_, i) => i !== action.payload);
        },
    },
});

export const {
    updateState,
    addEducation,
    setUserID,
    removeEducation,
    addskills,
    removeSkills,
    addExperience,
    removeExperience,
    addSocialLinks,
    removeSocialLinks,
} = OnboardingSlice.actions;
export default OnboardingSlice.reducer;
