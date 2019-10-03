import { Controller } from 'egg';
import path from 'path';
import { fs, pump, hash } from '@fsba/bigface';
import moment from 'moment';
import { genValidateCode } from '../utils/mbcrypt';
import { request, summary, tag, body } from '@fsba/egg-wrapper';

const isDir = async (path: string) => {
  try {
    const stat = await fs.lstat(path);
    return stat.isDirectory();
  } catch (e) {
    // pump()
    return false;
  }
}

const getExt = (filename: string) => {
  const filenames = filename.split('.');
  return filenames[filenames.length - 1];
}


export default class FileController extends Controller {

  @request('post', '/file/upload')
  @summary('上传文件, 通过multipart方式批量上传, 返回值中的 「 lookpath 」 是资源显示地址')
  @tag('文件模块')
  @body({
    files: {
      type: 'array',
      description: '文件数组，子项是二进制数据',
      itemType: 'string',
    },
  })
  async upload() {
    const { ctx } = this;
    const parts = ctx.multipart();
    const files: Array<{
      filename?: string;
      absFilename?: string;
      originalFilename?: string;
      lookpath?: string;
      sign?: string;
    }> = [];

    let stream;

    while ((stream = await parts()) != null) {
      const filename = stream.filename.toLowerCase();
      const lookpath = `/public/${moment().format('YYYY-MM-DD')}`;
      const filepath = `app/${lookpath}`;
      
      if (!(await isDir(filepath))) {
        await fs.mkdir(filepath);
      }

      const savedFilename = path.join(filepath, `${hash.sha1(`${filename}_${genValidateCode()}`, 'hex')}.${getExt(filename)}`);
      const target = path.join(this.config.baseDir, savedFilename);
      const writeStream = fs.createWriteStream(target);
      
      await pump(stream, writeStream);
      files.push({
        filename: savedFilename,
        absFilename: target,
        lookpath,
        originalFilename: filename,
      });
    }

    for (const file of files) {
      const sign = await hash.md5File(file.absFilename);
      file.sign = sign;
    }

    const filesObject = await ctx.model.File.create(files);

    ctx.body = {
      files: filesObject,
    }
  }
}