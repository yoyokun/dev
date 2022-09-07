## 手势图形密码

长按拖拽自定义排序,基于uni语法编译

### 基础用法
长按激活拖拽动作
```
<template>
	<view>
		<cdt-draggrable-sort v-model="myList" :v-bind:id="isEdit ? 0 : 1" @start="start" @change="change" item-class="tag-list-list" active-item-class="tag-list-list-acitive">
			// #ifdef MP
			<template v-slot:default="scope">
				<view>
					<text>{{scope.name}}</text>
				</view>
			</template>
			// #endif
			// #ifndef MP
			<template slot-scope="scope">
				<view>
					<text>{{scope.row.name}}</text>
				</view>
			</template>
			// #endif
		</cdt-draggrable-sort>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				myList: [
					{id:1,name: '测试1'},
					{id:2,name: '测试2'},
					{id:3,name: '测试3'},
					{id:4,name: '测试4'},
				],
				isEdit: false,
			}
		},
		methods: {
			start(){
				this.isEdit = true
			},
			change(data) {
				this.myList = data
			}
		}
	}
</script>
<style>

	/deep/.tag-list-list {
		width: calc(25% - 10px) !important;
		padding: 0 5px;
		margin: 0 0 5px 10px;
		box-sizing: border-box;
		overflow: hidden;
		border-radius: 30px;
		float: left;
	}
	/deep/.tag-list-list-acitive {
		width: 25%!important;
		padding: 0 5px;
		box-sizing: border-box;
		overflow: hidden;
		border-radius: 30px;
		float: left;
	}
	/deep/.tag-list-list-acitive > view,
	/deep/.tag-list-list > view {
		width: 100%;
		height: 30px;
		line-height: 30px;
		text-align: center;
		background: #f1f1f1;
		font-size: 13px;
		border-radius: 30px;
		color: #333;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
		position: relative;
		display: inline-block;
		margin: 0;
	}
	/deep/.tag-list-list-acitive > view.cantdel,
	/deep/.tag-list-list > view.cantdel {
		border: #007AFF 1px solid;
		background: white;
		color: #007AFF;
		font-size: 14px;
		line-height: 28px;
		height: 28px;
	}
	/deep/.tag-list-list-acitive > view{
		box-shadow: 0 1px 3px rgba(0, 0, 0, .5);

	}
</style>
```

### Props

css样式类需要```/deep/```穿透才能应用，部分请加入```!important```声明

| 参数                         | 说明            | 类型                        | 默认值                                               |
| ----------------------------|---------------  | -------
| value                       |排序的数组信息      |Array                       | |
| item-class                  |元素附加class      |String                       | |
| active-item-class           |激活拖拽的元素附加class  |String                        |  |

### Events

| 事件名                         | 说明            | 回调参数                                               |
| ----------------------------|---------------  | -------
| init                       | 初始化数据完成      | Object:{top:顶部位置,left:左边位置,right:右边位置,bottom:底部位置 } |
| start                      | 用户长按下返回      | Object:{currentIndex:当前元素索引,touch:同longpress的touches,data:数组信息} |
| move                      | 拖拽移动时动作返回     | Object:{currentIndex:当前元素索引,touch:同touchmove的touches,data:数组信息} |
| end                      | 动作结束后返回     | Object:{currentIndex:当前元素索引,touch:同touchend的changeTouches,data:数组信息} |
| change                      | 数据变更     | Array:数组 |
