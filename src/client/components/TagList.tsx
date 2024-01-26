import React from 'react';
import Tag from './Tag';

type TagType = {
  id: number;
  name: string;
};

interface TagListProps {
  tags: TagType[];
  onSelectTag: (tagId: number) => void;
}

const TagList: React.FC<TagListProps> = ({ tags, onSelectTag }) => {
  return (
    <div className="tag-list">
      {tags.map((tag) => (
        <Tag key={tag.id} tag={tag} onSelectTag={onSelectTag} />
      ))}
    </div>
  );
};

export default TagList;