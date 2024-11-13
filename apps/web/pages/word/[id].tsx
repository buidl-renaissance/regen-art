import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

interface Content {
  id: string;
  title: string;
  body: string;
}

const WordPage = () => {
  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchContent = async () => {
      if (id) {
        try {
          const response = await axios.get(`/api/content/${id}`);
          setContent(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to fetch content');
          setLoading(false);
        }
      }
    };

    fetchContent();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!content) return <div>No content found</div>;

  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.body}</p>
    </div>
  );
};

export default WordPage;
