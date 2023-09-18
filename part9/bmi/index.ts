import express from 'express';
import calculateBmi from './bmiCalculator';
import bodyParser from 'body-parser';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(bodyParser.json());
app.get('/hello', (_req: any, res: { send: (arg0: string) => void; })=>{
    res.send('Hello Full Stack')
})

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
  
    if (!daily_exercises || !target) {
      return res.status(400).json({ error: 'parameters missing' });
    }
  
    if (!Array.isArray(daily_exercises) || daily_exercises.some(isNaN) || isNaN(target)) {
      return res.status(400).json({ error: 'malformatted parameters' });
    }
  
    const exerciseResult = calculateExercises(daily_exercises, target);
    return res.json(exerciseResult);
  });



app.get('/bmi', (req, res)=>{
    if (req.query.height === '' || req.query.weight === ''){
        res.status(400).json({error:'parameters missing'})
        return;

    }
    const height = Number(req.query.height);
    const weight = Number(req.query.weight);

    if(isNaN(height) || isNaN(weight)  ){
        res.status(400).json({error:'malformatted parameters '})
        return;
    }
    const result = calculateBmi(height,weight);
    console.log(height)
    console.log(weight)
    return res.status(200).json({"height": height, "weight":weight, "bmi": result })
})

const PORT = 3003;


app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
})












// const multiplicator = (a:number, b:number, printText:string) =>{
//     console.log(printText, a* b);
// }


// multiplicator(2,4, "Multiplied number 2 and 4, the result is :")

// type Operation = 'multiply' | 'add' | 'divide'

// type Result = string | number
// const calculator = (a:number, b:number, op:Operation):number=>{
//     switch(op){
//         case 'multiply':
//             return a * b;
//         case 'divide':
//             if (b===0) throw new Error('can\'t divide by 0!')
//             return a / b
//         case 'add':
//             return a + b
//         default:
//             throw new Error('Operation is not multiple, add or divided')
//     }
//     // if (op === 'multiply'){
//     //     return a * b;
//     // } else if (op ==='add'){
//     //     return a + b;
//     // }else if (op==='divide'){
//     //     if (b===0) return 'can\'t  divide by 0!';
//     //     return a/b;
//     // }
// }


// try{
//    console.log(calculator(2,3,"add"));
// }catch (error:unknown){
//     let errorMessage = 'something went wrong: '

//     if(error instanceof Error){
//         errorMessage += error.message;
//     }
//     console.log(errorMessage)
// }
