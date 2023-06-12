const puppeteer = require("puppeteer");

export async function getGptChat(url) {
  if (url) {
    let ChatsWithGPT;
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setJavaScriptEnabled(true);
    await page.goto(url);

    let title = await page.evaluate(() => document.title);

    if (title === "404: This page could not be found") {
      return [];
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
    throw new Error("URL is NOT Valid");
  }
}

export function countWords(arr) {
  let tcount = 0;
  for (let i = 0; i < arr.length; i++) {
    let qusAns = arr[i];
    let qwordCount = qusAns.question.split(" ").length;
    let awordCount = qusAns.answer.split(" ").length;
    tcount = tcount + qwordCount + awordCount;
  }

  return tcount;
}