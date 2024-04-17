<template>
    <div>
        <el-row>
            <el-col :span="6">
                <PersonalSide></PersonalSide>
            </el-col>
            <el-col :span="18">
                <div class="ChooseBook">
                    <el-card @click="ChooseThisBook()">
                        四级单词
                    </el-card>
                </div>
            </el-col>
        </el-row>
    </div>
</template>

<script>
import PersonalSide from "../../components/PersonalSide.vue"
export default {
    components: {PersonalSide},
    data() {
        return {

        }
    },
    methods: {
        
    }
}
</script>

<style scoped>
.ChooseBook {
    margin-top: 100px;
    margin-left: 30px;
}
.el-card {
    width: 180px;
    height: 220px;
}
</style>