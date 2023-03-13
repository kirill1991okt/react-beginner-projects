import React from 'react';
import Collection from './Collection';
import './index.scss';

const categories = [
  { name: 'Все' },
  { name: 'Море' },
  { name: 'Горы' },
  { name: 'Архитектура' },
  { name: 'Города' },
];

function App() {
  const [collections, setCollections] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [page, setPage] = React.useState(1);
  const [categoryId, setCategoryId] = React.useState(0);
  const [inputValue, setInputValue] = React.useState('');

  const loadingCollection = async (url) => {
    setIsLoading(true);
    if (categoryId) {
      url.searchParams.append('category', categoryId);
    }
    url.searchParams.append('page', page);
    url.searchParams.append('limit', 6);
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      const data = await res.json();
      setCollections(data);
      setIsLoading(false);
    } catch (error) {
      throw Error(error);
    }
  };

  React.useEffect(() => {
    const url = new URL(
      'https://640ed909cde47f68db39f362.mockapi.io/collections'
    );
    loadingCollection(url);
  }, [categoryId, page]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {categories.map(({ name }, i) => (
            <li
              key={i}
              className={categoryId === i ? 'active' : ''}
              onClick={() => {
                setCategoryId(i);
              }}
            >
              {name}
            </li>
          ))}
        </ul>
        <input
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="search-input"
          placeholder="Поиск по названию"
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h1>Идет загрузка...</h1>
        ) : (
          collections
            .filter(({ name }) => name.includes(inputValue))
            .map(({ name, photos }, i) => (
              <Collection key={i} name={name} images={photos} />
            ))
        )}
      </div>
      <ul className="pagination">
        {[...Array(3)].map((_, i) => (
          <li
            key={i}
            onClick={() => {
              setPage(i + 1);
            }}
            className={page === i + 1 ? 'active' : ''}
          >
            {i + 1}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
