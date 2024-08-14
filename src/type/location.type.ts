export type TDivision = {
  _id: string;
  id: string;
  name: string;
  bn_name: string;
  url: string;
};

export type TDistrict = {
  _id: string;
  id: string;
  division_id: string;
  name: string;
  bn_name: string;
  lat: string;
  lon: string;
  url: string;
};

export type TUpazila = {
  _id: string;
  id: string;
  district_id: string;
  name: string;
  bn_name: string;
  url: string;
};
