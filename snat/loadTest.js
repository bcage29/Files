import { check, group, sleep } from 'k6';
import http from 'k6/http';

export let options = {
  discardResponseBodies: true,
  scenarios: {
    snat: {
      executor: 'per-vu-iterations',
      vus: 800,
      iterations: 500
    },
  },
  thresholds: {
    "RTT": ["avg<500"]
  }
};


export default function() {
  group('v1 API testing', function() {

    group('access an endpoint', function() {
      let body = {
        region: __ENV.region,
        runId: __ENV.runId,
        timestamp: new Date().getTime(),
        userId: __VU,
        iteration: __ITER
      };

      let res = http.post(
        __ENV.endpoint,
        JSON.stringify(body)
      );

      check(res, {
        "status is 200": (r) => r.status === 200,
      });
      
    });
  });
  sleep(1);
}