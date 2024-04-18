<template>
    <div>
        <el-row>
            <el-col :span="6">
                <PersonalSide></PersonalSide>
            </el-col>
            <el-col :span="18">
                <div class="setting">
                    <el-button type="primary" @click="studySetting()">学习设置</el-button>
                </div>
                <div class="ChooseBook">
                    <el-row>
                        <el-col v-for="(item, index) in books" :key="index" :span="5">
                            <el-card shadow="hover" @click="ChooseThisBook()" class="bookCard">
                                <p>{{item.name}}</p>
                                <p class="number">{{item.wordnum}}词</p>
                                <p>
                                    <el-tag type="primary" v-show="item.flag">当前词书</el-tag>
                                </p>
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
                <el-form-item label="每组学习单词量" prop="nickname">
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
export default {
    components: {PersonalSide},
    data() {
        return {
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
            ]
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
        }
    }
}
</script>

<style scoped>
.setting {
    margin-top: 60px;
    margin-left: 30px;
}
.ChooseBook {
    margin-top: 20px;
    margin-left: 30px;
}
.el-card {
    width: 180px;
    height: 220px;
    margin-bottom: 20px;
}
</style>