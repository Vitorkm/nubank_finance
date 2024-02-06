import TimeExpenses from "@/components/Charts/TimeExpenses";
import TableMonth from "./TableMonth";

export default function Logged() {

  return (
    <main className="mt-16 ml-32 mr-32 flex flex-col gap-y-2">
      <div className="gap-y-3 w-full flex justify-between">
        <div className="flex flex-col">
      <h1 className="font-bold text-2xl text-purple-700">Good Morning Vitor</h1>
      <h2 className="font-semibold text-lg text-purple-200">{"Here's your month analysis"}</h2>
      </div>
      <div className="flex gap-4 items-center">
      <h1 className="font-bold text-2xl text-purple-700">Credit:</h1>
      <h2 className="font-semibold text-2xl text-purple-200">$1,000.00</h2>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-6 h-96 mt-10">
        <TimeExpenses />
      <div className="flex flex-col items-center">
        <TableMonth />
      </div>
    </div>
    </main>
  );
}
