const fs = require('fs'),
    baseUrl = './uploads';
exports.getAllAlbum = (callback) => {
    fs.readdir(baseUrl, (err, files) => {
        if (err) {
            callback(baseUrl + '文件夹不存在', null);
            return;
        }
        let allAlbums = [];
        //迭代器
        (function iteration(i) {
            if (i == files.length) {
                callback(null, allAlbums);
                return;
            }
            fs.stat(baseUrl + '/' + files[i], (err, stats) => {
                if (err) {
                    callback(baseUrl + '/' + files[i] + '文件夹不存在', null);
                    return;
                }
                allAlbums.push(files[i]);
                iteration(i + 1);
            })

        })(0);
    })
};
exports.getAlbumDetail = (filename, callback) => {
    fs.readdir(baseUrl + '/' + filename, (err, files) => {
        if (err) {
            callback(filename + '文件夹不存在',null);
            return;
        }
        let albums = [];
        (function iteration(i) {
            if (i == files.length) {
                callback(null,albums);
                return;
            }
            fs.stat(baseUrl + '/' + filename + '/' + files[i], (err, stats) => {
                if (err) {
                    callback(baseUrl+'/'+filename+'/'+files[i]+'文件不存在',null);
                    return; 
                }
                albums.push(files[i]);
                iteration(i+1);
            })
        })(0)
    })
}