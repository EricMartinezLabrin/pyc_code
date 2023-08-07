import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Local
import Index from "../Screen/Index";
import Error from "../Screen/Error";
import Account from "../Screen/Account";
import Login from "../Screen/Login";
import Contacto from "../Screen/Contacto";
import Success from "../Screen/Success";

const Stack = createNativeStackNavigator();

export default function Navigation() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Index"
        component={Index}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Error"
        component={Error}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Account"
        component={Account}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="Contacto"
        component={Contacto}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Success"
        component={Success}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}
