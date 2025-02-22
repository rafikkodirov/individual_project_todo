import { View, Text, FlatList, Platform, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import TaskCard from '@/components/TaskCard';

import Dialog from '@/Common/DialogComponent ';
import { useDataContext } from '@/providers/DataProvider';
import { useLoading } from '@/providers/LoadingProvider';
import dayjs from 'dayjs';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
const styles = Platform.OS === 'android'
    ? require('../styles/styles.android').default
    : require('../styles/styles.android').default;
const Archive: React.FC = () => {
    const { cachedArchiveRowTasks, userData } = useDataContext();
    const { isLoading } = useLoading()
    const router = useRouter()
    const uniqueTasks = useMemo(() => {
        return cachedArchiveRowTasks.filter((task, index, self) =>
            index === self.findIndex((t) => t.key === task.key)
        );
    }, [cachedArchiveRowTasks]);

    const [confirmationDialogVisible, setConfirmationDialogVisible] = useState<string>('');
    const EmptyList = () => {
        if (isLoading === true || uniqueTasks.length !== 0)
            return <></>;
        return <Text style={styles.header}>Нет задач</Text>

    }
    const formatDateTime = (dateString: string) => {
        if (!dateString) return '***'
        return dayjs(dateString).format('DD/MM/YYYY HH:mm');
    };

    return (

        <FlatList
            data={uniqueTasks}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
                <View>
                    <TouchableOpacity onPress={() => setConfirmationDialogVisible(item.key)}>
                        <TaskCard
                            task={item}
                        />
                    </TouchableOpacity>
                    <Dialog
                        isVisible={confirmationDialogVisible === item.key}
                        onClose={() => setConfirmationDialogVisible('')}
                        dialogWidth={'100%'}
                        scrollable={false}        >
                        <ScrollView contentContainerStyle={{ padding: 14, paddingBottom: -2 }}>
                            <View style={styles.rowStyle}>
                                <Text style={styles.header}>Из группы</Text>

                                <Text style={{
                                    fontSize: 16,
                                    marginTop: 5,
                                }}>{item.groupName}</Text></View>
                            <Text style={styles.header}>Описание</Text>
                            <ScrollView style={{ maxHeight: 150 }}>
                                <Text style={{
                                    fontSize: 16,
                                    marginBottom: 4,
                                    textAlign: 'center'
                                }}>{item.description}</Text></ScrollView>
                          
                        </ScrollView>
                    </Dialog>
                </View>
            )}

            ListEmptyComponent={<EmptyList />}
        />
    )
}

export default Archive