import { check, group, sleep } from 'k6';
import http from 'k6/http';

export let options = {
  max_vus: 10,
  vus: 10,
  stages: [
    { duration: "10s", target: 1 },
    { duration: "30s", target: 10 },
    { duration: "10s", target: 0 }
  ],
  thresholds: {
    "RTT": ["avg<500"]
  }
}

export default function() {
  group('v1 API testing', function() {
    group('heart-beat', function() {
      let res = http.get("https://httpbin.org/get");
      check(res, { "status is 200": (r) => r.status === 200 });
    });

    group('access an endpoint', function() {
      let res = http.get("https://bcmsft.azurewebsites.net/api/log?code=13TOVF85HuHnFCRjEFNAPw7ApaxxuHMxFC9woLfSTuVGcXznbgLlag==");
      check(res, {
        "status is 200": (r) => r.status === 200,
      });
    });
  });
  sleep(1);
}