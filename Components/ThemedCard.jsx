import { StyleSheet, useColorScheme, View } from 'react-native'
import { Colors } from '../Constants/Colors'

const ThemedCard = ({ style, ...props }) => {
  const colorScheme = useColorScheme()
  const theme = Colors[colorScheme] ?? Colors.light

  return (
    <View 
      style={[{ backgroundColor: theme.uiBackground}, styles.card, style]}
      {...props}
    />
  )
}

export default ThemedCard

const styles = StyleSheet.create({
  card: {
    borderRadius: 5,
    padding: 20
  }
})
// for better practices, it is better to put the themed UI components in one file called themes.jsx and import them individually