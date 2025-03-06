const AUTO_MESSAGES = [{
        type: 'chat',
        message: `<div>

      <!-- Single Column Section -->
      <div class="panel">
        <h1 style="">Hi there. I am Nick.</h1>
        <p style="font-size: 1.1rem; margin-bottom: 20px; text-align: justify; line-height: 1.6;">Hello! I am <span style="font-weight: bold; color: #007BFF;">Nick</span>, a senior software solutions engineer. I specialize in creating innovative, fast, and beautiful solutions for organizations. I have a proven track record, including leading a product to market at <span style="font-weight: bold; color: #007BFF;">CISCO</span>. With a passion for doing things the right way, I am committed to delivering top-quality results. </p>
        <div style="max-width: 230px; margin-top: 20px;">
        <a target="_blank" href="/uploads/nick-rios-resume.pdf"  class="chat-link">
            <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24">
                <path fill="#dc3545" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z"/>
            </svg>
                Download Resume (PDF)
            </a></div>
      </div>`,
        buttons: ['Tell me about Nick', 'What are his strengths?', 'What is his favorite tech stack?'],
    }, {
        type: 'chat',
        message: `<div class="panel tabs">
        <div class="tab-header">
            <button class="tab-button active" data-tab="digital-harbor">Digital Harbor</button>
            <button class="tab-button" data-tab="cisco">CISCO</button>
            <button class="tab-button" data-tab="multiview">MultiView</button>
        </div>
<div class="tab-content">
<div class="tab-content-item" data-item="digital-harbor">

<h2 style="margin-top: 20px;">Job</h2>
<p><strong>Nick Rios</strong> served as a <strong>Team Lead</strong> and <strong>AI Developer</strong> at <em>Digital Harbor</em> from November 2020 until recently. He was team lead for two teams at <strong>Set Forms</strong>, a scalable WYSIWYG platform for form creation. His leadership was instrumental in multiple successful launches. Nick initiated and led an <strong>AI innovation team</strong> to integrate AI into core products, successfully implementing features like <em>chat</em>, <em>voice</em>, and <em>UI generation</em>.</p>

<p>He also developed <strong>AI-driven solutions</strong>, creating a <strong>prompt template manager</strong> that boosted service scalability and productivity. In addition to designing, promoting, then coding significant software changes, Nick fostered a culture of collaboration and shared responsibility. His team created company-wide shared libraries and online <strong>API tools</strong> helped reduce redundancy and streamline internal processes.</p>

<h2 style="margin-top: 20px;"><strong>Experience</strong></h2>
<p>
The <strong>set-forms team</strong> at DH is a pure innovation team. We designed and built tools to make web pages with. So we talked about <em>user experiences</em> a lot. We worked on next-gen components. But that is only half the coin. We also rendered the pages. Putting us in common with <strong>Webflow</strong> and <strong>Wix</strong>. <em>Beautiful by default</em> was one of our priorities.
</p>
<p>
When Nick started the <strong>AI team</strong>, they began with a bare-bones <strong>RAG</strong> using pure node.js. In that first version we used <em>OpenLlama</em> for document indexing. Later implemented <strong>Pinecone</strong> for vector search.
</p>


</div>
            <div class="tab-content-item" data-item="cisco">
                <h2>Job</h2>
                <p class="">At CISCO SYSTEMS I got to start a distributed system from the very beginning. We used ElasticSearch and node.js REST APIs to ingest ticketing data and customer premise UCS alarms. We built Angular dashboards on top of it for product support teams. I played a key role in leading team development, code quality and communication. I actually got to interview my local team. The team was eventually given a company-wide innovation award.</p>
                <h2>Experience</h2>
                <p>I was the first engineer to join the team. I was responsible for the initial design and implementation of the system. I also led the team in developing the Angular dashboards and the node.js REST APIs.</p>
            </div>
            <div class="tab-content-item" data-item="multiview">
                <h2>Tab 3</h2>
                <p>This is the content for Tab 3.</p>
            </div>
        </div>
        </div>`,
        options: []
    },
    {
        type: 'chat',
        message: `
      <!-- Two Columns Section -->
      <div style="display: flex; gap: 20px;">
        <div class="panel">
          <h2 style="font-size: 1.8rem; margin-bottom: 20px; color: #333;">Experience & Expertise</h2>
          <p style="font-size: 1.1rem; margin-bottom: 20px; text-align: justify; line-height: 1.6;">As a <span style="font-weight: bold; color: #007BFF;">full-stack developer</span>, I bring a wealth of experience to the table. I have a solid IT background and real-world design experience. I have a track record of success delivering world-class solutions for organizations.</p>
        </div>
        <div class="panel">
          <h2 style="font-size: 1.8rem; margin-bottom: 20px; color: #333;">Automation & AI</h2>
          <p style="font-size: 1.1rem; margin-bottom: 20px; text-align: justify; line-height: 1.6;">I am all in on automation and AI. I use <span style="font-weight: bold; color: #007BFF;">n8n</span> regularly and have recently built AI automations in <span style="font-weight: bold; color: #007BFF;">Node.js</span>, <span style="font-weight: bold; color: #007BFF;">Python</span>, and even <span style="font-weight: bold; color: #007BFF;">PHP</span>. These tools help me streamline processes and create solutions that drive real value.</p>
        </div>
      </div>

      <!-- Single Column Section -->
      <div class="">
        <h2 style="font-size: 1.8rem; margin-bottom: 20px; color: #333;">Try the "Start a Call" button to chat with my AI agent. </h2>
        <p style="font-size: 1.1rem; margin-bottom: 20px; text-align: justify; line-height: 1.6;">It uses ElevenLabs API and it\s not bad!</p>
      </div>

    </div>
    <p class="">I am seeking a company that embraces AI as a new part of their integrated systems. </p>
    `,
        options: [],
    },
    {
        type: 'chat',
        message: `<div class="row panel">
        <div class="col col-15" style="min-width: 130px; min-height: 130px;"><img src="https://picsum.photos/130/130" /></div>
        <div class="col col-80"><h3>User experiences should be intuitive and fast</h3> Reducing clicks and prioritizing core functionality is key to success. Great user experiences are stress-free.<BR><BR>
        Any ambiguity in the designs affects the code quality. Usability, alignment and consistency is our top priority. We put a lot of emphasis on consistent low-fidelity designs. And always keeping in mind simplicity is beautiful.</div>
        </div>`,
        options: []
    },
    {
        type: 'chat',
        message: '<div class="panel">Why spend all day doing something, when you could spend all month automating it?</div>',
        options: []
    },
    {
        type: 'chat',
        message: `<h2>Some of my AI content projects:</h2><div class="panel row">
        <ul class="col-50">
<li><a target="_blank" href="https://ai-delphi.com">ai-delphi.com</a></li>
<li><a target="_blank" href="https://ai-super-lizard.com">ai-super-lizard.com</a></li>
<li><a target="_blank" href="https://ai-webdev.com">ai-webdev.com</a></li>
<li><a target="_blank" href="https://ai-workflows.net">ai-workflows.net</a></li>
<li><a target="_blank" href="https://autocontentstudio.com">autocontentstudio.com</a></li>
<li><a target="_blank" href="https://backslash.cash">backslash.cash</a></li>
<li><a target="_blank" href="https://dollar-stocks.com">dollar-stocks.com</a></li>
<li><a target="_blank" href="https://promptgeometry.com">promptgeometry.com</a></li>
</ul>
<ul class="col-50">
<li><a target="_blank" href="https://fanfic-history.com">fanfic-history.com</a></li>
<li><a target="_blank" href="https://gizm0s.com">gizm0s.com</a></li>
<li><a target="_blank" href="https://hatsyshirtsy.com">hatsyshirtsy.com</a></li>
<li><a target="_blank" href="https://loikos.com">loikos.com</a></li>
<li><a target="_blank" href="https://nicksprompts.com">nicksprompts.com</a></li>
<li><a target="_blank" href="https://smartycourses.com">smartycourses.com</a></li>
<li><a target="_blank" href="https://songdeconstruct.com">songdeconstruct.com</a></li>
<li><a target="_blank" href="https://spoiledscripts.com">spoiledscripts.com</a></li>
</ul>
        </div>`,
        options: []
    },
    {
        type: 'chat',
        message: `<h3>Building great things, is a matter of doing many small thing well.</h3><p>First we define business objects. Then break the system into layers and divide the layers into parts. Each layer of the system should be built independently and attached loosely. Everything we deliver should be modular and reusable. We try to never code the same thing twice. We also want to run as light as possible for as long as possible.</p>`,
        options: []
    },
    {
        type: 'chat',
        message: `<h2>Here are some of my AI services:</h2>
        <ul class="panel" style="width: 100%; display: flex; justify-content: space-between;">
  <li style="width: 30%;">
    <strong>Image & Media Processing</strong>
    <ul style="margin-bottom:10px;">
      <li>AI Image Request</li>
      <li>Image Analyze Bot</li>
      <li>PDF Analysis Bot</li>
    </ul>
    <strong>Automation & Notifications</strong>
    <ul style="margin-bottom:10px;">
      <li>Teams Notification Bot</li>
      <li>Conversation Summary Bot</li>
      <li>Welcome Message Bot</li>
    </ul>
    <strong>Intent & Conversations</strong>
    <ul style="margin-bottom:10px;">
      <li>Intent Bots</li>
    </ul>
  </li>

  <li style="width: 30%;">
    <strong>Web Development & Code Generation</strong>
    <ul style="margin-bottom:10px;">
      <li>Page Edit Chatbot (Form Builder)</li>
      <li>HTML Generator</li>
      <li>Field HTML Generator</li>
      <li>Sections Generator</li>
      <li>Template Generator</li>
      <li>Theme Generator</li>
      <li>Idea to HTML Bot</li>
      <li>Angular Component Generator</li>
      <li>NgRx Script Generator</li>
    </ul>
  </li>

  <li style="width: 30%;">
    <strong>Translation & Language Processing</strong>
    <ul style="margin-bottom:10px;">
      <li>Translate to Spanish</li>
      <li>Prompt Ideas Bot</li>
      <li>Boost Prompt Bot</li>
    </ul>
    <strong>Code Review & Optimization</strong>
    <ul style="margin-bottom:10px;">
      <li>Code Review Bot</li>
      <li>MR Review Bot</li>
    </ul>
    <strong>Miscellaneous</strong>
    <ul style="margin-bottom:10px;">
      <li>Example List Builder</li>
    </ul>
  </li>
</ul>
`,
        options: []
    },
    {
        type: 'chat',
        message: '<div class="panel row">"Complexity is the enemy of reliability."</div>',
        options: []
    },
    {
        type: 'chat',
        message: `<h2>Technology Background</h2>
        <div class="panel row" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
  <div style="flex: 1 1 30%; margin: 10px;">
    <h3>Languages</h3>
    <ul>
      <li>JavaScript</li>
      <li>TypeScript</li>
      <li>Python</li>
      <li>Node.js</li>
      <li>PHP</li>
      <li>C#</li>
      <li>Dart</li>
    </ul>

    <h3 style="margin-top:10px;">Databases</h3>
    <ul>
      <li>MySQL</li>
      <li>NoSQL</li>
      <li>Pinecone</li>
      <li>Neo4j</li>
      <li>ElasticSearch</li>
      <li>Firebase</li>
      <li>Redis</li>
      <li>MongoDB</li>
      <li>NeDB</li>
      <li>SQLite</li>
      <li>PostgreSQL</li>
    </ul>

    <h3 style="margin-top:10px;">Front-End Frameworks</h3>
    <ul>
      <li>Angular</li>
      <li>React</li>
      <li>Vue</li>
      <li>Redux</li>
      <li>Vuex</li>
    </ul>
  </div>

  <div style="flex: 1 1 30%; margin: 10px;">
    <h3>Back-End Libraries</h3>
    <ul>
      <li>NestJS</li>
      <li>Loopback</li>
      <li>Django</li>
      <li>Meteor</li>
      <li>Wordpress</li>
    </ul>

    <h3 style="margin-top:10px;">Additional Frameworks</h3>
    <ul>
      <li>React Native</li>
      <li>Flutter</li>
      <li>Solidity</li>
      <li>Electron</li>
      <li>LitElement</li>
      <li>Jasmine</li>
    </ul>

    <h3 style="margin-top:10px;">AI & Automation</h3>
    <ul>
      <li>n8n</li>
      <li>Langchain</li>
      <li>RAG</li>
      <li>LLamaIndex</li>
      <li>ElevenLabs</li>
      <li>Stable Diffusion</li>
      <li>Cursor</li>
      <li>TensorFlow</li>
    </ul>
  </div>

  <div style="flex: 1 1 30%; margin: 10px;">
    <h3>DevOps & CI/CD</h3>
    <ul>
      <li>Jenkins</li>
      <li>GitLab</li>
      <li>Docker</li>
      <li>AWS Lambda (Alexa)</li>
      <li>RabbitMQ</li>
      <li>Kafka</li>
      <li>JIRA</li>
    </ul>

    <h3 style="margin-top:10px;">APIs and Tools</h3>
    <ul>
      <li>Google CSE</li>
      <li>Unsplash</li>
      <li>OpenRouter</li>
      <li>Polygon.io</li>
      <li>Stripe</li>
      <li>RapidAPI</li>
      <li>Dezgo</li>
    </ul>

    <h3 style="margin-top:10px;">Hosting & Cloud</h3>
    <ul>
      <li>AWS</li>
      <li>Heroku</li>
      <li>Google Cloud</li>
      <li>Railway</li>
      <li>Cloudinary</li>
      <li>Memcached</li>
      <li>Nginx</li>
      <li>Apache</li>
    </ul>
  </div>
</div>
`,
        options: []
    },
    {
        type: 'chat',
        message: '<h2 class="panel">Did you try the voice assistant?</h2>',
        options: []
    },
    {
        type: 'chat',
        message: `<p class="">The number one software issue is over-engineering. Number two is procrastination.</p>`,
        options: []
    },
    {
        type: 'chat',
        message: `<h3>Websites from a long time ago:</h3><div class="panel row">
        <ul style="display: flex; justify-content: space-between;width: 100%;">
  <li style="width: 30%;">
    <ul>
      <li>multiview.com</li>
      <li>schoolboard.com</li>
      <li>lifeblue.com</li>
      <li>nestdallas.com</li>
    </ul>
  </li>

  <li style="width: 30%;">
    <ul>
      <li>weareaustin.com</li>
      <li>laopinion.com</li>
      <li>av8records.com</li>
      <li>crunkbox.com</li>
    </ul>
  </li>

  <li style="width: 30%;">
    <ul>
      <li>eyemartexpress.com</li>
      <li>harpersjewelry.com</li>
      <li>southshoresoldiers.com</li>
      <li>victory-ink.com</li>
    </ul>
  </li>
</ul>
        </div>`,
        options: []
    },
    {
        type: 'chat',
        message: `<p>AI is good at doing exactly what you tell it, but creativity not so much.</p>`,
        options: []
    },
    {
        type: 'chat',
        message: '<h2 class="panel row">I want to use an LLM to enrich someone\'s product data.<BR>Extend and improve their search results.</h2>',
        options: []
    },
    {
        type: 'chat',
        message: '<div class=""><p>The code that can be written is not the eternal code.</p><h6 style="text-align: right;">~Tao of Programming</h6></div>',
        options: []
    },
    {
        type: 'chat',
        message: '<div class="panel" style="width: 100%;"><h2>The source code for this chat system:</h2><a target="_blank" href="https://github.com/nick227/resume-chat">https://github.com/nick227/resume-chat</a></div>',
        options: []
    }
];

module.exports = {
    AUTO_MESSAGES
};