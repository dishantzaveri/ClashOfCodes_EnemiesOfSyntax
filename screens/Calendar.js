import { View, Text } from 'react-native'
import React from 'react'
import { Calendar, CalendarList } from 'react-native-calendars'

export default function Calendars() {
    const vacation = { key: 'vacation', color: 'red', selectedDotColor: 'blue' };
    const massage = { key: 'massage', color: 'blue', selectedDotColor: 'blue' };
    const workout = { key: 'workout', color: 'green' };
    return (
        <View>

            {/* white dots indicate heavy flow */}
            <CalendarList
                markingType={'period'}
                markedDates={{

                    '2022-11-21': { startingDay: true, color: '#f43f5e', textColor: 'white' },
                    '2022-11-22': { endingDay: true, color: '#f43f5e', textColor: 'white' },
                    '2023-01-21': { startingDay: true, color: '#f43f5e', textColor: 'white' },
                    '2023-01-22': { color: '#fb7185', textColor: 'white', marked: true, dotColor: 'white' },
                    '2023-01-23': { color: '#fb7185', textColor: 'white' },
                    '2023-01-24': { color: '#fb7185', textColor: 'white' },
                    '2023-01-25': { endingDay: true, color: '#f43f5e', textColor: 'white' },
                    '2022-12-22': { startingDay: true, color: '#f43f5e', textColor: 'white' },
                    '2022-12-23': { color: '#fb7185', textColor: 'white', marked: true, dotColor: 'white' },
                    '2022-12-24': { endingDay: true, color: '#f43f5e', textColor: 'white' },
                    '2023-02-25': { startingDay: true, color: '#f43f5e', textColor: 'white' },
                    '2023-02-26': { color: '#fb7185', textColor: 'white', marked: true, dotColor: 'white' },
                    '2023-02-27': { endingDay: true, color: '#f43f5e', textColor: 'white' },
                }}
            />
        </View>
    )
}