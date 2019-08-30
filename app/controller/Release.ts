import { Controller } from 'egg';
import yaml from 'js-yaml';
// import * as fs from 'fs';
import req from 'request';

function readRemoteYaml(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    try {
      req.get(url, (error, response, body) => {
        console.log(body, 'body');
        if (!error && response.statusCode == 200) {
          resolve(body);
        } else {
          resolve('');
        }
      });
    } catch(e) {
      reject(e);
    }
  });

  
} 

class ReleaseController extends Controller {
  async info() {
    const { ctx } = this;
    // ctx.is()
    const userAgent = ctx.headers['user-agent'] as string;
    let os = null;
    if (userAgent.indexOf('Mac') > 0) {
      os = 'mac';
    }

    if (userAgent.indexOf('Windows') > 0) {
      os = 'win';
    }

    let filename = 'latest.yml';
    let url = '';
    if (os === 'mac') {
      filename = 'latest-mac.yml';  
    }
    let docBody = await readRemoteYaml(`http://release.meyup.io/store/${filename}`);
    const doc = yaml.safeLoad(docBody);
    
    if (os === 'mac') {
      if (doc.files[1]) {
        url = doc.files[1].url;
      }
    }

    if (os === 'win') {
      if (doc.files[0]) {
        url = doc.files[0].url;
      }
    }
    
    const path = `http://release.meyup.io/store/${url}`;
    
    ctx.redirect(path);
  }
}

export default ReleaseController;