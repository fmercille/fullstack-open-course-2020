import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({text, handler}) => (
  <button onClick={handler}>{text}</button>
)

const Input = (props) => (
  <div>
    <h1>Give Feedback</h1>
    <Button text='good' handler={props.handlers.good} />
    <Button text='neutral' handler={props.handlers.neutral} />
    <Button text='bad' handler={props.handlers.bad} />
  </div>
)

const Statistic = ({text, value}) => (
  <tr>
    <td>{text}</td><td>{value}</td>
  </tr>
)

const ExtraStats = ({good, neutral, bad}) => {
  const count = good + neutral + bad
  const average = (good - bad) / count
  const positive = (good / count) * 100

  return (
    <>
    <tr>
      <td>all</td>
      <td>{count}</td>
    </tr>
    <tr>
      <td>average</td>
      <td>{average}</td>
    </tr>
    <tr>
      <td>positive</td>
      <td>{positive}%</td>
    </tr>
    </>
  )
}

const Statistics = ({good, neutral, bad}) => {
  if (good + neutral + bad === 0) {
    return (
      <div>
        <h1>Statistics</h1>
        No feedback given
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <table>
        <tbody>
          <Statistic text='good' value={good} />
          <Statistic text='neutral' value={neutral} />
          <Statistic text='bad' value={bad} />
          <ExtraStats good={good} neutral={neutral} bad={bad} />
        </tbody>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)

  const handlers = {
    good: handleGood,
    neutral: handleNeutral,
    bad: handleBad
  }

  return (
    <div>
      <Input handlers={handlers} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)