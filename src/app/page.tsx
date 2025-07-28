import ThemeSwitch from "@/components/theme-switcher";

export default function Home() {
    return (
        <div className="">
            <h1>Hello, Hirenixs</h1>
            <ThemeSwitch />
            <div className="bg-[var(--color-background)] text-[var(--color-foreground)]">
                Hello world
            </div>
        </div>
    );
}
