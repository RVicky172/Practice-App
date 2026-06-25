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
            className={`px-3 py-1 rounded border font-medium transition-all duration-300 ${
              isActive
                ? "bg-blue-600 dark:bg-blue-500 text-white border-blue-600 dark:border-blue-500"
                : "bg-white dark:bg-slate-700 text-gray-700 dark:text-slate-300 border-gray-300 dark:border-slate-600"
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
