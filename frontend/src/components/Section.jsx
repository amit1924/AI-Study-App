import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Marked } from "marked"; // Import Link

const Section = () => {
  const { section } = useParams(); // Get section from URL params
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      console.log(`Fetching articles for section: ${section}`);
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://ai-study-app.vercel.app/articles/${section}`
        );
        console.log(`Fetching articles for section: ${section}`);
        console.log(
          `Requesting URL: https://ai-study-app.vercel.app/articles/${section}`
        );

        if (!response.ok) {
          throw new Error(`Error fetching articles: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("Fetched data:", data);

        const mappedData = data.map((d) => ({
          id: d._id,
          title: d.title,
          description: d.description,
        }));
        console.log(`Mapped data: ${JSON.stringify(mappedData, null, 2)}`);
        setArticles(mappedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, [section]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-4 bg-slate-950 text-white">
      <h1 className="text-2xl font-bold mb-4">Articles in {section}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {articles.length > 0 ? (
          articles.map((article) => (
            <div key={article.id} className="p-4 border rounded shadow">
              <h2 className="text-xl font-semibold text-red-700">
                {article.title}
              </h2>
              <p className="markdown-content prose prose-lg">
                {article.description.substring(0, 150)}...
              </p>{" "}
              <Link
                to={`/articles/${article.id}`}
                className="text-blue-500 hover:underline"
              >
                Read more
              </Link>
            </div>
          ))
        ) : (
          <p>No articles found in this section.</p>
        )}
      </div>
    </div>
  );
};

export default Section;
