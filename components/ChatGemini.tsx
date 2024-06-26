import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import GeminiService from "../GeminiService";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

const ChatGemini = () => {
  const [input, setInput] = useState("");
  const [response, setResponse] = useState("Aguardando envio de mensagem...");

  const handleSend = async () => {
    setResponse("Aguardando resposta...");
    GeminiService.getChatResponse(input).then((result) => {
      console.log("json result", JSON.stringify(result));
      setResponse(result.data.candidates[0].content.parts[0].text);
    });
  };

  return (
    <ThemedView style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Ask me anything..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Send" onPress={handleSend} />
      <ThemedText style={styles.response}>{response}</ThemedText>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  response: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default ChatGemini;
