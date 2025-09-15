import { StyleSheet } from "react-native";

import { Link } from "expo-router";

import ThemedView from '../Components/ThemedView'
import ThemedLogo from '../Components/ThemedLogo'
import ThemedText from '../Components/ThemedText'
import Spacer from '../Components/Spacer'


const Home = () => {
  return (
    <ThemedView style={styles.container}>
      <ThemedLogo   />
      <Spacer height={20}/>

      <ThemedText style={styles.title} title={true}>The number 1</ThemedText>

      <Spacer height={10} />
      <ThemedText >Reading App</ThemedText>
      <Spacer  />
      <Link href='/login' style={styles.link}>
      <ThemedText>Login Page</ThemedText>

      </Link>
      <Link href='/register' style={styles.link}>
      <ThemedText>Register Page</ThemedText>
      </Link>
      <Link href='/profile' style={styles.link}>
      <ThemedText>Profile Page</ThemedText>
      </Link>
    </ThemedView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
  },
  subtitle: {
    fontSize: 16,
    marginTop: 10,
  },

    link: {
    marginVertical: 10,
    fontSize: 16,
    borderBottomWidth:1,
  },
});
