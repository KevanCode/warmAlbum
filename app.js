const express = require('express');
const app = express();
const route = require('./controller');
app.set('view engine', 'ejs');
//路由中间件,访问静态文件
app.use(express.static('./public'));
app.use(express.static('./uploads'));


app.get('/', route.showIndex);
app.get('/:filename',route.getAlbumInfo);
app.get('/up',route.up);
app.post('/up',route.upImage);
app.use((req, res) => {
     res.render('err');
})



const port = 3000;
app.listen(port, (err) => {
    if (err) {
        console.log(port + '端口已被占用');
    }
    console.log('success start ' + port);
});