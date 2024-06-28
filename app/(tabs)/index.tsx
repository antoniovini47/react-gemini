import { Text, StyleSheet, Pressable, SafeAreaView, View, ScrollView } from "react-native";
import ChatMessage, { ChatMessageProps } from "@/components/ChatMessage";
import styles from "@/assets/styles/stylesIndex";
import { useEffect, useState } from "react";
import initialMessages from "@/assets/messages";

export default function HomeScreen() {
  const [messages, setMessages] = useState<ChatMessageProps[]>([]);

  useEffect(() => {
    setMessages(initialMessages);
  }, []);

  return (
    <SafeAreaView style={styles.containerScreen}>
      <ScrollView style={styles.containerChat}>
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
        <Pressable
          onPress={() => {
            console.log("Opening camera...");
          }}
          style={styles.buttonFooter}>
          <Text style={styles.textButton}>Camera</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            console.log("Choosing photo from files...");
          }}
          style={styles.buttonFooter}>
          <Text style={styles.textButton}>Files</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
