import { StyleSheet, FlatList, Pressable } from 'react-native'
import {useBooks} from '../../Hooks/useBooks'
import { Colors } from '../../Constants/Colors'

import Spacer from "../../Components/Spacer"
import ThemedText from "../../Components/ThemedText"
import ThemedView from "../../Components/ThemedView"
import ThemedCard from '../../Components/ThemedCard'
import { Text } from 'react-native'
import { useEffect } from 'react'
import { useRouter } from 'expo-router'


//
const Books = () => {
  const { books } = useBooks()
  const router = useRouter()

  return (
    <ThemedView style={styles.container} safe={true}>

      <Spacer />
      <ThemedText title={true} style={styles.heading}>
        Your Reading List
      </ThemedText>

      <Spacer />
      <FlatList
        data={books}
        keyExtractor={(item) => item.$id}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <Pressable onPress={()=>router.push(`/books/${item.$id}`)}>
            <ThemedCard style={styles.card}>
              <ThemedText style={styles.title}>{item.title}</ThemedText>
              <ThemedText>Written by {item.author}</ThemedText>
            </ThemedCard>
          </Pressable>
        )}
      />

    </ThemedView>
  )
}

export default Books

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  heading: {
    fontWeight: "bold",
    fontSize: 18,
    textAlign: "center",
  },
  list: {
    marginTop: 40
  },
  card: {
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 10,
    paddingLeft: 14,
    borderLeftColor: Colors.primary,
    borderLeftWidth: 4
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
})