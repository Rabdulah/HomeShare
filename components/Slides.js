import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

const SCREEN_WIDTH = Dimensions.get('window').width;

/*
  parent:
  - alignItems (controls how children are 
  laid out in horizontal direction), 
  
  - justifyContent (lays out children along 'primary axis',
  i.e. based on whatever 'flexDirection' is set to),
  
  - flexDirection (controls whether children are laid out 
  horiz or vert)
  
  child: 
  - flex (makes a child in a parent try to take
  up as much space as possible - i.e. the higher the number
  value for this property, the more spce it takes up. operates
  in same direction as flexDirection),
    - ex) given flex: 4 on children 1, 2; flex: 2 on Child 3;
      - 4 + 4 + 2 = 10, so 10 units total of space. child 1 and 2
      get 40% each; child 3 gets 20%.
  
  and
  
  
  - alignSelf: overrides 'alignItems' on parent element.
*/
class Slides extends Component {
  renderLastSlide(index) {
    if (index === this.props.data.length - 1) {
      return (
        <Button
          title="Signup!"
          containerStyle={{ marginTop: 15 }}
          onPress={this.props.onComplete}
        />
      )
    }
  }
  renderSlides() {
    return this.props.data.map((slide, index) => {
      return (
        <View
          key={slide.text}
          style={[styles.slideStyle, {backgroundColor: slide.colour}]}
        >
          <Text style={styles.textStyle}>
            { slide.text }
          </Text>
          {this.renderLastSlide(index)}
        </View>
      );
    })
  }
  render() {
    return (
      <ScrollView
        horizontal
        style={{ flex: 1 }}
        pagingEnabled
      >
        { this.renderSlides() }
      </ScrollView>
    );
  }
}

const styles = {
  textStyle: {
    fontSize: 30,
    color: 'white',
    textAlign: 'center' // need this to center multiline text
  },
  slideStyle: {
    flex: 1, // fill whole screen
    width: SCREEN_WIDTH, // forces "flex: 1 in horiz direction"
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  buttonStyle: {
    backgroundColor: '#0288d1',
    marginTop: 15
  }
}


export default Slides;