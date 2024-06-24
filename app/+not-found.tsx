import { Link, Stack } from 'expo-router';
import { Text, View, StyleSheet } from 'react-native';


export default function NotFoundScreen() {
  return (
    <>
      <View style={styles.container}>
        <Link href="/" style={styles.link}>
        <Text>123</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
});
