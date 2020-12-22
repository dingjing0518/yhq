<template>
    <div class="carManager">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item>
                    <i class="el-icon-lx-cascades"></i> 优惠券管理
                </el-breadcrumb-item>
            </el-breadcrumb>
        </div>

        <div class="container">
            <!-- <div class="handle-box">
              <el-button type="primary" icon="el-icon-delete" class="handle-del mr10" @click="delAll">批量删除</el-button>
              <el-button type="primary" icon="el-icon-search" @click="addVisible = true">添加</el-button>
            </div> -->
            <el-table
                    :data="tableData"
                    border
                    class="table"
                    ref="multipleTable"
                    @selection-change="handleSelectionChange"
            >
                <el-table-column type="selection" width="50" align="center" class-name="table"></el-table-column>
                <el-table-column type="index" width="50" align="center" label="序号" class-name="table"></el-table-column>
                <el-table-column prop="couponid" v-if="false"></el-table-column>
                <el-table-column prop="names" label="优惠券类型" class-name="table"></el-table-column>
                <el-table-column prop="name" label="减免券名称" class-name="table"></el-table-column>

                <el-table-column prop="startdate" label="开始时间" class-name="table"></el-table-column>
                <el-table-column prop="enddate" label="结束时间" class-name="table"></el-table-column>

                <!--
                <el-table-column prop="jcgType" label="类型" class-name="table"></el-table-column>-->

                <el-table-column prop="count" label="减免券总数量" class-name="table"></el-table-column>
                <el-table-column prop="remaincount" label="减免券剩余量" class-name="table"></el-table-column>

                <el-table-column prop="reductiontime" label="减免总时长" class-name="table"></el-table-column>
<!--                <el-table-column prop="jcgReliefRemaintime" label="减免剩余时长" class-name="table"></el-table-column>-->
                <el-table-column prop="reductionmoney" label="减免总金额" class-name="table"></el-table-column>
<!--                <el-table-column prop="jcgReliefRemainmoney" label="减免剩余金额" class-name="table"></el-table-column>-->

                <!--
                <el-table-column prop="jcgStartdata" label="开始日期" :formatter="dateFormatterexpirationTime" class-name="table"></el-table-column>
                <el-table-column prop="jcgEnddata" label="结束日期" :formatter="dateFormatterexpirationTime" class-name="table"></el-table-column>
                <el-table-column prop="jcgStarttime" label="开始时间" :formatter="dateFormatterexpirationTime" class-name="table"></el-table-column>
                <el-table-column prop="jcgEndtime" label="结束时间" :formatter="dateFormatterexpirationTime" class-name="table"></el-table-column>
                <el-table-column prop="jcgAreaName" label="代理商" class-name="table"></el-table-column>
                -->
<!--                <el-table-column prop="couponParkingName" label="停车场" class-name="table"></el-table-column>-->
<!--                <el-table-column prop="couponAreaName" label="区域" class-name="table"></el-table-column>-->
                <el-table-column label="操作" width="180" align="center" class-name="table">
                    <template slot-scope="scope">
                        <el-button
                                type="text"
                                icon="el-icon-edit"
                                @click="handleEdit(scope.$index, scope.row)"
                        >生成
                        </el-button>
                        <!-- <el-button
                          type="text"
                          icon="el-icon-delete"
                          class="red"
                          @click="handleDelete(scope.$index, scope.row)"
                        >查看</el-button>-->
                    </template>
                </el-table-column>
            </el-table>
            <!--
            <div class="pagination">
              <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="cur_page"
                :page-size="pagesize"
                :total="totalRecords"
                :page-sizes="[5, 10, 20, 40]"
                layout="total, sizes, prev, pager, next, jumper"
              ></el-pagination>
            </div>-->
        </div>
        <!-- 添加弹出框 -->
        <el-dialog title="添加" :visible.sync="addVisible" width="30%">
            <el-form ref="addForm" :model="addForm" label-width="100px">
                <el-form-item label="优惠券名称" prop="jcgName ">
                    <el-input v-model="addForm.jcgName "></el-input>
                </el-form-item>
                <el-form-item label="类型" prop="jcgType">
                    <el-input v-model="addForm.jcgType"></el-input>
                </el-form-item>
                <el-form-item label="数量" prop="jcgCount">
                    <el-input v-model="addForm.jcgCount"></el-input>
                </el-form-item>
                <el-form-item label="开始日期" prop="jcgStartdata">
                    <el-date-picker v-model="addForm.jcgStartdata" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="jcgEnddata">
                    <el-date-picker v-model="addForm.jcgEnddata" type="date" placeholder="选择日期"></el-date-picker>
                </el-form-item>
                <el-form-item label="开始时间" prop="jcgStarttime">
                    <el-time-picker
                            v-model="addForm.jcgStarttime"
                            :picker-options="{
           selectableRange: '18:30:00 - 20:30:00'
            }"
                            placeholder="任意时间点"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item label="结束时间" prop="jcgEndtime">
                    <el-time-picker
                            v-model="addForm.jcgEndtime"
                            :picker-options="{
      selectableRange: '00:00:00 - 23:59:59'
    }"
                            placeholder="任意时间点"
                    ></el-time-picker>
                </el-form-item>
                <el-form-item label="代理商" prop="jcgAgentName">
                    <el-select v-model="addForm.jcgAgentName" placeholder="代理商">
                        <el-option
                                v-for="item in agent"
                                :key="item.jcgAgentName"
                                :label="item.jcgAgentName"
                                :value="item.jcgAgentName"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="停车场" prop="jcgParkingName">
                    <el-select v-model="addForm.jcgParkingName" placeholder="停车场">
                        <el-option
                                v-for="item in parking"
                                :key="item.jcgParkingName"
                                :label="item.jcgParkingName"
                                :value="item.jcgParkingName"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="区域" prop="jcgAreaName">
                    <el-select v-model="addForm.jcgAreaName" placeholder="区域">
                        <el-option
                                v-for="item in area"
                                :key="item.jcgAreaName"
                                :label="item.jcgAreaName"
                                :value="item.jcgAreaName"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="商户" prop="jcgBcName">
                    <el-select v-model="addForm.jcgBcName" placeholder="商户">
                        <el-option
                                v-for="item in bc"
                                :key="item.jcgBcName"
                                :label="item.jcgBcName"
                                :value="item.jcgBcName"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="优惠券" prop="jcgBcName">
                    <el-select v-model="addForm.jcgCouponName" placeholder="优惠券">
                        <el-option
                                v-for="item in bc"
                                :key="item.jcgCouponName"
                                :label="item.jcgCouponName"
                                :value="item.jcgCouponName"
                        ></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="addVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveAdd">确 定</el-button>
      </span>
        </el-dialog>
        <!-- 修改弹出框 -->
        <el-dialog title="生成优惠券" :visible.sync="editVisibleCoupon" width="30%">
            <el-form :model="editForm" :rules="editFormRules" ref="editForm" label-width="100px">
                <el-form-item label="优惠券名称" prop="jcgName">
                    <el-input v-model="editForm.jcgName" placeholder="请输入优惠券名称,此项由用户自定义，以便在优惠券生成模块区分。"></el-input>
                </el-form-item>
                <!--
                <el-form-item label="类型" prop="jcgType">
                  <el-input v-model="editForm.jcgType"></el-input>
                </el-form-item>-->
                <el-form-item label="优惠券数量" prop="jcgCount">
                    <el-input v-model="editForm.jcgCount" placeholder="请输入需要生成的优惠券数量，数量需要小于已有的优惠券数量"></el-input>
                </el-form-item>
                <span class="span_addserver" v-if="addserver!=''">{{addserver}}</span>
                <el-form-item label="优惠券类型" prop="jcgType">
                    <el-select v-model="editForm.jcgType" @change="chooseCoupon" :disabled="flagNum">
                        <el-option
                                v-for="item in couponType"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value"

                        ></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="减免时长" prop="time">
                    <el-input v-model="editForm.jcgReliefTime" placeholder="减免时长（小时）" :disabled="flagTime"></el-input>
                </el-form-item>
                <el-form-item label="减免金额" prop="money">
                    <el-input v-model="editForm.jcgReliefMoney" placeholder="减免金额（元）" :disabled="flagMoney"></el-input>
                </el-form-item>

                <el-form-item label="开始日期" prop="jcgStartdata">
                    <el-date-picker
                            v-model="editForm.jcgStartdata"
                            type="datetime"
                            :picker-options="{
              selectableRange: '00:00:00 - 00:00:00'
            }"
                            placeholder="生效时间，默认无失效日期"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item label="结束日期" prop="jcgEnddata">
                    <el-date-picker
                            v-model="editForm.jcgEnddata"
                            type="datetime"
                            :picker-options="{
              selectableRange: '23:59:59 - 23:59:59'
            }"
                            placeholder="生效时间，默认无失效日期"
                    ></el-date-picker>
                </el-form-item>

            </el-form>
            <span slot="footer" class="dialog-footer">
        <el-button @click="editVisibleCoupon = false">取 消</el-button>
        <el-button type="primary" @click="saveEdit">确 定</el-button>
      </span>
        </el-dialog>
        <!-- 添加弹出框 结束-->
        <!-- 删除提示框 -->
        <el-dialog title="提示" :visible.sync="delVisible" width="300px" center>
            <div class="del-dialog-cnt">删除不可恢复，是否确定删除？</div>
            <span slot="footer" class="dialog-footer">
        <el-button @click="delVisible = false">取 消</el-button>
        <el-button type="primary" @click="deleteRow">确 定</el-button>
      </span>
        </el-dialog>
    </div>
</template>

<script>
    // import { fetchData } from '../../api/index';
    import Validator from "async-validator";

    export default {
        name: "carManager",
        data() {

            let addjcgEnddata = (rule, value, callback) => {
                var date1 = new Date(this.editForm.jcgStartdata);
                var time1 = date1.getTime();

                var date2 = new Date(this.editForm.jcgEnddata);
                var time2 = date2.getTime();

                console.log(time1);
                console.log(time2);

                if (time1 > time2) {
                    callback(new Error("结束时间不能早与开始时间"));
                    console.log("12");
                } else {
                    callback();
                    console.log("13");
                }
            };


            return {
                coupon: [],
                bc: [],
                agent: [],
                area: [],
                parking: [],
                tableData: [],
                cur_page: 1,
                pagesize: 20,
                totalRecords: 0,
                addserver: "",
                totalPages: 0,
                multipleSelection: [],
                select_cate: "",
                select_word: "",
                del_list: [],
                is_search: false,
                editVisibleCoupon: false,
                addVisible: false,
                delVisible: false,
                residuenumber: "",
                nameS: "",
                rowtime: "",
                money: "",
                NumberS: "",
                Alltime: "",
                AllMoney: "",
                addForm: {
                    jcgId: "",
                    jcgName: "",
                    jcgCount: "",
                    jcgStartdata: "",
                    jcgEnddata: "",
                    jcgStarttime: "",
                    jcgEndtime: "",
                    jcgBcName: "",
                    jcgAgentName: "",
                    jcgParkingName: "",
                    jcgAreaName: "",
                    jcgCouponName: "",
                    couponId: ""
                },
                editForm: {
                    jcgId: "",
                    jcgName: "",
                    jcgCount: "",
                    jcgStartdata: "",
                    jcgEnddata: "",
                    jcgStarttime: "",
                    jcgEndtime: "",
                    jcgBcName: "",
                    jcgAgentName: "",
                    jcgParkingName: "",
                    jcgAreaName: "",
                    jcgCouponName: "",
                    jcgType: "",
                    jcgReliefTime: "", // 减免时长
                    jcgReliefMoney: "",// 减免金额
                    jcgReliefAllmoney: "",//减免总金额
                    jcgReliefAlltime: "",//减免总时长
                    couponId: "",
                    bcId: ""
                },
                editFormRules: {
                    jcgName: [
                        {required: true, message: "请输入优惠券名称", trigger: "blur"},
                        {min: 1, max: 20, message: "名称应在20字节以内", trigger: "blur"}
                    ],
                    jcgCount: [
                        {required: true, message: "请输入优惠券数量", trigger: "blur"},
                        {pattern: /^[0-9]+$/, message: "请输入正确的数量"},

                    ],
                    // jcgEnddata:[
                    //   { required: true, message: "请输入结束时间", trigger: "blur" },
                    //   { Validator:addjcgEnddata,trigger:"blur"}
                    // ]
                    jcgEnddata: [
                        {required: true, message: "请输入结束时间", trigger: "blur"},
                        {validator: addjcgEnddata, trigger: "blur"}
                    ]
                    // jcgCount:[{}];
                    // jcgStartdata:[{}];
                    // jcgEnddata:[{}];
                    // jcgStarttime:[{}];
                    // jcgEndtime:[{}];
                },
                options: [],
                value: "",
                carFormRules: {},
                idx: -1,
                id: -1,
                flagTime: true, // 减免时长开关
                flagNum: true,
                flagMoney: true, // 减免金额开关
                flagNum: true,//优惠券数量开关
                couponType: [
                    {
                        value: 0,
                        label: "全免券"
                    },
                    {
                        value: 1,
                        label: "减免时长"
                    },
                    {
                        value: 2,
                        label: "减免金额"
                    },
                    {
                        value: 3,
                        label: "当天有效全免券"
                    }
                ]
            };
        },
        created() {
            this.getData();
            // this.getAgent();
            // this.getArea();
            // this.getParking();
            // this.getBc();
        },
        computed: {
            data() {
                return this.tableData.filter(d => {
                    let is_del = false;
                    for (let i = 0; i < this.del_list.length; i++) {
                        if (d.name === this.del_list[i].name) {
                            is_del = true;
                            break;
                        }
                    }
                    if (!is_del) {
                        if (
                            d.address.indexOf(this.select_cate) > -1 &&
                            (d.name.indexOf(this.select_word) > -1 ||
                                d.address.indexOf(this.select_word) > -1)
                        ) {
                            return d;
                        }
                    }
                });
            }
        },
        methods: {
            dateChangebirthdayC(val) {
                console.log(val);
                this.addForm.couponStarttime = val;
                this.editForm.couponStarttime = val;
            },
            dateChangebirthdayD(val) {
                console.log(val);
                this.editForm.couponEndtime = val;
            },
            dateFormatterexpirationTime(row, column) {
                let datetime = row.expirationTime;
                if (datetime) {
                    datetime = new Date(datetime);
                    let y = datetime.getFullYear() + "-";
                    let mon = datetime.getMonth() + 1 + "-";
                    let d = datetime.getDate();

                    return y + mon + d;
                }
                return "";
            },
            dateFormatter(row, column) {
                let datetime = row.joinTime;
                if (datetime) {
                    datetime = new Date(datetime);
                    let y = datetime.getFullYear() + "-";
                    let mon = datetime.getMonth() + 1 + "-";
                    let d = datetime.getDate();
                    return y + mon + d;
                }
                return "";
            },
            //每页显示个数改变
            handleSizeChange(val) {
                this.pagesize = val;
                this.getData();
            },
            // 分页导航
            handleCurrentChange(val) {
                this.cur_page = val;
                this.getData();
            },
            // 获取数据
            getData() {
                var res = this;
                this.$axios({
                    url:
                        this.GLOBAL._SERVER_API_ + "shopCouponManager/list?shopId=" +
                        localStorage.getItem("shopid") +
                        "&parkingId=" +
                        localStorage.getItem("parkingId"),
                    method: "get"
                    // data: { pageNum: res.cur_page, pageSize: res.pagesize }
                })
                    .then(function (response) {
                        if (response.data.status === 200) {
                            res.tableData = response.data.data;
                            console.log(response.data.data);
                            for (let i = 0; i < res.tableData.length; i++) {
                                res.tableData[i]["names"] = ""
                            }
                            for (let i = 0; i < res.tableData.length; i++) {


                                if (res.tableData[i].type == 0) {
                                    res.tableData[i].names = "全免劵"
                                } else if (res.tableData[i].type == 1) {
                                    res.tableData[i].names = "减免时长"
                                } else if (res.tableData[i].type == 2) {
                                    res.tableData[i].names = "减免金额"
                                } else if (res.tableData[i].type == 3) {
                                    res.tableData[i].names = "当天有效全免劵"
                                }
                            }
                            // res.totalRecords = response.data.couponGenerateRecords; //总条数

                        }
                    })
                    .catch(function (error) {
                        res.$message.error("查询失败: " + error);
                        console.log(error);
                    });
            },
            getAgent() {
                this.agent.length = 0;
                var res = this;
                this.$axios({
                    url:
                        "http://yun.jinshipark.com:81/JinshiCouponGenerate/selectAllAgent",
                    method: "post",
                    data: {}
                })
                    .then(function (response) {
                        for (var i = 0; i < response.data.agentNameData.length; i++) {
                            res.agent.push({
                                jcgAgentName: response.data.agentNameData[i].username
                            });
                        }
                    })
                    .catch(function (error) {
                        res.$message.error("查询失败: " + error);
                    });
            },
            getArea() {
                this.area.length = 0;
                var res = this;
                this.$axios({
                    url:
                        "http://yun.jinshipark.com:81/JinshiCouponGenerate/selectAreaNameAll",
                    method: "get",
                    data: {}
                })
                    .then(function (response) {
                        for (var i = 0; i < response.data.areaNameData.length; i++) {
                            res.area.push({
                                jcgAreaName: response.data.areaNameData[i].areaName
                            });
                        }
                    })
                    .catch(function (error) {
                        res.$message.error("查询失败: " + error);
                    });
            },
            getParking() {
                this.parking.length = 0;
                var res = this;
                this.$axios({
                    url:
                        "http://yun.jinshipark.com:81/JinshiCouponGenerate/selectAllParkingName",
                    method: "post",
                    data: {}
                })
                    .then(function (response) {
                        for (var i = 0; i < response.data.parkingNameData.length; i++) {
                            res.parking.push({
                                jcgParkingName: response.data.parkingNameData[i].jpName
                            });
                        }
                    })
                    .catch(function (error) {
                        res.$message.error("查询失败: " + error);
                    });
            },
            // getBc() {
            //   this.area.length = 0;
            //   var res = this;
            //   this.$axios({
            //     url:
            //       "JinshiBusinessAccount/selectAllBusinessName",
            //     method: "post",
            //     data: {}
            //   })
            //     .then(function(response) {
            //       for (var i = 0; i < response.data.BusinessNameData.length; i++) {
            //         res.bc.push({
            //           jcgBcName: response.data.BusinessNameData[i].bcName
            //         });
            //       }
            //       console.log(response.data);
            //     })
            //     .catch(function(error) {
            //       res.$message.error("查询失败: " + error);
            //     });
            // },
            getCoupon() {
                this.area.length = 0;
                var res = this;
                this.$axios({
                    url:
                        "http://yun.jinshipark.com:81/JinshiCouponGenerate/selectCouponAll",
                    method: "post",
                    data: {}
                })
                    .then(function (response) {
                        for (var i = 0; i < response.data.BusinessNameData.length; i++) {
                            res.coupon.push({
                                jcoCouponName: response.data.BusinessNameData[i].bcName
                            });
                        }
                        console.log(response.data);
                    })
                    .catch(function (error) {
                        res.$message.error("查询失败: " + error);
                    });
            },
            formatter(row, column) {
                return row.address;
            },
            filterTag(value, row) {
                return row.tag === value;
            },
            //修改
            handleEdit(index, row) {
                console.log(row)
                this.rowtime = row
                this.nameS = row.names
                this.NumberS = row.couponDataA
                this.Alltime = row.jcgReliefRemaintime
                this.AllMoney = row.jcgReliefRemainmoney
                if (row.couponType == "1") {
                    this.flagTime = false;
                    this.flagTime = false;
                    this.flagMoney = true;
                    // this.flagNum = true;
                } else if (row.couponType == "2") {
                    this.flagTime = true;
                    this.flagMoney = false;
                    // this.flagNum = true;
                } else if (row.couponType == "3") {
                    this.flagTime = true;
                    this.flagMoney = true;
                    // this.flagNum = false;
                } else if (row.couponType == "0") {
                    this.flagTime = true;
                    this.flagMoney = true;
                    // this.flagNum = false;
                }
                console.log(this.editForm)

                this.residuenumber = row.couponDataA; //剩余数量
                this.idx = index;
                this.id = row.couponId;
                console.log(this.residuenumber);
                this.editVisibleCoupon = true;
                this.editForm = {
                    jcgName: "",
                    jcgType: "",
                    jcgCount: row.jcgCount,
                    couponId: row.couponId,
                    jcgBcName: row.couponBcName,
                    jcgAgentName: row.couponAgentName,
                    jcgParkingName: row.couponParkingName,
                    jcgAreaName: row.couponAreaName,
                    jcgCouponName: row.couponName,
                    jcgStartdata: "",
                    jcgType: Number(row.couponType),
                    jcgReliefTime: "", // 减免时长
                    jcgReliefMoney: "",// 减免金额
                    jcgReliefAllmoney: "",//减免总金额
                    jcgReliefAlltime: "",//减免总时长
                };
                var datetime = new Date();
                var y = datetime.getFullYear() + "-";
                var mon = datetime.getMonth() + 1 + "-";
                var d = datetime.getDate();
                var h = datetime.getHours() + ":";
                h = h < 10 ? "0" + h : h;
                var min = datetime.getMinutes() + ":";
                min = min < 10 ? "0" + min : min;
                var s = datetime.getSeconds();
                s = s < 10 ? "0" + s : s;
                // this.editForm.jcgStartdata = y + mon + d + " " + h + min + s;
            },

            chooseCoupon(value) {
                console.log(value)
                this.editForm.jcgType = value
                if (this.editForm.jcgType == "减免时长") {

                    this.flagTime = false;
                    this.flagMoney = true;
                    // this.editForm.jcgReliefMoney = ""
                } else if (this.editForm.jcgType == "减免金额") {
                    this.flagMoney = false;
                    this.flagTime = true;
                    // this.editForm.jcgReliefTime = ""
                } else {
                    this.flagTime = true;
                    this.flagMoney = true;
                }
            },
            // 保存编辑
            saveEdit() {


                // 开始时间
                var datetime = new Date(this.editForm.jcgStartdata);
                var y1 = datetime.getFullYear() + "-";
                var mon1 = datetime.getMonth() + 1 + "-";
                var d1 = datetime.getDate();
                var hS = datetime.getHours() + ":";
                hS = hS < 10 ? "0" + hS : hS;
                var minS = datetime.getMinutes() + ":";
                minS = minS < 10 ? "0" + minS : minS;
                var sS = datetime.getSeconds();
                sS = sS < 10 ? "0" + sS : sS;
                this.editForm.jcgStartdata = y1 + mon1 + d1 + " " + hS + minS + sS;
                // 结束时间
                console.log(this.editForm.jcgEnddata)
                if (this.editForm.jcgEnddata == undefined) {
                    this.editForm.jcgEnddata = "0";
                    console.log(this.editForm.jcgEnddata)
                } else {
                    var datetimeE = new Date(this.editForm.jcgEnddata);
                    var y2 = datetimeE.getFullYear() + "-";
                    var mon2 = datetimeE.getMonth() + 1 + "-";
                    var d2 = datetimeE.getDate();
                    var hE = datetimeE.getHours() + ":";
                    hE = hE < 10 ? "0" + hE : hE;
                    var minE = datetimeE.getMinutes() + ":";
                    minE = minE < 10 ? "0" + minE : minE;
                    var sE = datetimeE.getSeconds();
                    sE = sE < 10 ? "0" + sE : sE;
                    this.editForm.jcgEnddata = y2 + mon2 + d2 + " " + hE + minE + sE;
                    console.log('5555555', this.editForm.jcgEnddata)
                }


                var res = this;
                switch (this.editForm.jcgType) {
                    case "全免券":
                        this.editForm.jcgType = 0;
                        break;
                    case "减免时长":
                        this.editForm.jcgType = 1;
                        break;
                    case "减免金额":
                        this.editForm.jcgType = 2;
                        break;
                    case "当天有效全免券":
                        this.editForm.jcgType = 3;
                        break;
                }

                console.log(this.editForm.jcgType, "panduan ")
                if (this.editForm.jcgType == 1) {
                    this.editForm.jcgReliefAlltime = (Number(this.editForm.jcgCount) * Number(this.editForm.jcgReliefTime))
                    this.editForm.jcgReliefAllmoney = "";
                    console.log(this.editForm.jcgReliefAlltime)
                } else if (this.editForm.jcgType == 2) {
                    this.editForm.jcgReliefAllmoney = (Number(this.editForm.jcgCount) * Number(this.editForm.jcgReliefMoney))
                    this.editForm.jcgReliefAlltime = ""
                } else if (this.editForm.jcgType == 3) {

                    this.editForm.jcgReliefAlltime = ""
                    this.editForm.jcgReliefAllmoney = "";


                } else if (this.editForm.jcgType == 0) {
                    this.editForm.jcgReliefAlltime = ""
                    this.editForm.jcgReliefAllmoney = "";

                }
                console.log(this.editForm.jcgEnddata)
                this.editForm.bcId = localStorage.getItem("bcId");
                var setData = this.editForm;
                console.log(setData.jcgEnddata);
                console.log(this.rowtime)
                var EndTime = new Date(this.rowtime.couponEndtime).getTime();
                var StartTime = new Date(this.rowtime.couponStarttime).getTime();
                var EndData = new Date(setData.jcgEnddata).getTime();
                var StartData = new Date(setData.jcgStartdata).getTime();
                console.log(EndTime)
                console.log(StartTime)
                console.log(EndData)
                console.log(StartData)

                // if(this.editForm.password==this.editForm.passwordsure)

                this.$refs.editForm.validate(valid => {

                    if (!valid) {
                        res.$message.error("格式不正确");

                    } else if (EndTime >= EndData && StartTime <= StartData) {

                        console.log(this.AllMoney)
                        if (this.nameS == "减免金额") {
                            console.log("1213")
                            var addservered = Number(this.editForm.jcgCount) * Number(this.editForm.jcgReliefMoney)

                            console.log(addservered)
                            if (addservered > Number(this.AllMoney)) {
                                this.addserver = "总金额不能大于剩余金额"
                            } else {
                                this.$axios({
                                    url:
                                        "http://yun.jinshipark.com:81/JinshiCouponGenerate/updateCouponCount",
                                    method: "post",
                                    data: setData
                                })

                                    .then(function (response) {
                                        if (response.status <= 200) {
                                            res.editVisibleCoupon = false;
                                            res.$message.success("生成优惠券成功");
                                            res.addserver = ""
                                            console.log("123", response);
                                            if (res.tableData[res.idx].id === res.id) {
                                                res.$set(res.tableData, res.idx, res.editForm);
                                            } else {
                                                for (let i = 0; i < res.tableData.length; i++) {
                                                    if (res.tableData[i].id === res.id) {
                                                        res.$set(res.tableData, i, res.editForm);
                                                        return;
                                                    }
                                                }
                                            }
                                            res.getData();
                                        }
                                    })
                                    .catch(function (error) {
                                        res.$message.error("修改失败！");
                                        console.log(error);
                                    });
                            }
                        } else if (this.nameS == "减免时长") {


                            var addservertime = Number(this.editForm.jcgCount) * Number(this.editForm.jcgReliefTime)
                            console.log(addservertime)
                            console.log(this.Alltime)
                            if (addservertime > Number(this.Alltime)) {
                                this.addserver = "总时长不能大于剩余时长"
                            } else {
                                this.$axios({
                                    url:
                                        "http://yun.jinshipark.com:81/JinshiCouponGenerate/updateCouponCount",
                                    method: "post",
                                    data: setData
                                })

                                    .then(function (response) {
                                        if (response.status <= 200) {
                                            res.editVisibleCoupon = false;
                                            res.$message.success("生成优惠券成功");
                                            res.addserver = ""
                                            console.log("123", response);
                                            if (res.tableData[res.idx].id === res.id) {
                                                res.$set(res.tableData, res.idx, res.editForm);
                                            } else {
                                                for (let i = 0; i < res.tableData.length; i++) {
                                                    if (res.tableData[i].id === res.id) {
                                                        res.$set(res.tableData, i, res.editForm);
                                                        return;
                                                    }
                                                }
                                            }
                                            res.getData();
                                        }
                                    })
                                    .catch(function (error) {
                                        res.$message.error("修改失败！");
                                        console.log(error);
                                    });
                            }
                        } else {

                            if (Number(this.editForm.jcgCount) > Number(this.NumberS)) {
                                this.addserver = "数量不能大于减免券剩余量"
                            } else {
                                this.$axios({
                                    url:
                                        "http://yun.jinshipark.com:81/JinshiCouponGenerate/updateCouponCount",
                                    method: "post",
                                    data: setData
                                })

                                    .then(function (response) {
                                        if (response.status <= 200) {
                                            res.editVisibleCoupon = false;
                                            res.$message.success("生成优惠券成功");
                                            res.addserver = ""
                                            console.log("123", response);
                                            if (res.tableData[res.idx].id === res.id) {
                                                res.$set(res.tableData, res.idx, res.editForm);
                                            } else {
                                                for (let i = 0; i < res.tableData.length; i++) {
                                                    if (res.tableData[i].id === res.id) {
                                                        res.$set(res.tableData, i, res.editForm);
                                                        return;
                                                    }
                                                }
                                            }
                                            res.getData();
                                        }
                                    })
                                    .catch(function (error) {
                                        res.$message.error("修改失败！");
                                        console.log(error);
                                    });
                            }
                        }

                    } else {
                        res.$message.error("输入的时间在有效时间内")


                    }

                    // 验证通过后的处理...
                });
            },
            handleDelete(index, row) {
                this.idx = index;
                this.id = row.couponId;
                console.log(this.id);
                this.delVisible = true;
            },
            delAll() {
                const length = this.multipleSelection.length;
                let str = "";
                this.del_list = this.del_list.concat(this.multipleSelection);
                for (let i = 0; i < length; i++) {
                    str += this.multipleSelection[i].name + " ";
                }
                this.$message.success("删除了" + str);
                this.multipleSelection = [];
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            // 添加
            saveAdd() {
                console.log(this.addForm.passWord, this.addForm.passwordsure);
                if (this.addForm.passWord == this.addForm.passwordsure) {
                    var res = this;
                    res.addForm.rolename = res.value;
                    if (res.jcgEndtime == NaN) {
                        res.jcgEndtime = ""
                    }
                    var setData = this.addForm;
                    this.$refs.addForm.validate(valid => {
                        if (!valid) {
                            res.$message.success("格式不正确");
                        } else {
                            this.$axios({
                                url:
                                    "http://yun.jinshipark.com:81/JinshiCouponGenerate/insert",
                                method: "post",
                                data: setData
                            })
                                .then(function (response) {
                                    if (response.status <= 200) {
                                        if (response.data.code == 1) {
                                            res.$message.error("用户名已存在");
                                        } else {
                                            res.addVisible = false;
                                            res.$message.success("添加成功");
                                            res.getData();
                                        }
                                    }
                                })
                                .catch(function (error) {
                                    res.$message.error("添加失败！");
                                    console.log(error);
                                });
                        }
                    });
                } else {
                    alert("两次密码不一致");
                }
            },
            // 确定删除
            deleteRow() {
                var res = this;
                this.$axios({
                    url:
                        "http://yun.jinshipark.com:81/JinshiCouponGenerate/deleteByPrimaryKey?id=" +
                        res.id,
                    method: "post",
                    data: {id: res.id}
                })
                    .then(function (response) {
                        if (response.status <= 200) {
                            res.$message.success("删除成功");
                            res.delVisible = false;
                            if (res.tableData[res.idx].id === res.id) {
                                res.tableData.splice(res.idx, 1);
                            } else {
                                for (let i = 0; i < res.tableData.length; i++) {
                                    if (res.tableData[i].id === res.id) {
                                        res.tableData.splice(i, 1);
                                        return;
                                    }
                                }
                            }
                        }
                    })
                    .catch(function (error) {
                        res.$message.success("删除失败！");
                        console.log(error);
                    });
            }
        }
    };
</script>

<style scoped>
    .span_addserver {
        display: block;
        position: relative;
        left: 100px;
        color: red;
        font-size: 12px;
    }

    .handle-box {
        margin-bottom: 20px;
    }

    .handle-select {
        width: 120px;
    }

    .handle-input {
        width: 300px;
        display: inline-block;
    }

    .del-dialog-cnt {
        font-size: 16px;
        text-align: center;
    }

    .table {
        width: 100%;
        font-size: 14px;
    }

    .red {
        color: #ff0000;
    }

    .mr10 {
        margin-right: 10px;
    }

    .outup {
        font-size: 12px;
        color: #fff;
        background-color: #409eff;
        display: inline-block;
        border-radius: 3px;
        padding: 8px 15px;
        margin-left: 5px;
    }

    .upload-demo {
        height: 30px;
        width: 100px;
        display: inline-block;
    }

    .inup {
        margin-top: 10px;
    }
</style>
<style>
    .el-upload--text {
        width: 60px;
        height: 30px;
        display: inline-block;
        border: 0;
        overflow: visible;
    }

    .el-table--border {
        border: 1px solid black;
    }

    .el-table--border,
    .el-table--border th,
    .el-table td,
    .el-table th {
        border-right: 1px solid black;
        border-bottom-color: black;
        border-left-color: black;
    }

    .table {
        border-bottom-color: black !important;
        border-left-color: black !important;
    }
</style>

