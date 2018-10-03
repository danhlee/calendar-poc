import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import Calendar from 'rc-calendar';
import enUS from 'rc-calendar/lib/locale/en_US';
import DatePicker from 'rc-calendar/lib/Picker';
import RangeCalendar from 'rc-calendar/lib/RangeCalendar';

import 'rc-calendar/assets/index.css';
import 'rc-time-picker/assets/index.css';


const dateFormat = 'MM/DD/YYYY';
const now = moment();








class CustomCalendarHelper extends React.Component {
  static propTypes = {
    firstDate: PropTypes.object,
    lastDate: PropTypes.object,
  }
  
  constructor(props) {
    super(props);

    this.state = {
      firstDateCal: props.firstDate,
      lastDateCal: props.lastDate,
      selectedDate: props.firstDate,
    };
  }

  disabledDate = (current) => {
    console.log('currnet = ' + current.format(dateFormat));
  
    if (!current) {
      // allow empty select
      return false;
    }
    const firstDay = this.state.firstDateCal;
    const lastDay = (this.state.lastDateCal).add(1, 'day');

    console.log('lastDay = ' + lastDay.format(dateFormat));

    firstDay.hour(0);
    firstDay.minute(0);
    firstDay.second(0);
    lastDay.hour(0);
    lastDay.minute(0);
    lastDay.second(0);
    return ( ( current.valueOf() < firstDay.valueOf() ) || ( current.valueOf() > lastDay.valueOf() ) );  // can not select days before today
  }


  onChange = (value) => {
    console.log('DatePicker change: ', (value && value.format(dateFormat)));
    this.setState({
      selectedDate: value,
    });
  }

  render() {

    const calendar = (
      <RangeCalendar
        locale={enUS}
        style={{ zIndex: 1000 }}
        defaultValue={this.state.selectedDate}
        disabledDate={this.disabledDate}
        showDateInput={false} 

      />
    );

    return(
      <div>
        <DatePicker 
          animation="slide-up"
          calendar={calendar}
          value={this.state.selectedDate}
          onChange={this.onChange}>

          {
            ({ value }) => {
              return (
                <span tabIndex="0">
                <input
                  tabIndex="-1"
                  className="ant-calendar-picker-input ant-input"
                  value={value.format(dateFormat)}
                  readOnly
                />
                </span>
              );
            }
          }
        </DatePicker>
      </div>
    );
  }
}


class CustomCalendar extends React.Component {
  constructor(props) {
    super(props);

    let firstDateMoment = moment(this.props.first, dateFormat);
    let lastDateMoment = moment(this.props.last, dateFormat);

    this.state = {
      firstDate: firstDateMoment,
      lastDate: lastDateMoment
    };
  }

  render() {
    return (
      <div>
        <div>this is inside the calendar</div>
        <CustomCalendarHelper firstDate={this.state.firstDate} lastDate={this.state.lastDate} />
      </div>
    );
  }
}

export default CustomCalendar;