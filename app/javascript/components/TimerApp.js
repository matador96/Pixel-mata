import React from "react";

class TimerApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      max: "",
      timestart: "",
      timestop: "",
      table: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleStop = this.handleStop.bind(this);
  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  currentDate() {
    let current_datetime = new Date();
    let formatted_date =
      current_datetime.getFullYear() +
      "-" +
      (current_datetime.getMonth() + 1) +
      "-" +
      current_datetime.getDate() +
      " " +
      current_datetime.getHours() +
      ":" +
      current_datetime.getMinutes() +
      ":" +
      current_datetime.getSeconds();

    return formatted_date;
  }

  handleClick() {
    if (this.state.max.length === 0) {
      this.setState({
        max: this.state.value,
        timestart: this.currentDate()
      });
      document.getElementById("label").innerHTML = "Осталось";
    }

    this.interval = setInterval(() => {
      if (this.state.value === 0) {
        clearInterval(this.interval);
        this.setState(
          {
            timestop: this.currentDate()
          },
          () => {
            this.Getdata();
          }
        );
      } else {
        this.setState(previousState => {
          return { value: previousState.value - 1 };
        });
      }
    }, 1000);
  }

  handleStop() {
    clearInterval(this.interval);
  }

  componentDidMount() {
    this.UpdateData();
  }

  UpdateData() {
    fetch("/datatables.json")
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ table: data });
      });
  }

  Getdata() {
    let body = JSON.stringify({
      data: {
        title: "test",
        startdate: this.state.timestart,
        stopdate: this.state.timestop,
        timer: this.state.max
      }
    });
    console.log(body);
    fetch("/datatables", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: body
    }).then(response => {
      if (response.status === 200) {
        this.setState(
          {
            value: "",
            max: "",
            timestart: "",
            timestop: ""
          },
          () => {
            this.UpdateData();
          }
        );
      }
      return response.json();
    });
  }

  render() {
    return (
      <>
        <label id="label">Задать таймер</label>
        <input
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <button onClick={this.handleClick}>Старт</button>
        <button onClick={this.handleStop}>Стоп</button>

        <br />

        {this.state.max.length > -1 && (
          <>
            <progress
              max={this.state.max}
              value={this.state.max - this.state.value}
            />
            <br />
            <label>Время начала: {this.state.timestart}</label>
            {this.state.timestop.length > 0 && (
              <>
                <br />
                <label>Конец: {this.state.timestop}</label>
              </>
            )}
            <table>
              <th>#</th>
              <th>Title</th>
              <th>DateStart</th>
              <th>DateStop</th>
              <th>Timer</th>
              <tbody>
                {this.state.table.map((time, i) => (
                  <tr>
                    <td>{i}</td>
                    <td>{time.title}</td>
                    <td>{time.datestart}</td>
                    <td>{time.datastop}</td>
                    <td>{time.timer}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </>
    );
  }
}

export default TimerApp;
