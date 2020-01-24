# Useful Tricks

## Keyboard

1.) ensuring that you can 'exit' out of the keyboard with the `DismissKeyboard` part
2.) Use `KeyboardAvoidingView` with the correct `props` to ensure that the keyboard properly pushes up the
screen.

```javascript
import { TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from 'react-native';

const DismissKeyboard = ({ children }) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

class CreatePaymentScreen extends Component {
  ...
  render() {
    return (
      <DismissKeyboard> // this should wrap everything
        // flex : 1 to fill screen; behaviour can have diff values;
        // should wrap the whole screen / the stuff you want "pushed up" when the keyboard shows
        <KeyboardAvoidingView style={{ flex: 1 }} behaviour="height" enabled>
        ...
        </KeyboardAvoidingView>
      </DismissKeyboard>
    )
  }
}
```

3.) if you want the keyboard to show up automatically

- make a `childRef` using `React.createRef()`
- the child component has to be created in a special way (refer to `Input.js`)
- from the parent component, attach the `childRef` to the child component
- in `componentDidMount()` of the parent, call `this.childRef.current.focus()`
