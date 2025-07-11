import {
  Image,
  TouchableOpacity,
} from 'react-native';

interface Props {
    onBackButtonPress: () => void
}

export default function BackArrow({onBackButtonPress} : Props) {

    return (
        <TouchableOpacity style={{ position: 'absolute', left: 0, marginLeft: 16 }} onPress={onBackButtonPress}>
            <Image source={require('../../assets/images/back-arrow.png')} style={{ height: 40, width: 40 }} />
        </TouchableOpacity>
    );
}