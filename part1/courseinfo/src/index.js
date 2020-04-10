import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>
    {props.name} {props.exercices}
  </p>
)

const Content = (props) => (
  <>
    <Part name={props.part_name[0]} exercices={props.exercices[0]} />
    <Part name={props.part_name[1]} exercices={props.exercices[1]} />
    <Part name={props.part_name[2]} exercices={props.exercices[2]} />
  </>
)

const Total = (props) => (
  <p>Number of exercises {props.total}</p>
)

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part_name={[part1, part2, part3]} exercices={[exercises1, exercises2, exercises3]} />
      <Total total={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))