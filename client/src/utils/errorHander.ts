import { AxiosError } from 'axios';

export const handleApiError = (error: AxiosError): ApiError => {
  let message = 'An unexpected error occurred';
  let status = null;
  let data = null;

  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    status = error.response.status;
    message = error.response.statusText;
    data = error.response.data;
  } else if (error.request) {
    // The request was made but no response was received
    message = 'No response received from server';
  } else {
    // Something happened in setting up the request that triggered an Error
    message = error.message;
  }

  return { message, status, data };
};