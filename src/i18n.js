import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      "description": `Hello! The use of SVG in CSS without encoding is
                      possible only in Webkit based browsers.
        This application will help you to quickly get CSS code from SVG.`,
      "upload": "Upload",
      "choose": "Choosen file",
      "only_svg": "You can upload only SVG file!",
      "browse": "Browse",
      "insert": "Insert SVG:",
      "take_encoded": "Take encoded:",
      "css": "Ready for CSS:",
      "preview": "Preview:",
      "example": "example",
      "copy": "copy",
      "background": "Background"
    }
  },
  ru: {
    translation: {
      "description": `Здравствуйте! Использование SVG в CSS без кодирования
      возможно только в браузерах на базе Webkit.
      Это приложение поможет вам быстро получить CSS код из SVG.`,
      "upload": "Загрузить",
      "choose": "Выбрать файл",
      "only_svg": "Вы можете загрузить только SVG файл!",
      "browse": "Выбрать",
      "insert": "Вставить SVG:",
      "take_encoded": "Закодированный:",
      "css": "Код для CSS:",
      "preview": "Превью:",
      "example": "пример",
      "copy": "скопировать",
      "background": "Фон"
    }
  },
  ukr: {
    translation: {
      "description": `Ласкаво просимо! Використання SVG у CSS без кодування
      можливо лише у браузерах на основі Webkit. Цей додаток допоможе вам швидко
      отримати CSS код з SVG.`,
      "upload": "Завантажити",
      "choose": "Вибрати файл",
      "only_svg": "Ви можете завантажити тільки SVG файл!",
      "browse": "Вибрати",
      "insert": "Вставити SVG:",
      "take_encoded": "Закодований:",
      "css": "Код для CSS:",
      "preview": "Прев'ю:",
      "example": "приклад",
      "copy": "скопіювати",
      "background": "Фон"
    }
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",

    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

  export default i18n;