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
          { text: 'Docker部署', link: '/Week 02/Docker部署' },
          { text: '测试用例的设计方法', link: '/Week 02/测试用例的设计方法' }
        ]
      },
      {
        text: 'Week 03',
        items: [
          { text: 'MySql', link: '/Week 03/MySql' }
        ]
      },
      {
        text: 'Week 04',
        items: [
          { text: 'Git版本控制', link: '/Week 04/Git' },
          { text: 'Web开发基础', link: '/Week 04/web' }
        ]
      },
      {
        text: 'Week 05',
        items: [
          { text: 'Python基础', link: '/Week 05/Python' }
        ]
      },
      {
        text: 'Week 06',
        items: [
          { text: 'Unittest', link: '/Week 06/Unittest' },
          { text: 'Selenium', link: '/Week 06/Selenium' }
        ]
      },
      {
        text: 'Week 07',
        items: [
          { text: 'web相关', link: '/Week 07/web' }
        ]
      },
      {
        text: 'Week 08',
        items: [
          { text: 'postman接口测试', link: '/Week 08/interface' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lliangzii/Become-a-Software-Tester' }
    ]

  }
})
