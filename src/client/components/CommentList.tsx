import React from 'react';

type Comment = {
  id: number;
  author: string;
  content: string;
  postId: number;
};

interface CommentListProps {
  comments: Comment[];
}

const CommentList: React.FC<CommentListProps> = ({ comments }) => {
  return (
    <div>
      {comments.map((comment) => (
        <div key={comment.id}>
          <strong>{comment.author}</strong>
          <p>{comment.content}</p>
        </div>
      ))}
    </div>
  );
};

export default CommentList;