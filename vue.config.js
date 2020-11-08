module.exports = {
    publicPath: process.env.NODE_ENV === 'production'
        ? '/superhero-database-website/'
        : '/',
    chainWebpack: config => {
        config
            .plugin('html')
            .tap(args => {
                args[0].title = "Character Database";
                return args;
            })
    }
}