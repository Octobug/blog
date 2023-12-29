const CITY = {
  深圳: "深圳",
};

const DISTRICT = {
  大冲社区: "南山区粤海街道大冲社区",
  高新区社区: "南山区粤海街道高新区社区",
  渔业社区: "宝安区西乡街道渔业社区",
};

const LOCATIONS = {
  财富港: {
    city: CITY.深圳,
    district: DISTRICT.渔业社区,
  },
  创维半导体设计大厦西座: {
    city: CITY.深圳,
    district: DISTRICT.高新区社区,
  },
  大冲新城花园: {
    city: CITY.深圳,
    district: DISTRICT.大冲社区,
  },
  郎景园: {
    city: CITY.深圳,
    district: DISTRICT.大冲社区,
  },
};

export default function getLocation(spot: string) {
  return LOCATIONS[spot] || { spot };
}
