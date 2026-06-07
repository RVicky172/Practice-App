import React, { useOptimistic, useState } from "react";

type Comment = {
  id: string;
  text: string;
  pending?: boolean;
};

const initialComments: Comment[] = [
  { id: "1", text: "This hook makes forms feel instant." },
  { id: "2", text: "Great for optimistic UI updates." },
];

const UseOptimistic = () => {
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [draft, setDraft] = useState("");
  const [optimisticComments, addOptimisticComment] = useOptimistic(
    comments,
    (currentComments, newText: string) => [
      { id: `optimistic-${Date.now()}`, text: newText, pending: true },
      ...currentComments,
    ],
  );

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextText = draft.trim();
    if (!nextText) return;

    addOptimisticComment(nextText);
    setDraft("");

    setTimeout(() => {
      setComments((currentComments) => [
        { id: crypto.randomUUID(), text: nextText },
        ...currentComments,
      ]);
    }, 900);
  };

  return (
    <div className="p-6 rounded bg-white">
      <h2 className="text-2xl font-bold mb-2">useOptimistic</h2>
      <p className="text-gray-500 mb-4">
        Shows the new comment immediately while the real update is still
        pending.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-wrap gap-2 mb-4">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Write a comment..."
          className="w-full max-w-md px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Post comment
        </button>
      </form>

      <div className="space-y-2">
        {optimisticComments.map((comment) => (
          <div
            key={comment.id}
            className={`rounded border px-3 py-2 text-sm ${
              comment.pending
                ? "border-yellow-200 bg-yellow-50 text-yellow-800"
                : "border-gray-200 bg-white text-gray-800"
            }`}
          >
            {comment.text}
            {comment.pending && (
              <span className="ml-2 text-xs font-medium">Sending...</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UseOptimistic;
