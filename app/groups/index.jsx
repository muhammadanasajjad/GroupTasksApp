import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Modal,
  TextInput,
  Dimensions,
  Touchable,
} from "react-native";
import { ScrollView, Swipeable } from "react-native-gesture-handler";
import { Color as Colours } from "../../constants/colors";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
const width = Dimensions.get("window").width;

export default function GroupScreen() {
  const [userGroups, setUserGroups] = useState([
    {
      "id": 1,
      "name": "Study Group",
      "members": "23"
    },

    {
      "id": 2,
      "name": "Dorm Group",
      "members": "5"
    },

  ])
  const renderGroup = ({item}) => {
    return (<TouchableOpacity style={styles.groupCard}>
      <View style={styles.frontText}>
        <View style={styles.groupIcon}>
          <Ionicons name="book-sharp" color={Colours.primaryText} size={30}></Ionicons>
        </View>

        <View style={styles.allText}>
          <View style={styles.topRow}>
            <Text style={styles.groupName}>
              {item.name}
            </Text>
          </View>
          <Text style={styles.metaText}>
            {item.members} Members
          </Text>
        </View>
      </View>

      <View style={styles.settings}>
        <Ionicons name="settings-sharp" color={Colours.primary} size={20}></Ionicons>
      </View>
    </TouchableOpacity>)
  }

  return (
    <View style={styles.entire}>
      <FlatList
      data={userGroups}
      renderItem={renderGroup}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{paddingBottom: 20}}
      ListHeaderComponent={
        <View>
          <View style={styles.topHeader}>
            <Ionicons name="people-circle-outline" color={Colours.primary} size={40}></Ionicons>
            <Text style={styles.topHeaderText}>Groups</Text>
          </View>

          <View style={styles.searchItems}>
            <View style={styles.tasksSearchContainer}>
              <AntDesign name="search1" size={18} color={Colours.defaultText} />
              <TextInput placeholder="Find a Group" style={{fontSize: 16, flex: 1, paddingVertical: 0}}/>
            </View>

            <TouchableOpacity style={styles.createGroup}>
              <Ionicons name="add-sharp" size={40} color={Colours.primaryText}></Ionicons>
            </TouchableOpacity>
          </View>

          <View style={styles.groupsArea}>
              <Text style={styles.groupsText}>Your Groups</Text>
          </View>
        </View>
      }/>
    </View>
  );
}


const styles = StyleSheet.create({
  entire: {
    position: "relative",
    flex: 1,
    backgroundColor: Colours.background,
  },

  topHeader: {
    backgroundColor: Colours.background,
    borderBottomColor: "#65656535",
    borderBottomWidth: 1,
    marginBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    paddingLeft: 15
  },

  topHeaderText: {
    color: Colours.defaultText,
    fontWeight: 500,
    fontSize: 26,
    paddingLeft: 10
  },

  searchItems: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },

  tasksSearchContainer: {
    backgroundColor: Colours.surface,
    borderColor: Colours.surfaceBorder,
    borderWidth: 1,
    borderRadius: 50,
    width: 250,
    paddingHorizontal: 10,
    marginHorizontal: 10,
    height: 50,
    flexDirection: "row",
    alignSelf: "flex-start",
    alignItems: "center",
    gap: 8,
  },

  createGroup: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colours.primary,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },

  groupsText: {
    fontSize: 27,
    fontWeight: 700,
    marginLeft: 15,
    marginTop: 15,
  },

  groupCard: {
    alignSelf: "center",
    backgroundColor: Colours.primaryText,
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 2,
    width: width * 0.85,
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 10,
    marginVertical: 10,
  },

  frontText: {
    flexDirection: "row",
    gap: 10
  },

  groupIcon: {
    width: 50,
    height: 50,
    backgroundColor: Colours.secondary,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },

  allText: {
    justifyContent: "center",
  },

  groupName: {
    fontSize: 20,
    fontWeight: "700",
    color: Colours.defaultText,
    marginRight: 10,
    flexShrink: 1,
  },

  metaText: {
    fontSize: 13,
    color: Colours.grayText,
    marginTop: 6,
  },

  settings: {
    alignSelf: "center",
    justifyContent: "flex-end"
  },
})