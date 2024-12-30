import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: "/Become-a-Software-Tester/",
  title: "测试工程师笔记",
  description: "A VitePress Site",
  themeConfig: {
    outlineTitle: "大纲",
    outline: [2, 6],
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
          { text: '软件测试概论', link: '/Week 01/软件测试概论' },
          { text: 'Linux基本操作', link: '/Week 01/Linux基本操作' }
        ]
      },
      {
        text: 'Week 02',
        items: [
          { text: 'LinuxShell', link: '/Week 02/LinuxShell' },
          { text: 'Docker部署', link: '/Week 02/Docker部署' },
          { text: '测试用例的设计方法', link: '/Week 02/测试用例的设计方法' }
        ]
      },
      {
        text: 'Week 03',
        items: [
          { text: 'MySql', link: '/Week 03/MySql' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lliangzii/Become-a-Software-Tester' }
    ]

  }
})
