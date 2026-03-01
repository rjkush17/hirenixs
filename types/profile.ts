export interface User {
    name: string;
    avatar?: {
        link: string;
        publicID: string;
    };
    username: string;
    title: string;
    location?: {
        city: string;
        state: string;
    };
    website?: string;
}

export interface IMonthYear {
    month: number;
    year: number;
}

export type ProfileType = "individual" | "compnany";

export interface About {
    description: string;
}

export interface Skill {
    platform: string;
    url: string;
}

export interface Experience {
    compnany: string;
    title: string;
    description: string;
    isPresent?: boolean;
    startDate: IMonthYear;
    endDate?: IMonthYear;
}

export interface Education {
    institute: string;
    course: string;
    startDate: IMonthYear;
    endDate: IMonthYear;
}
