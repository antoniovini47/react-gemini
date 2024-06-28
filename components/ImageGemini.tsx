import React, { useState } from "react";
import { View, Image, Text, TextInput, Button, StyleSheet } from "react-native";
import GeminiService from "../GeminiService";
import { ThemedView } from "./ThemedView";
import { ThemedText } from "./ThemedText";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

const GeminiImage = () => {
  const [input, setInput] = useState("Descreva a imagem usando 10 palavras");
  const [response, setResponse] = useState("Aguardando envio de imagem...");
  const [imageUri, setImageUri] = useState<string | null>(null);
  let base64: string = "";

  const selectImage = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) {
        setResponse("Selecione uma imagem para continuar.");
      } else {
        setImageUri(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
      setResponse("Error occurred while selecting image: " + error);
    }
  };

  const handleSend = async () => {
    if (!imageUri || !input) {
      setResponse("Selecione uma imagem e escreva um prompt.");
      return;
    }

    setResponse("Aguardando resposta...");

    try {
      base64 = await FileSystem.readAsStringAsync(imageUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      console.log("Base64: " + base64);
    } catch {
      console.log("Error reading file as base64");
    }

    try {
      console.log("Input: " + input);
      console.log("Image URI: " + imageUri);
      //console.log("Image Base64: " + base64);

      const result = await GeminiService.getImageResponse(base64);
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
