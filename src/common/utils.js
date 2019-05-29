/**
 * 分转元
 * @param money 钱
 * @param bit 保留几位小数，默认不保留
 * @returns {*}
 */
exports.centToChief = function (money, bit) {
  if (!money) {
    return 0.00;
  }
  if (!bit) {
    bit = 0;
  }

  const decimal = money / 100 - Math.floor(money / 100);
  if (decimal > 0 && decimal < 1) {
    bit = 2;
  }
  return Number(money * 1.0 / 100).toFixed(bit);
};


/**
 * 去掉字符串空格
 * @param str
 * @returns {string}
 */
exports.trim = function (str) {
  str += "";
  return str.replace(/(^\s*)|(\s*$)/g, "");
};
