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

      <div className="p-4 lg:pl-72 lg:py-14 bg-slate-800 h-screen">
        <div className="">
          <h2 className="text-3xl text-white font-bold">Welcome to your dashboard</h2>
          <p className="text-2xl mt-4 text-white px-4">
            On this website, you will be able to benefit from various features. Such as the possibility of creating an invoice,
            making an inventory, making a return to calculate a margin for a product,
            recording a traceability follow-up or a cleaning follow-up.
          </p>

          <div className="my-12 border w-1/3"></div>

          <h2 className="text-3xl text-white font-bold">Bienvenue sur votre tableau de bord</h2>
          <p className="text-2xl mt-4 text-white px-4">
          Sur ce site web, vous pourrez profiter de divers fonctionnalitées. Comme la possibilitée de créer une facture, 
          de faire un inventaire, de faire un rendement pour vous calculer une marge d'un produit, 
          d'enregistrer un suivie de tracabilitée ou un suivie de nettoyage.
          </p>

        </div>
      </div>

    </>
  );
}