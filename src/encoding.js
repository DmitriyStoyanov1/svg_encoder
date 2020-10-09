
export default function encoding(value) {

  function addUrl(value) {
    if (!value.includes(`http://www.w3.org/2000/svg`)) {
        let url = "http://www.w3.org/2000/svg"
        value = value.replace(/<svg/g, `<svg xmlns='${url}'`)
    }
    return value
    }

    let currentFileWithUrl = addUrl(value)
    let encoded = encodeURIComponent(currentFileWithUrl)

    if (encoded.includes('%3D')) {
    encoded = encoded.replace(/%3D/g, '=')
    }
    if (encoded.includes('%22')) {
    encoded = encoded.replace(/%22/g, "'")
    }
    if (encoded.includes('%20')) {
    encoded = encoded.replace(/%20/g, ' ')
    }
    if (encoded.includes('%3A')) {
    encoded = encoded.replace(/%3A/g, ':')
    }
    if (encoded.includes('%2F')) {
    encoded = encoded.replace(/%2F/g, '/')
    }
    if (encoded.includes('%0A')) {
    encoded = encoded.replace(/%0A/g, '')
    }

    return encoded
}
