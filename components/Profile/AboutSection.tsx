import { About } from "@/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    Handshake,
    Star,
    Globe,
    MessageCircle,
    MapPin,
    Users,
    SquarePen,
    LucideIcon,
} from "lucide-react";

interface DataInterface {
    fieldName: string;
    fieldValue: string | undefined;
    fieldIcon: LucideIcon;
}

function AboutSection({
    props,
    isOwn,
}: {
    props: About | null;
    isOwn: boolean;
}) {
    if (!props) return null;

    const location: string | undefined =
        `${props?.location?.city}, ${props?.location?.state}`;

    const data: DataInterface[] = [
        { fieldName: "Website", fieldValue: props?.website, fieldIcon: Globe },
        { fieldName: "location", fieldValue: location, fieldIcon: MapPin },
        {
            fieldName: "Total Employee",
            fieldValue: props?.employee,
            fieldIcon: Users,
        },
    ];

    return (
        <Card className="mx-auto shadow-md w-full py-0">
            <CardContent className="pb-4">
                <div className="flex justify-between items-center my-2">
                    <h1 className="text-3xl flex items-center text-primary font-bold">
                        <Star className="mr-1" />
                        More
                    </h1>
                    <span className="bg-primary p-2 rounded-xl">
                        <SquarePen />
                    </span>
                </div>
                <div className="grid sm:grid-cols-3 gap-4">
                    {data.map((item, ind) => {
                        const Icon = item.fieldIcon;

                        return (
                            <div
                                key={ind}
                                className="flex items-center gap-4 w-full rounded-2xl px-4 py-3 
                   bg-muted/40 hover:bg-muted/60 transition-colors"
                            >
                                <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                                    <Icon className="w-5 h-5 text-primary" />
                                </div>

                                <div className="flex flex-col min-w-0">
                                    <span className="text-xs text-muted-foreground uppercase tracking-wide">
                                        {item.fieldName}
                                    </span>

                                    <span className="text-sm font-medium truncate">
                                        {item.fieldValue || "Not available"}
                                    </span>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </CardContent>
        </Card>
    );
}

export default AboutSection;
