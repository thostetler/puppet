import fs from 'fs';
import path from 'path';
import { Page } from 'puppeteer';

const SCREENSHOT_DIR = path.join(__dirname, 'screenshots');

export const takeScreenshot = async (page: Page, name: string) => {
  await page.waitForTimeout(2000);
  if (!fs.existsSync(SCREENSHOT_DIR)) {
    fs.mkdirSync(SCREENSHOT_DIR);
  }
  await page.screenshot({
    path: path.join(SCREENSHOT_DIR, `${name}.png`),
  });
};
