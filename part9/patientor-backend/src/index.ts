
import express from 'express';
import patientRouter from './routes/patients';
import diagnosisRouter from './routes/diagnoses';

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
import cors from 'cors';
const app = express();

app.use(express.json());

// app.use(express.json())
// eslint-disable-next-line @typescript-eslint/no-unsafe-call
app.use(cors());
const PORT = 3001;


app.get('/api/ping', (_req, res)=>{
    console.log('RUNNING THE APPLICATION');
    res.send('ok');
});

app.use('/api/patients', patientRouter);
app.use('/api/diagnoses', diagnosisRouter);

app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`);
});