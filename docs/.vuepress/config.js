module.exports = {
  title: 'drawer',
  description: '如何写好一个组件实战',
  base: '/drawer/',
  head: [['link', { rel: 'icon', href: '/favicon.ico' }]],
  themeConfig: {
    repo: 'https://github.com/Liugq5713/drawer',
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    repoLabel: 'GitHub',
    docsDir: 'docs',
    docsBranch: 'master',
    editLinks: true,
    editLinkText: '帮助我修改页面',
    sidebar: ['doc', '/article', '/demo'],
    sidebarDepth: 2
  }
}
