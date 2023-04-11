import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import AboutPage from "./pages/AboutPage";
import ArticlePage from "./pages/ArticlePage";
import ArticlesListPage from "./pages/ArticlesListPage";
import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import NavBar from "./components/NavBar";
import "./App.css";

const sections = [
  { title: "Home", url: "/" },
  { title: "About", url: "/about" },
  { title: "Articles", url: "/articles" },
];

interface Article {
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

function App() {
  const [articleData, setArticleData] = useState<Article[]>([]);

  const fetchArticleData = async () => {
    const response = await axios.get(`http://localhost:3000/articles`);
    setArticleData(response.data);
  };

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
  };

  useEffect(() => {
    fetchArticleData();
  }, []);

  return (
    <div className="App">
      <NavBar title="Blog" sections={sections} />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route
          path="/articles"
          element={<ArticlesListPage articles={articleData} />}
        />
        <Route
          path="/articles/:articleId"
          element={
            <ArticlePage
              articles={articleData}
              upvoteArticle={upvoteArticle}
              removeVoteArticle={removeVoteArticle}
            />
          }
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  );
}

export default App;
