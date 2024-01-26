import React from 'react';

export type TagType = {
  id: number;
  name: string;
};

interface TagProps {
  tag: TagType;
  onSelectTag: (tagId: number) => void;
}

const Tag: React.FC<TagProps> = ({ tag, onSelectTag }) => {
  return (
    <span className="tag" onClick={() => onSelectTag(tag.id)}>
      {tag.name}
    </span>
  );
};

export default Tag;
