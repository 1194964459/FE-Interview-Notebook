import navText from '../../assets/nav-text'

// 总的动画时长，目前暂定5s
let totalAnimationTime = 5000

// 动画背景色第一次转换，第25帧渐变（共80帧）
let firstConversion = 0.31

// 动画背景色第二次转换，第53帧渐变
let secondConversion = 0.6625

// 动画背景色第三次转换
let thirdConversion = 1

let timer

Component({
    data: {
        // 不同机型顶部状态栏、标题栏高度和
        topHeightOfModal: 0,
        progressBarWidth: 0,

        // 透明度控制
        firstOpacity: 1,
        secondOpacity: 1,
        thirdOpacity: 1,

        // 加载文本展示
        loadContent: navText.loadContent,
        loadFailText: navText.loadFailText
    },

    props: {
        resourceIsLoading: true,
        resourceLoadingFail: false,
        resourceLoadingProgress: '',
        platform: ''
    },

    didMount() {
        let { statusBarHeight, titleBarHeight } = my.getSystemInfoSync()
        this.setData({
            topHeightOfModal: (statusBarHeight + titleBarHeight)
        })

        // 第一个动画周期
        this.handleLayerControl()

        // 第二个及之后的动画周期
        timer = setInterval(() => {
            this.handleLayerControl()
        }, totalAnimationTime)
    },

    didUnMount() {
        clearInterval(timer)
    },


    deriveDataFromProps(nextProps) {
        let _this = this
        // let { resourceLoadingProgress } = nextProps
        let resourceLoadingProgress = nextProps.resourceLoadingProgress.split('%')[0]

        let width = Math.round((Number(resourceLoadingProgress) / 100) * 226)

        this.setData({
            // progressBarWidth: _this.props.platform == 'ios' ? (26 + width) : width
            progressBarWidth: 200
        })
    },

    methods: {
        // 图层控制函数
        handleLayerControl() {
            // 图层控制
            setTimeout(() => {
                this.setData({
                    firstOpacity: 0,
                    secondOpacity: 1,
                })
            }, Math.round(firstConversion * totalAnimationTime))

            setTimeout(() => {
                this.setData({
                    secondOpacity: 0,
                    thirdOpacity: 1,
                })
            }, Math.round(secondConversion * totalAnimationTime))

            setTimeout(() => {
                this.setData({
                    thirdOpacity: 0,
                    firstOpacity: 1
                })
            }, Math.round(thirdConversion * totalAnimationTime))
        },

        initResourceReload() {
            this.props.onInitResourceReload()
        }
    }
})