import DateTimePicker from '@react-native-community/datetimepicker';
import DatePickerIOS from '@react-native-community/datetimepicker';

export const DateSelector = ({ platform, today, date, mode, changeDate }) => {
    //platform = "ios"
    console.log("os is ", platform);
    if(platform == "android"){
        console.log("Android is os: ", platform);
        console.log("New Date ", date);
        return (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="default"
                minimumDate={new Date(today - 86400000 * 182.5)}
                maximumDate={new Date(today + 86400000 * 182.5)}
                onChange={changeDate}
            />
        );
    } else if(platform == "ios"){
        console.log("ios is os: ", platform);
        console.log("New Date ", date);
        return (
            <DatePickerIOS
            testID="dateTimePicker"
            value={date}
            mode={mode}
            is24Hour={true}
            onChange={changeDate}
                //display="default"
                minimumDate={new Date(today - 86400000 * 182.5)}
                maximumDate={new Date(today + 86400000 * 182.5)}
                onDateChange={changeDate}
            />
        )
    }
}