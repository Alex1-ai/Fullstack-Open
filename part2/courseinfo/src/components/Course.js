const Header=({course})=>{
    // console.log("course is here",course)
    return (
      <h1>{course.name}</h1>
      // <h1>{props.course}</h1>
    )
  
  
  }
  
  const Part = ({name , exercises})=>{
    
    return (
      <p>{name} {exercises}</p>
    )
  }
  const Content= ({course, total})=>{
    const {parts} = course
    // console.log(parts[0])
    // console.log(typeof([]))c
    // console.log("length "+props.length)
    return (
      <div>

      
        {parts.map((part)=>
        <Part 
           key={part.id}
           name={part.name} 
           exercises={part.exercises}
           /> 
        )}
        <Total total={total} />
     
      </div>
  
    )
  }

const Total= ({total})=>{
    // console.log(course)

    // const {parts} = course
    // // console.log(parts)
    // // console.log(parts)
    // console.log("Checked")
    // let sum =parts.reduce((sum, part)=>{
    //   return sum + part.exercises
    
    // },0)
        // console.log("acummulator", accumulator.exercises)
        // console.log('current', part.exercises)
        // return sum +part.exercises}
        // ,0);
    //console.log("sum ooooo",sum)
    return (
      <h4>Total of {total} exercises</h4>
      // <p>Number of exercises {props[0].parts[0].exercises + props[0].parts[1].exercises+ props[0].parts[2].exercises}</p>
  
    )
  }
  



const Course = ({course})=>{
  const {parts} = course
  const total =parts.reduce((sum, part)=>{
    return sum + part.exercises
  
  },0)
    
    return (
        <div>
            <Header course={course} />
            <Content course={course} total={total}/>
           
        </div>
    )
}



export default Course