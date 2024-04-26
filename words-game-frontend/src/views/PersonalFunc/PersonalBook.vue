<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="6">
				<PersonalSide></PersonalSide>
			</el-col>
			<el-col :span="18">
				<h2>选择词书</h2>
				<div class="setting">
					<el-button type="primary" @click="studySetting()">学习设置</el-button>
				</div>
				<div class="ChooseBook">
					<el-row>
						<el-col :span="6">
							<el-card shadow="hover" @click="ChooseThisBook()" class="bookCard">
								<p>{{this.curBook}}</p>
								<!--p class="number">{{item.wordnum}}词</p-->
								<p>
									<el-tag type="primary" >当前词书</el-tag>
								</p>
							</el-card>
						</el-col>
						<el-col v-for="(item, index) in wordBooks" :key="index" :span="6">
							<el-card shadow="hover" @click="ChooseThisBook()" class="bookCard">
								<p>{{item}}</p>
								<!--p class="number">{{item.wordnum}}词</p-->
							</el-card>
						</el-col>
					</el-row>
				</div>
			</el-col>
		</el-row>
	</div>
	<div>
		<el-dialog title="学习设置" v-model="settingDialog" width="30%">
			<el-form :model="settingForm" label-width="auto">
				<el-form-item label="每日复习上限" prop="nickname">
					<el-select v-model="settingForm.number">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="settingDialog = false">取 消</el-button>
				<el-button type="primary" @click="submitInfo()">确 定</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
import PersonalSide from "../../components/PersonalSide.vue"
import {useUserStore} from "@/stores/userStore.js"
export default {
	components: {PersonalSide},
	async created() {
		this.username = useUserStore();
		await this.axios({
			method: 'get',
			url: '/api/word/profile/{username}'
		}).then((res)=>{
			console.log(res)
			this.wordBooks = res.data.wordBooks,
			this.curBook = res.data.curBook
		})
	},
	data() {
		return {
			username: "",
			settingDialog: false,
			settingForm: {
				number: ""
			},
			options: [
				{value: '10', label: '10'},
				{value: '15', label: '15'},
				{value: '20', label: '20'},
			],
			books: [
				{name: "大学英语四级", wordnum: "3670", flag: true},
				{name: "大学英语六级", wordnum:"2698", flag: false},
				{name: "六级高频词汇", wordnum: "1526", flag: false},
				{name: "四级高频词汇", wordnum:"1455", flag: false},
				{name: "25考研英语红宝书", wordnum: "6592", flag: false},
			],
			wordBooks: ["大学英语四级", "大学英语六级", "六级高频词汇", "四级高频词汇", "25考研英语红宝书"],
			curBook: "大学英语四级"
		}
	},
	methods: {
		ChooseThisBook() {
			this.axios({
				method: '',
				url: '',
				data: ''
			}).then((res)=> {
				
			})
		},
		studySetting() {
			this.settingDialog = true;
		},
		submitInfo() {
			this.axios({
				method: 'post',
				url: '/api/word/set-review-limit/',
				data: {
					'num': this.settingForm.number
				}
			}).then((res)=> {
				if (res.data.status == 200) {
					this.$message({
						type: 'success',
						message: "修改成功"
					});
				}
			})
		}
	}
}
</script>

<style scoped>
.setting {
	margin-left: 800px;
}
.ChooseBook {
	margin-top: 10px;
	margin-left: 10px;
	margin-right: 120px;
}
.bookCard {
	width: 180px;
	height: 220px;
	margin-bottom: 20px;
  box-shadow: rgba(0, 0, 0, 0.101) 4px 6px 3px;
  border-radius: 5px;
  border: 1px solid #e0e0e0d4;
}
</style>