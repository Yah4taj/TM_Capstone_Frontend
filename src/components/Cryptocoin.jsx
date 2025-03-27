import React, { useState, useEffect } from 'react';
import '../../styles/Crypto.css';

const CryptoCoin = ({ symbol = "BTC" }) => {
  // State to hold the coin data
  const [coin, setCoin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getCoin = async () => {
      try {
        setLoading(true);
        const url = `https://rest.coinapi.io/v1/exchangerate/${symbol}/USD?apikey=${import.meta.env.VITE_COINCAP_API_KEY}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }
        
        const data = await response.json();
        console.log('Fetched coin data:', data);
        setCoin(data);
      } catch(error) {
        console.error('Failed to fetch coin data:', error);
        setError('Failed to load cryptocurrency information. Please try again later.');
        
        // Set fallback data
        setCoin({
          asset_id_base: symbol,
          asset_id_quote: "USD",
          rate: 50000, // Fallback rate
          time: new Date().toISOString()
        });
      } finally {
        setLoading(false);
      }
    };

    getCoin();
  }, [symbol]);

  if (loading) {
    return <div className="crypto-section loading">Loading cryptocurrency data...</div>;
  }

  if (error && !coin) {
    return <div className="crypto-section error">{error}</div>;
  }

  return (
    <div className="crypto-section">
      <h2>Cryptocurrency Market Snapshot</h2>
      
      <div className="crypto-container">
        <div className="crypto-single">
          <div className="crypto-header">
            <div className="crypto-name">
              <h3>{coin.asset_id_base}/{coin.asset_id_quote}</h3>
            </div>
          </div>
          <div className="crypto-price">
            ${parseFloat(coin.rate).toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2
            })}
          </div>
          <div className="crypto-time">
            Updated: {new Date(coin.time).toLocaleString()}
          </div>
        </div>
        
        <div className="crypto-cta">
          <p>Want to learn more about cryptocurrency? Check out the Crypto Couriers group!</p>
        </div>
      </div>
    </div>
  );
};

export default CryptoCoin;