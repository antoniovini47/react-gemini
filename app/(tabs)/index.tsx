import { Text, StyleSheet, TouchableOpacity, SafeAreaView, View, ScrollView } from "react-native";
import ChatMessage from "@/components/ChatMessage";

export default function HomeScreen() {
  const messages: any[] = [
    {
      type: "fromMe",
      text: "Foto enviada!",
      imageUri:
        "file:///var/mobile/Containers/Data/Application/9D3277A9-5B6E-43B3-94CD-4551BBECF212/Library/Caches/ExponentExperienceData/@anonymous/react-gemini-9badf188-66a3-41fa-8bc6-1dafdd2b3319/ImagePicker/96390ADA-B449-4E54-A2B3-C4D3B0C1DB92.jpg",
      createdAt: "2024-06-26T15:34:49.888Z",
    },
    { type: "fromSystem", text: "27/06/2024", createdAt: "2024-04-27T03:01:49.888Z" },
    { type: "fromAI", text: "msg recebida!", createdAt: "2024-06-27T15:34:49.888Z" },
  ];

  return (
    <SafeAreaView style={styles.containerScreen}>
      <View style={styles.containerTitle}>
        <Text style={styles.textTitle}>Camera</Text>
      </View>
      <ScrollView style={styles.containerChat}>
        {messages.map((msg, index) => {
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
    backgroundColor: "white",
    flex: 1,
    padding: 24,
    margin: 12,
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
