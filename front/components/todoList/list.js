import { Checkbox } from "@mui/material";

export default function ActivityList({
  id,
  idx,
  title,
  datetime,
  isComplete,
  updateCallback,
  removeCallback,
}) {
  return (
    <div
      className={
        `flex w-full h-16 px-5 text-lg leading-tight text-gray-700 align-middle bg-white dark:bg-input-dark  shadow appearance-none focus:outline-none focus:shadow-outline dark:text-gray-300  ` +
        (idx === 0 ? " rounded-t-lg" : "")
      }
    >
      <div className="my-auto">
        <Checkbox
          checked={isComplete}
          onChange={(e) => {
            updateCallback(id, title, datetime, !isComplete);
          }}
        />
      </div>

      <div
        id="todo-list-title"
        className="flex flex-1 w-full my-auto mx-2 align-middle border-none cursor-pointer input hover:text-blue-600"
      >
        {isComplete ? <strike>{title}</strike> : title}
      </div>

      <div className="my-auto mx-2">
        <button
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          onClick={(e) => {
            removeCallback(id);
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
