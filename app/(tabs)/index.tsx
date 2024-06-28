import { Text, Pressable, SafeAreaView, View, ScrollView } from "react-native";
import ChatMessage, { ChatMessageProps } from "@/components/ChatMessage";
import styles from "@/assets/styles/stylesIndex";
import { useEffect, useState } from "react";
import initialMessages from "@/assets/messages";
import * as ImagePicker from "expo-image-picker";
import useToast from "@/hooks/useToast";
import { RollInRight, scrollTo } from "react-native-reanimated";

const randomSendedMessages = [
  "Avalie minha refeicao!",
  "Quanto vai me custar isso?",
  "Da uma olhada no meu prato!",
  "Estou com fome!",
];

export default function HomeScreen() {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);

  function createNewMessage(imageUri: string) {
    const newMessage: ChatMessageProps = {
      type: "fromMe",
      text: randomSendedMessages[Math.floor(Math.random() * randomSendedMessages.length)],
      createdAt: new Date(),
      imageUri: imageUri,
    };
    setMessages([...messages, newMessage]);
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

      if (result.assets[0].base64 && result.assets[0].uri) {
        setImageUri(result.assets[0].uri);
        setImageBase64(result.assets[0].base64);
        if (imageUri) {
          createNewMessage(imageUri);
        } else {
          useToast("Error ao selecionar a imagem");
        }
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
