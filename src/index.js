import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from './App';
import { NewsItem } from "./NewsItem/NewsItem";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <App />
    {/* <NewsItem
      title="Первая новость"
      url="example.com"
      username="Пользователь 1"
      date="10.10.24"
      score={10}
    />
    <NewsItem
      title="Вторая новость"
      url="example.com"
      username="Пользователь 2"
      date="11.10.24"
      score={2}
    /> */}
  </>
);

// function App() {
//   const [state, setState] = useState(false)
//   return (
//     <div>
//       <p>Текущее состояние: {String(state)}</p>
//       <button onClick={() => setState(!state)}>Переключить</button>
//     </div>
//   )
// }
