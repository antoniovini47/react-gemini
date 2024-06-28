import { Text, Pressable, SafeAreaView, View, ScrollView } from "react-native";
import ChatMessage, { ChatMessageProps } from "@/components/ChatMessage";
import GeminiService from "@/GeminiService";
import styles from "@/assets/styles/stylesIndex";
import { useEffect, useState } from "react";
import initialMessages from "@/assets/messages";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import useToast from "@/hooks/useToast";

const randomSendedMessages = [
  "Avalie minha refeicao!",
  "Quanto vai me custar isso?",
  "Da uma olhada no meu prato!",
  "Estou com fome!",
];

export default function HomeScreen() {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  let tempAiMessage = "";

  async function handleNewRequestForAI(imageBase64: string) {
    //setMessages([...messages, createNewMessage("fromAI", "analisando...", "")]);

    tempAiMessage = "Analisando imagem...";
    try {
      const result = await new Promise((resolve) => {
        setTimeout(() => {
          resolve(void 0);
        }, 2000);
      });
      //const result = await GeminiService.getImageResponse(imageBase64); //Funcionando, mas desabilitado pra economizar tokens
      //setTempAiMessage(result.data.candidates[0].content.parts[0].text);
      tempAiMessage = "Imagem analisada com sucesso! Resultado: " + result;
    } catch {
      tempAiMessage = "Erro ao analisar a imagem!";
    }
  }

  function createNewMessage(type: string, text: string, imageUri: string) {
    const newMessage: ChatMessageProps = {
      type: type,
      text: text,
      createdAt: new Date(),
      imageUri: imageUri,
    };
    return newMessage;
  }

  function handleCreateNewUserInput(imageAsset: ImagePicker.ImagePickerAsset) {
    setMessages([
      ...messages,
      createNewMessage(
        "fromMe",
        randomSendedMessages[Math.floor(Math.random() * randomSendedMessages.length)],
        imageAsset.uri
      ),
    ]);
  }

  //Load initial messages
  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  const handleChooseImageFromFiles = async () => {
    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsMultipleSelection: false,
      });

      if (result.canceled) {
        useToast("Selecione uma imagem para continuar");
        return;
      }

      if (result.assets[0] && result.assets[0].base64) {
        handleCreateNewUserInput(result.assets[0]);
        handleNewRequestForAI(result.assets[0].base64);
      } else {
        useToast("Imagem invalida!");
      }
    } catch (error) {
      useToast("Error ao selecionar a imagem: " + error);
    }
  };

  const handleTakePicture = async () => {};

  return (
    <SafeAreaView style={styles.containerScreen}>
      <ScrollView
        style={styles.containerChat}
        showsVerticalScrollIndicator={true}
        ref={(ref) => {
          this.scrollView = ref;
        }}
        onContentSizeChange={() => this.scrollView.scrollToEnd({ animated: true })}>
        {messages.map((msg: ChatMessageProps, index: number) => {
          const { type, text, createdAt, imageUri } = msg;
          return (
            <ChatMessage
              key={index}
              type={type}
              text={text}
              createdAt={createdAt}
              imageUri={imageUri}
            />
          );
        })}
      </ScrollView>
      <View style={styles.containerFooter}>
        <Pressable
          onPress={() => {
            console.log("Opening settings...");
          }}
          style={styles.buttonFooter}>
          <Text style={styles.textButton}>Settings</Text>
        </Pressable>
        <Pressable onPress={handleTakePicture} style={styles.buttonFooter}>
          <Text style={styles.textButton}>Camera</Text>
        </Pressable>
        <Pressable onPress={handleChooseImageFromFiles} style={styles.buttonFooter}>
          <Text style={styles.textButton}>Files</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
