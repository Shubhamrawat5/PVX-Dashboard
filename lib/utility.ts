import { IncomingMessage } from 'http';

class Utility {
  apiPath = (req: IncomingMessage, url: string) => {
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const fullUrl = `${protocol}://${host}/api${url}`;
    return fullUrl;
  };

  capitalize = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
}
const util = new Utility();

export default util;
