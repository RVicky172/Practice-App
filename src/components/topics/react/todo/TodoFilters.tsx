import { TodoFilter } from "./types";

type TodoFiltersProps = {
  activeFilter: TodoFilter;
  onChangeFilter: (filter: TodoFilter) => void;
};

const filters: { label: string; value: TodoFilter }[] = [
  { label: "All", value: "all" },
  { label: "Completed", value: "completed" },
  { label: "Pending", value: "pending" },
];

function TodoFilters({ activeFilter, onChangeFilter }: TodoFiltersProps) {
  return (
    <div className="flex gap-2">
      {filters.map((filter) => {
        const isActive = activeFilter === filter.value;

        return (
          <button
            key={filter.value}
            className={`px-3 py-1 rounded border ${
              isActive
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
            }`}
            onClick={() => onChangeFilter(filter.value)}
            type="button"
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}

export default TodoFilters;
