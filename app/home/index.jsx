import React, {useState} from "react";
import { View, StyleSheet, Dimensions, Text, FlatList, TouchableOpacity } from "react-native";
import Svg, { Path, G, Circle} from "react-native-svg";
import { Color } from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
const width = Dimensions.get("window").width;

export default function home() {
  const router = useRouter();
  const carouselItems = [
  {id: "1", title: "Tasks Completed :", info: "329"},
  {id: "2", title: "Groups Joined :", info: "12"},
  {id: "3", title: "Need Help ?", info: "Email us"}
  ];
  const [todayTasks, setTodayTasks] = useState([
      {
          id: "1",
          name: "Finish React Native project",
          time: "10:00 AM",
          creator: "John",
          completed: false,
      },
      {
          id: "2",
          name: "Study Physics notes",
          time: "3:00 PM",
          creator: "Alice",
          completed: false,
      },
  ]);
  const infoData = [
    {name: "John", tasks: 5},
    {name: "Amy", tasks: 3},
    {name: "Others", tasks: 2}
  ]

  const toggleComplete = (id) => {
    setTodayTasks((prev) => 
        prev.map((task) => 
            task.id === id ? {...task, completed: !task.completed } : task
        )
    );
  };

  const renderTask = ({item}) => {
      return (<View style={styles.taskCard}>
          <View style={styles.topRow}>
              <Text style={[ styles.taskName, item.completed && { textDecorationLine: "line-through", opacity: 0.5 }, ]} >
                  {item.name}
              </Text>
              <TouchableOpacity style={styles.completeButton} onPress={() => toggleComplete(item.id)} >
                  {item.completed ? (
                  <AntDesign name="checkcircle" size={28} color="green" />
                  ) : (
                  <AntDesign name="checkcircleo" size={28} color="gray" />
                  )}
              </TouchableOpacity>
          </View>
          <Text style={styles.metaText}>
          {item.time} • {item.creator}
          </Text>
      </View>)
  }

  return (
    <View style={styles.entire}>

      <View style={styles.container}>
        <Svg height={225} width="100%" viewBox="0 0 1440 320" preserveAspectRatio="xMidYMin slice" style={styles.svg}>
          <Path fill={Color.secondary} d="M0 0 H1440 C1300 100, 1100 300, 900 260 C700 200, 500 400, 300 260 C150 100, 75 100, 0 260 Z" />
        </Svg>

        <View style={styles.headerContent}>
            <Text style={styles.greeting}>Hi User,</Text>
            <AntDesign name="logout" size={28} color={Color.card} style={styles.logout}></AntDesign>
        </View>

        <FlatList data={carouselItems}
          keyExtractor={(item) => item.id}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          snapToInterval={width * 0.8 + 20}
          contentContainerStyle={styles.list}
          decelerationRate="fast"
          renderItem={({item}) => (
            <View style={styles.listItem}>
              <Text style={styles.listItemText}>{item.title}</Text>
              <Text style={styles.listItemInfo}>{item.info}</Text>
            </View>
        )}/>
      </View>

      <View style={styles.todayInfo}>
        <View style={styles.todayHeader}>
          <TouchableOpacity style={styles.upcomingButt} onPress={() => router.push("/tasks")}>
            <AntDesign name="doubleleft" size={15} color={Color.textOnPrimary} />
          </TouchableOpacity>
          <Text style={styles.todayTask}>Today's Tasks</Text>
        </View>
        <View style={[styles.taskContainer, {height: 175}]}>
          <FlatList data={todayTasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{paddingBottom: 20}}
          showsVerticalScrollIndicator={true}
          />
        </View>
      </View>

      <View style={styles.otherStats}>
        <View style={styles.leftHandGraph}>

          <Text style={styles.groupStatText}>Group Stats</Text>

          <Svg width={120} height={120}>
            <G rotation="-90" origin="60, 60">
              {infoData.map((item, index) => {
                const totalTasks = infoData.reduce((sum, t) => sum + t.tasks, 0);
                const percentage = item.tasks / totalTasks;
                const radius = 50;
                const strokeWidth = 20;
                const circumference = 2 * Math.PI * radius;
                let cumulativePercent = 0;
                for (let i = 0; i < index; i++) {
                  cumulativePercent += infoData[i].tasks / totalTasks;
                }

                return (
                  <Circle
                    key={index}
                    cx={60}
                    cy={60}
                    r={radius}
                    stroke={index === 0 ? Color.primary : index === 1 ? Color.secondary : Color.buttonColor}
                    strokeWidth={strokeWidth}
                    strokeDasharray={`${circumference * percentage} ${circumference * (1 - percentage)}`}
                    strokeDashoffset={-cumulativePercent * circumference}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                );
              })}
            </G>
          </Svg>

          <View style={styles.legend}>
            {infoData.map((item, index) => (
              <View key={index} style={styles.labelRow}>
                <View style={[styles.colorBox, {backgroundColor: index === 0 ? Color.primary :
                index === 1 ? Color.secondary : Color.buttonColor}]}/>
                <Text style={styles.labelText}>{item.name}: {item.tasks}</Text>
              </View>
            ))}
          </View>

          <TouchableOpacity style={styles.changeGroupButton}>
            <Text style={{color: Color.primary, opacity: 0.8}}>Change Group</Text>
          </TouchableOpacity>

        </View>
        
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  entire: {
    flex: 1,
    backgroundColor: Color.background,
  },

  container: {
    width: "100%",
    height: 200,
    position: "relative",
    overflow: "visible",
  },

  headerContent: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  greeting: {
    fontWeight: 900,
    fontSize: 30,
    color: Color.card,
  },

  svg: {
    position: "absolute"
  },

  list: {
    top: 80,
    paddingHorizontal: (width - width * 0.8) / 2,
  },

  listItem: {
    backgroundColor: Color.primary, // Card
    borderRadius: 20,
    marginRight: 20,
    width: width * 0.8,
    height: 85,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 6,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center"

  },

  listItemText: {
    color: Color.textOnPrimary, // Primary
    fontSize: 20,
    fontWeight: 600,
  },

  listItemInfo: {
    fontSize: 30,
    fontWeight: 900,
    color: Color.buttonColor // Primary
  },

  todayInfo: {
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },

  todayTask: {
    color: Color.secondary,
    paddingRight: 20,
    marginLeft: 10,
    marginBottom: 10,
    alignSelf:"flex-end",
    fontWeight: 900,
    fontSize: 24
  },

  taskCard: {
    backgroundColor: Color.card,
    borderRadius: 10,
    padding: 30,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 2,
    width: width * 0.85,
  },

  topRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
  },

  taskName: {
      fontSize: 20,
      fontWeight: "700",
      color: Color.textPrimary,
      marginRight: 10,
      flexShrink: 1,
  },

  metaText: {
      fontSize: 13,
      color: Color.textSecondary,
      marginTop: 6,
  },

  upcomingButt: {
    backgroundColor: Color.secondary,
    alignItems: "center",
    padding: 7,
    width: width * 0.08, 
    borderRadius: 15,
    elevation: 2,
  },

  upcomingText: {
    fontWeight: 900,
    color: Color.textOnPrimary,
  },

  todayHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
    alignSelf: "flex-end"
  },

  otherStats: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: "100%"
  },

  groupStatText: {
    fontWeight: 700,
    fontSize: 20,
    marginBottom: 5,
  },

  leftHandGraph: {
    alignItems: "center",
    backgroundColor: Color.card,
    borderRadius: 10,
    marginTop: 10
  },

  changeGroupButton: {
    backgroundColor: Color.secondary,
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },

  legend: {
    marginTop: 10,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },

  labelRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 5,
    marginHorizontal: 5
  },

  colorBox: {
    width: 15,
    height: 15,
    marginRight: 5,
    borderRadius: 3
  },

  labelText: {
    fontSize: 14,
    fontWeight: 600,
    color: Color.textPrimary
  }
});
