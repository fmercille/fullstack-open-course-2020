import React from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => (
  <h1>{props.course}</h1>
)

const Part = (props) => (
  <p>
    {props.data.name} {props.data.exercices}
  </p>
)

const Content = (props) => (
  <>
    <Part data={props.parts[0]} />
    <Part data={props.parts[1]} />
    <Part data={props.parts[2]} />
  </>
)

const Total = (props) => {
  let sum = 0
  props.parts.forEach(element => sum += element.exercices);
  return (
    <p>Number of exercises {sum}</p>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts : [
      {
        name: 'Fundamentals of React',
        exercices: 10
      },
      {
        name: 'Using props to pass data',
        exercices: 7
      },
      {
        name: 'State of a component',
        exercices: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))