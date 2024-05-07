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
					<el-button color="#626aef" type="primary" @click="wordBookSetting()">上传词书</el-button>
				</div>
				<div class="ChooseBook">
					<el-row>
						<el-col :span="6">
							<el-card shadow="hover" class="bookCard curbook">
								<p>{{this.curBook}}</p>
								<!--p class="number">{{item.wordnum}}词</p-->
								<p>
									<el-tag type="primary" >当前词书</el-tag>
								</p>
							</el-card>
						</el-col>
						<el-col v-for="(item, index) in wordBooks" :key="index" :span="6">
							<el-card shadow="hover" @click="ChooseThisBook(item)" class="bookCard">
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
				<el-form-item label="每日计划新词">
					<el-select v-model="settingForm.new_number">
						<el-option
							v-for="item in options"
							:key="item.value"
							:label="item.label"
							:value="item.value"
						/>
					</el-select>
				</el-form-item>
				<el-form-item label="每日复习上限">
					<el-select v-model="settingForm.review_number">
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


	<div>
		<el-dialog title="上传词书" v-model="wordBookDialog" width="30%">
			<el-upload
					ref="upload"
					class="upload-demo"
					action="#"
					:limit="1"
					:on-change="handleChange"
					:on-exceed="handleExceed"
					:auto-upload="false"
			>
				<template #trigger>
					<el-button type="primary">选择文件 (txt格式)</el-button>
				</template>
				<el-button class="ml-3" type="success" @click="submitUpload">
					上传词书
				</el-button>
				<template #tip>
					<div class="el-upload__tip text-red">
						限制一次仅上传一个文件。 (文件仅限.txt格式)
					</div>
				</template>
			</el-upload>
		</el-dialog>
	</div>

</template>

<script>
import PersonalSide from "../../components/PersonalSide.vue"
import axios from "axios"
import yaml from 'js-yaml'

export default {
	components: {PersonalSide},
	async created() {
		/*获取当前词书*/
		await axios({
			method: 'get',
			url: '/api/word/get-now-word-book/'
		}).then((res)=>{
			//console.log(res)
			this.curBook = res.data.book_name
		})
		/*获取全部词书*/
		await axios({
			method: 'get',
			url: '/api/word/get-all-word-book/'
		}).then((res)=>{
			//console.log(res)
			this.books = res.data.word_books
		})
		await axios({
			method: 'get',
			url: '/api/word/get-plan/',
		}).then((res)=>{
			this.settingForm.new_number = res.data.num
		})
		await axios({
			method: 'get',
			url: '/api/word/get-review-limit/',
		}).then((res)=>{
			this.settingForm.review_number = res.data.limit
		})
	},
	data() {
		return {
			wordBookDialog: false,
			// 用于存储当前选择的文件
			currentFile: null,
			uploadBookName: "",



			settingDialog: false,
			settingForm: {
				new_number: "10",
				review_number: "10"
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
		ChooseThisBook(bookname) {
			console.log(bookname)
			this.curBook = bookname
			axios({
				method: 'post',
				url: '/api/word/change-now-book/',
				data: {
					'bookname': bookname
				}
			}).then((res)=> {
				if (res.data.status == 200) {
				}
			})
			this.$message({
				type: 'success',
				message: "选择成功"
			});
		},
		studySetting() {
			this.settingDialog = true;
		},
		submitInfo() {
			console.log("new:" + this.settingForm.new_number)
			console.log("new:" + this.settingForm.new_number)
			/*修改每日计划新词*/
			axios({
				method: 'post',
				url: '/api/word/set-plan/',
				data: {
					'num': this.settingForm.new_number
				}
			}).then((res)=> {
			})
			/*修改每日复习上限*/
			axios({
				method: 'post',
				url: '/api/word/set-review-limit/',
				data: {
					'num': this.settingForm.review_number
				}
			}).then((res)=> {
			})
			this.settingDialog = false
			this.$message({
				type: 'success',
				message: "修改成功"
			});
		},

		/*   以下为上传词书操作   */
		wordBookSetting() {
			this.wordBookDialog = true
		},
		handleChange(file) {
			// file 参数包含了当前选择的文件信息
			this.currentFile = file.raw; // 'raw' 是原生文件对象
			// 可以在这里添加上传逻辑或进一步处理文件

		},
		handleExceed(files, fileList) {
			// 当上传的文件数量超过限制数量时触发
			this.$message.error('只能选择一个文件进行上传');
		},


		async readFile(file) {
			const reader = new FileReader()
			const promise = new Promise((resolve, reject) => {
				reader.onload = function () {
					resolve(reader.result)
				}
				reader.onerror = function (e) {
					reader.abort()
					reject(e)
				}
			})
			reader.readAsText(file, 'UTF-8') // 将文件读取为文本

			return promise
		},



		async submitUpload() {
			console.log(this.currentFile)

      const isTXT = this.currentFile.type === 'text/plain';
      console.log(isTXT)
      if (!isTXT) {
        this.$message.error('只可上传 TXT 格式文本文件');
        return ; // 仅当文件类型为 TXT 时返回 true，否则返回 false
      }


			let res = await this.readFile(this.currentFile) // res 为文件中内容

			const fileName = this.currentFile.name
			this.uploadBookName =  fileName.split('.').slice(0, -1).join('.')

			console.log(this.uploadBookName)

			try {
				// res 为 yaml 格式的内容（从文本文件中取得）



				const json = yaml.load(res) // 输出为 json 格式

			 /* console.log(json)
				console.log(typeof json)*/

				const wordArray = json.split(/\s+/)

			/*  console.log(wordArray)
				console.log(typeof wordArray)*/

				axios({
					method: 'post',
					url: '/api/word/import/',
					data: {
						book_name: this.uploadBookName,
						words: wordArray
					}
				}).then((res)=> {
				})


			} catch (e) {
				this.$message({ message: "格式转换错误，请重新选择文件上传", type: 'error', duration: 2000 })
			}

			this.wordBookDialog = false
			this.currentFile = null
			this.uploadBookName = ""
			this.$refs.upload.clearFiles()
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
.curbook {
	background-color:  #d9ecff;
	border: 2px dashed  #79bbff;
}
</style>