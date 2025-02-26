// Move test messages to a config file
const AUTO_MESSAGES = [{
        type: 'chat',
        message: '<h1>Hi welcome to Nick\'s Resume.</h1>',
        options: ['Tell me about Nick', 'What are his strengths?', 'How does he help organizations?'],
        delay: 0
    },
    {
        type: 'chat',
        message: `<a target="_blank" href="/uploads/nick-rios-resume.pdf" download style="text-decoration: none; color: #2c3e50; font-weight: 500;"><div style="display: flex; align-items: center; gap: 10px; background: #f8f9fa; padding: 15px; border-radius: 8px; width: fit-content;">
            <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24">
                <path fill="#dc3545" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z"/>
            </svg>
                Download Resume (PDF)
        </div>
            </a>`,
        options: [],
        delay: 1000
    },
    {
        type: 'chat',
        message: `<a target="_blank" href="mailto:nicholas.jay.rios@gmail.com" download style="text-decoration: none; color: #2c3e50; font-weight: 500;"><div style="display: flex; align-items: center; gap: 10px; background: #f8f9fa; padding: 15px; border-radius: 8px; width: fit-content;">
            <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24">
                <path fill="#dc3545" d="M20,4H4C2.89,4 2,4.89 2,6V18A2,2 0 0,0 4,20H20A2,2 0 0,0 22,18V6C22,4.89 21.1,4 20,4M20,18H4V8L12,13L20,8V18M20,6L12,11L4,6V6H20V6Z"/>
            </svg>
                Email Me
        </div>
            </a>`,
        options: [],
        delay: 2000
    },
    {
        type: 'chat',
        message: 'Try the "Start a Call" button to chat with my AI agent. It\'s actually pretty good.',
        options: [],
        delay: 3000
    },
    {
        type: 'chat',
        message: '<img src="https://picsum.photos/400/400" />',
        options: [],
        delay: 30 * 1000
    },
    {
        type: 'chat',
        message: 'What do you think of this picture?',
        options: ['I like it', 'I don\'t like it', 'Talk more about Nick.'],
        delay: (30 * 1000) + 200
    },
    {
        type: 'chat',
        message: 'Did you try the voice assistant?',
        options: ['I will', 'Not Yet', 'What\'s the capital of North Dakota?'],
        delay: 1.2 * 60 * 1000
    },
    {
        type: 'chat',
        message: `Hi`,
        options: ['What\'s the buzz?', 'Tell me what\'s happening.', 'How long did Nick work at CISCO?'],
        delay: 2 * 60 * 1000
    },
    {
        type: 'chat',
        message: '<p>Have you seen this video?</p><iframe width="560" height="315" src="https://www.youtube.com/embed/UOJ4V3DAAx8?si=JPfk1P4-eI5SwxLz" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
        options: [],
        delay: 10 * 1000
    }, {
        type: 'chat',
        message: '<h2>If you need ai-video, there are some of my favorites:</h2><ul><li><a target="_blank" href="https://fal.ai/models/fal-ai/ltx-video">fal.ai</a></li><li><a target="_blank" href="https://www.genmo.ai/play">Genmo</a></li><li><a target="_blank" href="https://www.runway.ai/play">Runway</a></li><li><a target="_blank" href="https://www.hedra.com">hedra</a></li><li><a target="_blank" href="https://lumalabs.ai/dream-machine">lumalabs</a></li><li><a target="_blank" href="https://replicate.com/minimax/video-01">replicate/minimax</a></li><li><a target="_blank" href="https://hailuoai.video/">hailuoai</a></li></ul>',
        options: [],
        delay: 5000
    }, {
        type: 'chat',
        message: '<p>Me and a buddy have been making suno.com content and posting it on YouTube:</p><a href="https://www.youtube.com/@KNNXRADIO" target="_blank">https://www.youtube.com/@KNNXRADIO</a>',
        options: [],
        delay: 8000
    }, {
        type: 'chat',
        message: '<h2>Am I doing this right?</h2><img src="/uploads/Screenshot 2025-02-26 050909.png" /><p>This i my workflow for writing a blog post on <a target="_blank" href="https://songdeconstruct.com">songdeconstruct.com</a></p>',
        options: [],
        delay: 10 * 1000
    }, {
        type: 'chat',
        message: '<a target="_blank" href="https://hatsyshirtsy.com/product/lubbock-texas-t-shirt/"><img src="https://hatsyshirtsy.com/wp-content/uploads/2025/02/unisex-sports-tee-white-front-67bd2baa0e7e1.jpg" /></a>hatsyshirtsy',
        options: [],
        delay: 11 * 1000
    }, {
        type: 'chat',
        message: '<div style="background: #f8f9fa; padding: 15px;width: fit-content;"><h2>Hey do you want this chat code you are using right now?</h2><a target="_blank" href="https://github.com/nick227/resume-chat">github.com/nick227/resume-chat</a></div>',
        options: [],
        delay: 23 * 1000
    }, {
        type: 'chat',
        message: '<h3>Exploring DeepSeek: Hangzhou’s Innovative Leap in Technology</h3><a target="_blank" href="https://gizm0s.com/2025/01/25/exploring-deepseek-hangzhous-innovative-leap-in-technology/"><img src="https://gizm0s.com/wp-content/uploads/2025/01/image-96.png" /></a>',
        options: [],
        delay: 14 * 1000
    }, {
        type: 'chat',
        message: '<a target="_blank" href="https://dollar-stocks.com" target="_blank"><p>The top 25 penny-stocks according to OpenAI.</p><img style="width: 550px;" src="/uploads/Screenshot 2025-02-26 062240.png" /></a>',
        options: [],
        delay: 15 * 1000
    }, {
        type: 'chat',
        message: '<h2 style="background: #f8f9fa; padding: 15px;width: fit-content;">I want to use an LLM to enrich someone\'s product data. Extending and improving their search results.</h2>',
        options: [],
        delay: 16 * 1000
    }, {
        type: 'chat',
        message: '<p>I was the first front-end developer brought on by a small team at Cisco. We eventually hired 5 more developers and our project was a smashing success.</p>',
        options: [],
        delay: 18 * 1000
    }, {
        type: 'chat',
        message: 'At Digital Harbor, I led the AI innovation charge.',
        options: [],
        delay: 20 * 1000
    }, {
        type: 'chat',
        message: '<p>With Digital Harbor I made an immediate impact. When I joined the codebase was loaded with inconsistent and redundant code. And it didn\'t even work. I was able to get the team aligned and everything up and running after a couple months.</p><p> I\'m a sparkplug.</p>',
        options: [],
        delay: 8.8 * 1000
    }, {
        type: 'chat',
        message: `
<h3>LIST OF AI BOTS:</h3>
<ul><li>
AI Image Request</li><li>
Image Analyze Bot</li><li>
Page Edit Chatbot (Form Builder)</li><li>
HTML Generator</li><li>
Field HTML Generator</li><li>
Sections Generator</li><li>
Template Generator</li><li>
Theme Generator</li><li>
Idea to HTML Bot</li><li>
Angular Component Generator</li><li>
NgRx Script Generator</li><li>
Example List Builder</li><li>
Translate to Spanish</li><li>
Code Review Bot</li><li>
Chat Summary Bot</li><li>
Conversation Analyzer Bot</li><li>
PDF Analysis Bot</li><li>
Prompt Suggestion Bot</li><li>
Boost Prompt Bot</li><li>
Welcome Message Bot</li><li>
Intent Determination Bot</li><li>
Prompt Sequence Generator</li><li>
Project Planner Bot</li><li>
Roadmap Generator</li><li>
Support Bot</li>
</ul>
`,
        options: [],
        delay: 14444
    }, {
        type: 'chat',
        message: `<h3>Building great things, is a matter of doing many small thing well.</h3><p>First we define business objects. Then break the system into layers and divide the layers into parts. Each layer of the system should be built independently and attached loosely. Everything we deliver should be modular and reusable. We try to never code the same thing twice. We also want to run as light as possible for as long as possible.</p>`,
        options: [],
        delay: 25 * 1000
    }, {
        type: 'chat',
        message: `<p style="background: #f8f9fa; padding: 15px;width: fit-content;">I lead by example and take ownership of challenging tasks. I promote organized meaningful meetings with clear objectives and action items. I am for very lean processes. The daily scrum is a developers chance to be honest. Get developers to share responsibility. Assign code reviewers early and encourage them to talk. Just get up and talk to the person.</p>`,
        options: [],
        delay: 4440
    }, {
        type: 'chat',
        message: `<div class="row">
        <div class="col col-25"><img src="https://picsum.photos/200/200" /></div>
        <div class="col col-75">Great UI/UX design is simple. User experiences should be intuitive and fast. Reducing clicks and prioritizing core functionality is key to success. Great projects need great support. Ambiguity in the designs shows up in the code. Usability, alignment and consistency is my priority. I like using low-fidelity tools like Google Slides. A website is a tool to do something.</div>
        </div>`,
        options: [],
        delay: 6444
    }, {
        type: 'chat',
        message: `<p>Writing code by hands is like using a typewriter in the 90s. There is an IDE war happening out here But how do we think beyond the IDE? And automate the entire thing. AI is good at doing exactly what you tell it do. But not so great at being creative.
        </p>`,
        options: [],
        delay: 2474
    }
];

module.exports = AUTO_MESSAGES;