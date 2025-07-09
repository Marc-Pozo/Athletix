import { StyleSheet } from 'react-native';

const colors = {
  primary: '#a61e1e',
  secondary: '#1f1e1c',
  text: '#ffffff',
  placeholder: '#888888',
  border: '#ffffff',
}

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.secondary,
  },
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 36,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 32,
    color: colors.text,
  },
  header: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginBottom: 24,
    fontSize: 32, 
    color: colors.text,
  },
  input: {
    marginRight: 16,
    backgroundColor: colors.secondary,
    paddingHorizontal: 16,
    marginTop: 24,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: colors.border,
    outlineColor: colors.border,
    borderWidth: 1,
    fontSize: 16,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
    justifyContent: 'center',
  },
  buttonText: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '600',
  },
  footerText: {
    marginTop: 8,
    textAlign: 'center',
    color: colors.text,
    fontSize: 16,
  },
  linkText: {    
    color: colors.primary,
    fontWeight: '600',
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 16
  },
  text: {
    color: '#aaa', 
    fontSize: 20, 
    marginBottom: 8 
  },  
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: '#fff',
  },
  footer : {
    flexDirection: 'row',
    height: 70,
    backgroundColor: colors.primary,
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowRadius: 16,
    shadowOpacity: 0.7,
    marginHorizontal: 16,
    borderRadius: 16,
  },
  footerButton: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});