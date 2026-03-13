// generate-pdf.js
// 这个脚本使用 puppeteer (一个无头浏览器) 来打开你的 HTML 并保存为 PDF
const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  // 启动浏览器
  const browser = await puppeteer.launch({ headless: "new" });
  const page = await browser.newPage();
  
  // 读取本地的 index.html 文件
  const filePath = `file:${path.join(__dirname, 'index.html')}`;
  await page.goto(filePath, { waitUntil: 'networkidle0' });

  // 导出为 PDF
  await page.pdf({
    path: 'Proposal.pdf', // 输出的文件名
    format: 'A4',         // 纸张大小
    landscape: true,      // 横向排版（因为我们的幻灯片是横向的）
    printBackground: true // 打印背景颜色和图片
  });

  await browser.close();
  console.log('PDF 生成成功！');
})();
