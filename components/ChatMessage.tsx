import { View, StyleSheet, Text } from "react-native";

export interface ChatMessageProps {
  fromMe: boolean;
  text: string;
  createdAt: Date;
  imageUri?: string;
}

export default function ChatMessage(props: ChatMessageProps) {
  const { fromMe, text, createdAt, imageUri } = props;

  return (
    <>
      {createdAt && (
        <View style={fromMe ? styles.messageSended : styles.messageReceived}>
          <Text style={styles.textMessage}>msg: {text}</Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  messageSended: {
    flexDirection: "column",
    backgroundColor: "green",
  },
  messageReceived: {
    flexDirection: "column",
    backgroundColor: "red",
  },

  textMessage: {
    fontSize: 24,
    color: "blue",
  },
});
