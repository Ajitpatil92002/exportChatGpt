let chrome = {};
let puppeteer;

if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
  chrome = require("chrome-aws-lambda");
  puppeteer = require("puppeteer-core");
} else {
  puppeteer = require("puppeteer");
}

export async function getGptChat(url) {
  if (url) {
    let options = {};

    if (process.env.AWS_LAMBDA_FUNCTION_VERSION) {
      options = {
        args: [...chrome.args, "--hide-scrollbars", "--disable-web-security"],
        defaultViewport: chrome.defaultViewport,
        executablePath: await chrome.executablePath,
        headless: true,
        ignoreHTTPSErrors: true,
      };
    }

    let ChatsWithGPT;
    const browser = await puppeteer.launch(options);
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(true);
    await page.goto(url);

    let title = await page.evaluate(() => document.title);

    if (title === "404: This page could not be found") {
      return new Error("Not Found");
    } else {
      ChatsWithGPT = await page.evaluate(() => {
        const OuterGroupDiv = Array.from(
          document.querySelectorAll(
            "#__next > div.overflow-hidden.w-full.h-full.relative.flex.z-0 > div > div > main > div.flex-1.overflow-hidden > div > div > div.group"
          )
        );

        let resultChats = [];

        for (let i = 0; i < OuterGroupDiv.length; i += 2) {
          const question = OuterGroupDiv[i]
            .querySelector("div > div:nth-child(2) > div > div")
            .innerText.toString();

          const answer = OuterGroupDiv[i + 1].querySelector(
            "div > div:nth-child(2) > div > div > div"
          ).innerHTML;

          resultChats.push({ question, answer });
        }

        return resultChats;
      });
    }

    await browser.close();

    return { title, ChatsWithGPT };
  } else {
    return new Error("Not Found");
  }
}

export function string_to_slug(str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "àáäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaeeeeiiiioooouuuunc------";
  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
}
