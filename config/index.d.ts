import { Context, PowerPartial, EggAppConfig } from 'egg';

interface BizConfig {
  version?: string;
  sourceUrl?: string;
  jwt?: {
    match?:(ctx: Context) => any;
  };
  auth?:{
    exclude?:Array<string>,
  };
  alicloud?: {
    accessID?: string;
    accessSecret?: string;
  };
}

type MeYupConfig = PowerPartial<EggAppConfig & BizConfig>