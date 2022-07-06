export const dataMap = (data) => {
  return data.map((item) => {
    return {
      latitude: +item.latitude,
      longitude: +item.longitude,
      name: item.name,
      address: item?.church_address_street_address,
      phone: item.phone_number,
      url: item.url ? item.url : null,
    };
  });
};
