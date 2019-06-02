import { Context, PowerPartial, EggAppConfig } from 'egg';

interface BizConfig {
  sourceUrl?: string;
    // auth,
  jwt?: {
    // secret?:string;
    // enable?:boolean;
    match?:(ctx: Context) => any;
  };
  auth?:{
    exclude?:Array<string>,
  };
}

type MeYupConfig = PowerPartial<EggAppConfig & BizConfig>