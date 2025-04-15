/**
 * 给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能从 s 获得的 有效 IP 地址 。你可以按任何顺序返回答案。

有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。


示例 1：
  输入：s = "25525511135"
  输出：["255.255.11.135","255.255.111.35"]

示例 2：
  输入：s = "0000"
  输出：["0.0.0.0"]

示例 3：
  输入：s = "1111"
  输出：["1.1.1.1"]

示例 4：
  输入：s = "010010"
  输出：["0.10.0.10","0.100.1.0"]

示例 5：
  输入：s = "10203040"
  输出：["10.20.30.40","102.0.30.40","10.203.0.40"]
 */

/**
 * @param {string} s
 * @return {string[]}
 */
var restoreIpAddresses = function (s) {
  let res = [];
  helper(s, 0, [], res);
  console.log(res);
  // return res;
};

function helper(s, start, zuhe, res) {
  if (zuhe.length === 4) {
    if (start === s.length) {
      res.push(zuhe.slice().join('.'));
    }
    return;
  }

  //start不变，只是后面的id变化
  for (let i = start; i < s.length; i++) {
    let str = s.substring(start, i + 1);
    if (str[0] === '0' && str.length > 1) {
      break;
    }
    if (Number(str) > 255) {
      break;
    }
    zuhe.push(str);
    helper(s, i + 1, zuhe, res);
    zuhe.pop();
  }
}

// restoreIpAddresses('25525511135');

// restoreIpAddresses('0000');
// restoreIpAddresses('1100')
restoreIpAddresses('010010')
// restoreIpAddresses('1111');
// restoreIpAddresses('010010');
// restoreIpAddresses('10203040');