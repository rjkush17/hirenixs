import Link from "next/link"
import ThemeSwitch from "@/components/theme-switcher";


function Sidebar() {

  return (
    <div className="flex flex-col w-28 bg-red-500">
            <Link href="/auth/login">Logins page</Link>
            <Link href='/auth/register'>Register pages</Link>
                        <ThemeSwitch />

    </div>
  )
}

export default Sidebar
