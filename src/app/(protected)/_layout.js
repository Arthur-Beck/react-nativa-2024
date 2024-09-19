import { GestureHandlerRootView } from "react-native-gesture-handler";
import {
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Drawer } from "expo-router/drawer";
import { Image, Text, TouchableOpacity, ViewComponent } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { View } from "react-native";
import { useAuth } from "../../hooks/Auth/index";

function CustomDrawerContent(props) {
  const { signOut, user } = useAuth();

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 28,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#f0f0f0",
          paddingVertical: 10,
        }}
      >
        <Image
          source={{
            uri: "http://www.github.com/jao905.png",
          }}
          style={{ width: 100, height: 100, borderRadius: 100 }}
        />
        <Text
          style={{
            textAlign: "center",
            fontSize: 20,
            fontFamily: "light",
            padding: 10,
          }}
        >
          {user?.user?.nome}
        </Text>
      </View>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <TouchableOpacity
        onPress={() => signOut()}
        style={{
          justifyContent: "center",
          alignItems: "center",
          height: 50,
          padding: 10,
          margin: 10,
          backgroundColor: "#0000ff",
          borderRadius: 10,
        }}
      >
        <Text style={{ fontSize: 20, fontFamily: "light", color: "white" }}>
          Sair
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const DrawerLayout = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Drawer drawerContent={(props) => <CustomDrawerContent {...props} />}>
        <Drawer.Screen
          name="index"
          options={{
            drawerLabel: "Principal",
            headerTitle: "Principal",
            drawerIcon: () => (
              <Ionicons name="home-outline" size={20} color="black" />
            ),
          }}
        />
        <Drawer.Screen
          name="list"
          options={{
            drawerLabel: "Listagem",
            headerTitle: "Listagem",
            drawerIcon: () => (
              <Ionicons name="list-circle-outline" size={20} color="black" />
            ),
          }}
        />
        <Drawer.Screen
          name="payment"
          options={{
            drawerLabel: "Pagamentos",
            headerTitle: "Pagamentos",
            drawerIcon: () => (
              <Ionicons name="card-outline" size={20} color="black" />
            ),
          }}
        />
      </Drawer>
    </GestureHandlerRootView>
  );
};

export default function Layout() {
  return DrawerLayout();
}
