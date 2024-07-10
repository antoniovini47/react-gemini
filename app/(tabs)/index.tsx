import { Text, Pressable, SafeAreaView, View, ScrollView } from "react-native";
import ChatMessage, { ChatMessageProps } from "@/components/ChatMessage";
import GeminiService from "@/GeminiService";
import styles from "@/assets/styles/stylesIndex";
import { useEffect, useState } from "react";
import initialMessages from "@/assets/messages";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import useToast from "@/hooks/useToast";
import showToast from "@/hooks/useToast";
import { measure } from "react-native-reanimated";

function waitNSecs(secs: number) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(void 0);
    }, secs * 1000);
  });
}

const randomSendedMessages = [
  "Avalie minha refeicao!",
  "Quanto vai me custar isso?",
  "Da uma olhada no meu prato!",
  "Estou com fome!",
];

export default function HomeScreen() {
  const [messages, setMessages] = useState<ChatMessageProps[]>(initialMessages);

  async function handleNewRequestForAI(imageBase64: string) {
    await waitNSecs(1);
    const messageAiResponse = createNewMessage("fromAI", "Analisando imagem...", "");
    setMessages((previousMessages) => [...previousMessages, messageAiResponse]);

    try {
      const result = await GeminiService.getImageResponse(imageBase64); //Funcionando, mas desabilitado pra economizar tokens
      const jsonTextResponse = JSON.stringify(result.data.candidates[0].content.parts[0].text);

      messageAiResponse.text =
        "Imagem analisada com sucesso!\nResultado: " + jsonTextResponse + " kcal";
    } catch (error: any) {
      messageAiResponse.text = "Erro ao analisar a imagem..." + error.message;
    } finally {
      setMessages((previousMessages) => [...previousMessages]);
    }
  }

  function createNewMessage(type: string, text: string, imageUri?: string) {
    const newMessage: ChatMessageProps = {
      type: type,
      text: text,
      createdAt: new Date(),
      imageUri: imageUri,
    };
    return newMessage;
  }

  function handleCreateNewUserInput(imageAsset: ImagePicker.ImagePickerAsset) {
    const newMessage = createNewMessage(
      "fromMe",
      randomSendedMessages[Math.floor(Math.random() * randomSendedMessages.length)],
      imageAsset.uri
    );

    setMessages((prevState) => [...prevState, newMessage]);
    if (imageAsset.base64) {
      handleNewRequestForAI(imageAsset.base64);
    }
  }

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
