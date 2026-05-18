const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const router = express.Router(); // 페이지 분리

router.get("/", async (req, res) => {
  const { keyword } = req.query;

  const d = await axios({
    url: `https://openapi.naver.com/v1/search/news.json?query=${keyword}&display=8&start=1&sort=sim`,
    method: "get",
    headers: {
      "X-Naver-Client-Id": "hV_eKUr6c3hYtjKC5QEw",
      "X-Naver-Client-Secret": "QVR_7acAre",
    },
  });
  const newsList = d.data.items;
  const results = await Promise.all(
    newsList.map(async (item) => {
      const res = await axios.get(item.link, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
        },
      });
      const $ = cheerio.load(res.data);

      return {
        ...item,
        image: $('meta[property="og:image"]').attr("content") || null,
      };
    }),
  );

  res.send(results);
});

router.get("/detail", async (req, res) => {
  const result = await axios.get(
    "https://www.junggi.co.kr/news/articleView.html?idxno=36448",
    {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
      },
    },
  );
  const $ = cheerio.load(result.data);

  const title = $('meta[property="og:title"]').attr("content");
  const image = $('meta[property="og:image"]').attr("content");

  const selectors = [
    "#dic_area",
    "#newsct_article",
    "#articleBodyContents",
    ".article_body",
    ".article-body",
    ".article_view",
    ".news_end",
  ];

  let content = "";

  for (const selector of selectors) {
    const text = $(selector).text().trim();

    if (text.length > 200) {
      content = text;
      break;
    }
  }

  res.json({
    title,
    image,
    content,
  });
});

module.exports = router;
