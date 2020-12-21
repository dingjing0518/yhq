<template>
    <div class="login-wrap">
        <div class="ms-login">
            <div class="ms-title">金石停车 商户平台</div>
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="0px" class="ms-content">
                <el-form-item prop="username">
                    <el-input v-model="ruleForm.username" placeholder="username" @blur="bur">
                        <!-- <el-button slot="prepend" icon="el-icon-lx-people"></el-button> -->
                    </el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" placeholder="password" v-model="ruleForm.password"
                              @keyup.enter.native="userMessage()">
                        <!-- <el-button slot="prepend" icon="el-icon-lx-lock"></el-button> -->
                    </el-input>
                </el-form-item>
                <div class="login-btn">
                    <el-button type="primary" @click="userMessage()">登录</el-button>
                </div>
                <div class="icon-div">
                    <p class="login-tips">
                        <el-checkbox v-model="checkeders"></el-checkbox>
                        记住用户名
                    </p>
                    <p class="nee" style="margin-left:42%">
                        <el-checkbox v-model="checked">
                        </el-checkbox>
                        记住密码
                    </p>
                </div>
            </el-form>
        </div>
    </div>
</template>
<script>
    export default {
        data: function () {
            return {
                checked: "",
                checkeders: '',
                applyGood: [],
                ruleForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [{
                        required: true,
                        message: '请输入用户名',
                        trigger: 'blur'
                    }],
                    password: [{
                        required: true,
                        message: '请输入密码',
                        trigger: 'blur'
                    }]
                }
            }
        },
        created() {
            if (Boolean(localStorage.getItem("cd"))) {
                this.checkeders = true
            } else {
                this.checkeders = false
            }

            if (Boolean(localStorage.getItem("dd"))) {
                this.checked = true
            } else {
                this.checked = false
            }

            console.log(this.checked)
            this.ruleForm.username = window.localStorage.getItem("checkedersid")
            if (this.ruleForm.username != null) {
                this.bur()
            }
        },
        methods: {
            bur() {
                var nde = JSON.parse(window.localStorage.getItem('applyParams'))
                for (var i = 0; i < nde.length; i++) {
                    if (this.ruleForm.username == nde[i].username) {
                        this.ruleForm.password = nde[i].password
                    } else {
                        this.ruleForm.password = ""
                    }
                }

            },
            userMessage(formName) {
                var res = this
                this.$axios({
                    url: this.GLOBAL._SERVER_API_ + 'login?bcUsername=' + res.ruleForm.username + '&bcPassword=' + res.ruleForm.password,
                    method: 'get'
                    // data: {
                    // 	'bcUsername': res.ruleForm.username,
                    // 	'bcPassword': res.ruleForm.password
                    // }
                }).then(function (response) {
                    if (response.status <= 200) {
                        console.log(res)
                        if (response.data.code == 1) {
                            localStorage.setItem('ms_username', res.ruleForm.username);
                            // document.cookie = "jurisdiction=" +JSON.stringify(response.data.info)
                            localStorage.setItem('bcId', response.data.bcId);
                            localStorage.setItem('agentId', response.data.agentId);
                            localStorage.setItem('areaId', response.data.areaId);
                            localStorage.setItem('parkingId', response.data.parkingId);
                            // console.log(response.data)
                            res.$router.push('/couponMessage');
                            localStorage.setItem("numberword", res.ruleForm.password)
                            if (res.checked == true) {
                                localStorage.setItem('cd', true);
                                res.applyGood.push({
                                    username: res.ruleForm.username,
                                    password: res.ruleForm.password,
                                })
                                localStorage.setItem('applyParams', JSON.stringify(res.applyGood))
                            } else {
                                localStorage.removeItem("cd");
                                //没有填写记住密码
                            }
                            if (res.checkeders == true) {
                                localStorage.setItem('dd', true);
                                localStorage.setItem('checkedersid', res.ruleForm.username)
                            } else {
                                //没有记住用户名
                                localStorage.removeItem("dd");
                            }
                        } else if (response.data.code == 0) {
                            alert("用户不存在")
                        } else {
                            alert("密码错误")
                        }
                    }
                }).catch(function (error) {
                    res.$message.error('系统错误: ' + error);
                    console.log(error);
                });
            }
        }
    }
</script>

<style scoped>
    .login-wrap {
        position: relative;
        width: 100%;
        height: 100%;
        background-image: url(../../assets/img/login-bg.jpg);
        background-size: 100%;
    }

    .ms-title {
        width: 100%;
        line-height: 50px;
        text-align: center;
        font-size: 20px;
        /* color: #fff; */
        border-bottom: 1px solid #ddd;
    }

    .icon-div {
        display: flex;
        align-content: space-between;
        font-size: 12px;
        line-height: 30px;
        color: #ffffff;
    }

    .nee {
        word-spacing: 5px;
    }

    .ms-login {
        position: absolute;
        left: 50%;
        top: 50%;
        width: 350px;
        margin: -190px 0 0 -175px;
        border-radius: 5px;
        background: rgba(255, 255, 255, 0.3);
        overflow: hidden;
    }

    .ms-content {
        padding: 30px 30px;
    }

    .login-btn {
        text-align: center;
    }

    .login-btn button {
        width: 100%;
        height: 36px;
        margin-bottom: 10px;
    }

    .login-tips {
        font-size: 12px;
        line-height: 30px;
        color: #fff;
    }
</style>
