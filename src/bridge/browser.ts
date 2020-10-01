import { remote } from 'electron';
const { BrowserWindow } = remote;

export async function openGetTokenWindow(url: string, inject: string) {
  const browser = new BrowserWindow({
    width: 400,
    height: 300,
    show: true,
    webPreferences: {
      nodeIntegration: true,
    //   preload: inject
    }
  });

  browser.webContents.openDevTools();

  await browser.loadURL(url);

  browser.webContents.executeJavaScript(inject).then(() => {
    console.log('execute finished');
  });

  browser.webContents.session.webRequest.onCompleted({
    urls: [
      'https://juejin.im/passport/web/sms_login/?account_sdk_source=web',
    ],
  }, details => {
    browser.webContents.send('intercept-request', details);
  })
}
