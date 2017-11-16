const file = require('../models');
const formidable = require('formidable'),
    fs = require('fs'),
    path = require('path'),
    sillyDatetime = require('silly-datetime');

exports.showIndex = (req, res, next) => {
    file.getAllAlbum((err, albums) => {
        if (err) {
            next();
            return;
        }
        res.render('index', {
            'albums': albums
        });
    });
};
exports.getAlbumInfo = (req, res, next) => {
    let filename = req.params.filename;
    file.getAlbumDetail(filename, (err, albums) => {
        if (err) {
            next();
            return;
        }
        res.render('album', {
            'filename': filename,
            'albums': albums
        });
    })
};
exports.up = (req, res, next) => {
    file.getAllAlbum((err, albums) => {
        if (err) {
            next();
            return;
        }
        res.render('up', {
            'albums': albums
        });
    });
};
exports.upImage = (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.uploadDir =__dirname+'/../temp/';
    form.parse(req, function (err, fields, files) {
        if (err) {
            next();
            return;
        }
        let filename=fields.filename;
        let oldname=files.img.path;
        let name=sillyDatetime.format(new Date(), 'YYYYMMDDHHmmss')+ parseInt(Math.random()*8999+10000);
        let extname=path.extname(files.img.name);
        let newname=__dirname+'/../uploads/'+filename+'/'+name+extname;
        fs.rename(oldname,newname,(err)=>{
            next();
            return;
        });
        // fs.unlink(files.img.path);
        res.send('success');
    });

    return;
};