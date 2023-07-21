import Course from './components/Course'
// const Header=(props)=>{
//   console.log(props.course)
//   return (
//     <h1>{props.course.name}</h1>
//     // <h1>{props.course}</h1>
//   )


// }

// const Part = (props)=>{
  
//   return (
//     <p>{props.part} {props.exercises}</p>
//   )
// // }
// const Content= (props)=>{
//   console.log( props.course.parts[2].exercises)
//   // console.log(typeof([]))
//   // console.log("length "+props.length)
//   return (
//     <div>
//       <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
//       <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
//       <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
//       {/* <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
//       <Part part={props.parts[2].name} exercises={props.parts[2].exercises} /> */}
//       {/* <Part part={props[1].name} exercises={props[1].exercisess}/>
//       <Part part={props[2].name} exercises={props[2].exercises}/> */}
      
//       {/* <Part />
//       <Part /> */}
//     {/* <p>{props.part1} {props.exercises1}</p>
//     <p>{props.part2} {props.exercises2}</p>
//     <p>{props.part3} {props.exercises3}</p> */}
//     </div>

//   )
// }

// const Total= (props)=>{
//   console.log(props.course.parts[0].name)
//   console.log("Checked")
//   return (
//     <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
//     // <p>Number of exercises {props[0].parts[0].exercises + props[0].parts[1].exercises+ props[0].parts[2].exercises}</p>

//   )
// }


const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  
  
  return (
    <div>
      {/* <Header course={course} />
      
       <Content 
         course={course}
       
      />
     
 
      <Total
       course={course}
       /> */}

       {courses.map((course)=>{
        console.log(course)
        return <Course
        key={course.id}
        course={course} />


       })}

       
    </div>
  )
}

export default App;
