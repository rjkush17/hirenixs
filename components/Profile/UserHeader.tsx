import { User } from "@/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Handshake, MessageCircle, SquarePen } from "lucide-react";

function UserHeader({ props, isOwn }: { props: User | null; isOwn: boolean }) {
    if (!props) return null;

    return (
        <Card className="mx-auto shadow-md w-full h-full py-0">
            <CardContent className="flex flex-col sm:flex-row items-center sm:items-stretch gap-6 p-4 h-full">
                {/* Avatar */}
                <div className="flex items-center justify-center">
                    <Avatar className="w-28 h-28 rounded-xl relative">
                        <AvatarImage
                            src={props.avatar?.link || "/defaultProfile/male.jpg"}
                            alt={props.name}
                            className="object-cover"
                        />
                        <AvatarFallback className="rounded-xl text-lg font-semibold">
                            {props.name?.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                        <span className="text-lg bg-primary p-2 rounded-xl absolute right-0 bottom-0">
                            <SquarePen />
                        </span>
                    </Avatar>
                </div>

                {/* Content (Full Height) */}
                <div className="flex flex-col justify-between flex-1 h-full text-center sm:text-left">
                    <div>
                        <h2 className="text-4xl sm:text-5xl font-extrabold leading-tight text-primary">
                            {props.name}
                        </h2>

                        <p className="text-2lg sm:text-xl font-medium  mt-1">
                            {props.title}
                        </p>
                    </div>

                    <p className="text-sm text-muted-foreground mt-2 sm:mt-0">
                        @{props.username}
                    </p>
                    <p className="mt-2 sm:mt-0">{props.description}</p>
                </div>
                <div className="flex flex-col gap-4 justify-center">
                    {isOwn ? (
                        <Button className="text-lg">
                            <SquarePen /> Edit
                        </Button>
                    ) : (
                        <>
                            <Button className="text-lg">
                                <Handshake /> Connect
                            </Button>
                            <Button variant={"secondary"} className="text-lg">
                                <MessageCircle />
                                Message
                            </Button>
                        </>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default UserHeader;
