
import * as pinyin from 'pinyin';

export function String2PinYin(str: string): string {
  const convertedPinyin = pinyin(str, {
    style: pinyin.STYLE_NORMAL,
  });

  let out = '';

  for (const item of convertedPinyin) {
    out = out ? `${out}_${item[0]}` : item[0];
  }

  return out;
}