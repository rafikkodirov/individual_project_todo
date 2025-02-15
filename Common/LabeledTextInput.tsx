import { useEffect, useState } from "react";
import { TextInput, Text, Platform, TextStyle, KeyboardTypeOptions } from "react-native";

const styles = Platform.OS === 'android'
    ? require('../styles/styles.android').default
    : require('../styles/styles.android').default;

export enum TextInputType {
    email = 'email-address',
    numeric = 'numeric',
    phone = 'phone-pad',
    default = 'default',
    password = 'password',
    confirmPassword = 'confirmPassword',
    description = 'description',
    title = 'title',
}

interface LabeledTextInputProps {
    value: string;
    onChangeText: (text: string) => void;
    inputType?: TextInputType;
    label?: string;
    placeholder?: string;
    secureTextEntry?: boolean;
    keyboardType?: KeyboardTypeOptions;
    autoCapitalize?: 'none' | 'sentences' | 'words' | 'characters';
    styleUI?: { label?: TextStyle, input?: TextStyle };
}
const LabeledTextInput: React.FC<LabeledTextInputProps> = ({
    label,
    value,
    onChangeText,
    placeholder = '',
    inputType = TextInputType.default,
    secureTextEntry = false,
    keyboardType = 'default',
    autoCapitalize = 'none',
    styleUI,
}) => {
    const [placeholderState, setPlaceholderState] = useState<any>(null);
    const [labelState, setLabelState] = useState<string>('');
    const [secureTextEntryState, setSecureTextEntryState] = useState<boolean>(false);
    const [keyboardTypeState, setKeyboardTypeState] = useState<KeyboardTypeOptions>('default');
    const [autoCapitalizeState, setAutoCapitalizeState] = useState<'none' | 'sentences' | 'words' | 'characters' | undefined>('none');

    useEffect(() => {
        switch (inputType) {
            case TextInputType.email:
                keyboardType = 'email-address';
                placeholder = "Введите почту"
                autoCapitalize = "none"
                label = 'Email'
                break;
            case TextInputType.title:
                keyboardType = 'default';
                placeholder = "Введите название задачи"
                autoCapitalize = "none"
                label = 'Задача'
                break;
            case TextInputType.description:
                keyboardType = 'default';
                placeholder = "Введите описание"
                autoCapitalize = "none"
                label = 'Описание'
                break;
            case TextInputType.numeric:
                keyboardType = 'numeric';
                break;
            case TextInputType.password:
                keyboardType = 'default';
                placeholder = "Введите пароль"
                label = 'Пароль'
                secureTextEntry = true
                break;
            case TextInputType.confirmPassword:
                keyboardType = 'default';
                placeholder = "Подтвердить пароль"
                secureTextEntry = true
                break;
            case TextInputType.phone:
                keyboardType = 'phone-pad';
                break;
            default:
                keyboardType = 'default';
                break;
        }
        setKeyboardTypeState(keyboardType);
        setPlaceholderState(placeholder);
        setAutoCapitalizeState(autoCapitalize);
        setLabelState(label ?? '');
        setSecureTextEntryState(secureTextEntry);


    }, [])


    return (
        <>
            {value.length > 0 && labelState.length > 0 && <Text style={{
                marginLeft: 4,
                marginBottom: 4,
                fontSize: 14,
                fontWeight: '500',
                color: 'dark-gray',
                ...styleUI?.label
            }}>{labelState}</Text>}
            <TextInput
                style={{ ...styles.input, ...styleUI?.input }}
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholderState}
                secureTextEntry={secureTextEntryState}
                keyboardType={keyboardTypeState}
                autoCapitalize={autoCapitalizeState}
            />
        </>
    )
}


export default LabeledTextInput