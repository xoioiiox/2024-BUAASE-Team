<template>
		<div>
			<el-row :gutter="20">
				<el-col :span="6">
					<PersonalSide></PersonalSide>
				</el-col>
				<el-col :span="18">
					<h2>排行榜</h2>
					<div class="rankList">
						<div>
							<el-tabs
								v-model="activeName"
								type="card"
								class="demo-tabs"
								@tab-click="handleClick">
								<el-tab-pane label="总排行榜" name="first">
								</el-tab-pane>
								<el-tab-pane label="当日获取经验排行榜" name="second"></el-tab-pane>
							</el-tabs>
						</div>
						<div class="pageation">
							<el-table
								:data="rankList.slice((currentPage - 1) * pagesize, currentPage * pagesize)">
								<el-table-column type="index" width="150"></el-table-column>
								<el-table-column label="用户名" prop="username" width="300"></el-table-column>
								<el-table-column label="等级" prop="level" width="300"></el-table-column>
								<el-table-column label="经验值" prop="exp" width="300"></el-table-column>
							</el-table>
							<el-pagination
								@size-change="handleSizeChange"
								@current-change="handleCurrentChange"
								:current-page="currentPage"
								:page-sizes="[5, 10, 15, 20]"
								:page-size="pagesize"
								layout="total, sizes, prev, pager, next, jumper"
								:total="rankList.length">
							</el-pagination>
						</div>
						<!--div>
							<div>
								<el-tabs
									v-model="activeName"
									type="card"
									class="demo-tabs"
									@tab-click="handleClick">
									<el-tab-pane label="总排行榜" name="first">
									</el-tab-pane>
									<el-tab-pane label="当日获取经验排行榜" name="second"></el-tab-pane>
								</el-tabs>
							</div>
							<el-card class="rankCard-Above" shadow="never">
								<div v-for="(item, index) in rankList" :key="index">
									<el-card shadow="hover" class="rankCard">
										<el-row>
											<el-col :span="6">{{item.username}}</el-col>
											<el-col :span="6">LV.{{item.level}}</el-col>
											<el-col :span="6">经验值: {{item.exp}}EXP</el-col>
										</el-row>
									</el-card>
								</div>
							</el-card>
						</div-->
					</div>
				</el-col>
			</el-row>
		</div>
</template>

<script>
import PersonalSide from "../../components/PersonalSide.vue"
import axios from "axios"
export default {
		components: {PersonalSide},
		async create() {
			await axios.get('').then((res)=> {
				
			})
		},
		data() {
			return {
			currentPage: 1, //初始页
					pagesize: 5, //每页的数据
					rankList: [
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
					],
					rankList1: [
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
						{username: 'a', level: '1', exp: '400'},
					],
					rankList2: [
						{username: 'b', level: '1', exp: '400'},
						{username: 'b', level: '2', exp: '400'},
						{username: 'b', level: '7', exp: '400'},
					],
				}
		},
		methods: {
			handleClick(tab, event) {
				console.log(tab.paneName)
				if (tab.paneName == "first") {
					this.rankList = this.rankList1
				}
				else {
					this.rankList = this.rankList2
				}
			},
			handleSizeChange (size) {
				console.log(size,'size');
				this.pagesize = size;
				console.log(this.pagesize); //每页下拉显示数据
			},
			handleCurrentChange (currentPage) {
				console.log(currentPage,'currentPage');
				this.currentPage = currentPage;
				console.log(this.currentPage); //点击第几页
			},
		}
}
</script>

<style scoped>
.rankCard-Above {
	height: 600px;
	width: 1000px;
	border-radius: 20px;
}
.rankCard {
	margin-bottom: 10px;
}
.el-pagination {
	margin-top: 10px;
}
</style>