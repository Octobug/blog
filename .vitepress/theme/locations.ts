const CITY = {
  深圳: "深圳",
};

const DISTRICT = {
  渔业社区: "宝安区西乡街道渔业社区",
  高新区社区: "南山区粤海街道高新区社区",
};

const LOCATIONS = {
  财富港大厦: {
    city: CITY.深圳,
    district: DISTRICT.渔业社区,
  },
  创维半导体设计大厦西座: {
    city: CITY.深圳,
    district: DISTRICT.高新区社区,
  }
};

export default function getLocation(spot: string) {
  return LOCATIONS[spot] || { spot };
}