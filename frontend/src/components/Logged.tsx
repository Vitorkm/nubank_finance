'use client'
import TimeExpenses from "@/components/Charts/TimeExpenses";
import {Skeleton} from "@nextui-org/react";

export default function Logged() {

  return (
    <main className="mt-16 ml-32 mr-32 flex flex-col gap-y-16">
      <div className="gap-y-3 w-96 flex flex-col">
      <h1 className="font-bold text-2xl text-purple-700">Good Morning Vitor</h1>
      <h2 className="font-semibold text-lg text-purple-200">Here's your month analysis</h2>
    </div>
    <div className="grid grid-cols-2 h-96 mt-10">
      <div className="flex flex-col gap-2 h-full">
        <h2 className="font-semibold text-xl text-purple-700">Month Expenses January</h2>
        <h3 className="font-semibold text-lg text-purple-200">You spent $1,000.00</h3>
      {/* <Skeleton className="rounded-lg h-full"> */}
        <TimeExpenses />
      {/* </Skeleton> */}
      </div>
      <div className="flex flex-col items-center">
        <section className="flex gap-2">
        <div className="border-2 border-stone-700 p-6 rounded-lg text-center hover:border-purple-700 transition-colors">
        <h1 className="font-semibold text-xl text-purple-200">Balance</h1>
        <h2 className="font-semibold text-2xl text-purple-700">$1,000.00</h2>
        </div>
        </section>
      </div>
    </div>
    </main>
  );
}
