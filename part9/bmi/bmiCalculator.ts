// bmiCalculator.ts

interface BmiValues {
    height:number;
    weight: number;
}

const parseArguments = (args: string[]): BmiValues=>{
    if(args.length < 4) throw new Error('Not enough arguments');
    if(args.length > 4) throw new Error('Too many arguments');

    if(!isNaN(Number(args[2])) && !isNaN(Number(args[3]))){
        return {
            height:Number(args[2]),
            weight:Number(args[3])

        }
    }else {
        throw new Error('Provided values were not  number!')
    }
}
function calculateBmi(heightCm: number, weightKg: number): string {
    const heightM = heightCm / 100;
    const bmi = weightKg / (heightM * heightM);
  
    if (bmi < 18.5) {
      return "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      return "Normal (healthy weight)";
    } else if (bmi >= 25 && bmi < 29.9) {
      return "Overweight";
    } else {
      return "Obese";
    }
  }
  
//   const height = 180;
//   const weight = 74;

try {
    const { height, weight } = parseArguments(process.argv);
    const bmiMessage = calculateBmi(height, weight);
  
    console.log(bmiMessage);

}catch(error: unknown){
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error){
        errorMessage += ' Error:' + error.message;
    }
    console.log(errorMessage)
}
  
export default calculateBmi