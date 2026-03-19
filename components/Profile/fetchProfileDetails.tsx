"use client";
import useGET from "@/hooks/useGET";
import {
    User,
    About,
    ProfileType,
    Experience,
    Education,
    SocialLinks,
} from "@/types/profile";
import { useEffect, useState } from "react";

interface ProfileResponse {
    userheader?: User | null;
    about?: About | null;
    type?: ProfileType | null;
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
        } | null;
    } = useGET();

    useEffect(() => {
        apiCall(`/api/profile/${para}`);
    }, [para]);

    useEffect(() => {
        if (!result) return;
        const { response } = result;
        setProfileData(response);
        console.log("Profile data ", profileData);
    }, [isLoading]);

    if (isLoading) {
        return <p>Loading pages</p>;
    }
    if (isError) {
        return <p>Error in the config </p>;
    }

    return (
        <>
            <p>yay! its work</p>
        </>
    );
}
export default FetchProfileDetails;
