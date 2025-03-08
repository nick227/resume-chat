const AUTO_MESSAGES = [{
        type: 'chat',
        message: `<div>

      <!-- Single Column Section -->
      <div>
        <h1>Hi there. I am Nick.</h1>
        <p>
        Senior software solutions engineer with a strong record of leading and delivering innovative, fast, and scalable products. Experienced in launching large projects and dozens of smaller sites. Passionate about collaboration and creating great user experiences.
        </p>
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
        message: `
        
<div class=" tabs">
    <div class="tab-header">
        <button class="tab-button active" data-tab="digital-harbor">Digital Harbor</button>
        <button class="tab-button" data-tab="cisco">CISCO</button>
        <button class="tab-button" data-tab="multiview">MultiView</button>
        <button class="tab-button" data-tab="nexstar">Nexstar</button>
        <button class="tab-button" data-tab="ai">LLM Projects</button>
    </div>
    <div class="tab-content">
        <!-- Digital Harbor -->
        <div class="tab-content-item" data-item="digital-harbor">
            <h2 style="margin-top: 20px;">DIGITAL HARBOR</h2>
            <p>
                The first major initiative I led was streamlining multiple Angular projects into a single component library and monorepo. This reduced our build time and significantly decreased the bug rate. As a team lead, I helped two projects get off the ground. I was a major creative contributor. I also took the initiative with AI services, working independently on several projects.
            </p>

            <a href="#projects" class="show-more-link">More about Digital Harbor</a>
            <div class="hidden">
            <h3 style="font-size: 1.4rem; margin-top: 1rem;">Projects</h3>
            <p>
            Developed an API for image search and retrieval, integrating Google, Unsplash, Giphy, Pixabay, and Pexels, with features like dominant color and aspect ratio detection.
            </p>

            <p>
            Built a Prompt Template Manager for launching bots as APIs, allowing data source integration and prompt sequencing. It featured a chat interface and used OpenLlama for document indexing, later adding Pinecone for vector search.
            </p>

            <p>
            Next I launched a solution to generate and modify HTML using natural language, integrating Set-Forms' WYSIWYG editor for clean HTML output and command-based modifications like style, append, and remove, with live testing in the app.
            </p>
            <h2 style="margin-top: 20px;">Experience</h2>
            <p>
                We designed and built tools to make web pages with. So we talked about <em>user experiences</em> a lot. We worked on next-generation components. But that is only half the coin. We also rendered the pages. Putting us in common with Webflow and Wix. <em>Beautiful by default</em> was one of our priorities. And I thought about, discussed, and pitched a lot of UI/UX ideas. Right now I am really curious how AI natural language is changing the user experience.
            </p>
            </div>
        </div>
        
        <!-- Cisco -->
        <div class="tab-content-item" data-item="cisco">
            <h2>CISCO</h2>
            <p>This job is my claim to fame. I was the first full-stack engineer hired to join a new team building the Single Pane of Glass product. A device alert and ticket management system using device-prem data. I was responsible for the implementation of designs from the design team and functionality from the business team.</p>

            <a href="#projects" class="show-more-link">More about CISCO</a>
            <div class="hidden">
            
            <p>We built a robust unit-tested consistent front-end, the node.js REST APIs, and a fairly complex data solution. Our team was successful. And I was asked to help lead struggling off-shore teams. Our Angular components were accepted into the company-wide UI component library. And our team got an award from Senior Leadership on a global all-hands meeting. A meeting that my 5-minute product demo ran on.</p>
            <p>Here's a snapshot of SPOG:</p>
            <img src="images/spog.png" class="image-widget" />
            <h2>EXPERIENCE</h2>
            <p>I got to interview the Austin-based team we hired that first year. I was leading daily scrums. I spent many hours working with project management estimating and sizing their features. Then worked with my team to break features into actionable units of work. For us implementing features was an opportunity to improve the code. When we got a full Neo4j license, the Neo4j company instantly put the CISCO logo on their homepage and scheduled a MeetUp in Austin that we attended and got to talk with their engineering team.</p>
            <p>CISCO is an engineer's engineering company and a great place to work. There was a real community of presentations and knowledge-sharing sessions you could jump on every day. My manager insisted that relationships were the most valuable thing in business and it was apparent in our culture. More than anywhere else I had access to big data, and with a senior system admin in the cube next to me, big platforms.</p>
            </div>

        </div>

        <!-- MultiView -->
        <div class="tab-content-item" data-item="multiview">
            <h2>MULTIVIEW</h2>
            <p>At MultiView, I was part of the corporate team, tasked with implementing designs outside the core product in a fast-paced, dynamic environment. I developed an award-winning homepage, designed high-fidelity mock-ups, and created numerous digital promotions.</p>
            
            
            <a href="#projects" class="show-more-link">More about MultiView</a>
            <div class="hidden">

            <p>I also streamlined processes by automating tasks, including email campaigns and data analysis, and conducted A/B testing on UI designs to enhance the user experience.</p>

            <p>Additionally, I deployed advertising to partner websites, standardized data scraping processes, and led SEO analysis and reporting efforts. We also built and launched a commercial HTML5 streaming platform for our partner videos.</p>
            <h2>EXPERIENCE</h2>
            <p>MultiView is at its heart a sales company. So this was an environment of results-driven work. We smashed through barriers and turned problems into opportunities. There is no time like the present at MultiView. Their company motto is the word "Fearless." So I was really lucky to be part of this company.</p>
            </div>
        </div>

        <!-- Nexstar -->
        <div class="tab-content-item" data-item="nexstar">
            <h2>NEXSTAR</h2>
            <p>At Nexstar, we worked with 60+ local TV stations to bring all their websites into a single, unified platform. This was still in the PHP days. We built it on top of the Joomla Community framework.</p>
            
            <a href="#projects" class="show-more-link">More about Nexstar</a>
            <div class="hidden">
            <p>Nextstar did not have a design team so we worked within our design system. We created an administration interface for the stations to manage their content. And we integrated ad management with the company advertising systems.</p>
            <h2>EXPERIENCE</h2>
            <p>This was in their corporate headquarters in Irving, Texas. And we were a team of 5 developers and our development manager. And even though it was local television it was still exciting working close to that much media being generated. I was there from the initial planning sessions to the successful launch.</p>
            </div>
        </div>

        <!-- AI Projects -->
        <div class="tab-content-item" data-item="ai">
        <h2>My thoughts on AI</h2>
        <p>I am looking at traditional development like the typewriter at this point. Big mature projects never really liked hand-written code. We were always looking to automate, compile and let a computer produce the final payload. Integrating AI into the development process is a natural evolution.</p>

        <a href="#projects" class="show-more-link">More about AI</a>
        <div class="hidden">
        <p>Furthermore LLMs gives us what I call the "magic api" the results aren't perfect but it sure is flexible. But with structured output and some human quality control we can generate insane results. I am really interested in adding natural language to everything. To our user experiences, to our code generation, to our data enhancement. I have audited LangChain and love it, but for most of my ideas I am going to use n8n.
        </p>
        <h2>How do we get there?</h2>
        <p>
        The AI/LLM is one resource in a complex system. For accuracy we are going to use a deterministic process when it's viable. The key to generating quality code is keeping the scope small and the guidelines clear. AI is not that much more significant than the first nosql databases. Which is how we use them. As these slightly unreliable databases. 
        
        </p>
        </div>
        </div>

    </div>
</div>


        `,
        options: []
    },
    {
        type: 'chat',
        message: `
      <!-- Two Columns Section -->
      <div style="display: flex; gap: 20px;">
        <div class="panel">
          <h2 style="font-size: 1.8rem; margin-bottom: 20px; color: #333;">Expertise</h2>
          <p>As a <span style="font-weight: bold; color: #007BFF;">full-stack developer</span>, I bring a wealth of experience to the table. I have a solid IT background and real-world design experience. I have a track record of success delivering world-class solutions for organizations.</p>
        </div>
        <div class="panel">
          <h2 style="font-size: 1.8rem; margin-bottom: 20px; color: #333;">Automation</h2>
          <p>I am all in on automation and AI. I use <span style="font-weight: bold; color: #007BFF;">n8n</span> regularly and have recently built AI automations in <span style="font-weight: bold; color: #007BFF;">Node.js</span>, <span style="font-weight: bold; color: #007BFF;">Python</span>, and even <span style="font-weight: bold; color: #007BFF;">PHP</span>. These tools help me streamline processes and create solutions that drive real value.</p>
        </div>
      </div>

      <!-- Single Column Section -->
      <div class="panel full-width">
        <h2>Click "Start a Call" to talk to my AI assistant</h2>
        <p>It uses ElevenLabs API and it\s not bad!</p>
      </div>

    </div>
    <p>I am seeking a company that embraces AI as a new part of their integrated systems. </p>
    `,
        options: [],
    }, {
        type: 'chat',
        message: `<a target="_blank" href="mailto:nicholas.jay.rios@gmail.com" class="chat-link"><div>
<svg style="width: 24px; height: 24px;" viewBox="0 0 24 24">
    <path fill="#dc3545" d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,18H4V8L12,13L20,8V18M20,6L12,11L4,6V6H20V6Z"/>
</svg>
    Email Me
</div>
</a>`,
        options: []
    },
    {
        type: 'chat',
        message: '<div class="panel">Why spend all day doing something, when you could spend all month automating it?</div>',
        options: []
    },
    {
        type: 'chat',
        message: `
        <div class="row" style="display: flex; flex-wrap: wrap; justify-content: space-between;">
  <div style="flex: 1 1 30%; margin: 10px;">
    <h3>Code</h3>
    <ul>
      <li>JavaScript</li>
      <li>TypeScript</li>
      <li>Python</li>
      <li>Node.js</li>
      <li>PHP</li>
      <li>C#</li>
    </ul>

    <h3 style="margin-top:10px;">Data</h3>
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

    <h3 style="margin-top:10px;">Front-End</h3>
    <ul>
      <li>Angular</li>
      <li>React</li>
      <li>Vue</li>
      <li>Redux</li>
      <li>Vuex</li>
    </ul>
  </div>

  <div style="flex: 1 1 30%; margin: 10px;">
    <h3>Back-End</h3>
    <ul>
      <li>NestJS</li>
      <li>Loopback</li>
      <li>Django</li>
      <li>Meteor</li>
      <li>Wordpress</li>
    </ul>

    <h3 style="margin-top:10px;">Frameworks</h3>
    <ul>
      <li>React Native</li>
      <li>Flutter</li>
      <li>Solidity</li>
      <li>Electron</li>
      <li>LitElement</li>
      <li>Jasmine</li>
    </ul>

    <h3 style="margin-top:10px;">Automation</h3>
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
    <h3>DevOps</h3>
    <ul>
      <li>Jenkins</li>
      <li>GitLab</li>
      <li>Docker</li>
      <li>AWS Lambda (Alexa)</li>
      <li>RabbitMQ</li>
      <li>Kafka</li>
      <li>JIRA</li>
    </ul>

    <h3 style="margin-top:10px;">APIs</h3>
    <ul>
      <li>Google CSE</li>
      <li>Unsplash</li>
      <li>OpenRouter</li>
      <li>Polygon.io</li>
      <li>Stripe</li>
      <li>RapidAPI</li>
      <li>Dezgo</li>
    </ul>

    <h3 style="margin-top:10px;">Hosting</h3>
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
        message: `<h2>Some of my AI content projects:</h2><div class="panel full-width row">
        <ul class="col-50">
<li><a target="_blank" href="https://ai-delphi.com">ai-delphi.com</a></li>
<li><a target="_blank" href="https://ai-super-lizard.com">ai-super-lizard.com</a></li>
<li><a target="_blank" href="https://ai-webdev.com">ai-webdev.com</a></li>
<li><a target="_blank" href="https://ai-workflows.net">ai-workflows.net</a></li>
<li><a target="_blank" href="https://autocontentstudio.com">autocontentstudio.com</a></li>
<li><a target="_blank" href="https://backslash.cash">backslash.cash</a></li>
<li><a target="_blank" href="https://dollar-stocks.com">dollar-stocks.com</a></li>
<li><a target="_blank" href="https://promptgeometry.com">promptgeometry.com</a></li>
<li><a target="_blank" href="https://dialogica.up.railway.app/">Image Generator</a></li>
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
    <strong>Media</strong>
    <ul style="margin-bottom:10px;">
      <li>AI Image Request</li>
      <li>Image Analyze Bot</li>
      <li>PDF Analysis Bot</li>
    </ul>
    <strong>Automation</strong>
    <ul style="margin-bottom:10px;">
      <li>Teams Notification Bot</li>
      <li>Conversation Summary Bot</li>
      <li>Welcome Message Bot</li>
      <li>Intent Bots</li>
    </ul>
  </li>

  <li style="width: 30%;">
    <strong>ui/ux</strong>
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
    <strong>Language</strong>
    <ul style="margin-bottom:10px;">
      <li>Translate to Spanish</li>
      <li>Prompt Ideas Bot</li>
      <li>Boost Prompt Bot</li>
    </ul>
    <strong>Code</strong>
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
        message: `<div class="row panel">
        <div class="col col-15" style="min-width: 130px; min-height: 130px;"><img src="https://picsum.photos/130/130" /></div>
        <div class="col col-80"><h3>User experiences should be intuitive and fast</h3> Reducing clicks and prioritizing core functionality is key to success. Great user experiences are stress-free. Usability, alignment and consistency is our top priority. And always keeping in mind simplicity is beautiful.</div>
        </div>`,
        options: []
    },
    {
        type: 'chat',
        message: '<div class="panel row">"Complexity is the enemy of reliability."</div>',
        options: []
    },
    {
        type: 'chat',
        message: `<p>The number one software issue is over-engineering. Number two is procrastination.</p>`,
        options: []
    },
    {
        type: 'chat',
        message: `
        <h3>Websites from a long time ago:</h3>
        <div class="full-width">
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
        message: '<h2 class="panel full-width">Let\'s use an LLM to enrich your data, extend and improve your search results.</h2>',
        options: []
    },
    {
        type: 'chat',
        message: '<div><p>The code that can be written is not the eternal code.</p><h5>~Tao of Programming</h5></div>',
        options: []
    },
    {
        type: 'chat',
        message: `<div class="panel row" style="width: 100%;">
        <div style="width: 30%; display: flex; justify-content: center; align-items: center;">
        <img src="images/bot.jpg" style="width: 150px;" />
        </div>
        <div style="width: 70%; padding: 0 2%;">
        <p>The source code for this chat system:</p><a target="_blank" href="https://github.com/nick227/resume-chat">https://github.com/nick227/resume-chat</a>
        </div>
        </div>`,
        options: []
    }, {
        type: 'chat',
        message: `<a target="_blank" href="mailto:nicholas.jay.rios@gmail.com" class="chat-link"><div>
<svg style="width: 24px; height: 24px;" viewBox="0 0 24 24">
    <path fill="#dc3545" d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,18H4V8L12,13L20,8V18M20,6L12,11L4,6V6H20V6Z"/>
</svg>
    Email Me
</div>
</a>`,
        options: []
    }
];

module.exports = {
    AUTO_MESSAGES
};