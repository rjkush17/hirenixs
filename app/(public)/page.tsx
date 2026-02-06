import HomeComponent from "@/components/home/Home";
import Nav from "@/components/Home/Nav/nav";

export default async function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Nav />
            <HomeComponent />
        </div>
    );
}
