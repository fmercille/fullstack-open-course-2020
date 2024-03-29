import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const Anecdote = ({anecdotes, votes, index}) => (
  <div>
    {anecdotes[index]}<br />
    has {votes[index]} votes
  </div>
)

const PopularAnecdote = ({anecdotes, votes}) => {
  const maxVotes = Math.max.apply(null, votes)
  const indexOfMaxVotes = votes.indexOf(maxVotes)

  return (
    <Anecdote anecdotes={anecdotes} votes={votes} index={indexOfMaxVotes} />
  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(props.anecdotes.length).fill(0))

  const handleNextAnecdote = () => {
    const index = Math.floor(Math.random() * props.anecdotes.length)
    setSelected(index)
  }

  const handleVote = () => {
    const copy = [...votes]
    copy[selected] += 1
    setVotes(copy)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdotes={props.anecdotes} votes={votes} index={selected} />
      <div><button onClick={handleVote}>Vote</button><button onClick={handleNextAnecdote}>Next anecdote</button></div>
      <h1>Anecdote with the most votes</h1>
      <PopularAnecdote anecdotes={props.anecdotes} votes={votes} />
    </div>
  )
}

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)