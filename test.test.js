
const webdriver = require('webdriverio');

const SURFWAX_URL = 'http://default@sw.yandex-team.ru:80/v0';

// таймаут теста
jest.setTimeout(90000);

it('показыват проблему с преждевременным закрытием сессий', async() => {
    const capabilities = {
        browserName: 'chrome',
        browserVersion: '91.0',
        'selenoid:options': {
            enableVideo: true,
            // таймаут селеноида, если его поднять - все начинает работать (дефолтный 1m) 
            sessionTimeout: '10m',
        },
    };

    const gridUrl = new URL(SURFWAX_URL);

    const options = {
        protocol: gridUrl.protocol.replace(':', ''),
        hostname: `${gridUrl.username}@${gridUrl.hostname}`,
        port: parseInt(gridUrl.port, 10) || 80,
        queryParams: Object.fromEntries(gridUrl.searchParams),
        path: gridUrl.pathname,
        capabilities,
        automationProtocol: 'webdriver',
        logLevel: 'info',
    };

    const browser = await webdriver.remote(options);
    const puppeteerInstanse = await browser.getPuppeteer();

    const page = await puppeteerInstanse.newPage();
    await page.goto('https://yandex.ru/');

    await page.waitFor(35000);

    await page.goto('https://google.com/');

    await page.waitFor(35000);

    await page.goto('https://mail.ru/');

    await puppeteerInstanse.disconnect();

    await browser.deleteSession();

    console.log('logs: https://sw.yandex-team.ru/log/' + browser.sessionId)
    console.log('video: https://sw.yandex-team.ru/video/' + browser.sessionId)

    expect(true).toBe(true);
})