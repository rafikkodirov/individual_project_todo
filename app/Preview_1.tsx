import { ImageBackground, SafeAreaView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { Link, useRouter } from 'expo-router'
import { storeData } from '@/hooks/storageUtils';
import { ScaledStyleSheet } from '@/Common/ScaledStyleSheet';
import { ResizeMode, Video } from 'expo-av';
import { useLoading } from '@/providers/LoadingProvider';
const completeWelcomeRoute = '/(tabs)/activeTask.tsx';   //'/(tabs)/loans'
const back = "../assets/images/back_welcome.png"

const Index = () => {
    const imagges = [
        require("../assets/images/Group_full_edit1024.png"),
        require("../assets/images/Group_full_edit1024.png"),
        require("../assets/images/Group_full_edit1024.png"),
    ]

    const videos = [

        require("../assets/video/welcome_groups.mp4"),
        require("../assets/video/welcome_tasks.mp4"),
        require("../assets/video/welcome_settings.mp4"),

    ]

    const titles = [
        [('welcome1_1'), ('welcome1_2')],
        [('welcome2_1'), ('welcome2_2')],
        [('welcome3_2'), ('welcome3_2')],
    ]
 
    const [isVideoPlaying, setIsVideoPlaying] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);

    const handlePressVideo = () => {
        setIsVideoPlaying(true); // Начинаем воспроизведение
        setIsExpanded(true); // Расширяем видео
    };

    const { isLoading, setLoading } = useLoading()
    const router = useRouter();
    const [isDisabled, setIsDisabled] = useState(false);
    const [page, setPage] = useState(0);
    const [title, setTitle] = useState(titles[page]);
    const [imagge, setImage] = useState(imagges[page])
    const [video, setVideo] = useState(videos[page]);
    const handlePress = async () => {
        if (isDisabled || isLoading) return; // Проверяем оба состояния
        setIsDisabled(true);
        setLoading(true);

        try {
            if (page >= 2) {
                await storeData('isWelcomeShowed', 'true');
                await router.replace("/(tabs)/activeTask"); // Ждем завершения навигации
            } else {
                await new Promise((resolve) => setTimeout(resolve, 3000)); // Задержка перед сменой видео
                setVideo(videos[page + 1]);
                setPage(page + 1);
            }
        } catch (error) {
            console.error("Ошибка при переходе:", error);
        } finally {
            setIsDisabled(false); // Разблокировка кнопки в любом случае
            setLoading(false);
        }
    };
    const currentImage = imagges[page]
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.container}>

                <View style={styles.bannerCard}>
                    <Video
                        source={video}
                        style={styles.video}
                        resizeMode={ResizeMode.CONTAIN}
                        shouldPlay={!isLoading}
                        isLooping
                        isMuted
                    />
                </View>

                <View style={styles.ROW}>
                    <View style={page === 0 ? styles.miniActiveButton : styles.miniButton} />
                    <View style={page === 1 ? styles.miniActiveButton : styles.miniButton} />
                    <View style={page === 2 ? styles.miniActiveButton : styles.miniButton} />
                </View>

                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Text style={styles.buttonText}>Далее</Text>
                </TouchableOpacity>
                <Link href="/(tabs)/activeTask">
                    <Text style={{ fontSize: 20, padding: 10 }}>Пропустить</Text></Link>

            </View>
        </SafeAreaView>
    );

}

const styles = ScaledStyleSheet.create({
    safeArea: {
        flexGrow: 1,
        paddingHorizontal: 4,
        paddingBottom: 24,
        backgroundColor: '#D9D9D9',
    },
    video: {
        // marginBottom: -40,
        // borderRadius: 30,
        // flex: 1,
        // zIndex: 33,
        // margin: 12,
        alignItems: 'center',
        width: '100%',
        // height: 1040/2,
        height: "100%",
        // padding: 12,
        backgroundColor: '#D9D9D9',
        // Убедитесь, что изображение растягивается корректно
    },
    Skip: {
        // marginBottom: 20
    },
    box: {
        padding: 24
    },
    bannerAdS3: {
        flex: 1,
        // elevation: 33,
        zIndex: 0,
        alignItems: 'center',
        width: '100%',
        // marginStart:"12%",
        // marginStart:"22%",
        padding: 6,
        // height:"80%"
        // Убедитесь, что изображение растягивается корректно
    },
    TextTitle: {
        textAlign: "center",
        justifyContent: "center",
        fontSize: 26,
        fontFamily: "inter_semi_bold",
        fontWeight: 'bold',
        color: 'black',
        // lineHeight:6.5
    }
    ,
    TextAfterTitle: {
        fontSize: 16,
        textAlign: "center",
        justifyContent: "center",
        fontFamily: "inter_regular",
        color: 'black',
    },
    ROW: {
        flexDirection: 'row',
        // flex:
        gap: 12,
        zIndex: 0,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: "-15%",
        // marginTop:"",
        // marginTop:-20,
        // marginHorizontal: -20 
    },
    miniButton: {
        width: 16,
        height: 16,
        zIndex: 1,

        // marginBottom:-15,
        backgroundColor: "#B2B2B2",
        borderRadius: 5
    },
    miniActiveButton: {
        width: 16,
        height: 16,
        // marginBottom:-15,
        zIndex: 1,
        backgroundColor: 'blue',
        borderRadius: 5
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#D9D9D9',
        // zIndex: 0,
    },
    banner: {
        flex: 1,
        // elevation: 33,
        zIndex: 0,
        alignItems: 'center',
        width: '100%',
        // marginStart:"22%",
        // padding:30,
        // height:"80%"
        // Убедитесь, что изображение растягивается корректно
    },
    bannerCard: {

        // marginBottom: -40, 
        // flex: 1,
        // zIndex: 33,
        margin: 12,
        alignItems: 'center',
        width: '100%',
        // height: 1040/2,
        height: "75%",
        // padding: 1,
        backgroundColor: back,
        // Убедитесь, что изображение растягивается корректно
    },
    buttonText: {
        textAlign: "center",
        fontSize: 24,
        color: 'white',
    },
    button: {
        marginTop: 100,
        justifyContent: 'flex-end',
        marginBottom: 20,
        backgroundColor: '#007BFF', // Цвет фона кнопки
        padding: 15,
        textAlign: "center",
        // alignItems: 'center', // Центрирование по горизонтали
        width: 300,
        borderRadius: 20,
        fontSize: 22,
        color: 'white',
    },
})
export default Index
