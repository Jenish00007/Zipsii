import { StyleSheet } from 'react-native';
import { colors } from '../../utils';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff",
      padding: 20,
    },
    imageContainer: {
      alignItems: "center",
      marginBottom: 30,
      borderWidth: 1,
      borderRadius: 10,
      padding: 20,
      borderColor: colors.graycolor,
    },
    image: {
      width: 200,
      height: 200,
      borderRadius: 25,
    },
    input: {
      borderRadius: 25,
      padding: 15,
      marginBottom: 30,
      fontSize: 16,
      borderWidth: 1,
      borderColor: colors.graycolor,
    },
    descriptionInput: {
      height: 150,
      textAlignVertical: "top",
    },
    submitButton: {
      backgroundColor: colors.btncolor,
      borderRadius: 15,
      paddingVertical: 15,
      alignItems: "center",
      marginTop: 90,
    },
    submitButtonText: {
      color: "#fff",
      fontSize: 18,
      fontWeight: "bold",
    },
  });
export default styles;