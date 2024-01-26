export type BlogTag = {
    blogid: number;
    tagid: number;
};

export interface Blog {
    id: number;
    title: string;
    content: string;
    authorid: number;
    createdAt: string; 
};

export interface Author {
    id: number;
    name: string;
    email: string;
};
  
export type Tag = {
    id: number;
    name: string;
};