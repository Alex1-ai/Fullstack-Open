import { useState, useEffect } from "react";
import { DiaryEntry, Visibility, Weather } from "./types";
import { getAllDiaries, createDiary } from "./services/diaries";
import { TextField, SelectChangeEvent, InputLabel, Grid, Button, RadioGroup, FormControl, FormLabel, FormControlLabel, Radio } from "@mui/material";

const App = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [newDiary, setNewDiary] = useState('');
  const [diaries, setDiaries ] = useState<DiaryEntry[]>([]);
  const [date, setDate] = useState('');
  const [weather, setWeather] = useState(Weather.Sunny);
  const [visibility, setVisiblity] = useState(Visibility.Good);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');

  useEffect(()=>{
    void fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const data = await getAllDiaries();
      setDiaries(data);
    } catch (error) {
      // Handle any errors here
      console.error('Error:', error);
    }
  };
  interface WeatherOption{
    value: Weather;
    label: string;
  }
  
  const weatherOptions: WeatherOption[] = Object.values(Weather).map(v => ({
    value: v, label: v.toString()
  }));

  const onWeatherChange = (event: SelectChangeEvent<string>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const value = event.target.value;
      const weather = Object.values(Weather).find(w => w.toString() === value);
      if (weather) {
        setWeather(weather);
      }
    }
  };

  interface VisibilityOption{
    value: Visibility;
    label: string;
  }
  
  const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({
    value: v, label: v.toString()
  }));

  const onVisibilityChange = (event: SelectChangeEvent<string>) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    event.preventDefault();
    if ( typeof event.target.value === "string") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const value = event.target.value;
      const visibility = Object.values(Visibility).find(w => w.toString() === value);
      if (visibility) {
        setVisiblity(visibility);
      }
    }
  };

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDiary({date, weather, visibility, comment}).then(data => {
      setDiaries(diaries.concat(data));
      setDate('');
      setComment('');
    })
    .catch(err => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const errorMessage = err.response.data.message;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      setError(errorMessage);
    });

    setNewDiary('');
  };

  return (
    <div>
      {error && <p style={{ color: 'red' }}>{error}</p>} 
      <h1>Add an Entry</h1>
      <form 
        onSubmit={diaryCreation}
      >
        <InputLabel style={{ marginTop: 20 }}>Date</InputLabel>
        <TextField 
          type='date'
          fullWidth
          value={date}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          onChange= {({target}) => setDate(target.value)}
        />

  <div>
    <FormControl>
        <FormLabel 
          id="demo-controlled-radio-buttons-group"
          style={{ marginTop: 20 }}
        >
          Weather
        </FormLabel>
        <RadioGroup
          row
          name="Weather"
          value={weather}
          onChange={onWeatherChange}
        >
          {weatherOptions.map(option => 
            <FormControlLabel
              key={option.label}
              value={option.value}
              control={<Radio />}
              label={option.value}
            />
          )}
        </RadioGroup>
     </FormControl>
  </div>

    <FormControl>
       <FormLabel 
          id="demo-controlled-radio-buttons-group"
          style={{ marginTop: 20 }}
        >
          Visibility
        </FormLabel>
        <RadioGroup
          name="Visiblity"
          row
          value={visibility}
          onChange={onVisibilityChange}
        >
          {visibilityOptions.map(option => 
            <FormControlLabel
              key={option.label}
              value={option.value}
              control={<Radio />}
              label={option.value}
            />
          )}
        </RadioGroup>
      </FormControl>
        
        <TextField 
          style={{ marginTop: 20 }}
          label='Comment'
          fullWidth
          value={comment}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
          onChange={({target}) => setComment(target.value)}
        />

        <Grid>
          <Grid item>
            <Button
              style={{ marginTop: 25 }}
              color='primary'
              type='submit'
              fullWidth
              variant='contained'
            >
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      <h1>Diary Entries</h1>
      {diaries.map(diary => 
        <div key={diary.id}>
          <h3 >{diary.date}</h3>
          <p>visibility: {diary.visibility}</p>
          <p>weather: {diary.weather}</p>
        </div>
      )}
    </div>
  );
};

export default App;
