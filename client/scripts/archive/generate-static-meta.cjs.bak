const fs = require('fs')
const path = require('path')

const distDir = path.join(__dirname, '..', 'dist')
const indexPath = path.join(distDir, 'index.html')

if (!fs.existsSync(indexPath)) {
  console.error('dist/index.html not found. Run vite build first.')
  process.exit(1)
}

const baseHtml = fs.readFileSync(indexPath, 'utf8')

const pages = [
  {
    route: '',
    title: 'StrangerMeet — Talk to Strangers, Not Servers',
    description: 'StrangerMeet is an adults-only anonymous text chat platform for simple, private, and respectful conversations with strangers online.',
    h1: 'StrangerMeet',
    content: 'StrangerMeet is an adults-only anonymous text chat platform for simple, private, and respectful conversations with strangers online.'
  },
  {
    route: 'about',
    title: 'About Us — StrangerMeet',
    description: 'Learn about StrangerMeet, an adults-only anonymous text chat platform focused on simple, private, and respectful conversations.',
    h1: 'About Us',
    content: 'StrangerMeet is an adults-only anonymous text chat platform designed for simple, private, and respectful online conversations.'
  },
  {
    route: 'contact',
    title: 'Contact Us — StrangerMeet',
    description: 'Contact StrangerMeet for general questions, support, privacy concerns, and safety reports related to anonymous chat.',
    h1: 'Contact Us',
    content: 'Contact StrangerMeet for support, privacy questions, general website questions, and safety reports.'
  },
  {
    route: 'privacy-policy',
    title: 'Privacy Policy — StrangerMeet',
    description: 'Read the StrangerMeet Privacy Policy to understand how privacy, cookies, technical data, and user safety are handled.',
    h1: 'Privacy Policy',
    content: 'StrangerMeet Privacy Policy explains privacy, cookies, Google advertising disclosure, GDPR rights, CCPA rights, safety reports, and user data handling.'
  },
  {
    route: 'terms',
    title: 'Terms of Service — StrangerMeet',
    description: 'Read the StrangerMeet Terms of Service, including adults-only access, user responsibilities, prohibited behavior, and platform rules.',
    h1: 'Terms of Service',
    content: 'StrangerMeet Terms of Service explain adults-only access, user responsibilities, prohibited conduct, platform rules, and safe use of anonymous chat.'
  },
  {
    route: 'safety',
    title: 'Safety Guidelines — StrangerMeet',
    description: 'Learn safety guidelines for using StrangerMeet, including privacy protection, scam avoidance, reporting abuse, and respectful anonymous chatting.',
    h1: 'Safety Guidelines',
    content: 'StrangerMeet Safety Guidelines help users protect privacy, avoid scams, leave unsafe chats, and report abuse or harassment.'
  },
  {
    route: 'community-guidelines',
    title: 'Community Guidelines — StrangerMeet',
    description: 'Read StrangerMeet Community Guidelines for respectful behavior, safety rules, prohibited conduct, and reporting unsafe activity.',
    h1: 'Community Guidelines',
    content: 'StrangerMeet Community Guidelines explain respectful behavior, prohibited conduct, anti-harassment rules, and how to report unsafe activity.'
  },
  {
    route: 'cookie-policy',
    title: 'Cookie Policy — StrangerMeet',
    description: 'Learn how StrangerMeet may use cookies, analytics, advertising cookies, and browser controls to support website functionality and transparency.',
    h1: 'Cookie Policy',
    content: 'StrangerMeet Cookie Policy explains functional cookies, analytics cookies, advertising cookies, third-party vendors, and browser cookie controls.'
  },
  {
    route: 'advertising-disclosure',
    title: 'Advertising Disclosure — StrangerMeet',
    description: 'Read StrangerMeet Advertising Disclosure to understand where ads may appear, how advertising supports the platform, and how third-party ads may use cookies.',
    h1: 'Advertising Disclosure',
    content: 'StrangerMeet Advertising Disclosure explains where ads may appear, how advertising supports the platform, and how third-party advertising cookies may work.'
  },
  {
    route: 'blog',
    title: 'Blog — StrangerMeet',
    description: 'Read StrangerMeet blog articles about anonymous chat safety, online privacy, reporting abuse, digital wellbeing, and safer conversations online.',
    h1: 'StrangerMeet Blog',
    content: 'StrangerMeet Blog shares articles about anonymous chat safety, online privacy, reporting abuse, digital wellbeing, and safer conversations online.'
  },
  {
    route: 'blog/how-to-stay-safe-anonymous-chat',
    title: 'How to Stay Safe in Anonymous Chat — StrangerMeet',
    description: 'Learn practical safety tips for anonymous chat, including protecting your identity, avoiding scams, leaving unsafe conversations, and reporting abuse.',
    h1: 'How to Stay Safe in Anonymous Chat',
    content: 'Anonymous chat can be useful, but users should protect their identity, avoid suspicious links, leave unsafe conversations, and report harassment or abuse.'
  },
  {
    route: 'blog/online-privacy-tips-for-beginners',
    title: 'Online Privacy Tips for Beginners — StrangerMeet',
    description: 'Learn beginner-friendly online privacy tips including password safety, cookie control, link safety, browser settings, and reducing personal exposure.',
    h1: 'Online Privacy Tips for Beginners',
    content: 'Online privacy begins with sharing less, using strong passwords, avoiding suspicious links, controlling cookies, and protecting personal information online.'
  },
  {
    route: 'blog/what-is-ephemeral-messaging',
    title: 'What Is Ephemeral Messaging? — StrangerMeet',
    description: 'Understand ephemeral messaging, disappearing chats, temporary communication, and the privacy limits users should know before sharing information.',
    h1: 'What Is Ephemeral Messaging?',
    content: 'Ephemeral messaging means messages are temporary by design, but users should remember that screenshots, copying, or recording may still happen.'
  },
  {
    route: 'blog/how-to-report-online-harassment',
    title: 'How to Report Online Harassment — StrangerMeet',
    description: 'Learn how to report online harassment safely, what details to include, when to leave a chat, and how to protect your privacy while reporting abuse.',
    h1: 'How to Report Online Harassment',
    content: 'Online harassment should be handled by leaving unsafe conversations, saving necessary details, avoiding over-sharing, and reporting serious concerns.'
  },
  {
    route: 'blog/webrtc-explained',
    title: 'WebRTC Explained for Chat Users — StrangerMeet',
    description: 'Learn what WebRTC means for chat users, including real-time communication, browser permissions, IP exposure concerns, and privacy basics.',
    h1: 'WebRTC Explained for Chat Users',
    content: 'WebRTC is a browser technology for real-time communication, but users should understand permissions, network information, and privacy settings.'
  },
  {
    route: 'blog/vpn-for-anonymous-chat',
    title: 'Should You Use a VPN for Anonymous Chat? — StrangerMeet',
    description: 'Learn whether a VPN helps with anonymous chat privacy, what it can and cannot protect, and why user behavior matters most.',
    h1: 'Should You Use a VPN for Anonymous Chat?',
    content: 'A VPN can add a privacy layer, but it cannot protect users from voluntarily sharing personal details or clicking unsafe links.'
  },
  {
    route: 'blog/random-chat-mental-health',
    title: 'Random Chat and Mental Health — StrangerMeet',
    description: 'Learn how random chat can affect mental health, why time limits matter, and how to use anonymous chat in a balanced and safe way.',
    h1: 'Random Chat and Mental Health',
    content: 'Random chat can be entertaining, but users should set time limits, notice emotional effects, leave uncomfortable conversations, and seek real support when needed.'
  },
  {
    route: 'blog/omegle-alternatives-2026',
    title: 'Omegle Alternatives in 2026 — StrangerMeet',
    description: 'Explore what to look for in Omegle alternatives in 2026, including safety pages, privacy rules, reporting options, and text-only anonymous chat.',
    h1: 'Omegle Alternatives in 2026',
    content: 'A good Omegle alternative should balance simplicity, privacy, safety, clear rules, reporting options, and respectful anonymous chat.'
  }
]

function escapeHtml(str) {
  return String(str)
    .replaceAll('&', '&amp;')
    .replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
}

function makeHtml(page) {
  let html = baseHtml

  html = html.replace(/<title>.*?<\/title>/i, `<title>${escapeHtml(page.title)}</title>`)

  if (/<meta\s+name=["']description["'][^>]*>/i.test(html)) {
    html = html.replace(
      /<meta\s+name=["']description["'][^>]*>/i,
      `<meta name="description" content="${escapeHtml(page.description)}">`
    )
  } else {
    html = html.replace(
      /<title>.*?<\/title>/i,
      `<title>${escapeHtml(page.title)}</title>\n    <meta name="description" content="${escapeHtml(page.description)}">`
    )
  }

  const crawlableBlock = `
    <main id="static-crawl-content" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden;">
      <h1>${escapeHtml(page.h1)}</h1>
      <p>${escapeHtml(page.content)}</p>
    </main>
  `

  html = html.replace('<div id="root"></div>', `<div id="root"></div>${crawlableBlock}`)

  return html
}

for (const page of pages) {
  const html = makeHtml(page)

  if (page.route === '') {
    fs.writeFileSync(indexPath, html)
    console.log('Updated /index.html')
  } else {
    const dir = path.join(distDir, page.route)
    fs.mkdirSync(dir, { recursive: true })
    fs.writeFileSync(path.join(dir, 'index.html'), html)
    console.log(`Created /${page.route}/index.html`)
  }
}
