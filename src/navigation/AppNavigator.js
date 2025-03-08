import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import LoginScreen from "../screens/auth/LoginScreen";
import RoleSelectionScreen from "../screens/auth/RoleSelectionScreen";
import AdminDashboard from "../screens/admin/AdminDashboard";
import CreateTender from "../screens/admin/CreateTender";
import ManageBids from "../screens/admin/ManageBids";
import ViewTenders from "../screens/user/ViewTenders";
import SubmitBid from "../screens/user/SubmitBid";
import ViewLowestBid from "../screens/user/ViewLowestBid";

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}  options={{ headerShown: false }} />
        <Stack.Screen name="RoleSelectionScreen" component={RoleSelectionScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} options={{ headerShown: false }} />
        <Stack.Screen name="CreateTender" component={CreateTender} options={{ headerShown: false }} />
        <Stack.Screen name="ManageBids" component={ManageBids} options={{ headerShown: false }} />
        <Stack.Screen name="ViewTenders" component={ViewTenders} options={{ headerShown: false }} />
        <Stack.Screen name="SubmitBid" component={SubmitBid} options={{ headerShown: false }} />
        <Stack.Screen name="ViewLowestBid" component={ViewLowestBid} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
