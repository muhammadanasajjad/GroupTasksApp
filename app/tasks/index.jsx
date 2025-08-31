import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { Swipeable }  from "react-native-gesture-handler"
import { Color } from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons"
import React, {useState} from "react";

export default function TaskScreen() {
    const [currentDate, setCurrentDate] = useState(new Date());

    const formattedDate = currentDate.toLocaleDateString("en-GB", {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    const nextDate = () => {
        const newDate = new Date(currentDate)
        newDate.setDate(currentDate.getDate() + 1);
        setCurrentDate(newDate)
    }

    const prevDate = () => {
        const newDate = new Date(currentDate);
        newDate.setDate(currentDate.getDate() - 1);
        setCurrentDate(newDate);
    }

    const [tasks, setTasks] = useState([
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
            completed: true,
        },
    ])

    const toggleComplete = (id) => {
        setTasks((prev) => 
            prev.map((task) => 
                task.id === id ? {...task, completed: !task.completed } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id))
    }

    const renderRightActions = (id) => (
        <TouchableOpacity style={styles.deleteButton} onPress={() => deleteTask(id)}>
            <AntDesign name="delete" size={24} color="white" />
        </TouchableOpacity>
    )

    const renderTask = ({ item }) => (
        <Swipeable renderRightActions={() => renderRightActions(item.id)}>
            <View style={styles.taskCard}>
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
            </View>
        </Swipeable>
    );

  return (
    <View style={styles.entire}>

        <View style={styles.textBar}>
            <Text style={styles.taskText}>Tasks</Text>
            <View style={styles.pill}>
                <TouchableOpacity style={styles.leftButton} onPress={prevDate}>
                    <AntDesign name="caretleft" size={15} color={Color.textOnPrimary} />
                </TouchableOpacity>

                <View style={styles.dateContainer}>
                    <Text style={styles.dateText}>{formattedDate}</Text>
                </View>

                <TouchableOpacity style={styles.rightButton} onPress={nextDate}>
                    <AntDesign name="caretright" size={15} color={Color.textOnPrimary} />
                </TouchableOpacity>
            </View>
        </View>

        <View style={styles.personalPart}>
            <Text style={styles.personalText}>Personal Tasks</Text>
            <TouchableOpacity style={styles.changeGroupButton}>
                <Text style={styles.changeGroupText}>Change Group</Text>
                <AntDesign name="swap" size={30} color={Color.textPrimary}></AntDesign>
            </TouchableOpacity>
        </View>

        <View style={styles.tasks}>
            <FlatList
                data={tasks}
                renderItem={renderTask}
                keyExtractor={(item) => item.id}
                contentContainerStyle={{ paddingBottom: 20 }}
            />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
    entire: {
        flex: 1,
        backgroundColor: Color.background,
        flexDirection: "column",
        alignItems: "center"
    },

    textBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        width: "100%",
        padding: 20,
        backgroundColor: Color.card,
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },

    pill: {
        flexDirection: "row",
        borderRadius: 25,
        overflow: "hidden",
        alignItems: "center",     
    },

    leftButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Color.primary,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        color: Color.textOnPrimary,
    },

    rightButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Color.primary,
        borderTopRightRadius: 25,
        borderBottomRightRadius: 25,
        justifyContent: "center",
        alignItems: "center",
    },

    dateContainer: {
        paddingHorizontal: 25,
        justifyContent: "center",
        alignItems: "center",
    },

    dateText: {
        fontSize: 16,
        fontWeight: 300,
        color: Color.textPrimary,
    },

    taskText: {
        color: Color.textPrimary,
        fontWeight: 900,
        fontSize: 35
    },

    personalPart: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        margin: 15,
    },

    personalText: {
        fontWeight: 900,
        fontSize: 20,
        color: Color.textPrimary,
    },

    changeGroupButton: {
        width: 150,
        height: 40,
        backgroundColor: Color.buttonColor,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 10,
        opacity: 0.7
    },

    changeGroupText: {
        fontWeight: 900,
        color: Color.textPrimary,
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
        width: "100%"
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

    deleteButton: {
        backgroundColor: Color.accent2,
        justifyContent: "center",
        alignItems: "center",
        width: 70,
        borderRadius: 15,
        height: "88%",
    },
})
