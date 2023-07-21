const Header=(props)=>{
    console.log(props.course)
    return (
      <h1>{props.course.name}</h1>
      // <h1>{props.course}</h1>
    )
  
  
  }

  

  export default Header