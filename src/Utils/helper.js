export function isRetinaDisplay() {
  if (window.matchMedia) {
    // leave all browsers here for future
    const mq = window.matchMedia('only screen and (min--moz-device-pixel-ratio: 1.3), only screen and (-o-min-device-pixel-ratio: 2.6/2), only screen and (-webkit-min-device-pixel-ratio: 1.3), only screen  and (min-device-pixel-ratio: 1.3), only screen and (min-resolution: 1.3dppx)');
    return (mq && mq.matches) || (window.devicePixelRatio > 1);
  }
  return false;
}

export function extractIframe(str, url, label) {
  return str.replace(/(<iframe.*?>.*?<\/iframe>)/g, `<a href="${url}">${label}</a>`);
}

export function getIframeUrl(str) {
  const matStr = str.match(/(<iframe.*?>.*?<\/iframe>)/);
  const str1 = matStr[0];
  console.log('str1 ' + str1);

  const urlArray = str1.match(/(src=\".*?")/g);
  const url = urlArray[0].split('"');
  console.log(url ? url.length : '-');
  return url[1];
}

export function getImageSrc(url) {
  if (url && url !== 'null') {
    return url;
  }
  return null;
//   else if (isRetinaDisplay()) {
//     return 'android_asset/www/assets/noImageRetina.png';
//   } else {
//     return 'android_asset/www/assets/noImage.png';
//   }
}
