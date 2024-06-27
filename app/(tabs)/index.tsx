import { Text, StyleSheet, TouchableOpacity, SafeAreaView, View, ScrollView } from "react-native";
import ChatMessage from "@/components/ChatMessage";

export default function HomeScreen() {
  const messages: any[] = [
    { fromMe: true, text: "Foto enviada!", createdAt: "2024-04-18T15:34:49.888Z" },
    { fromMe: false, text: "msg recebida!", createdAt: "2024-04-18T15:34:49.888Z" },
  ];

  function openCamera() {
    console.log("abrir camera");
  }

  return (
    <SafeAreaView style={styles.containerScreen}>
      <View style={styles.containerTitle}>
        <Text style={styles.textTitle}>Camera</Text>
      </View>
      <ScrollView style={styles.containerChat}>
        {messages.map((msg, index) => {
          const { fromMe, text, createdAt, imageUri } = msg;
          return (
            <ChatMessage
              key={index}
              fromMe={fromMe}
              text={text}
              createdAt={createdAt}
              imageUri={imageUri}
            />
          );
        })}
      </ScrollView>
      <View style={styles.containerFooter}>
        <TouchableOpacity
          onPress={() => {
            console.log("Opening settings...");
          }}
          style={styles.buttonFooter}>
          <Text style={styles.textButton}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Opening camera...");
          }}
          style={styles.buttonFooter}>
          <Text style={styles.textButton}>Camera</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            console.log("Choosing photo from files...");
          }}
          style={styles.buttonFooter}>
          <Text style={styles.textButton}>Files</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  containerScreen: {
    backgroundColor: "black",
    flexDirection: "column",
    flex: 1,
  },
  containerTitle: {
    flexDirection: "row",
  },
  containerChat: {
    flexDirection: "column",
    backgroundColor: "blue",
    flex: 1,
  },
  containerFooter: {
    justifyContent: "space-between",
    flexDirection: "row",
  },

  textTitle: {
    fontSize: 48,
    color: "#FFF",
  },
  textButton: {
    color: "#FFF",
    fontSize: 32,
  },

  buttonFooter: {
    color: "gray",
    borderColor: "#FFF",
  },
});
