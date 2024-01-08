"use client"
import Link from "next/link";
import { usePathname } from "next/navigation";


const links = [
    {
        title : "Home",
        href : "/"
    },
    {
        title : "Users",
        href : "/users"
    },
    {
        title : "Posts",
        href : "/posts"
    },
]
function Header() {
    const path = usePathname();

    return (  
        <header className="w-full fixed top-0 left-0 bg-slate-100/40">
            <nav className="w-full px-12 py-4 flex justify-between items-center">
                <span className="text-orange-600 text-2xl italic">UserPost</span>
                <ul className="flex gap-6 items-center">
                    { links.map( ({href,title}) => (
                        <li key={href} className={`outline-none flex font-bold border-b-2 border-transparent hover:bg-orange-300/30 ${href===path && "border-b-orange-500" || `${href}/*`==path && "border-b-orange-500"}`}>
                            <Link href={href} className="px-6 py-4">{title}</Link>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export default Header;