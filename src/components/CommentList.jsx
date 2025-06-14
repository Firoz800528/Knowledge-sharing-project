import React from 'react';

export default function CommentList({ comments }) {
  if (!comments.length) return <p>No comments yet.</p>;

  return (
    <ul className="space-y-4">
      {comments.map((c) => (
        <li key={c._id} className="border rounded p-3 bg-gray-50">
          <div className="flex items-center mb-1">
            {c.user_photo && (
              <img
                src={c.user_photo}
                alt={c.user_name}
                className="w-8 h-8 rounded-full mr-2"
              />
            )}
            <span className="font-semibold">{c.user_name}</span>
            <span className="ml-2 text-xs text-gray-500">
              {new Date(c.date).toLocaleString()}
            </span>
          </div>
          <p>{c.comment}</p>
        </li>
      ))}
    </ul>
  );
}
