const Header=(props)=>{
  console.log(props.course)
  return (
    <h1>{props.course.name}</h1>
    // <h1>{props.course}</h1>
  )


}

const Part = (props)=>{
  
  return (
    <p>{props.part} {props.exercises}</p>
  )
}
const Content= (props)=>{
  console.log( props.course.parts[2].exercises)
  // console.log(typeof([]))
  // console.log("length "+props.length)
  return (
    <div>
      <Part part={props.course.parts[0].name} exercises={props.course.parts[0].exercises} />
      <Part part={props.course.parts[1].name} exercises={props.course.parts[1].exercises} />
      <Part part={props.course.parts[2].name} exercises={props.course.parts[2].exercises} />
      {/* <Part part={props.parts[1].name} exercises={props.parts[1].exercises} />
      <Part part={props.parts[2].name} exercises={props.parts[2].exercises} /> */}
      {/* <Part part={props[1].name} exercises={props[1].exercisess}/>
      <Part part={props[2].name} exercises={props[2].exercises}/> */}
      
      {/* <Part />
      <Part /> */}
    {/* <p>{props.part1} {props.exercises1}</p>
    <p>{props.part2} {props.exercises2}</p>
    <p>{props.part3} {props.exercises3}</p> */}
    </div>

  )
}

const Total= (props)=>{
  console.log(props.course.parts[0].name)
  console.log("Checked")
  return (
    <p>Number of exercises {props.course.parts[0].exercises + props.course.parts[1].exercises + props.course.parts[2].exercises}</p>
    // <p>Number of exercises {props[0].parts[0].exercises + props[0].parts[1].exercises+ props[0].parts[2].exercises}</p>

  )
}


const App = () => {
  const course = {
   name:"Half Stack application development",

  // const part1 = "Fundamentals of React"
  // const exercises1 = 10
  // const part2 = "Using props to pass data"
  // const exercises2 = 7
  // const part3 = "State of a component"
  // const exercises3 =  14

  parts :[
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  
  }
  return (
    <div>
      <Header course={course} />
      
       <Content 
         course={course}
       
      />
     
 
      <Total
       course={course}
       />

    </div>
  )
}

export default App;
