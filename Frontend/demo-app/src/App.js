import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [favouriteGame, setfavouriteGame] = useState('');
  const [name,setName] = useState('');
  const [flag,setFlag] = useState(false);

  const submitResponse = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/submit/', {
        name:name,
        answer: favouriteGame
      });
      setFlag(true);
     
    } catch (error) {
      setFlag(false);
      alert('Failed to submit answer');
    }
  };
  
  const clearResponse =   () => {
    setfavouriteGame('');
    setName('');
    setFlag(false);
    console.log(flag);
  }

  return (
    <div className="App">
      <h1>Fun Quiz</h1>
      
      {flag && <h3>Hurray! Information recieved successfully.</h3>}
      <form onSubmit={submitResponse}>
      <label>
      Enter your name 
          <input 
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <div class='form-check'>
        <label>
          Select your favourite sport
          <br></br>
          <input class="form-check-input"
            type="radio"
            value="Cricket"
            checked={favouriteGame === 'Cricket'}
            onChange={(e) => setfavouriteGame(e.target.value)}
          /> Cricket
        </label>
        <br />
        <label>
          <input class="form-check-input"
            type="radio"
            value="Football"
            checked={favouriteGame === 'Football'}
            onChange={(e) => setfavouriteGame(e.target.value)}
          /> Football
        </label>
        <br />
        <label>
          <input class="form-check-input"
            type="radio"
            value="Basketball"
            checked={favouriteGame === 'Basketball'}
            onChange={(e) => setfavouriteGame(e.target.value)}
          /> Basketball
        </label>
        <br />
        <label>
          <input class="form-check-input"
            type="radio"
            value="Soccer"
            checked={favouriteGame === 'Soccer'}
            onChange={(e) => setfavouriteGame(e.target.value)}
          /> Soccer
        </label></div>
        <br />
        <p><button type="submit" class="btn btn-primary">Submit</button></p>
        
       <p><button type="button" class="btn btn-primary" onClick={clearResponse}>Clear</button> </p> 
      </form>
      
    </div>
  );
}

export default App;
