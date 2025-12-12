import { StyleSheet, Dimensions } from 'react-native';


const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: width * 0.08,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 30,
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  input: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  button: {
    flex: 1,
    padding: 15,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 8,
    marginHorizontal: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  result: {
    marginTop: 30,
    fontSize: width * 0.05,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 10,
    overflow: 'hidden',
  },
});