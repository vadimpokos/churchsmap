export async function getData(lat, lng) {
  const response = await fetch(
    `https://apiv4.updateparishdata.org/Churchs/?lat=${lat}&long=${lng}&&pg=1&apikey=74e45c40-7f11-11e1-b0c4-0800200c9a66`
  );
  return await response.json();
}
