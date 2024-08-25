import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Sidebar() {
  const links = [
    { href: "/dashboard", label: "Dashboard" },
    { href: "/inventory", label: "Inventory" },
    { href: "/yield", label: "Yield" },
    { href: "/tracability", label: "traceability and batches" },
    { href: "/cleaning", label: "Cleaning" },
  ];


  return (
    <>
      <div className="hidden fixed lg:flex flex-col items-start justify-between h-screen w-64 bg-slate-900 p-4">

        <Button variant="secondary">
          <Link href="/">Welcome</Link>
        </Button>
        
        <ul className='space-y-4 w-full'>
          {links.map((link, index) => (
            <li key={index}>
              <Button variant="custumOutline">
                <Link href={link.href}>{link.label}</Link>
              </Button>
            </li>
          ))}
        </ul>

        <p className='text-slate-400 text-xs'>&copy; Alexandre Dincq 2024</p>
      </div>
    </>
  )
}