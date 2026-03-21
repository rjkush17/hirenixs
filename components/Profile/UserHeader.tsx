import { User } from "@/types/profile";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

function UserHeader({ props }: { props: User | null }) {
    if (!props) return null;

    return (
        <Card className="mx-auto p-4 shadow-md">
            <CardContent className="flex flex-col sm:flex-row items-center gap-6">
                <Avatar className="w-36 h-36 rounded-lg">
                    <AvatarImage
                        src={props.avatar?.link || "/defaultProfile/male.jpg"}
                        alt={props.name}
                        className="object-cover"
                    />
                    <AvatarFallback className="rounded-md">
                        {props.name?.slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                </Avatar>

                <div className="flex-1 text-center sm:text-left space-y-1">
                    <h2 className="text-2xl font-semibold mb-0 pb-0">{props.name}</h2>

                    <p className="text-muted-foreground mt-0 pt-0">@{props.username}</p>

                    <p className="text-lg font-medium">{props.title}</p>

                    {props.description && (
                        <p className="text-sm text-muted-foreground">{props.description}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default UserHeader;
