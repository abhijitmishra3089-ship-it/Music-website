import http from "k6/http";
import { check } from "k6";

export const options = {
  scenarios: {
    catalog: {
      executor: "constant-arrival-rate",
      rate: 1667,
      timeUnit: "1s",
      duration: "5m",
      preAllocatedVUs: 200,
      maxVUs: 2000
    }
  },
  thresholds: {
    http_req_failed: ["rate<0.01"],
    http_req_duration: ["p(95)<300"]
  }
};
export default function () {
  const response = http.get(`${__ENV.BASE_URL}/api/v1/songs?limit=20`);
  check(response, { "catalog returns 200": r => r.status === 200 });
}
