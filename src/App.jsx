import { Suspense } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import Boards from "./components/Boards/Boards";

const translationRu = {
  Backlog: "Бэклог",
  "To Do": "Сделать",
  Ongoing: "В работе",
  Done: "Завершено",
  "Add new task": "Добавить новую задачу",
  Add: "Добавить",
  "Describe task...": "Опишите задачу...",
  "Delete?": "Удалить?",
  Yes: "Да",
  No: "Нет",
};

i18n.use(initReactI18next).init({
  resources: {
    ru: { translation: translationRu },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

const App = () => {
  return (
    <Suspense fallback="Loading...">
      <div className="App overflow-y-hidden h-[100vh] select-none relative">
        <Navbar />
        <Boards />
      </div>
    </Suspense>
  );
};

export default App;
