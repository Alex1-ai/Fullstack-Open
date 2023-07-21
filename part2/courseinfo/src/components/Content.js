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

  
export default Content