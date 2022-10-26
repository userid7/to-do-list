import { useEffect, useState } from "react";
import EmptyActivityList from "./empty";
import ActivityFilter from "./filter";
import ActivityList from "./list";
import NewActivity from "./new";

export default function ToDoBase({
  items,
  addCallback,
  updateCallback,
  removeCallback,
}) {
  const [filter, setFilter] = useState("All");
  const [data, setData] = useState([]);

  useEffect(() => {
    var data = [];
    items.map((item, idx) => {
      if (filter === "Complete") {
        if (item.isComplete) {
          data.push(item);
        }
      } else if (filter === "Active") {
        if (!item.isComplete) {
          data.push(item);
        }
      } else {
        data.push(item);
      }
    });

    setData(data);
  }, [items, filter]);

  return (
    <div className="max-w-xl">
      <NewActivity addCallback={addCallback} />
      {data.length > 0 ? (
        data.map((item, idx) => {
          return (
            <ActivityList
              id={item.id}
              idx={idx}
              title={item.title}
              isComplete={item.isComplete}
              datetime={item.datetime}
              updateCallback={updateCallback}
              removeCallback={removeCallback}
            />
          );
        })
      ) : (
        <EmptyActivityList />
      )}
      <ActivityFilter
        activeLen={items.length}
        filter={filter}
        setFilter={setFilter}
      />
    </div>
  );
}
