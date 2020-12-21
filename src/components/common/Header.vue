<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i class="el-icon-menu"></i>
    </div>
    <div class="logo">金石停车</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏显示 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
       <div class="btn-bell" style="margin-top:5px">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div>
        <span style="padding-left:12px">{{ms_username}}</span>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="../../assets/img/img.jpg">
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <!-- <a href="http://blog.gdfengshuo.com/about/" target="_blank">
                            <el-dropdown-item>关于作者</el-dropdown-item>
                        </a>
                        <a href="https://github.com/lin-xin/vue-manage-system" target="_blank">
                            <el-dropdown-item>项目仓库</el-dropdown-item>
            </a>-->
            <el-dropdown-item divided command="loginoutt">修改密码</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
    <el-dialog align="center" title="修改密码" :visible.sync="hide" width="30%">
      <el-form ref="addForm" :model="addForm" :rules="carFormRules" label-width="100px">
        <el-form-item label="姓名：">
          <el-input placeholder="请输入姓名" v-model="realName" class="icon-nd-input"></el-input>
        </el-form-item>

         <el-form-item label="用户名：">
          <el-input placeholder="请输入用户名" v-model="username" class="icon-nd-input" disabled></el-input>
        </el-form-item>
  
          <el-form-item label="原密码：" prop="oldPassWord">
          <el-input placeholder="请输入原密码" v-model="addForm.oldPassWord" class="icon-nd-input" @blur="bur"></el-input>
        </el-form-item>
         
         <el-form-item label="新密码：" prop="passward">
          <el-input placeholder="请输入新密码" v-model="addForm.passward" class="icon-nd-input"></el-input>
        </el-form-item>

         <el-form-item label="确定密码：" prop="passwarder">
          <el-input placeholder="请再次输入新密码" v-model="addForm.passwarder" class="icon-nd-input"></el-input>
        </el-form-item>

      </el-form>
      <el-button type="primary" class="icon-button" @click="addent()">确定提交</el-button>
    </el-dialog>
  </div>
</template>
<script>
import bus from "../common/bus";
export default {
  data() {
    return {
      addForm:{
          passward:"",
          oldPassWord:'',
          passwarder:''
      },
      username: "",
      collapse: false,
      fullscreen: false,
      name: "linxin",
      message: 2,
      hide: false,
      realName:'',
      roleName:'',
      nser:true,
      ms_username:localStorage.getItem("ms_username"),
      carFormRules:{
         passward:[
          { message: "密码不能为空", required: true, trigger: "blur" },
          { pattern: /^[0-9a-zA-Z]+$/, message: '不允许输入汉字' }
        ],
        oldPassWord:[
           { message: "密码不能为空", required: true, trigger: "blur" },
        ],
        passwarder:[
          { message: "密码不能为空", required: true, trigger: "blur" },
          { pattern: /^[0-9a-zA-Z]+$/, message: '不允许输入汉字' }
        ]
      }
    };
  },
 created(){
      this.userName()
 },
  methods: {
    userName(){
      this.username=localStorage.getItem("ms_username");
      this.roleName=localStorage.getItem("roleName")
      var  localname=localStorage.getItem("realName")
      if(localname=="null"){
        this.realName=""
      }
      else{
        this.realName=localname
      }
    },
    //失去焦点事件
    bur(){
      var numberword=window.localStorage.getItem("numberword")
      if(this.addForm.oldPassWord==numberword){
          
      }
      else{
        this.$message.error('原密码输入错误');
        this.addForm.oldPassWord=""
      }
    },
     //修改密码
    addent() {
      if(this.username&&this.addForm.passward){
        if(this.addForm.passward==this.addForm.passwarder){
           this.hide = false;
            var res = this;
            console.log("456")
            this.$axios({
              url: "userLogin/updatePassword",
              method: "post",
              data: { bcPassword: res.addForm.passward, bcUsername: res.username ,}
            })
              .then(function(response) {
                  console.log(response.data); 
                  console.log("123")
                  res.$router.push("/login");
                  localStorage.removeItem("applyParams")
              })
              .catch(function(error) {
                console.log(error);
              
              }); 
        }else{
           this.$message.error('两次密码输入不一致');
        }
      }else{
         this.$message.error('请输入用户名和密码');
      }
      
  
    },
    // 用户名下拉菜单选择事件
    handleCommand(command) {
      if (command == "loginout") {
        localStorage.removeItem("ms_username");
        this.$router.push("/login");
      } else if (command == "loginoutt") {
        this.hide = true;
      }
    },
    // 侧边栏折叠
    collapseChage() {
      this.collapse = !this.collapse;
      bus.$emit("collapse", this.collapse);
    },
    // 全屏事件
    handleFullScreen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    }
  },
  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChage();
    }
  }
};
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
}
.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
.icon-button {
  position: relative;
  margin-bottom: 5px;
  margin-top: 20px;
}
.ieon{
  font-size: 15px;
}
</style>
