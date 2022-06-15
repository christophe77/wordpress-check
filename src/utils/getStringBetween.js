/**
 * Parses substring between given begin string and end string.
 * @param beginString the begin string
 * @param endString the end string
 * @param originalString the original string
 * @returns the substring or null if either tag is not found
 */
function getStringBetween(beginString, endString, originalString) {
  const beginIndex = originalString.indexOf(beginString);
  if (beginIndex === -1) {
    return null;
  }
  const beginStringLength = beginString.length;
  const substringBeginIndex = beginIndex + beginStringLength;
  const substringEndIndex = originalString.indexOf(
    endString,
    substringBeginIndex
  );
  if (substringEndIndex === -1) {
    return null;
  }
  return originalString.substring(substringBeginIndex, substringEndIndex);
}

module.exports = getStringBetween;
