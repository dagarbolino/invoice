import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
  return (
    <>
    <div className="hidden fixed lg:flex flex-col items-start justify-between h-screen w-64 bg-slate-900 p-4">

        <Button variant="secondary">Welcome</Button>

          <ul className='space-y-4'>
            <li>
              <Button variant="custumOutline">
                <Link href="/">Dashboard</Link>
              </Button>
            </li>

            <li>
              <Button variant="custumOutline">
                <Link href="#">Invoice</Link>
              </Button>
            </li>

            <li>
              <Button variant="custumOutline">
                <Link href="#">Inventory</Link>
              </Button>
            </li>

            <li>
              <Button variant="custumOutline">
                <Link href="#">Provider</Link>
              </Button>
            </li>

            <li>
              <Button variant="custumOutline">
                <Link href="#">Yield</Link>
              </Button>
            </li>

            <li>
              <Button variant="custumOutline">
                <Link href="#">Cleaning</Link>
              </Button>
            </li>

            <li>
              <Button variant="custumOutline">
                <Link href="/privacy-policy">Privacy Policy</Link>
              </Button>
            </li>

          </ul>
          <p className='text-slate-400 text-xs'>&copy; Alexandre Dincq 2024</p>

    </div>
    </>
  )
}
