import DateTimePicker from '@react-native-community/datetimepicker';
import DatePickerIOS from '@react-native-community/datetimepicker';

export const DateSelector = ({ platform, today, date, mode, changeDate }) => {
    if(platform == "android"){
        return (
            <DateTimePicker
                testID="dateTimePicker"
                value={date}
                mode={mode}
                display="default"
                minimumDate={new Date(today - 86400000 * 273.75)}
                maximumDate={new Date(today + 86400000 * 273.75)}
                onChange={changeDate}
                accessibilityLabel='Date picker calendar'
            />
        );
    } else if(platform == "ios"){
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