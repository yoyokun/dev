import { Pagination } from '@/utils/pagination.js'
export default {
	data() {
		return {
			pagination: {}, // 分页
      loading: false, // 分页加载
      loadingCenter: false, // 首次加载
      empty: true, // 无数据 true 有数据，false无数据
      searchEnding: false, // 没有更多了
      dataList: []
		}
	},
	onLoad() {
    // 初始化
    this.pagination = new Pagination(1, this.onePageRow)
	},
	onShow() {
	  this.getInit()
	},
	// 监听下拉刷新
	onPullDownRefresh() {
	  // 正在加载
	  if (this.loadingCenter) {
	    return
	  }
	  // 刷新到第一页
	  this.getInit()
	  uni.stopPullDownRefresh()
	},
	// 监听用户上拉触底事件
	onReachBottom() {
	  // 没有更多
	  if (this.searchEnding) {
	    return
	  }
	  // 正在加载
	  if (this.loading) {
	    return
	  }
	  // 分页加载
	  this.loading = true
	  this.findDataList()
	  uni.stopPullDownRefresh()
	},
	methods: {
		// 刷新到第一页
		getInit() {
		  this.dataList = []
		  this.loadingCenter = true
		  // 刷新第一页
		  this.pagination.initPagination(1, this.onePageRow)
		  this.findDataList()
		},
		// 回填数据
		setMoreData(res) {
			this.pagination.setMoreData(res)
			this.dataList = this.pagination.getCurrentData()
			this.empty = this.pagination.getCurrentEmpty()
			this.searchEnding = this.pagination.getCurrentEnding()
		},
		// 加载完成
		loadClose() {
			this.loading = false
			this.loadingCenter = false
		}
	}
}
