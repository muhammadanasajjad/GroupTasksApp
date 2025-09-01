import { View, Text, StyleSheet, TouchableOpacity, FlatList, Modal, TextInput, Dimensions } from "react-native";
import { Swipeable }  from "react-native-gesture-handler"
import { Color } from "../../constants/colors";
import { AntDesign } from "@expo/vector-icons"
import React, {useState} from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
const width = Dimensions.get("window").width;

export default function TaskScreen() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [modalVisible, setModalVisible] = useState(false);
    const [taskName, setTaskName] = useState("");
    const [taskDate, setTaskDate] = useState(new Date());
    const [taskTime, setTaskTime] = useState(new Date());
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [showTimePicker, setShowTimePicker] = useState(false);
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
            completed: false,
        },
    ])
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

    const showModal = () => {
        setModalVisible(true);
    }

    const addTask = (taskSelected, dateSelected, timeSelected) => {
        if (!taskSelected.trim()) {alert("Please enter a task name!"); return;}
        const newId = tasks.length ? Math.max(...tasks.map(task => Number(task.id))) + 1 : 1;

        const newTask = {
            id: newId,
            name: taskSelected,
            time: timeSelected.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit"}),
            creator: "You",
            completed: false,
        }

        setTasks(prevTasks => [...prevTasks, newTask]);
        setModalVisible(false)
        setTaskName("");
        setTaskDate(new Date())
        setTaskTime(new Date())
    }

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
                <AntDesign name="swap" size={30} color={Color.textOnPrimary}></AntDesign>
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

        <View style={styles.addTask}>
            <TouchableOpacity style={styles.addBar} onPress={showModal}>
                <AntDesign name="pluscircleo" size={45} color={Color.textOnPrimary}></AntDesign>
            </TouchableOpacity>
        </View>

        <Modal visible={modalVisible} animationType="fade" transparent={true} onRequestClose={() => setModalVisible(false)}>
            <View style={styles.popup}>
                <View style={styles.popupBox}>
                    <TouchableOpacity style={styles.close} onPress={() => setModalVisible(false)}>
                        <AntDesign name="closecircleo" size={30} color={Color.textPrimary}></AntDesign>
                    </TouchableOpacity>

                    <Text style={styles.popupText}>Create Task</Text>
                    <Text style={styles.popupInfo}>Task*</Text>
                    <TextInput style={styles.textInp}
                    placeholder="Complete Project..."
                    placeholderTextColor={Color.textSecondary}
                    value={taskName} 
                    onChangeText={setTaskName}/>

                    <View style={styles.DateTimePickers}>
                        <View style={styles.popupPicker}>
                            <Text style={styles.popupInfo}>Date*</Text>
                            <TouchableOpacity style={styles.inpType} onPress={() => setShowDatePicker(true)}>
                                <Text>{taskDate.toDateString()}</Text>
                            </TouchableOpacity>
                        </View>

                        <View style={styles.popupPicker}>
                            <Text style={styles.popupInfo}>Time*</Text>
                            <TouchableOpacity style={styles.inpType} onPress={() => setShowTimePicker(true)}>
                                <Text>{taskTime.toLocaleTimeString([], {hour : "2-digit", minute: "2-digit"})}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <TouchableOpacity style={styles.addButton} onPress={() => addTask(taskName, taskDate, taskTime)}>
                        <Text style={styles.addText}>Add Task</Text>
                        <AntDesign name="enter" color={Color.textOnPrimary} size={24}></AntDesign>
                    </TouchableOpacity>

                    {showDatePicker && (
                        <DateTimePicker
                            value={taskDate}
                            mode="date"
                            display="default"
                            onChange={(event, selectedDate) => {
                            setShowDatePicker(false);
                            if (selectedDate) setTaskDate(selectedDate);
                            }}
                        />
                    )}

                    {showTimePicker && (
                        <DateTimePicker
                            value={taskTime}
                            mode="time"
                            is24Hour={true}
                            display="default"
                            onChange={(event, selectedTime) => {
                            setShowTimePicker(false);
                            if (selectedTime) setTaskTime(selectedTime);
                            }}
                        />
                    )}


                </View>
            </View>
        </Modal>
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
        backgroundColor: Color.secondary,
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        color: Color.textOnPrimary,
    },

    rightButton: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: Color.secondary,
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
        fontWeight: "300",
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
        backgroundColor: Color.primary,
        borderRadius: 8,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        paddingHorizontal: 10,
    },

    changeGroupText: {
        fontWeight: 900,
        color: Color.textOnPrimary,
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
        width: width * 0.85
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

    addTask: {
        position: "absolute",
        bottom: 50, 
        justifyContent: "center",
        alignItems: "center",
    },

    addBar: {
        justifyContent: "center",
        alignItems: "center",
        width: 75,
        height: 75,
        borderRadius: 37.5,
        backgroundColor: Color.secondary,
    },

    popup: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)"
    },

    popupBox: {
        width: 300,
        padding: 20,
        borderRadius: 10,
        backgroundColor: Color.card,
        elevation: 5,
        position: "relative",
    },

    close: {
        position: "absolute",
        top: -10,
        right: -10,
        backgroundColor: Color.textSecondary,
        borderRadius: 15,
    },

    popupText: {
        fontWeight: 800,
        fontSize: 20,
        marginBottom: 20,
    },
    
    popupInfo: {
        color: Color.textSecondary,
        fontWeight: 500,
    },

    textInp: {
        width: "100%",
        height: 50,
        backgroundColor: Color.background,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#ccc",
        paddingHorizontal: 15,
        fontSize: 16,
        color: "#333",
        shadowColor: "#474747ff",
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.05,
        shadowRadius: 2,
        elevation: 2,
        marginVertical: 5,
    },

    DateTimePickers: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between"
    },

    popupPicker: {
        flexDirection: "column"
    },

    inpType: {
        width: "100%",
        backgroundColor: Color.background,
        height: 45,
        borderWidth: 1,
        borderColor: "#ccc",
        borderRadius: 8,
        justifyContent: "center",
        paddingHorizontal: 10,
        marginTop: 10,
        marginBottom: 10,
    },

    addButton: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Color.primary,
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 10,
        marginTop: 15,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },

    addText: {
        color: Color.textOnPrimary,
        fontSize: 16,
        fontWeight: "900",
        marginRight: 10,
    },
})
