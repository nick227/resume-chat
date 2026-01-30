const AUTO_MESSAGES = [{
        type: 'chat',
        message: `<div class="row">
        <img src="images/nick.png" alt="AI Assistant Avatar" class="avatar" style="padding-right: 25px;" />
        <div>
        <h1>Hello my name is Nick</h1>
        <p>Senior technical leader with 20+ years experience delivering enterprise software solutions. I love blue-sky projects and have been lucky enough to see quite a few launch and mature. I build reliable and developer friendly systems that scale and extend fast.</p>
        </div>
        </div>
        `,
        buttons: ['Talk about his front-end experience', 'Talk about his back-end experience']
    }   , {
        type: 'chat',
        message: `<div class="row" style=""><img style="height: 174px; padding-right: 25px;" src="https://pub-9c79c8328d194e7eb1e10f856c145b3d.r2.dev/dezgo_d6e75be8a1dd8ef6.jpg" /><p>Nick standardized frontend development at DH by creating a shared Angular component library and design lab. This reduced time-to-production by 80%, eliminated duplicated effort, and gave teams a common visual and technical language to move faster together.</p></div>`,
        buttons: ['How does he optimize front-ends?', 'How does Nick prevent over-engineering?']
    },
    {
        type: 'chat',
        message: `<div class="row" style=""><img style="height: 174px; padding-right: 25px;" src="https://pub-9c79c8328d194e7eb1e10f856c145b3d.r2.dev/dezgo_46a6504631486326.jpg" /><p>Nick’s career began in high-impact environments: migrating dozens of TV station websites onto shared platforms, building monetization systems, and later delivering award-winning B2B products by working directly with executives and designers.</p></div>`,
        buttons: ['Talk about his experience testing and tdd development.', 'What was Nick\'s first professional software project?']
    },
    {
        type: 'chat',
        message: `<div class="row" style=""><img style="height: 174px; padding-right: 25px;" src="https://pub-9c79c8328d194e7eb1e10f856c145b3d.r2.dev/dezgo_4b3fd1a1788029f1.jpg" /><p>Across roles, Nick leads by example: tackling the hardest problems, creating clarity where ambiguity exists, and building systems that close deals, ship on time, and succeed in production. Teams trust him because his work consistently delivers results.</p></div>`,
        buttons: ['What sort of work does Nick excel at?', 'What type of company is Nick looking for?']
    }
];

module.exports = {
    AUTO_MESSAGES
};