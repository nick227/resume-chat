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
        delay: 1 * 60 * 1000
    },
    {
        type: 'chat',
        message: 'What do you think of this picture?',
        options: ['I like it', 'I don\'t like it', 'Talk more about Nick.'],
        delay: (1 * 60 * 1000) + 200
    },
    {
        type: 'chat',
        message: 'Did you try the voice assistant?',
        options: ['I will', 'Not Yet', 'What\'s the capital of North Dakota?'],
        delay: 2 * 60 * 1000
    },
    {
        type: 'chat',
        message: `<a target="_blank" href="/NICHOLAS JAY RIOS RESUME.pdf" download style="text-decoration: none; color: #2c3e50; font-weight: 500;"><div style="display: flex; align-items: center; gap: 10px; background: #f8f9fa; padding: 15px; border-radius: 8px; width: fit-content;">
            <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24">
                <path fill="#dc3545" d="M12,16L19.36,10.27L21,9L12,2L3,9L4.63,10.27M12,18.54L4.62,12.81L3,14.07L12,21.07L21,14.07L19.37,12.8L12,18.54Z"/>
            </svg>
                Download Resume (PDF)
        </div>
            </a>`,
        options: ['What\'s the buzz?', 'Tell me what\'s happening.', 'How long did Nick work at CISCO?'],
        delay: 5 * 60 * 1000
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
        options: ['How does Nick optimize his code?', 'How to build a good team?', 'What is an ai prompt manager?'],
        delay: 4 * 60 * 1000
    }, {
        type: 'chat',
        message: '<p>Have you seen this video?</p><iframe width="560" height="315" src="https://www.youtube.com/embed/cdRviRlcFL8?si=B1xG9WO-wq0qY2hS" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>',
        options: ['How would Nick fix the white-screen of death?', 'What is the split brain problem?', 'What does Nick think about REST vs GraphQL?'],
        delay: 0.125 * 60 * 1000
    }, {
        type: 'chat',
        message: '<h2>If you need ai-video, there are some of my favorites:</h2><ul><li><a target="_blank" href="https://fal.ai/models/fal-ai/ltx-video">fal.ai</a></li><li><a target="_blank" href="https://www.genmo.ai/play">Genmo</a></li><li><a target="_blank" href="https://www.runway.ai/play">Runway</a></li><li><a target="_blank" href="https://www.hedra.com">hedra</a></li><li><a target="_blank" href="https://lumalabs.ai/dream-machine">lumalabs</a></li><li><a target="_blank" href="https://replicate.com/minimax/video-01">replicate/minimax</a></li><li><a target="_blank" href="https://hailuoai.video/">hailuoai</a></li></ul>',
        options: [],
        delay: 0.1255 * 60 * 1000
    }, {
        type: 'chat',
        message: '<p>Me and a buddy have been making suno.com content and posting it on YouTube. <a href="https://www.youtube.com/@KNNXRADIO" target="_blank">https://www.youtube.com/@KNNXRADIO</a></p>',
        options: [],
        delay: 3687
    }, {
        type: 'chat',
        message: '<h2>Am I doing this right?</h2><img src="/uploads/Screenshot 2025-02-26 050909.png" /><p>This i my workflow for writing a blog post on <a target="_blank" href="https://songdeconstruct.com">songdeconstruct.com</a></p>',
        options: [],
        delay: 2550
    }, {
        type: 'chat',
        message: '<a target="_blank" href="https://hatsyshirtsy.com/product/lubbock-texas-t-shirt/"><img src="https://hatsyshirtsy.com/wp-content/uploads/2025/02/unisex-sports-tee-white-front-67bd2baa0e7e1.jpg" /></a>hatsyshirtsy',
        options: [],
        delay: 5550
    }, {
        type: 'chat',
        message: '<h2>Hey do you want this chat code you are using right now?</h2><a target="_blank" href="https://github.com/nickrios/chat-app">github.com/nickrios/chat-app</a>',
        options: [],
        delay: 5550
    }, {
        type: 'chat',
        message: '<a target="_blank" href="https://gizm0s.com/2025/01/25/exploring-deepseek-hangzhous-innovative-leap-in-technology/"><img src="https://gizm0s.com/wp-content/uploads/2025/01/image-96.png" />Exploring DeepSeek: Hangzhou’s Innovative Leap in Technology</a>',
        options: [],
        delay: 6550
    }
];
//https://gizm0s.com/2025/01/25/exploring-deepseek-hangzhous-innovative-leap-in-technology/
//https://gizm0s.com/wp-content/uploads/2025/01/image-96.png
module.exports = AUTO_MESSAGES;