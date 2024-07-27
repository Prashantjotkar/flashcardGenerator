import "./App.css";
import FlashCard from "./Pages/FlashCard";
import MyFlashcard from "./Pages/MyFlashcard";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import Store from "./Redux/Store";
import FlashDetails from "./Pages/FlashDetails";
function App() {
  return (
    <div>

      <Provider store={Store}>
        <Routes>
          <Route exact path="*" element={<FlashCard />} />
          <Route path="/flashcards" element={<MyFlashcard />} />
          <Route path="/flashDetails" element={<FlashDetails />} />

        </Routes>
      </Provider>
    </div>
  );
}

export default App;
