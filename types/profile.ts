export interface User {
    name: string;
    avatar?: {
        link: string;
        publicID: string;
    };
    username: string;
    title?: string;
    description?: string;
}

export interface About {
    employee?: string;
    website?: string;
    location: {
        city: string;
        state: string;
    };
}

export interface IMonthYear {
    month: number;
    year: number;
}

export type ProfileType = "individual" | "organization";

export interface SocialLinks {
    platform: string;
    url: string;
}

export interface Experience {
    company: string;
    title: string;
    description: string;
    isPresent?: boolean;
    startDate: IMonthYear;
    endDate?: IMonthYear;
}

export interface Education {
    institute: string;
    course: string;
    description?: string;
    startDate: IMonthYear;
    endDate?: IMonthYear;
}
