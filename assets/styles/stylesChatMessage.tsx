import { StyleSheet } from "react-native";
import colors from "@/assets/styles/colors";

const shadowEffect = {
  shadowColor: colors.blackIsh,
  shadowOffset: {
    width: 4,
    height: 4,
  },
  shadowOpacity: 0.4,
  shadowRadius: 2,
  elevation: 10,
};

const stylesChatMessage = StyleSheet.create({
  containerDate: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  messageSended: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 24,
    alignSelf: "flex-end",
    backgroundColor: colors.greenSecondary,
    ...shadowEffect,
  },
  messageReceived: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 24,
    alignSelf: "flex-start",
    backgroundColor: colors.whiteIsh,
    ...shadowEffect,
  },
  messageSystem: {
    borderRadius: 24,
    paddingHorizontal: 24,
    paddingVertical: 8,
    marginBottom: 24,
    alignSelf: "center",
    backgroundColor: colors.grayIsh,
    ...shadowEffect,
  },

  textMessage: {
    fontSize: 24,
  },
  textCreatedAt: {
    fontSize: 18,
    color: "gray",
  },

  image: {
    width: 200,
    height: 200,
    marginVertical: 12,
    borderRadius: 12,
    borderColor: "black",
  },
});

export default stylesChatMessage;
