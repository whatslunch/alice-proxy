/* eslint-disable import/no-mutable-exports */
/* eslint-disable import/no-unresolved */
import http from 'k6/http';
import { sleep } from 'k6';

const ids = [
  '328d7be9-cb00-45f5-961e-0a67408c62d3',
  '29f122cc-7b9e-4145-b332-a0df8a6210d1',
  '4074a0c2-2e5d-432a-a428-f45d8c8e2a83',
  '5d7a1df1-614a-43bf-b2cd-3763ee763419',
  '51047c6d-95b9-4dbc-a5b8-830ca4b4e340'];

export const options = {
  vus: 500,
  duration: '3m',
  rps: 1000,
};

export default function () {
  const id = ids[Math.floor(Math.random() * ids.length)];
  http.get(`http://localhost:8080/api/${id}/reservations`);
  sleep(1);
}
