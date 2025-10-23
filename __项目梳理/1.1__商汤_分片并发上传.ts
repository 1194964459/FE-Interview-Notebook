// 参考：https://juejin.cn/post/7163522138698153997?searchId=20251007143734620168733BC035A15C95

/**
 * 大文件分片上传：
 *     所有的分片都成功，相当于大文件才上传成功了；
 *     但凡其中有一个分片失败了，这个大文件就上传失败了，后面的分片也没必要上传了！
 * 
 * sizeMap[分片id]：请求进度获取，axios中onUploadProgress实现。大文件的上传进度需将所有上传成功+正在上传的分片数据量累加
 * req_result：每个分片请求的结果，成功/失败 {status:true/fasle}
 * count：执行过的请求数，finally中统计，请求是不管成功/失败
 * j：当前正在执行的请求的索引，（请求前记录，和count略有不同）
 */

interface reqResult {
    status: boolean;
}

// 分片并发上传最大量
const MAXNUM = 1;

async function concurrentRequest(onUploadProgress: Function) {
    return new Promise((resolve) => {
        let count = 0; // 执行过（不管成功/失败）的用count统计； 统计的是结果（请求后统计）
        let j = -1; // 当前正在执行的请求索引 用idx标记（请求前记录，和count略有不同）
        let req_result: Array<reqResult> = [];

        // 保证分片的序号和签名url的序号是对应的
        let sizeMap: any = {};

        /**
         * 单个异步请求
         */
        const request = async () => {
            let idx = ++j;
            // 所有请求均已发送
            if (idx >= this.fileChunkList.length) return;

            axios({
                method: "put",
                url: this.multipartUploadUrls[idx].signedUrl,
                data: this.fileChunkList[idx].file,
                signal: this.control.signal,
                onUploadProgress: (progress) => {
                    let uploadSize = 0;
                    sizeMap[idx] = progress.loaded;
                    // console.log("进度：", sizeMap);
                    for (let key in sizeMap) {
                        uploadSize += sizeMap[key];
                    }
                    // console.log("总size:", uploadSize);
                    if (!this.isCancel)
                        onUploadProgress(uploadSize + this.uploadedSize);
                },
            })
                .then(() => {
                    console.log("单个分片success! ", this.fileChunkList[idx].idx);
                    req_result[idx] = { status: true };
                })
                .catch((e) => {
                    console.error("单个分片失败!", this.fileChunkList[idx].idx);
                    req_result[idx] = { status: false };
                    // return resolve(e);
                    // TODO:为啥reject无用？
                })
                .finally(() => {
                    count++;
                    let flag = false;
                    for (let i = 0; i < req_result.length; i++) {
                        // 只要有失败的, 还在进行的请求取消掉； 返回error
                        const status = req_result[i]?.status; // 请求被Pending了,status并未赋值
                        if (typeof status == "boolean" && !status) {
                            flag = true;
                            return resolve(false); // concurrentRequest 异步返回结果
                        }
                    }

                    // 所有分片请求已发送完毕
                    if (count == this.fileChunkList.length) {
                        const isError = req_result.find((req) => !req.status);
                        return resolve(!isError);
                    }
                    if (!flag) {
                        request();
                    }
                });
        };

        const times = Math.min(this.fileChunkList.length, MAXNUM);
        for (let i = 0; i < times; i++) {
            request();
        }
    });
}

/**
 * 调用
 */
this.concurrentRequest(onUploadProgress).then(async (res) => {
    console.warn("多路并发是否已全部上传：", res);

    if (!res) {
        onUploadFinish && (await onUploadFinish(false));
    } else {
        const res = await this.completeMultipartUpload(args);
        console.warn("completeMultipartUpload: ", res);
        if (res) {
            onUploadFinish && (await onUploadFinish(true));
        }
        else {
            onUploadError && onUploadError();
            if (this.uploadId) {
                await this.abortMultipartUpload({
                    uploadId: this.uploadId,
                    storageType: this.storageType,
                    path: this.path,
                });
            }
        }
    }
});