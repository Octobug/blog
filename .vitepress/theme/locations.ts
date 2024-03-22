const CITY = {
  潮州: "潮州",
  深圳: "深圳",
};

const DISTRICT = {
  博士村: "潮安区东凤镇博士村",
  大冲社区: "南山区粤海街道大冲社区",
  高新区社区: "南山区粤海街道高新区社区",
  海滨社区: "宝安区新安街道海滨社区",
  海富社区: "宝安区新安街道海富社区",
  新安湖社区: "宝安区新安街道新安湖社区",
  渔业社区: "宝安区西乡街道渔业社区",
};

const LOCATIONS = {
  宝安图书馆: {
    city: CITY.深圳,
    district: DISTRICT.海滨社区,
  },
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
  家里: {
    city: CITY.潮州,
    district: DISTRICT.博士村,
  },
  郎景园: {
    city: CITY.深圳,
    district: DISTRICT.大冲社区,
  },
  覔书店·壹方城店: {
    city: CITY.深圳,
    district: DISTRICT.新安湖社区,
  },
  紫寓公寓: {
    city: CITY.深圳,
    district: DISTRICT.海富社区,
  },
};

export default function getLocation(spot: string) {
  return LOCATIONS[spot] || { spot };
}
