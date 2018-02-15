import React, { Component } from 'react';
import {
  Text,
  View,
  StyleSheet
} from 'react-native';
import {Agenda} from 'react-native-calendars'
import Moment from 'moment'
import { connect } from 'react-redux'
import MenuActions from '../Redux/MenuRedux'
import Immutable from 'seamless-immutable'
import API from '../Services/Api'


class LaunchScreen extends Component {

  static navigationOptions = {
    tabBarLabel: 'Menu',
    // Note: By default the icon is only shown on iOS. Search the showIcon option below.
    // tabBarIcon: ({ tintColor }) => (
    //   <Icon name='ios-cart' style={{color: tintColor}} />
    // )
  };
  constructor(props) {
    super(props);
    this.state = {
      items: {}
    };
    this.api = API.create()
  }

  render() {
    return (
      <Agenda
        //items={Immutable.asMutable(this.props.menuItems)}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={Moment().format('YYYY-MM-DD')}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        // markingType={'period'}
        // markedDates={{
        //    '2017-05-08': {textColor: '#666'},
        //    '2017-05-09': {textColor: '#666'},
        //    '2017-05-14': {startingDay: true, endingDay: true, color: 'blue'},
        //    '2017-05-21': {startingDay: true, color: 'blue'},
        //    '2017-05-22': {endingDay: true, color: 'gray'},
        //    '2017-05-24': {startingDay: true, color: 'gray'},
        //    '2017-05-25': {color: 'gray'},
        //    '2017-05-26': {endingDay: true, color: 'gray'}}}
        // monthFormat={'yyyy'}
        // theme={{calendarBackground: 'red', agendaKnobColor: 'green'}}
        //renderDay={(day, item) => (<Text>{day ? day.day : 'item'}</Text>)}
      />
    );
  }

  loadItems(day) {
    /*setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 5);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      //console.log(this.state.items);
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {newItems[key] = this.state.items[key];});
      this.setState({
        items: newItems
      });
    }, 1000);*/
    if(day === undefined) {
      return;
    }
    this.api.getMenu(day.day, day.month, day.year).then((response) => {
      let matches = response.data.match(/<div\s+id="ctl00_ContentPlaceHolder1_pan1"\s+class="viewmenu">[\S\s]*?<\/div>/gi)
      let menu = 'No menu'
      if(matches.length > 0) {
        var brregex = /<br\s*[\/]?>/gi;
        menu = matches[0].replace(/\s\s+/g, ' ').replace(brregex, "\n").replace(/<\/?[^>]+(>|$)/g, "").replace("&nbsp;", "").replace("Menu:", "")
      }
      const strTime = this.timeToString(day.timestamp)
      const newItems = {};
      newItems[strTime] = [
        {
          text: menu,
          height: 150
        }
      ]
      this.setState({
        items: newItems
      });
      console.log({key: strTime, value: menu})
    })
    //const response = yield call(this.api.getMenu, day.day, day.month, day.year)
    //console.log(response)
    //this.props.fetchMenu(day)
    //Api
    // console.log(`Load Items for ${day.year}-${day.month}`);
  }

  renderItem(item) {
    return (
      <View style={[styles.item, {height: item.height}]}><Text>{item.text}</Text></View>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}><Text>This is empty date!</Text></View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const mapStateToProps = (state) => {
  return {
    menuItems: state.menu.items
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchMenu: (day) => dispatch(MenuActions.menuRequest(day)),

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LaunchScreen)

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});
