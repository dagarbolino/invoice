import { Button } from "@/components/ui/button";
import { auth } from "@clerk/nextjs";
import Link from "next/link";


export default function Home() {

  const { userId } = auth();


  return (
    <div className="p-4">
      <header className="flex items-center justify-between">
        <Button variant="outline">
          <Link href="/dashboard">Invoice</Link>
        </Button>

        {userId ? (
          <Button>
            <Link href="#">Go to ....</Link>
          </Button>
        ) : (
          <ul className="flex items-center gap-4">
            <li>
              <Button variant="secondary">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </li>
            <li>
              <Button>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </li>
          </ul>
        )}


      </header>

      <section className="relative py-32 space-y-8 max-w-4xl mx-auto text-center">
        <div className="absolute left-0 top-0 h-40 w-40 bg-pink-400 blur-[100px]"></div>
        <div className="absolute right-0 bottom-0 h-40 w-40 bg-blue-400 blur-[100px]"></div>

        <h1 className="text-4xl lg:text-6xl text-slate-800 font-bold">Welcome to Invoicer</h1>
        <p className="text-muted-forground text-lg lg:text-xl">
          Easily create invoices for yourself and your customers, all from the comfort of your PC.
          This version offers improved performance,
          better responsiveness and better UI design by Alexandre Dincq.
        </p>

        {userId ? (
          <Button>
            <Link href="/dashboard">Go to Dashboard</Link>
          </Button>
        ) : (
          <ul className="flex items-center justify-center gap-4">
            <li>
              <Button variant="secondary">
                <Link href="/sign-up">Sign Up</Link>
              </Button>
            </li>
            <li>
              <Button>
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </li>
          </ul>
        )}
      </section>
    </div>
  );
}
