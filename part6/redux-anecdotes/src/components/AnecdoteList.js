import { useSelector, useDispatch } from "react-redux";
import { incrementVote } from "../reducers/anecdoteReducer";
import { clearNotification, setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector(state => {
    let displayedAnecdotes;

    if (state.filter === 'ALL') {
      displayedAnecdotes = [...state.anecdotes];
    } else {
      let filterWord = state.filter;
      displayedAnecdotes = state.anecdotes.filter(anecdote => anecdote.content.includes(filterWord));
    }

    // Sort the displayedAnecdotes array by votes in descending order
    displayedAnecdotes.sort((a, b) => b.votes - a.votes);

    return displayedAnecdotes;
  });

  const dispatch = useDispatch();

  const vote = (anecdote) => {
    console.log('vote', anecdote.id);
    dispatch(incrementVote(anecdote.id));
    dispatch(setNotification(`Voted for "${anecdote.content}"`, 5000))

    // clear notification after 5 seconds
    
  };

  return (
    <>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  );
};

export default AnecdoteList;




// import { useSelector, useDispatch} from "react-redux";
// import { incrementVote } from "../reducers/anecdoteReducer";

// const AnecdoteList = () => {
//     const anecdotes = useSelector(state => {
//       if (state.filter === 'ALL'){
//         const sortedAnecdotes = [...state.anecdotes]; // Create a shallow copy of the array
//         return sortedAnecdotes.sort((a, b) => b.votes - a.votes);
//         // return state.anecdotes.sort((a,b)=>b.votes-a.votes )
//         // return state.anecdotes

//       }
//       let filterWord = state.filter
//       return state.anecdotes.filter(anecdote => anecdote.content.includes(filterWord));
      
      
      
//     })
//     const dispatch = useDispatch()


//     const vote = (id) => {
//         console.log('vote', id)
//         dispatch(incrementVote(id))
//       }

//     return (
//         <>
//             {anecdotes.map(anecdote =>
//         <div key={anecdote.id}>
//           <div>
//             {anecdote.content}
//           </div>
//           <div>
//             has {anecdote.votes}
//             <button onClick={() => vote(anecdote.id)}>vote</button>
//           </div>
//         </div>
//       )}
//         </>
//     )
// }


// export default AnecdoteList