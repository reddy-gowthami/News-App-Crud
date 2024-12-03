import React, { useEffect, useState } from 'react';
import NewsCard from './NewsCard';

const NewsList = () => {


  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newArticle, setNewArticle] = useState({
    title: '',
    description: '',
    url: '',
    image: '', // Updated field to match JSON format
  });

  // Fetch news articles from JSON Server (Read)
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('http://localhost:3001/news');
        const data = await response.json();
        setArticles(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching news:', error);
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  // Handle form inputs for new article
  const handleInputChange = (e) => {
    setNewArticle({
      ...newArticle,
      [e.target.name]: e.target.value,
    });
  };

  // Add a new article (Create)
  const handleAddArticle = async () => {
    try {
      const response = await fetch('http://localhost:3001/news', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newArticle),
      });
      if (response.ok) {
        const addedArticle = await response.json();
        setArticles([...articles, addedArticle]);
        setNewArticle({
          title: '',
          description: '',
          url: '',
          image: '', // Reset image field
        });
      } else {
        console.error('Error adding article');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Delete an article (Delete)
  const handleDeleteArticle = async (idToDelete) => {
    try {
      const response = await fetch(`http://localhost:3001/news/${idToDelete}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setArticles(articles.filter((article) => article.id !== idToDelete));
      } else {
        console.error('Error deleting article');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  // Update an article (Update)
  const handleEditArticle = async (idToEdit) => {
    const updatedTitle = prompt('Enter new title:');
    const updatedDescription = prompt('Enter new description:');
    if (updatedTitle && updatedDescription) {
      try {
        const updatedArticle = {
          ...articles.find((article) => article.id === idToEdit),
          title: updatedTitle,
          content: updatedDescription,
        };

        const response = await fetch(`http://localhost:3001/news/${idToEdit}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedArticle),
        });

        if (response.ok) {
          const data = await response.json();
          setArticles(
            articles.map((article) =>
              article.id === idToEdit ? data : article
            )
          );
        } else {
          console.error('Error updating article');
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="container">
      <h1>News List</h1>

      {/* Add New Article Form */}
      <div className="my-3">
        <h3>Add New Article</h3>
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="form-control my-2"
          value={newArticle.title}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="description"
          placeholder="Description"
          className="form-control my-2"
          value={newArticle.description}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="url"
          placeholder="URL"
          className="form-control my-2"
          value={newArticle.url}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          className="form-control my-2"
          value={newArticle.image}
          onChange={handleInputChange}
        />
        <button className="btn btn-success" onClick={handleAddArticle}>
          Add Article
        </button>
      </div>

      {/* Display News Articles */}
      {articles.map((article) => (
        <div key={article.id}>
          <NewsCard
            title={article.title}
            description={article.content}
            url={article.url}
            imageUrl={article.image} // Updated field name to match JSON
          />
          <button
            className="btn btn-warning mx-2"
            onClick={() => handleEditArticle(article.id)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger"
            onClick={() => handleDeleteArticle(article.id)}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default NewsList;


// import React, { useEffect, useState } from 'react'

// const NewsList = () => {
//     const [count1,setCount1]=useState(0)
//     const [count2,setCount2]=useState(0)

//     useEffect(()=>{
//     console.log("rendered")

//     },[count1,count2])

//     // console.log("rendered")
//     // console.log("rendered")
//   return (
//     <div>
//       <button onClick={(count)=>setCount1(count + count1)}>btn 1</button>
//       <button onClick={(count)=>setCount2(count + count2)}>btn 2</button>
//     </div>
//   )
// }

// export default NewsList

