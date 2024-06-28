import { View, StyleSheet, Text, Image } from "react-native";

export interface ChatMessageProps {
  type: string;
  text: string;
  createdAt?: Date;
  imageUri?: string;
}

export default function ChatMessage(props: ChatMessageProps) {
  const { type, text, createdAt, imageUri } = props;

  return (
    <>
      {createdAt && (
        <View
          style={
            type == "fromMe"
              ? styles.messageSended
              : type == "fromAI"
              ? styles.messageReceived
              : type == "fromSystem"
              ? styles.messageSystem
              : null
          }>
          {/* {__DEV__ && <Text style={styles.textMessage}>type: {type}</Text>} */}
          {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
          <Text style={styles.textMessage}>{text}</Text>
          <Text style={styles.textCreatedAt}>
            {type != "fromSystem" && createdAt && toDateTime(new Date(createdAt).getTime())}
          </Text>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  messageSended: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 24,
    alignSelf: "flex-end",
    backgroundColor: "green",
  },
  messageReceived: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 24,
    alignSelf: "flex-start",
    backgroundColor: "red",
  },
  messageSystem: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 24,
    alignSelf: "center",
    backgroundColor: "gray",
  },

  textMessage: {
    fontSize: 24,
  },
  textCreatedAt: {
    alignSelf: "flex-end",
    fontSize: 18,
    color: "gray",
  },

  image: {
    width: 200,
    height: 200,
    marginVertical: 12,
  },
});

function toDateTime(secs: number) {
  const time = new Date(secs); // Epoc
  const hours = time.getHours();
  const minutes = time.getMinutes();

  return (
    <Text>
      {hours > 9 ? hours : <>0{hours}</>}:{minutes > 9 ? minutes : <>0{minutes}</>}
    </Text>
  );
}
