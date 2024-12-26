import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/Become-a-Software-Tester/",
  title: "测试工程师笔记",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: 'Home', link: '/' }
    ],

    sidebar: [
      {
        text: 'preface',
        items: [
          { text: '前言', link: '/preface/前言' }
        ]
      },
      {
        text: 'Week 01',
        items: [
          { text: 'windows命令提示符', link: '/Week 01/windows命令提示符' },
          { text: '软件测试概论-01', link: '/Week 01/软件测试概论-01' },
          { text: '软件测试概论-02', link: '/Week 01/软件测试概论-02' },
          { text: 'Linux基本操作-01', link: '/Week 01/Linux基本操作-01' },
          { text: 'Linux基本操作-02', link: '/Week 01/Linux基本操作-02' },
        ]
      },
      {
        text: 'Week 02',
        items: [
          { text: 'LinuxShell', link: '/Week 02/LinuxShell' },
          { text: 'Docker部署', link: '/Week 02/Docker部署' },
          { text: '测试用例的设计方法-01', link: '/Week 02/测试用例的设计方法-01' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lliangzii/Become-a-Software-Tester' }
    ]
  }
})
