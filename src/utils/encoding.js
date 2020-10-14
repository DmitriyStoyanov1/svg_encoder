export default function encodeSvg(value) {
  function addUrl(value) {
    if (!value.includes(`http://www.w3.org/2000/svg`)) {
      let url = "http://www.w3.org/2000/svg";
      value = value.replace(/<svg/g, `<svg xmlns='${url}'`);
    }
    return value;
  }

  const currentFileWithUrl = addUrl(value);
  let encoded = encodeURIComponent(currentFileWithUrl);

  const charsHashMap = {
    "%3D": "=",
    "%22": "'",
    "%20": " ",
    "%3A": ":",
    "%2F": "/",
    "%0A": ""
  }

  Object.keys(charsHashMap).forEach(char => {
    if (encoded.includes(char)) {
      const regex = new RegExp(char, "g");
      encoded = encoded.replace(regex, charsHashMap[char]);
    }
  })

  return encoded;
}
