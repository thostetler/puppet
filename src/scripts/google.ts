import fs from 'fs';
import path from 'path';
import { connect } from '../connect';
const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');
const URL = 'https://google.com';
export const run = async () => {
  const browser = await connect();
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 1800 });
  await page.goto(URL, { waitUntil: 'networkidle2' });
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR);
  }
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, 'google.png'),
  });

  await browser.close();
};
