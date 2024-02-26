const notifier=require('node-notifier');
const globo= new notifier.WindowsBalloon({
    withFallback:false,
    customPath:undefined
});

module.exports=globo