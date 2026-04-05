"use client";
import useGET from "@/hooks/useGET";
import UserHeader from "@/components/Profile/Sections/UserHeader";
import AboutSection from "@/components/Profile/Sections/AboutSection";
import {
    User,
    About,
    ProfileType,
    Experience,
    Education,
    SocialLinks,
} from "@/types/profile";
import { useEffect, useState } from "react";
import { useModal } from "@/components/Profile/useModel";
import { Session } from "next-auth";

interface ProfileResponse {
    userheader: User | null;
    about: About | null;
    type?: ProfileType | null;
    skills?: string[] | null;
    experience?: Experience[] | null;
    education?: Education[] | null;
    socialLinks?: SocialLinks[] | null;
    profiletype: ProfileType | null;
}

function FetchProfileDetails({ para }: { para: string }) {
    const [profileData, setProfileData] = useState<ProfileResponse>({
        userheader: null,
        about: null,
        type: null,
        experience: null,
        education: null,
        socialLinks: null,
        profiletype: null,
    });
    const [isOwn, setIsOwn] = useState<boolean>(false);

    const { session }: { session: Session } = useModal();

    const {
        apiCall,
        isError,
        isLoading,
        result,
    }: {
        apiCall: (url: string) => void;
        isError: string | null;
        isLoading: boolean;
        result: {
            message: string;
            response: ProfileResponse;
            userID: string;
            email: string;
        } | null;
    } = useGET();

    useEffect(() => {
        apiCall(`/api/profile/${para}`);
    }, [para]);

    useEffect(() => {
        if (!result) return;
        const { response, userID, email } = result;
        setProfileData(response);
        if (email === session?.user.email && userID === session?.user?.userID) {
            setIsOwn(true);
        }
    }, [result, session]);
//FIX: ADD loading and error screen
    if (isLoading) {
        return <p>Loading pages</p>;
    }
    if (isError) {
        return <p>Error in the config </p>;
    }

    return (
        <main className="mx-auto max-w-11/12 lg:max-w-8/12 flex flex-col gap-8">
            <UserHeader props={profileData.userheader} isOwn={isOwn} />
            <AboutSection props={profileData.about} isOwn={isOwn} />

        </main>
    );
}
export default FetchProfileDetails;
