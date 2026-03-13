const puppeteer = require('puppeteer');
const path = require('path');

(async () => {
  try {
    console.log('正在启动浏览器...');
    // 关键修复：在服务器环境中必须添加 --no-sandbox 和 --disable-setuid-sandbox
    const browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] 
    });
    
    const page = await browser.newPage();
    
    // 读取本地的 index.html 文件
    const filePath = `file:${path.join(__dirname, 'index.html')}`;
    console.log(`正在打开页面: ${filePath}`);
    await page.goto(filePath, { waitUntil: 'networkidle0' });

    console.log('正在生成 PDF...');
    // 导出为 PDF
    await page.pdf({
      path: 'Proposal.pdf', 
      format: 'A4',         
      landscape: true,      
      printBackground: true 
    });

    await browser.close();
    console.log('🎉 PDF 生成成功！');
  } catch (error) {
    console.error('❌ 生成 PDF 时发生错误:', error);
    process.exit(1); // 让 GitHub Actions 知道任务失败了
  }
})();
