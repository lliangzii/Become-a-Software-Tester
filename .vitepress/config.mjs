import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/Become-a-Software-Tester/",
  title: "测试工程师笔记",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Examples', link: '/markdown-examples' }
    ],

    sidebar: [
      {
        text: 'Week 01',
        items: [
          { text: 'windows命令提示符', link: '/Week 01/windows命令提示符' },
          { text: '软件测试概论（一）', link: '/Week 01/软件测试概论（一）' },
          { text: '软件测试概论（二）', link: '/Week 01/软件测试概论（二）' },
          { text: 'Linux基本操作（一）', link: '/Week 01/Linux基本操作（一）' },
          { text: 'Linux基本操作（二）', link: '/Week 01/Linux基本操作（二）' },
        ]
      },
      {
        text: 'Week 02',
        items: [
          { text: 'Markdown Examples', link: '/markdown-examples' },
          { text: 'Runtime API Examples', link: '/api-examples' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
