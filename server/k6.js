import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
  vus: 100,
  duration: '15s',
};

export default function () {
  const prodId = Math.floor(Math.random() * 900000);
  http.get(`http://localhost:3000/qa/questions?product_id=${prodId}`);
  sleep(1);
}