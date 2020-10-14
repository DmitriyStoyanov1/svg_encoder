export default function formatForCss(code) {
  if(code === '') {
    return '';
  }

  return `background-image: url("data:image/svg+xml,${code}")`;
}