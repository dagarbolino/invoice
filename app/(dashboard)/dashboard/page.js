"use client";

import { UserButton } from "@clerk/nextjs";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




export default function Dashboard() {


  return (
    <>
      <ToastContainer theme="colored" />
        <div className="p-4 lg:pl-72 lg:py-16 bg-slate-900">
          <div className="flex items-center justify-between">
            <h1 className="text-4xl text-white font-bold lg:text-5xl">
            Dashboard
            </h1>

          <UserButton afterSignOutUrl="/" />
        </div>
      </div>

    <section className="lg:pl-72 px-4 mt-8 lg:grid lg:grid-cols-2 gap-8">
    </section>
    </>
  );
}