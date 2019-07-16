import provinces from './address/provinces'
import cities from './address/cities'
import areas from './address/areas'


export function getProvince() {

  let provinceArr = [];
  provinces.forEach(function (item) {
    let obj = {};
    obj.name = item.name;
    obj.code = item.code;
    provinceArr.push(obj);
  });
  return provinceArr;
}


export function getCity(provinceCode) {
  console.log("省：" + provinceCode);
  if (!provinceCode) {
    provinceCode = null
  }
  let cityArr = [];
  cities.forEach(function (item) {
    if (item.provinceCode === provinceCode) {
      let obj = {};
      obj.name = item.name;
      obj.code = item.code;
      obj.provinceCode = item.provinceCode;
      cityArr.push(obj);
    }
  });
  return cityArr;
}


export function getArea(cityCode) {
  console.log("市：" + cityCode);
  if (!cityCode) {
    cityCode = null
  }
  let areaArr = [];
  areas.forEach(function (item) {
    if (item.cityCode === cityCode) {
      let obj = {};
      obj.name = item.name;
      obj.code = item.code;
      obj.provinceCode = item.provinceCode;
      obj.cityCode = item.cityCode;
      areaArr.push(obj);
    }
  });
  return areaArr;
}
