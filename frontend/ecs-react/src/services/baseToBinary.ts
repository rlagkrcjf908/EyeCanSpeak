export const base64ToBinary = (base64String: string) => {
  var keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  var binaryString = "";

  for (var i = 0; i < base64String.length; i += 4) {
    var char1 = keyStr.indexOf(base64String.charAt(i));
    var char2 = keyStr.indexOf(base64String.charAt(i + 1));
    var char3 = keyStr.indexOf(base64String.charAt(i + 2));
    var char4 = keyStr.indexOf(base64String.charAt(i + 3));

    var byte1 = (char1 << 2) | (char2 >> 4);
    var byte2 = ((char2 & 15) << 4) | (char3 >> 2);
    var byte3 = ((char3 & 3) << 6) | char4;

    binaryString += String.fromCharCode(byte1);

    if (char3 !== 64) {
      binaryString += String.fromCharCode(byte2);
    }
    if (char4 !== 64) {
      binaryString += String.fromCharCode(byte3);
    }
  }

  return binaryString;
}
