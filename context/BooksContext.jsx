import { createContext, useEffect, useState } from "react"
import { ID, Permission, Query, Role } from "react-native-appwrite"
import { useUser } from "../Hooks/useUser"
import { client, databases } from "../lib/appwrite"

// Use the correct IDs as provided
const DATABASE_ID = "68c617cb0010b74e07b2"
const COLLECTION_ID = "68c618720019c6fb9807"

export const BooksContext = createContext()

export function BooksProvider({children}) {
  const [books, setBooks] = useState([])
  const { user } = useUser()

  async function fetchBooks() {
    try {
        const response = await databases.listDocuments(
            DATABASE_ID,
            COLLECTION_ID,
            [
                Query.equal('userid', user.$id)
            ]
        )
        setBooks(response.documents)
        console.log(response.documents)
    } catch (error) {
      console.error(error.message)
    }
  }

  async function fetchBookById(id) {
    try {
      const response = await databases.getDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id
      )

      return response
    } catch (error) {
      console.log(error.message)
    }
  }

  async function createBook(data) {
    try {
      await databases.createDocument(
        DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        {...data, userid: user.$id},
        [
          Permission.read(Role.user(user.$id)),
          Permission.update(Role.user(user.$id)),
          Permission.delete(Role.user(user.$id)),
        ]
      );
       await fetchBooks()
    } catch (error) {
      console.log(error.message)
    }
  }

  async function deleteBook(id) {
    try {
      await databases.deleteDocument(
        DATABASE_ID,
        COLLECTION_ID,
        id
      );
      await fetchBooks(); // Ensure UI updates after deletion
    } catch (error) {
      console.log(error.message);
    }
  }
  useEffect(() => {
    let unsubscribe;
    const channel = `databases.${DATABASE_ID}.collections.${COLLECTION_ID}.documents`;

    if (user) {
      fetchBooks();

      unsubscribe = client.subscribe(channel, (response) => {
        // On any event (create, update, delete), refetch all books
        fetchBooks();
      });
    } else {
      setBooks([]);
    }
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, [user]);

  return (
    <BooksContext.Provider 
      value={{ books, fetchBooks, fetchBookById, createBook, deleteBook }}
    >
      {children}
    </BooksContext.Provider>
  )
}