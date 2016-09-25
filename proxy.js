var http=require("http");
var url=require("url");
var server=http.createServer(function(sreq,sres){
    var url_parts=url.parse(sreq.url);
    var opts={
        // host:'121.199.37.77',
        port:80,
        path:url_parts.path,
        // headers:{
        //     'Accept':'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        //     'Accept-Encoding':'gzip, deflate, sdch',
        //     'Accept-Language':'zh-CN,zh;q=0.8',
        //     'Connection':'keep-alive',
        //     'Cookie':'KDSESSID=7B3400120EBA57BBC9382859E1836FAB; vd_cid=CID160923162246049025',
        //     'Host':'51shop.mobi',
        //     'Upgrade-Insecure-Requests':'1',
        //     'User-Agent':'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/48.0.2564.23 Mobile Safari/537.36 wechatdevtools/0.7.0 MicroMessenger/6.3.9 webview/0'
        // }
        headers:sreq.headers,
    };
    if(url_parts.path.match('productByPage')){
        console.log('matched json-server');
        opts.host = '127.0.0.1';
        opts.port = 9001;
        opts.path = '/test0';
    }else{
        console.log('document');
        opts.host = '121.199.37.77';
        opts.port = 80;
        opts.path = url_parts.path; 
    }
    var creq=http.get(opts, function (cres) {
        sres.writeHead(cres.statusCode,cres.headers);
        cres.pipe(sres);
    });
    sreq.pipe(creq);
});
server.listen(80,"127.0.0.1", function () {
    console.log("开始监听"+server.address().port+"......");
});