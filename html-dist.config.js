import {
  script,
  googleAnalytics,
} from 'html-dist';

export default {
    outputFile: 'dist/index.html',
    minify: true,
    head: {
        appends: [
            script({src: '//load.sumome.com/', data-sumo-site-id: '2463e91b9b01e3c621748780e07ecbc874ef21774ec85cc34a6b32f697ffbb39', async: 'async'}),
            script({src: '//cdn.optimizely.com/js/4661521729.js'}),
            googleAnalytics('UA-57355031-3')
        ]
    }
    body: {
        remove: 'script',
        appends: [
            script({src: 'app.min.js'})
        ]
    }
}
