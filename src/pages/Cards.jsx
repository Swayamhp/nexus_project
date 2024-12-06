import React from 'react';
import { useNavigate } from 'react-router-dom';

const CardsPage = () => {
  const navigate = useNavigate();

  const cards = [
    { title: 'Sports', description: 'Find all the latest sports events and updates.' },
    { title: 'Jobs', description: 'Explore job opportunities tailored for you.' },
    { title: 'Fest', description: 'Discover exciting festivals and celebrations happening around you.' },
  ];

  const handleNavigate = (category) => {
    navigate(`/form/${category}`);
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Explore Categories</h2>
      <div style={styles.cardsContainer}>
        {cards.map((card, index) => (
          <div key={index} style={styles.card}>
            <div style={styles.cardHeader}>
              <h3 style={styles.cardTitle}>{card.title}</h3>
            </div>
            <p style={styles.cardDescription}>{card.description}</p>
            <button
              style={styles.cardButton}
              onClick={() => handleNavigate(card.title)}
            >
              Go to {card.title} Form
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '900px',
    margin: '50px auto',
    textAlign: 'center',
    fontFamily: `'Arial', sans-serif`,
  },
  heading: {
    marginBottom: '20px',
    fontSize: '2rem',
    color: '#333',
  },
  cardsContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    flexWrap: 'wrap',
    gap: '20px',
  },
  card: {
    width: '280px',
    padding: '20px',
    border: '1px solid #ddd',
    borderRadius: '10px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    cursor: 'pointer',
  },
  cardHeader: {
    marginBottom: '10px',
    padding: '10px',
    borderRadius: '8px',
    backgroundColor: '#007BFF',
    color: '#fff',
  },
  cardTitle: {
    margin: 0,
    fontSize: '1.5rem',
  },
  cardDescription: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.5',
  },
  cardButton: {
    marginTop: '10px',
    padding: '10px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default CardsPage;
