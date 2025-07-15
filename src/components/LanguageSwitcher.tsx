import { useTranslation } from "react-i18next";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
  SelectLabel,
  SelectGroup
} from "./ui/select";

const languages = [
  { code: "pt", label: "Português" },
  { code: "en", label: "English" },
  { code: "es", label: "Español" },
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();
  return (
    <Select
      value={i18n.language}
      onValueChange={lng => i18n.changeLanguage(lng)}
    >
      <SelectTrigger className="w-full min-w-[140px]">
        <SelectValue placeholder="Idioma" />
      </SelectTrigger>
      <SelectContent className="w-full">
        <SelectGroup>
          <SelectLabel>Idioma</SelectLabel>
          {languages.map(lang => (
            <SelectItem key={lang.code} value={lang.code}>{lang.label}</SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
