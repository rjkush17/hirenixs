import Link from "next/link"

function Sidebar() {

  return (
    <div>
            <Link href="/auth/login">Logins page</Link>
            <Link href='/auth/register'>Register pages</Link>
    </div>
  )
}

export default Sidebar
