Component({
    data: {
        // 不同机型顶部状态栏、标题栏高度和
        topHeightOfModal: 0,
        progressBarWidth: 0
    },

    // 可给外部传入的属性添加默认值
    props: {
        resourceIsLoading: true,
        resourceLoadingFail: false,
        resourceLoadingProgress: '',
        platform: ''
    },

    // 生命周期函数
    didMount() {
        let { statusBarHeight, titleBarHeight } = my.getSystemInfoSync()
        this.setData({
            topHeightOfModal: (statusBarHeight + titleBarHeight)
        })
    },

    deriveDataFromProps(nextProps) {
        let _this = this
        let resourceLoadingProgress = nextProps.resourceLoadingProgress.split('%')[0]

        let width = Math.round((Number(resourceLoadingProgress) / 100) * 226)

        this.setData({
            progressBarWidth: _this.props.platform == 'ios' ? (26 + width) : width
        })
    },

    methods: {
        initResourceReload() {
            this.props.onInitResourceReload()
        }
    }
})