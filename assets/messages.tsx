import { ChatMessageProps } from "@/components/ChatMessage";

const initialMessages: ChatMessageProps[] = [
  {
    type: "fromAI",
    text: "Oi! Comece enviando a foto de uma comida!",
    createdAt: new Date("2024-06-27T03:01:49.888Z"),
  },
  {
    type: "fromMe",
    text: "Foto enviada!",
    imageUri:
      "file:///var/mobile/Containers/Data/Application/9D3277A9-5B6E-43B3-94CD-4551BBECF212/Library/Caches/ExponentExperienceData/@anonymous/react-gemini-9badf188-66a3-41fa-8bc6-1dafdd2b3319/ImagePicker/96390ADA-B449-4E54-A2B3-C4D3B0C1DB92.jpg",
    createdAt: new Date("2024-06-26T15:34:49.888Z"),
  },
  { type: "fromSystem", text: "27/06/2024", createdAt: new Date("2024-04-27T03:01:49.888Z") },
  { type: "fromAI", text: "Resposta da IA!", createdAt: new Date("2024-06-27T20:18:49.888Z") },
];

export default initialMessages;
