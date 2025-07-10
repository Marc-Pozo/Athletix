import { styles } from "@/constants/styles";
import { Dispatch, SetStateAction } from "react";
import { 
    View,
    Text,
    Switch
} from "react-native";

interface Props {
    message: string | null,
    setIsEnabled: Dispatch<SetStateAction<boolean>>,
    isEnabled: boolean | undefined,
}

export default function SwitchWrapper({message, setIsEnabled, isEnabled} : Props) {
    return (
        <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10 
        }}>
            <Text style={{color:'#fff', borderRadius: 8, fontSize: 20, alignSelf: 'center'}}>
                {message}
            </Text>
            <Switch
                thumbColor={isEnabled ? "#fff" : "#f4f3f4"}
                trackColor={{false: '#fff'}}
                onValueChange={setIsEnabled}
                value={isEnabled}
            />
        </View>
    );
}