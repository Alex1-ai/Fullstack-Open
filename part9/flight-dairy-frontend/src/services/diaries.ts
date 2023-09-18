import axios, { AxiosResponse } from 'axios'; // Import AxiosResponse for better type annotations
import { DiaryEntry, NewDiaryEntry } from '../types';

const baseUrl = 'http://localhost:3003/api/diaries';

export const getAllDiaries = () => {
    return axios
        .get<DiaryEntry[]>(baseUrl)
        .then((res: AxiosResponse<DiaryEntry[]>) => res.data); // Provide type annotation for res
};

export const createDiary = (object: NewDiaryEntry) => {
    return axios
        .post<DiaryEntry>(baseUrl, object)
        .then((res: AxiosResponse<DiaryEntry>) => res.data); // Provide type annotation for res
};



// import axios, {} from 'axios';
// import { DiaryEntry, NewDiaryEntry } from '../types';

// const baseUrl = 'http://localhost:3000/api/diaries';

// export const getAllDiaries = () => {
//     return axios
//             .get<DiaryEntry[]>(baseUrl)
//             .then(res => res.data)
// };

// export const createDiary = (object: NewDiaryEntry) => {
//     return axios
//             .post<DiaryEntry>(baseUrl, object)
//             .then(res => res.data)
// };