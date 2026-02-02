const AUTO_MESSAGES = [{
        type: 'chat',
        message: `<div class="row">
        <img src="images/nick.png" alt="AI Assistant Avatar" class="avatar" style="padding-right: 25px;" />
        <div>
        <h1>Hi my name is Nick</h1>
        <p>Senior technical leader with 20+ years experience delivering enterprise software solutions. I love blue-sky projects and have launched a few. I build reliable and developer friendly systems.</p>
        </div>
        </div>
        <div class="row">
        
<div style="margin-top: 20px;">
      <h3 class="">Digital Harbor</h3>
      <p class="">
        Engineering lead on three new development initiatives. Frequent product + concept demo presenter,
        with regular team demos and bi-monthly presentations. Shipped a shared repo adopted across teams to reduce dev time and bugs. High-autonomy role centered
        on communication and fast iteration.
      </p>
      <h3 class="">Cisco Systems</h3>
      <p class="">
        Helped build and lead a team creating a large-scale Elasticsearch repository and dashboards for Nexus
        device metrics. Early users were an on-site support team, enabling rapid feedback. Ran daily stand-ups, partnered closely with design and PM, and helped deliver a global all-hands demo
        recognized by SVP leadership. I deliver immediate value: clear ownership, calm execution, and results.
      </p>
</div>
        </div>
<a href="#resume">read more...</a>
        `,
        buttons: ['Talk about his front-end experience', 'Talk about his back-end experience']
    }   , {
        type: 'chat',
        message: `<p>Nick standardized frontend development at DH by creating a shared Angular component library and design lab. This reduced time-to-production by 80%, eliminated duplicated effort, and gave teams a common visual and technical language to move faster together.</p>`,
        buttons: ['How does he optimize front-ends?', 'How does Nick prevent over-engineering?']
    },
    {
        type: 'chat',
        message: `<p>Nick’s career began in high-impact environments: migrating dozens of TV station websites onto shared platforms, building monetization systems, and later delivering award-winning B2B products by working directly with executives and designers.</p>`,
        buttons: ['Talk about his experience testing and tdd development.', 'What was Nick\'s first professional software project?']
    },
    {
        type: 'chat',
        message: `<p>Across roles, Nick leads by example: tackling the hardest problems, creating clarity where ambiguity exists, and building systems that close deals, ship on time, and succeed in production. Teams trust him because his work consistently delivers results.</p>`,
        buttons: ['What sort of work does Nick excel at?', 'What type of company is Nick looking for?']
    }
];

module.exports = {
    AUTO_MESSAGES
};