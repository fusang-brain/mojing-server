
import pinyin from 'pinyin';
import moment from 'moment';
import lodash from 'lodash';

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

export function genOrderNO() {
  const t = moment();
  
  const time = t.format('YYYYMMDDHHmmss');

  const body = Number(time) * 100000 + Number(lodash.uniqueId());

  return body;
}