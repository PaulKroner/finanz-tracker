import { View, Text } from "react-native";
import { Button, ButtonText } from '@/components/ui/button';
import DashboardSaldo from "@/components/dashboard/DashboardSaldo";


export default function DashboardScreen() {
  return (
    <View className="flex-1 items-center justify-center">
      <Text className="text-3xl font-bold">Dashboard</Text>
      <Button variant="solid" size="md" action="primary">
        <ButtonText>Click me</ButtonText>
      </Button>
      <DashboardSaldo selectedYear={2023} />
    </View>
  );
}