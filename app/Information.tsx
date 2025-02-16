import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';

const Information: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>1. Задания</Text>
        <Text style={styles.text}>
          - Вы можете быть владельцем задания и исполняющим{' '}
        </Text>
        <Text style={styles.text}>
          - Это вы увидите на карточке задания слева владелец справа исполнитель
        </Text>
        <Text style={styles.text}>
          - Владелец задания проверяет задания и может принять, вернуть и отклонить.
        </Text>
        <Text style={styles.text}>
          - Если задание истекло срок, то оно становится просроченным
        </Text>

      </View>
      <View>
        <Text style={{...styles.title,marginBottom:-15}}>1.2 Цвета и их значения:</Text>

        <Text style={{...styles.text,marginBottom:5}}>
          {'\n'}
          <Text style={{ color: '#3db6db' }}>• голубой</Text> - в процессе{'\n'}
          <Text style={{ color: 'orange' }}>• желтоватый</Text> - отправлен на проверку{'\n'}
          <Text style={{ color: '#08158a' }}>• темно-синий</Text> - возвращен на доработку{'\n'}
          <Text style={{ color: 'red' }}>• красный</Text> - отклонен{'\n'}
          <Text style={{ color: '#434b4e' }}>• темно-серый</Text> - просрочен{'\n'}
          <Text style={{ color: '#1ddb3f' }}>• зеленый</Text> - выполнен
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>2. Группы</Text>
        <Text style={styles.text}>- Вы можете создать группу справа сверху</Text>
        <Text style={styles.text}>
          - После создания группы вы можете добавить пользователей, нажав на кнопку участники
        </Text>
        <Text style={styles.text}>
          - Также владелец группы может давать задание себе или конкретному пользователю, который есть в группе. Для этого надо нажать на группу
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>3. Настройки</Text>
        <Text style={styles.text}>- Вы можете посмотреть архив заданий</Text>
        <Text style={styles.text}>- Вы можете посмотреть информацию о приложении</Text>
        <Text style={styles.text}>- Вы можете выйти из аккаунта</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 4,
  },
});

export default Information;
