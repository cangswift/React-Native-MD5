/**
 *
 *
 * @providesModule FlyMD5
 * @flow
 *
 */
'use strict';
const FlyMD5 = {

  /*
  * Add integers, wrapping at 2^32. This uses 16-bit operations internally
  * to work around bugs in some JS interpreters.
  */
 safeAdd: (x, y) => {
    var lsw = (x & 0xFFFF) + (y & 0xFFFF)
    var msw = (x >> 16) + (y >> 16) + (lsw >> 16)
    return (msw << 16) | (lsw & 0xFFFF)
  },

  /*
  * Bitwise rotate a 32-bit number to the left.
  */
 bitRotateLeft: (num, cnt) => {
    return (num << cnt) | (num >>> (32 - cnt))
  },

  /*
  * These functions implement the four basic operations the algorithm uses.
  */
  md5cmn: (q, a, b, x, s, t) => {
    return FlyMD5.safeAdd(FlyMD5.bitRotateLeft(FlyMD5.safeAdd(FlyMD5.safeAdd(a, q), FlyMD5.safeAdd(x, t)), s), b)
  },
  md5ff: (a, b, c, d, x, s, t) => {
    return FlyMD5.md5cmn((b & c) | ((~b) & d), a, b, x, s, t)
  },
  md5gg: (a, b, c, d, x, s, t) => {
    return FlyMD5.md5cmn((b & d) | (c & (~d)), a, b, x, s, t)
  },
  md5hh: (a, b, c, d, x, s, t) => {
    return FlyMD5.md5cmn(b ^ c ^ d, a, b, x, s, t)
  },
  md5ii: (a, b, c, d, x, s, t) => {
    return FlyMD5.md5cmn(c ^ (b | (~d)), a, b, x, s, t)
  },

  /*
  * Calculate the MD5 of an array of little-endian words, and a bit length.
  */
 binlMD5: (x, len) => {
    /* append padding */
    x[len >> 5] |= 0x80 << (len % 32)
    x[(((len + 64) >>> 9) << 4) + 14] = len

    var i
    var olda
    var oldb
    var oldc
    var oldd
    var a = 1732584193
    var b = -271733879
    var c = -1732584194
    var d = 271733878

    for (i = 0; i < x.length; i += 16) {
      olda = a
      oldb = b
      oldc = c
      oldd = d

      a = FlyMD5.md5ff(a, b, c, d, x[i], 7, -680876936)
      d = FlyMD5.md5ff(d, a, b, c, x[i + 1], 12, -389564586)
      c = FlyMD5.md5ff(c, d, a, b, x[i + 2], 17, 606105819)
      b = FlyMD5.md5ff(b, c, d, a, x[i + 3], 22, -1044525330)
      a = FlyMD5.md5ff(a, b, c, d, x[i + 4], 7, -176418897)
      d = FlyMD5.md5ff(d, a, b, c, x[i + 5], 12, 1200080426)
      c = FlyMD5.md5ff(c, d, a, b, x[i + 6], 17, -1473231341)
      b = FlyMD5.md5ff(b, c, d, a, x[i + 7], 22, -45705983)
      a = FlyMD5.md5ff(a, b, c, d, x[i + 8], 7, 1770035416)
      d = FlyMD5.md5ff(d, a, b, c, x[i + 9], 12, -1958414417)
      c = FlyMD5.md5ff(c, d, a, b, x[i + 10], 17, -42063)
      b = FlyMD5.md5ff(b, c, d, a, x[i + 11], 22, -1990404162)
      a = FlyMD5.md5ff(a, b, c, d, x[i + 12], 7, 1804603682)
      d = FlyMD5.md5ff(d, a, b, c, x[i + 13], 12, -40341101)
      c = FlyMD5.md5ff(c, d, a, b, x[i + 14], 17, -1502002290)
      b = FlyMD5.md5ff(b, c, d, a, x[i + 15], 22, 1236535329)

      a = FlyMD5.md5gg(a, b, c, d, x[i + 1], 5, -165796510)
      d = FlyMD5.md5gg(d, a, b, c, x[i + 6], 9, -1069501632)
      c = FlyMD5.md5gg(c, d, a, b, x[i + 11], 14, 643717713)
      b = FlyMD5.md5gg(b, c, d, a, x[i], 20, -373897302)
      a = FlyMD5.md5gg(a, b, c, d, x[i + 5], 5, -701558691)
      d = FlyMD5.md5gg(d, a, b, c, x[i + 10], 9, 38016083)
      c = FlyMD5.md5gg(c, d, a, b, x[i + 15], 14, -660478335)
      b = FlyMD5.md5gg(b, c, d, a, x[i + 4], 20, -405537848)
      a = FlyMD5.md5gg(a, b, c, d, x[i + 9], 5, 568446438)
      d = FlyMD5.md5gg(d, a, b, c, x[i + 14], 9, -1019803690)
      c = FlyMD5.md5gg(c, d, a, b, x[i + 3], 14, -187363961)
      b = FlyMD5.md5gg(b, c, d, a, x[i + 8], 20, 1163531501)
      a = FlyMD5.md5gg(a, b, c, d, x[i + 13], 5, -1444681467)
      d = FlyMD5.md5gg(d, a, b, c, x[i + 2], 9, -51403784)
      c = FlyMD5.md5gg(c, d, a, b, x[i + 7], 14, 1735328473)
      b = FlyMD5.md5gg(b, c, d, a, x[i + 12], 20, -1926607734)

      a = FlyMD5.md5hh(a, b, c, d, x[i + 5], 4, -378558)
      d = FlyMD5.md5hh(d, a, b, c, x[i + 8], 11, -2022574463)
      c = FlyMD5.md5hh(c, d, a, b, x[i + 11], 16, 1839030562)
      b = FlyMD5.md5hh(b, c, d, a, x[i + 14], 23, -35309556)
      a = FlyMD5.md5hh(a, b, c, d, x[i + 1], 4, -1530992060)
      d = FlyMD5.md5hh(d, a, b, c, x[i + 4], 11, 1272893353)
      c = FlyMD5.md5hh(c, d, a, b, x[i + 7], 16, -155497632)
      b = FlyMD5.md5hh(b, c, d, a, x[i + 10], 23, -1094730640)
      a = FlyMD5.md5hh(a, b, c, d, x[i + 13], 4, 681279174)
      d = FlyMD5.md5hh(d, a, b, c, x[i], 11, -358537222)
      c = FlyMD5.md5hh(c, d, a, b, x[i + 3], 16, -722521979)
      b = FlyMD5.md5hh(b, c, d, a, x[i + 6], 23, 76029189)
      a = FlyMD5.md5hh(a, b, c, d, x[i + 9], 4, -640364487)
      d = FlyMD5.md5hh(d, a, b, c, x[i + 12], 11, -421815835)
      c = FlyMD5.md5hh(c, d, a, b, x[i + 15], 16, 530742520)
      b = FlyMD5.md5hh(b, c, d, a, x[i + 2], 23, -995338651)

      a = FlyMD5.md5ii(a, b, c, d, x[i], 6, -198630844)
      d = FlyMD5.md5ii(d, a, b, c, x[i + 7], 10, 1126891415)
      c = FlyMD5.md5ii(c, d, a, b, x[i + 14], 15, -1416354905)
      b = FlyMD5.md5ii(b, c, d, a, x[i + 5], 21, -57434055)
      a = FlyMD5.md5ii(a, b, c, d, x[i + 12], 6, 1700485571)
      d = FlyMD5.md5ii(d, a, b, c, x[i + 3], 10, -1894986606)
      c = FlyMD5.md5ii(c, d, a, b, x[i + 10], 15, -1051523)
      b = FlyMD5.md5ii(b, c, d, a, x[i + 1], 21, -2054922799)
      a = FlyMD5.md5ii(a, b, c, d, x[i + 8], 6, 1873313359)
      d = FlyMD5.md5ii(d, a, b, c, x[i + 15], 10, -30611744)
      c = FlyMD5.md5ii(c, d, a, b, x[i + 6], 15, -1560198380)
      b = FlyMD5.md5ii(b, c, d, a, x[i + 13], 21, 1309151649)
      a = FlyMD5.md5ii(a, b, c, d, x[i + 4], 6, -145523070)
      d = FlyMD5.md5ii(d, a, b, c, x[i + 11], 10, -1120210379)
      c = FlyMD5.md5ii(c, d, a, b, x[i + 2], 15, 718787259)
      b = FlyMD5.md5ii(b, c, d, a, x[i + 9], 21, -343485551)

      a = FlyMD5.safeAdd(a, olda)
      b = FlyMD5.safeAdd(b, oldb)
      c = FlyMD5.safeAdd(c, oldc)
      d = FlyMD5.safeAdd(d, oldd)
    }
    return [a, b, c, d]
  },

  /*
  * Convert an array of little-endian words to a string
  */
 binl2rstr: (input) =>{
    var i
    var output = ''
    var length32 = input.length * 32
    for (i = 0; i < length32; i += 8) {
      output += String.fromCharCode((input[i >> 5] >>> (i % 32)) & 0xFF)
    }
    return output
  },

  /*
  * Convert a raw string to an array of little-endian words
  * Characters >255 have their high-byte silently ignored.
  */
 rstr2binl: (input) =>{
    var i
    var output = []
    output[(input.length >> 2) - 1] = undefined
    for (i = 0; i < output.length; i += 1) {
      output[i] = 0
    }
    var length8 = input.length * 8
    for (i = 0; i < length8; i += 8) {
      output[i >> 5] |= (input.charCodeAt(i / 8) & 0xFF) << (i % 32)
    }
    return output
  },

  /*
  * Calculate the MD5 of a raw string
  */
 rstrMD5: (s) =>{
    return FlyMD5.binl2rstr(FlyMD5.binlMD5(FlyMD5.rstr2binl(s), s.length * 8))
  },

  /*
  * Calculate the HMAC-MD5, of a key and some data (raw strings)
  */
 rstrHMACMD5: (key, data) =>{
    var i
    var bkey = rstr2binl(key)
    var ipad = []
    var opad = []
    var hash
    ipad[15] = opad[15] = undefined
    if (bkey.length > 16) {
      bkey = binlMD5(bkey, key.length * 8)
    }
    for (i = 0; i < 16; i += 1) {
      ipad[i] = bkey[i] ^ 0x36363636
      opad[i] = bkey[i] ^ 0x5C5C5C5C
    }
    hash = binlMD5(ipad.concat(rstr2binl(data)), 512 + data.length * 8)
    return binl2rstr(binlMD5(opad.concat(hash), 512 + 128))
  },

  /*
  * Convert a raw string to a hex string
  */
 rstr2hex: (input) =>{
    var hexTab = '0123456789abcdef'
    var output = ''
    var x
    var i
    for (i = 0; i < input.length; i += 1) {
      x = input.charCodeAt(i)
      output += hexTab.charAt((x >>> 4) & 0x0F) +
      hexTab.charAt(x & 0x0F)
    }
    return output
  },

  /*
  * Encode a string as utf-8
  */
 str2rstrUTF8: (input) => {
    return unescape(encodeURIComponent(input))
  },

  /*
  * Take string arguments and return either raw or hex encoded strings
  */
 rawMD5: (s) =>{
    return FlyMD5.rstrMD5(FlyMD5.str2rstrUTF8(s))
  },
 hexMD5: (s) =>{
    return FlyMD5.rstr2hex(FlyMD5.rawMD5(s))
  },
 rawHMACMD5: (k, d) =>{
    return FlyMD5.rstrHMACMD5(FlyMD5.str2rstrUTF8(k), FlyMD5.str2rstrUTF8(d))
  },
 hexHMACMD5: (k, d) =>{
    return FlyMD5.rstr2hex(rawHMACMD5(k, d))
  },

   md5: (string, key, raw) =>{
    if (!key) {
      if (!raw) {
        return FlyMD5.hexMD5(string)
      }
      return FlyMD5.rawMD5(string)
    }
    if (!raw) {
      return FlyMD5.hexHMACMD5(key, string)
    }
    return FlyMD5.rawHMACMD5(key, string)
  }
}

  module.exports = FlyMD5;
