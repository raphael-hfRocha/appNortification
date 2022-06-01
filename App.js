import * as Notifications from "expo-notifications";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";

import AppLogo from "./src/components/AppLogo";

import NotificationHelper from "./src/services/NotificationHelper";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [timerTrigger, setTimerTrigger] = useState(0);
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    NotificationHelper.registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener);
      Notifications.removeNotificationSubscription(responseListener);
    };
  }, []);

  const handlePress = () => {
    NotificationHelper.send(
      "É hora de comer!",
      "Faça já o seu pedido!",
      parseInt(timerTrigger)
    );
  };

  const handleTeste = () => {
    NotificationHelper.send(
      "A notificação foi testada com sucesso!",
      "Agende já seu lembrete para a próxima refeição!",
      parseInt(timerTrigger)
    );
  };

  return (
    <View style={styles.container}>
      <AppLogo />

      <Text style={styles.text}>
        Agende o lembrete alertando a próxima refeição (Em segundos):
      </Text>
      <TextInput
        style={styles.red}
        onChangeText={(text) => setTimerTrigger(text)}
        value={timerTrigger}
        placeholder="ex: 5"
      />

      <TouchableOpacity style={styles.red} onPress={handlePress}>
        <Text style={styles.buttonText}>Agendar</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.orange} onPress={handleTeste}>
        <Text style={styles.buttonText}>Testar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-around",
    borderWidth: 2,
    borderRadius: 8,
    margin: 16,
    marginTop: 32,
    backgroundColor: "#000000",
  },

  text: {
    textAlign: "center",
    fontSize: 15,
    fontWeight: "bold",
    color: "#fff"
  },

  red: {
    width: 200,
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    color: "#000000",
  },

  orange: {
    width: 200,
    height: 50,
    borderWidth: 2,
    borderRadius: 8,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    color: "#000000",
  },

  buttonText: {
    bottom: 5,
    fontSize: 28,
    color: "#000000",
  },
});
