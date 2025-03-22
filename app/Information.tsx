import { useLoading } from '@/providers/LoadingProvider';
import { useRouter } from 'expo-router';
import React from 'react';
import { View, Text, Button, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const Information: React.FC = () => {
  const { isLoading, setLoading } = useLoading()
  const router = useRouter()
  const handlePress = async () => {
    if (isLoading) return;

    setLoading(true);

    try {
      await router.push({  // Ожидание завершения перехода
        pathname: "/Preview_1",
        params: { isInfo: 'yes' }
      });
    } catch (error) {
      console.error("Ошибка при переходе:", error);
    } finally {
      setLoading(false); // Разблокировка кнопки только после перехода
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.title}>1. Задания</Text>
        <Text style={styles.text}>
          - Вы можете быть владельцем задания и исполняющим{' '}
        </Text>
        <Text style={styles.text}>
          - На карточке задания: слева указывается  владелец, справа — исполнитель
        </Text>
        <Text style={styles.text}>
          - Владелец проверяет задание и может его принять, вернуть на доработку или отклонить
        </Text>
        <Text style={styles.text}>
          - Если срок выполнения задания истек, оно считается просроченным
        </Text>

      </View>
      <View>
        <Text style={{ ...styles.title, marginBottom: -15 }}>1.2 Цвета и их значения:</Text>

        <Text style={{ ...styles.text, marginBottom: 5 }}>
          {'\n'}
          <Text style={{ color: '#3db6db' }}>• Голубой</Text> - в процессе выполнения{'\n'}
          <Text style={{ color: 'orange' }}>• Желтоватый</Text> - отправлен на проверку{'\n'}
          <Text style={{ color: '#08158a' }}>• Темно-синий</Text> - возвращен на доработку{'\n'}
          <Text style={{ color: 'red' }}>• Красный</Text> - отклонен{'\n'}
          <Text style={{ color: '#434b4e' }}>• Tемно-серый</Text> - просрочен{'\n'}
          <Text style={{ color: '#1ddb3f' }}>• Зеленый</Text> - выполнен
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>2. Группы</Text>
        <Text style={styles.text}>- Создать группу можно, нажав кнопку в правом верхнем углу</Text>
        <Text style={styles.text}>
          - После создания добавьте участников через кнопку «Участники»
        </Text>
        <Text style={styles.text}>
          - Владелец группы может назначать задания себе или любому участнику группы. Для этого нужно выбрать группу.
        </Text>
        <Text style={styles.text}>
          - Если группа больше не нужна, удалите ее, проведя пальцем справа налево
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.title}>3. Настройки</Text>
        <Text style={styles.text}>- Здесь можно просмотреть архив заданий</Text>
        <Text style={styles.text}>- Узнать информацию о приложении</Text>
        <Text style={styles.text}>- Выйти из аккаунта при необходимости</Text>
      </View>
      <TouchableOpacity style={{ ...styles.button, marginBottom: 20 }} onPress={handlePress}>
        <Text style={styles.buttonText}>Перейти к видеоинструкции</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  buttonText: {
    textAlign: "center",
    fontSize: 20,
    color: 'white',
  }, button: {
    marginBottom: 20,
    justifyContent: 'flex-end',
    backgroundColor: '#007BFF', // Цвет фона кнопки
    padding: 8,
    textAlign: "center",
    // alignItems: 'center', // Центрирование по горизонтали
    // width: 300,
    borderRadius: 20,
    fontSize: 22,
    color: 'white',
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
