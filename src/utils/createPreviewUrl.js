export default function createPreviewUrl(code) {
  return `url("data:image/svg+xml,${code}")`;
}