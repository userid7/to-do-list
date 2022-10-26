import { Checkbox } from "@mui/material";

export default function EmptyActivityList({}) {
  return (
    <div
      className={`flex w-full h-16 px-5 text-lg leading-tight text-gray-700 align-middle bg-white dark:bg-input-dark  shadow appearance-none focus:outline-none focus:shadow-outline dark:text-gray-300 rounded-t-lg`}
    >
      <div className="flex-col flex-1 w-full my-auto mx-2 text-center border-none text-sm italic text-slate-400">
        there is nothing here
      </div>
    </div>
  );
}
