import { StyleSheet, Text, View } from 'react-native'
import { useLocalSearchParams, useRouter } from 'expo-router'
import {useState, useEffect} from 'react'
import { useBooks } from '../../../Hooks/useBooks'

import ThemedView from '../../../Components/ThemedView'
import ThemedText from "../../../Components/ThemedText"
import ThemedTextInput from "../../../Components/ThemedTextInput"
import ThemedButton from '../../../Components/ThemedButton'
import Spacer from '../../../Components/Spacer'
import ThemedCard from '../../../Components/ThemedCard'
import ThemedLoader from '../../../Components/ThemedLoader'
import { Colors } from '../../../Constants/Colors'


const BookDetails = () => {
    const [book, setBook] = useState(null)
    
    const { id } = useLocalSearchParams()
    const { fetchBookById, deleteBook } = useBooks()
    const router = useRouter()

    const handleDelete = async ()=>{
      await deleteBook(id)
      setBook(null)
      router.replace('/books')
    }

    useEffect(()=>{
        async function loadBook() {
            const bookData = await fetchBookById(id)
            setBook(bookData)
        }
        loadBook()
    }, [id])

 if (!book) {
    return (
      <ThemedView safe={true} style={styles.container}>
        <ThemedLoader />
      </ThemedView>
    )
  }

  return (
    <ThemedView safe={true} style={styles.container}>
      <ThemedCard style={styles.card}>
        <ThemedText style={styles.title}>{book.title}</ThemedText>
        <ThemedText>Written by {book.author}</ThemedText>
        <Spacer />

        <ThemedText title={true}>Book description:</ThemedText>
        <Spacer height={10} />

        <ThemedText>{book.description}</ThemedText>
      </ThemedCard>
      <ThemedButton style={styles.delete} onPress={handleDelete}>
        <Text style={{color: '#fff', textAlign: 'center'}}>
          Delete Book
        </Text>
      </ThemedButton>
    </ThemedView>
  )

}

export default BookDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "stretch",
  },
  delete:{
    marginTop: 40,
    backgroundColor: Colors.warning,
    width: 200,
    alignSelf: 'center'
  }
})