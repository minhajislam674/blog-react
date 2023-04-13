import React, { useState, useEffect } from "react";
import { Article } from "../interfaces/Article";
import axios from "axios";

interface ContextProps {
  articleData: Article[];
  upvoteArticle: (articleId: string) => Promise<void>;
  removeVoteArticle: (articleId: string) => Promise<void>;
  addComment: (
    articleId: string,
    UserName: string,
    UserComment: string
  ) => Promise<void>;
  upvoted: boolean;
}

const Context = React.createContext<ContextProps>({
  articleData: [],
  upvoteArticle: async () => {},
  removeVoteArticle: async () => {},
  addComment: async () => {},
  upvoted: false,
});

function ContextProvider({ children }: { children: React.ReactNode }) {
  const [articleData, setArticleData] = useState<Article[]>([]);
  const [upvoted, setUpvoted] = useState(false);

  const addComment = async (
    articleId: string,
    UserName: string,
    UserComment: string
  ) => {
    const response = await axios.post(
      `http://localhost:3000/articles/${articleId}/comments`,
      {
        user: UserName,
        content: UserComment,
      }
    );
    const updatedArticle = response.data;
    setArticleData((prevArticleData) => {
      return prevArticleData.map((article) => {
        if (article._id === updatedArticle._id) {
          return updatedArticle;
        } else {
          return article;
        }
      });
    });
  };

  const fetchArticleData = async () => {
    const response = await axios.get(`http://localhost:3000/articles`);
    setArticleData(response.data);
  };

  useEffect(() => {
    fetchArticleData();
  }, []);

  //upvote article

  const upvoteArticle = async (articleId: string) => {
    const response = await axios.put(
      `http://localhost:3000/articles/${articleId}/addvote`
    );
    const updatedArticle = response.data;
    setArticleData((prevArticleData) => {
      return prevArticleData.map((article) => {
        if (article._id === updatedArticle._id) {
          return updatedArticle;
        } else {
          return article;
        }
      });
    });
    setUpvoted(true);
  };

  //remove vote

  const removeVoteArticle = async (articleId: string) => {
    const response = await axios.put(
      `http://localhost:3000/articles/${articleId}/removevote`
    );
    const updatedArticle = response.data;
    setArticleData((prevArticleData) => {
      return prevArticleData.map((article) => {
        if (article._id === updatedArticle._id) {
          return updatedArticle;
        } else {
          return article;
        }
      });
    });
    setUpvoted(false);
  };

  return (
    <Context.Provider
      value={{
        articleData,
        upvoteArticle,
        removeVoteArticle,
        addComment,
        upvoted,
      }}
    >
      {children}
    </Context.Provider>
  );
}

export { ContextProvider, Context };
