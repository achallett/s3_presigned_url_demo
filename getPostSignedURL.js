var AWS = require('aws-sdk');
var credentials = {
    accessKeyId: process.env.S3_ACCESS_KEY,
    secretAccessKey : process.env.S3_SECRET_KEY
};
AWS.config.update({
    credentials: credentials,
    region: process.env.S3_REGION
});

var s3 = new AWS.S3();

const params = {
    Bucket: process.env.S3_BUCKET,
    Expires: 10000000, //time to expire in seconds

        Fields: {
        key: 'test'
        },
    conditions: [
        {acl: 'private'},
        {success_action_status: "201"},
        ['starts-with', '$key', '']
        ['content-length-range', 0, 100000],
        {'x-amz-algorithm': 'AWS4-HMAC-SHA256'}
    ]
};
exports.generatePresignedURL = function (req, res) {
    params.Fields.key = req.query.filename || 'filename';
    s3.createPresignedPost(params, function (err, data) {
        if (err) {
            console.log("Error",err);
            res.status(500).json({
                msg: "Error",
                Error: "Error creating presigned URL"
            });
        } else {
            res.status(200).json(data);
        }
    });
};