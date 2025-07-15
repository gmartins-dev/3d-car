import { useTranslation } from "react-i18next";

const languages = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <select
      className="border rounded px-2 py-1 mb-4"
      value={i18n.language}
      onChange={e => i18n.changeLanguage(e.target.value)}
      aria-label="Selecionar idioma"
    >
      {languages.map(lang => (
        <option key={lang.code} value={lang.code}>{lang.label}</option>
      ))}
    </select>
  );
}
