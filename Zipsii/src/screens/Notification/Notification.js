import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from "react-native";
import { colors } from "../../utils";

const Notification = () => {
  const [activeTab, setActiveTab] = useState("All");

  const notifications = [
    {
      id: 1,
      title: "New Recipe Alert!",
      description:
        "Lorem ipsum tempor incididunt ut labore et dolore, in voluptate velit esse cillum",
      time: "10 mins ago",
      date: "Today",
    },
    {
      id: 2,
      title: "Save Recipe Alert!",
      description:
        "Lorem ipsum tempor incididunt ut labore et dolore, in voluptate velit esse cillum",
      time: "30 mins ago",
      date: "Yesterday",
    },
  ];

  const groupedNotifications = [
    {
      title: "Today",
      data: notifications.filter((notification) => notification.date === "Today"),
    },
    {
      title: "Yesterday",
      data: notifications.filter(
        (notification) => notification.date === "Yesterday"
      ),
    },
  ];

  const renderNotification = ({ item }) => (
    <View style={styles.notificationCard}>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
      <View style={styles.notificationIcon}>
        <Text style={styles.iconText}>🔔</Text>
      </View>
    </View>
  );

  const renderSectionHeader = ({ section }) => (
    <Text style={styles.dateHeader}>{section.title}</Text>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Notifications</Text>

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        {["All", "Read", "Unread"].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[
              styles.tab,
              activeTab === tab && styles.activeTab, // Highlight active tab
            ]}
            onPress={() => setActiveTab(tab)} // Update active tab
          >
            <Text
              style={[
                styles.tabText,
                activeTab === tab && styles.activeTabText, // Highlight active tab text
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Notifications List */}
      <SectionList
        sections={groupedNotifications}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderNotification}
        renderSectionHeader={renderSectionHeader}
        contentContainerStyle={styles.list}
        stickySectionHeadersEnabled={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  tab: {
    flex: 1, // Equal size for all tabs
    alignItems: "center",
    paddingVertical: 10,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  activeTab: {
    backgroundColor: colors.btncolor, // Purple background for active tab
  },
  tabText: {
    fontSize: 14,
    color: colors.fontMainColor,
    fontWeight: "bold",
  },
  activeTabText: {
    color: colors.white, // White text for active tab
  },
  list: {
    paddingBottom: 20,
  },
  dateHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.fontMainColor,
    marginBottom: 10,
    justifyContent: "center",
    alignSelf: "center",
  },
  notificationCard: {
    flexDirection: "row",
    backgroundColor: "#F9F9F9",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: "center",
    elevation: 2,
  },
  notificationContent: {
    flex: 1,
    marginRight: 10,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  notificationDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 5,
  },
  notificationTime: {
    fontSize: 12,
    color: "#AAA",
  },
  notificationIcon: {
    backgroundColor: "#FFD700",
    borderRadius: 25,
    height: 40,
    width: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  iconText: {
    fontSize: 18,
  },
});

export default Notification;
