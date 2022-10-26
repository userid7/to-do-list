export default function ActivityFilter({ activeLen, filter, setFilter }) {
  const options = ["Active", "Complete", "All"];
  return (
    <div className="flex justify-between w-full h-16 px-6 text-sm leading-tight text-gray-700 align-middle bg-white rounded-b-lg shadow appearance-none dark:bg-input-dark focus:outline-none focus:shadow-outline dark:text-gray-300">
      <div className="my-auto">{activeLen} registered tasks</div>
      <div className="my-auto gap-x-5 flex">
        {options.map((item, i) => (
          <p
            className={
              (item === filter ? "text-blue-600 " : "") +
              "  hover:font-bold cursor-pointer"
            }
            key={item}
            onClick={(e) => {
              setFilter(item);
            }}
          >
            {item}
          </p>
        ))}
      </div>
    </div>
  );
}
