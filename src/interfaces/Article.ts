export interface Article {
  _id: string;
  title: string;
  author: string;
  content: string;
  vote: number;
  comments: {
    _id: string;
    user: string;
    content: string;
  }[];
}
