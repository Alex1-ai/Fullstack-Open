// exerciseCalculator.ts

interface ExerciseResult {
    periodLength: number;
    trainingDays: number;
    success: boolean;
    rating: number;
    ratingDescription: string;
    target: number;
    average: number;
  }
  
  export const calculateExercises =(
    exerciseHours: number[],
    targetHours: number
  ): ExerciseResult =>{
    const periodLength = exerciseHours.length;
    const trainingDays = exerciseHours.filter(hours => hours > 0).length;
    const totalHours = exerciseHours.reduce((sum, hours) => sum + hours, 0);
    const average = totalHours / periodLength;
  
    const success = average >= targetHours;
  
    let rating = 1;
    let ratingDescription = "not too bad but could be better";
  
    if (average >= targetHours * 1.5) {
      rating = 3;
      ratingDescription = "excellent";
    } else if (average >= targetHours) {
      rating = 2;
      ratingDescription = "good";
    }
  
    return {
      periodLength,
      trainingDays,
      success,
      rating,
      ratingDescription,
      target: targetHours,
      average,
    };
  }
  
//   const exerciseHours = [3, 0, 2, 4.5, 0, 3, 1];
//   const targetHours = 2;
//   const exerciseResult = calculateExercises(exerciseHours, targetHours);
  
//   console.log(exerciseResult);
  
if (process.argv.length < 3) {
    console.log("Usage: npm run calculateExercises <target hours> <exercise hours...>");
  } else {
    const targetHours = Number(process.argv[2]);
    const exerciseHours = process.argv.slice(3).map(Number);
  
    if (isNaN(targetHours) || exerciseHours.some(isNaN)) {
      console.log("Invalid input. Target and exercise hours must be numbers.");
    } else {
      const exerciseResult = calculateExercises(exerciseHours, targetHours);
      console.log(exerciseResult);
    }
  }