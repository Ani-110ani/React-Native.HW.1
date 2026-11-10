import { useState } from "react";
import {
  ActivityIndicator,
  Alert,
  Modal,
  Pressable,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const DATA = [
  {
    title: "Settings",
    data: ["Toggle Loading", "Enable Switch"],
  },
  {
    title: "Actions",
    data: ["Open Modal", "Trigger Alert"],
  },
];

export default function App() {
  const [isSwitchOn, setIsSwitchOn] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleItemPress = (item: string) => {
    if (item === "Trigger Alert") {
      Alert.alert("Alert Dialog", "This is an Alert popup window.", [
        { text: "OK" },
      ]);
    } else if (item === "Open Modal") {
      setIsModalVisible(true);
    } else if (item === "Toggle Loading") {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 2000);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>React Native Demo</Text>
        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>Status Switch</Text>
          <Switch
            value={isSwitchOn}
            onValueChange={(value) => setIsSwitchOn(value)}
          />
        </View>
      </View>

      {isLoading ? (
        <ActivityIndicator size="large" color="#007AFF" style={styles.loader} />
      ) : (
        <SectionList
          sections={DATA}
          keyExtractor={(item, index) => item + index}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.item}
              onPress={() => handleItemPress(item)}
            >
              <Text style={styles.itemText}>{item}</Text>
            </TouchableOpacity>
          )}
          renderSectionHeader={({ section: { title } }) => (
            <Text style={styles.sectionHeader}>{title}</Text>
          )}
        />
      )}

      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Modal Header</Text>
            <Text style={styles.modalBody}>
              This modal demonstrates the Modal component.
            </Text>
            <Pressable
              style={styles.closeButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    paddingTop: 40,
  },
  header: {
    padding: 16,
    backgroundColor: "#FFFFFF",
    borderBottomWidth: 1,
    borderColor: "#E9ECEF",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 12,
  },
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  switchLabel: {
    fontSize: 16,
  },
  loader: {
    marginTop: 40,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: "600",
    backgroundColor: "#E9ECEF",
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  item: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#F1F3F5",
  },
  itemText: {
    fontSize: 15,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  modalBody: {
    fontSize: 14,
    color: "#495057",
    marginBottom: 20,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 10,
    paddingHorizontal: 24,
    borderRadius: 6,
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
  },
});
