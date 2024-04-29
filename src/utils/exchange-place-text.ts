export function exchangePlaceText(placeText: string) {
  const replaceText = placeText.split(/[ ,、]/);
  return replaceText[2];
}
