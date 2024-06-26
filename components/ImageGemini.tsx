import React, { useState } from "react";
import { View, Image, Text, TextInput, Button, StyleSheet } from "react-native";
//import { launchImageLibrary } from "react-native-image-picker";
import GeminiService from "../GeminiService";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";

const GeminiImage = () => {
  const [input, setInput] = useState("Descreva a imagem usando 10 palavras");
  const [response, setResponse] = useState("Aguardando envio de imagem...");
  const [imageUri, setImageUri] = useState<string | null>(null);

  const selectImage = async () => {
    // const result = await launchImageLibrary({
    //   mediaType: "photo",
    //   includeBase64: true,
    // });
    // if (result.didCancel || !result.assets) {
    //   setResponse("Imagem não selecionada.");
    //   return;
    // }
    // if (result.assets[0].uri) {
    //   setImageUri(result.assets[0].uri);
    // }
  };

  const handleSend = async () => {
    if (!imageUri || !input) {
      setResponse("Selecione uma imagem e escreva um prompt.");
      return;
    }

    setResponse("Aguardando resposta...");

    try {
      console.log("Input: " + input);
      console.log("Image URI: " + imageUri);

      const result = await GeminiService.getImageResponse(input, imageUri);
      setResponse(result.data.candidates[0].content.parts[0].text);
    } catch (error) {
      console.error(error);
      setResponse("Error occurred while fetching response: " + error);
    }
  };

  return (
    <ThemedView style={styles.container}>
      <Button title="Choose Image" onPress={selectImage} />
      {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      <TextInput
        style={styles.input}
        placeholder="Image prompt..."
        value={input}
        onChangeText={setInput}
      />
      <Button title="Print Whatever" onPress={() => console.log(imageUri)} />
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
  image: {
    width: 200,
    height: 200,
    marginBottom: 12,
  },
  response: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default GeminiImage;
