export async function getData(url, endpoint) {
  try {
    const fullURL = url + endpoint;
    console.log(fullURL);
    const response = await fetch(fullURL);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return error.toString();
  }
}
