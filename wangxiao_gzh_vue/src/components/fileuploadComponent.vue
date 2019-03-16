<template>
    <div class="upload">

            <div class="file-panel">
                <div class="file-list clearfix">
                    <ul class="file-item" :class="`file-${file.id}`" v-for="(file,index) in fileList" :key="index">
                        <img :src="file.src || imageRoot + file.attachment ">
                        <li class="file-type" :icon="fileCategory(file.ext)"></li>
                        <li>
                           <mu-text-field class="upload-text" v-if="file.attachmentName" v-model="file.attachmentName" hintText="" :disabled="attentmentDisabled || !file.src"/>
                           <mu-text-field class="upload-text" v-model="file.quaFileName" hintText="" :disabled="attentmentDisabled || !file.src"/> 
                           <mu-text-field class="upload-text" v-if="file.quaFile" v-model="file.quaFile" hintText="" :disabled="attentmentDisabled || !file.src"/> 
                        </li>
                        <li class="file-name" v-if="showOldFileName">
                            {{file.name}}
                        </li>
                        <li class="file-size" style="display:none">
                            {{fileSize(file.size)}}
                        </li>
                        <li class="file-status success"></li>
                        <li class="progress" style="display:none" ><mu-linear-progress mode="determinate" color="#12afcb"/></li>
                        <li class="file-operate" :style="{visibility: !attentmentDisabled ? 'visible' : 'hidden'}">
                            <a title="移除" @click="remove(file)" class="remove-uploader"><mu-icon value="cancel" color="#ff6318"/></a>
                        </li>
                    </ul>
                   <!--  <div class="no-file" v-if="!fileList.length"><i class="iconfont icon-empty-file"></i> 暂无待上传文件</div> -->
                </div>
            </div>
            <div :id="uploadButtonId" class="upload-btn" :style="{visibility: !attentmentDisabled ? 'visible' : 'hidden'}">选择文件</div>

    </div>
</template>

<script>
    export default {
        name: 'vue-upload',
        props: {
            accept: {
                type: String,
                default: "image",
            },
            // 上传地址
            /*url: {
                type: String,
                default: '',
            },*/
            // 上传最大数量 默认为100
            fileNumLimit: {
                type: Number,
                default: 100,
            },
            // 大小限制 默认2M
            fileSingleSizeLimit: {
                type: Number,
                default: 5120000,
            },
            // 上传时传给后端的参数，一般为token，key等
            formData: {
                type: Object,
                default: null
            },
            // 生成formData中文件的key，下面只是个例子，具体哪种形式和后端商议
            keyGenerator: {
                type: Function,
                default(file) {
                    const currentTime = new Date().getTime();
                    const key = `${currentTime}.${file.name}`;
                    return key;
                },
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            // 上传按钮ID
            uploadButtonId: {
                type: String,
                default: 'filePicker',
            },
            // 上传按钮ID
            uploadButton: {
                type: String,
                default: '#filePicker',
            },
            // 显示原始文件名
            showOldFileName: {
                type: Boolean,
                default: false,
            },
            fileList: {
                type: Array,
                default: [],
            },
            addFileList: {
                type: Array,
                default: [],
            },
            deleteFileList: {
                type: Array,
                default: [],
            },
            attentmentDisabled :{
                type: Boolean,
                default: false,
            }
        },
        data() {
            return {
                uploader: null,
                uploadurl: this.GLOBAL.host + '/file/upload',
                imageRoot: this.GLOBAL.imageRoot,
            };
        },
        mounted() {
            this.initWebUpload();
        },
        methods: {
            initWebUpload() {
                var that = this;
                console.log(this.uploadButtonId)
                this.uploader = WebUploader.create({
                    auto: true, // 选完文件后，是否自动上传
                    swf: '/static/lib/webuploader/Uploader.swf',  // swf文件路径
                    server: this.uploadurl,  // 文件接收服务端
                    pick: {
                        id: this.uploadButton,     // 选择文件的按钮
                        multiple: this.multiple,   // 是否多文件上传 默认false
                        label: '',
                    },
                    accept: null,  // 允许选择文件格式。
                    //accept: this.accept,  // 允许选择文件格式。
                    threads: 1,
                    fileNumLimit: this.fileNumLimit, // 限制上传个数
                    fileSingleSizeLimit: this.fileSingleSizeLimit, // 限制单个上传图片的大小
                    formData: this.formData,  // 上传所需参数
                    chunked: false,          //分片上传
                    chunkSize: 2048000,    //分片大小
                    duplicate: true,  // 重复上传
                });
                // 当有文件被添加进队列的时候，添加到页面预览
                this.uploader.on('fileQueued', (file) => {
                    //校验bug
                    if(this.fileList.length >= this.fileNumLimit){
                        var errorMessage = '文件上传最大上限数为'+this.fileNumLimit;
                        this.$emit('error', errorMessage);
                        return;
                    }
                    that.uploader.makeThumb( file, function( error, src ) {
                        if ( error ) {
                            //$img.replaceWith('<span>不能预览</span>');
                            return;
                        }
                        file.src = src;
                        if (!file.size) return;
                        that.fileList.push(file);

                        that.$emit('fileChange', file);
                    }, 100, 100 );
                    
                });
                this.uploader.on('uploadStart', (file) => {
                    // 在这里可以准备好formData的数据
                    //this.uploader.options.formData.key = this.keyGenerator(file);
                });
                // 文件上传过程中创建进度条实时显示。
                this.uploader.on('uploadProgress', (file, percentage) => {
                    let $fileProgress = $(`.file-${file.id} .progress`);
                    $fileProgress.show();
                    let $percent = $(`.file-${file.id} .mu-linear-progress-determinate`);
                    $percent.css( 'width', percentage * 100 + '%' );
                    this.$emit('progress', file, percentage);
                });
                this.uploader.on('uploadSuccess', (file, response) => {
                    console.log('上传成功res', response);
                    console.log('上传成功flie', file);
                    if (response.result) {
                        file.attachment = response.data
                        var addF = {};
                        addF.id = file.id;
                        addF.attachment = file.attachment;
                        addF.ext = file.ext;
                        this.addFileList.push(addF);
                        let $fileStatus = $(`.file-${file.id} .file-status`);
                        $fileStatus.show();
                        $fileStatus.html('上传成功');
                    }else{
                        let $fileStatus = $(`.file-${file.id} .file-status`);
                        $fileStatus.html('上传失败');
                        $fileStatus.addClass("failed");
                        $fileStatus.show();
                    }
                    this.$emit('success', file, response);
                });
                this.uploader.on('uploadError', (file, reason) => {
                    console.error(reason);
                    this.$emit('uploadError', file, reason);
                });
                this.uploader.on('error', (type) => {
                    let errorMessage = '';
                    if (type === 'F_EXCEED_SIZE') {
                        errorMessage = `文件大小不能超过${this.fileSingleSizeLimit / (1024 * 1000)}M`;
                    } else if (type === 'Q_EXCEED_NUM_LIMIT') {
                        errorMessage = '文件上传最大上限数为'+this.fileNumLimit;
                    } else if (type === 'Q_TYPE_DENIED') {
                        errorMessage = '无法上传该文件类型';
                    } else {
                        //debugger;
                        errorMessage = `上传出错！请检查后重新上传！错误代码${type}`;
                    }
                    console.error(errorMessage);
                    this.$emit('error', errorMessage);
                });
                this.uploader.on('uploadComplete', (file, response) => {
                    this.$emit('complete', file, response);
                });
            },
            upload(file) {
                this.uploader.upload(file);
            },
            stop(file) {
                this.uploader.stop(file);
            },
            // 取消并中断文件上传
            cancelFile(file) {
                this.uploader.cancelFile(file);
            },
            // 在队列中移除文件
            removeFile(file, bool) {
                this.uploader.removeFile(file, bool);
            },
            getAccept(accept) {
                switch (accept) {
                    case 'text':
                        return {
                            title: 'Texts',
                            extensions: 'doc,docx,xls,xlsx,ppt,pptx,pdf,txt',
                            mimeTypes: '.doc,docx,.xls,.xlsx,.ppt,.pptx,.pdf,.txt'
                        };
                        break;
                    case 'video':
                        return {
                            title: 'Videos',
                            extensions: 'mp4',
                            mimeTypes: '.mp4'
                        };
                        break;
                    case 'image':
                        return {
                            title: 'Images',
                            extensions: 'gif,jpg,jpeg,bmp,png',
        					mimeTypes: 'image/*'
                        };
                        break;
                    default: 
                        return null;
                }
            },
            remove(file) {
                //debugger;
                if(file.src){
                    // 在队列中移除文件
                    this.removeFile(file, true);
                }
                
                // 在ui上移除
                let index = this.fileList.findIndex(ele => ele.id === file.id);
                this.fileList.splice(index, 1);
                var delIndex = this.addFileList.findIndex(ele => ele.id === file.id);
                if(delIndex != -1){
                    this.addFileList.splice(delIndex, 1);
                }else{
                    var deleteF = {};
                    deleteF.id = file.attachmentId || file.id;
                    this.deleteFileList.push(deleteF);
                }
            },
            fileSize(size) {
                return WebUploader.Base.formatSize(size);
            },
            fileCategory(ext) {
                let type = '';
                const typeMap = {
                    image: ['gif', 'jpg', 'jpeg', 'png', 'bmp', 'webp'],
                };
                Object.keys(typeMap).forEach((_type) => {
                    const extensions = typeMap[_type];
                    if (extensions.indexOf(ext) > -1) {
                        type = _type
                    }
                });
                return type
            },
        },
    };
</script>

<style >
    .webuploader-container {
        position: relative;
    }
    .webuploader-element-invisible {
        position: absolute !important;
        clip: rect(1px 1px 1px 1px); /* IE6, IE7 */
        clip: rect(1px,1px,1px,1px);
        left:0;
        right:0;
        top:0;
        bottom:0;
    }
   
    .webuploader-pick {
        position: relative;
        display: inline-block;
        cursor: pointer;
        background:rgb(18, 175, 203);
        color: #fff;
        width:100%;
        height:100%;
        text-align: center;
        border-radius: 3px;
        overflow: hidden;
    }
    .webuploader-pick-hover {
        background: #00a2d4;
    }
    .webuploader-pick-disable {
        opacity: 0.6;
        pointer-events:none;
    }
    .webuploader-container div{
        position:absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
    }
    .file-item{
        position:relative;
        width:100%;
        height:2.1rem;
        float:left;
        border:1px solid #ddd;
        border-radius:5px;
        margin:0;
    }
    .file-name{
        position:absolute;
        left:2px;
        right:2px;
        bottom:2px;
        height:25px;
        line-height:25px;
        background:rgba(0,0,0,.5);
        color:#fff;
        font-size:13px;
        padding:0 35px 0 3px;
    }
    ul{
        padding:0;
        margin:0;
    }
    ul li{
        list-style-type:none;
        padding:0;
        margin:0;
    }
    .file-item img{
        width:100%;
        height:100%;
    }
    .no-file{
        text-align:center;
        color:#999;
    }
    .file-item .upload-text{
        position:absolute;
        top:-58px;
        left:0;
        width:150px;
        text-align:center;
        margin-top:15px;
    }
    .file-item .upload-btn{
        position:absolute;
        left:0;
        top:0;
        right:0;
        bottom:0;
        opacity:0;
    }
    .file-item .file-operate{
        position:absolute;
        right:0;
        top:0;
        z-index:999;
    }
    .file-item .file-status{
        position:absolute;
        left:0;
        right:0;
        bottom:0;
        background:#ff5a15;
        color:#fff;
        z-index:9;
    }
</style>