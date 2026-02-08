import Nav from "@/components/Home/Nav/nav";
import Hero from "@/components/Home/Hero/Hero";
import Skills from "@/components/Home/Skill/skills";
import Connect from "@/components/Home/Connect/connect";
import States from "@/components/Home/States/States";
import Find from "@/components/Home/Find/Find";
import Jobs from "@/components/Home/Jobs/Jobs";
import Footer from "@/components/Home/Footer/Footer";

export default async function Home() {
    return (
        <div className="min-h-screen bg-white">
            <Nav />
            <Hero />
            <Skills />
            <Connect />
            <States />
            <Find />
            <Jobs />
            <Footer />
        </div>
    );
}
