import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { marked } from "marked"; // Import marked for Markdown rendering

const Article = () => {
  const { id } = useParams(); // Get article ID from URL
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `https://ai-study-app.vercel.app/articles/detail/${id}`
        );
        if (!response.ok) {
          throw new Error(`Error fetching article: ${response.statusText}`);
        }
        const data = await response.json();
        setArticle(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return <div className="text-center py-4">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-4 text-red-600">Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4">
      {article && (
        <div className="p-6 bg-slate-950  border rounded-lg shadow-md">
          <h1 className="text-3xl font-bold text-blue-600 mb-4">
            {article.title}
          </h1>
          {/* Render the description with marked */}
          <div
            className="markdown-content prose prose-lg"
            dangerouslySetInnerHTML={{ __html: marked(article.description) }} // Convert Markdown to HTML
          />
        </div>
      )}
    </div>
  );
};

export default Article;
