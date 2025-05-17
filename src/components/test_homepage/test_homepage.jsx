// HomePage.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/category/tree/')  
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map(cat => (
          <li key={cat.id}>
            <button onClick={() => navigate(`/${cat.slug}/`)}>
              {cat.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default HomePage;
