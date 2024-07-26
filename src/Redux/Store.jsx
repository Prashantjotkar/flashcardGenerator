import { configureStore } from "@reduxjs/toolkit";
import flashcardReducer from "./FlashCardReducer";

const Store = configureStore({
  reducer: {
    flashcard: flashcardReducer,
  },
});

export default Store;
