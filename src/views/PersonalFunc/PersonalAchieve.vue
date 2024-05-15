<template>
	<div>
			<el-row :gutter="20">
				<el-col :span="6">
					<PersonalSide></PersonalSide>
				</el-col>
				<el-col :span="18">
					<h2>个人成就</h2>
					<div class="achieveList">
						<div>
							<div class="box-space">
								<el-row>
									<el-col v-for="(item, index) in achieveCards" :key="index" :span="4">
										<el-card shadow="hover"  class="achieveCard">
											<p>{{item}}</p>
										</el-card>
									</el-col>
								</el-row>
							</div>
							<el-card shadow="never" class="shelf s1"></el-card>
							<div class="box-space"></div>
							<el-card shadow="never" class="shelf s2"></el-card>
							<div class="box-space"></div>
							<el-card shadow="never" class="shelf s3"></el-card>
						</div>
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
			achieveCards: ["one", "two", "three"],

		}
	},
	methods: {

	}
}
</script>

<style scoped>
.shelf {
	height: 10px;
	box-shadow: rgba(0, 0, 0, 0.101) 4px 2px 3px;
	margin-right: 50px;
	background-color:lightgrey;
}
.box-space {
	height: 150px;
}
.achieveCard {
	margin-top: 40px;
	height: 120px;
	width: 120px;
}
.s1 {
	margin-top: 10px;
}
</style>