"use client";

import { UserButton } from "@clerk/nextjs";

import { ToastContainer } from "react-toastify";
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

      <div className="p-4 lg:pl-72 lg:py-16 bg-slate-800">
        <div className="mt-8">
          <h2 className="text-2xl text-white font-bold">Welcome to your dashboard</h2>
          <p className="text-white mt-2">
            This is your dashboard. You can see all your invoices here.
          </p>
        </div>
      </div>

    </>
  );
}