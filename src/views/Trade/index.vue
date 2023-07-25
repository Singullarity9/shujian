<template>
    <div>
        <Header />
        <NavBar />
        <div class="trade-container">
            <h3 class="title">填写并核对订单信息</h3>
            <div class="content">
                <h5 class="receive">收件人信息</h5>
                <div v-if="!addressInfo[0]">
                    <el-dialog title="请完善用户订单信息" :visible.sync="!addressInfo[0]">
                        <el-form :model="form">
                            <el-form-item label="所在地区" :label-width="formLabelWidth">
                                <el-cascader v-model="form.area" :options="options"></el-cascader>
                            </el-form-item>
                            <el-form-item label="详细地址" :label-width="formLabelWidth">
                                <el-input v-model="form.detailaddress"></el-input>
                            </el-form-item>
                            <el-form-item label="手机号" :label-width="formLabelWidth">
                                <el-input v-model="form.phonenumber"></el-input>
                            </el-form-item>
                            <el-form-item label="收件人" :label-width="formLabelWidth">
                                <el-input v-model="form.addressname"></el-input>
                            </el-form-item>
                        </el-form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="updateUserAddress">确 定</el-button>
                        </div>
                    </el-dialog>
                </div>
                <div v-else>
                    <div class="address clearFix" v-for="(address, index) in addressInfo" :key="index">
                        <span class="username" :class="{ selected: index == currenAddress }">{{ address.addressname
                        }}</span>
                        <p @click="changeDefault(index, address)">
                            <span class="s1">{{ address.fullAddress }}</span>
                            <span class="s2">{{ address.phonenumber }}</span>
                            <span class="s3" v-show="index == currenAddress">默认地址</span>
                        </p>
                    </div>
                </div>
                <div class="line"></div>
                <h5 class="pay">支付方式</h5>
                <div class="address clearFix">
                    <span class="username selected">在线支付</span>
                    <span class="username" style="margin-left:5px;">货到付款</span>
                </div>
                <div class="line"></div>
                <h5 class="pay">送货清单</h5>
                <div class="way">
                    <h5>配送方式</h5>
                    <div class="info clearFix">
                        <span class="s1">xx快递</span>
                        <p>配送时间：预计8月10日（周三）09:00-15:00送达</p>
                    </div>
                </div>
                <div class="detail">
                    <h5>商品清单</h5>
                    <ul class="list clearFix" v-for="(order, index) in orderInfo.list" :key="order.bookid">
                        <li>
                            <img :src="order.picture" alt="" style="height: 100px; width: 100px;">
                        </li>
                        <li>
                            <p>{{ order.bookname }}</p>
                            <h4>7天无理由退货</h4>
                        </li>
                        <li>
                            <h3>￥{{ order.prize }}</h3>
                        </li>
                        <li>X{{ order.booknum }}</li>
                        <li>有货</li>
                    </ul>
                </div>
                <div class="line"></div>
                <div class="bill">
                    <h5>发票信息：</h5>
                    <div>普通发票（电子） 个人 明细</div>
                    <h5>使用优惠/抵用</h5>
                </div>
            </div>
            <div class="money clearFix">
                <ul>
                    <li>
                        <b><i>{{ totalnum }}</i>件商品，总商品金额</b>
                        <span>¥{{ orderInfo.totalprize }}.00</span>
                    </li>
                    <li>
                        <b>返现：</b>
                        <span>0.00</span>
                    </li>
                    <li>
                        <b>运费：</b>
                        <span>0.00</span>
                    </li>
                </ul>
            </div>
            <div class="trade">
                <div class="price">应付金额:&nbsp;<span>¥{{ orderInfo.totalprize }}.00</span></div>
                <div class="receiveInfo">
                    寄送至:
                    <span>{{ userDefaultAddress.fullAddress }}</span>
                    收货人：<span>{{ userDefaultAddress.addressname }}</span>
                    <span>{{ userDefaultAddress.phonenumber }}</span>
                </div>
            </div>
            <div class="sub clearFix">
                <a class="subBtn" @click="submitOrder">提交订单</a>
            </div>
        </div>
        <Footer />
    </div>
</template>
  
<script>
import { mapState } from 'vuex';

export default {
    name: 'Trade',
    data() {
        return {
            currenAddress: 0,
            options: [{
                value: '江西省',
                label: '江西省',
                children: [{
                    value: '新余市',
                    label: '新余市'
                }, {
                    value: '萍乡市',
                    label: '萍乡市'
                }, {
                    value: '九江市',
                    label: '九江市'
                }, {
                    value: '鹰潭市',
                    label: '鹰潭市'
                }, {
                    value: '上饶市',
                    label: '上饶市'
                }, {
                    value: '抚州市',
                    label: '抚州市'
                }, {
                    value: '吉安市',
                    label: '吉安市'
                }, {
                    value: '景德镇市',
                    label: '景德镇市'
                }, {
                    value: '赣州市',
                    label: '赣州市'
                }, {
                    value: '南昌市',
                    label: '南昌市'
                }, {
                    value: '宜春市',
                    label: '宜春市'
                }]
            }],
            form: {
                area: '',
                detailaddress: '',
                phonenumber: '',
                addressname: ''
            },
            dialogFormVisible: false,
            formLabelWidth: '120px',
        }
    },
    mounted() {
        this.$store.dispatch('getUserAddress');
        this.$store.dispatch('getUserOrderInfo', { orderid: this.orderId });
    },
    computed: {
        ...mapState({
            addressInfo: state => state.trade.address,
            orderInfo: state => state.trade.orderInfo
        }),
        orderId() {
            return this.$route.query.orderId;
        },
        userDefaultAddress() {
            return this.addressInfo[0] || {}
        },
        totalnum() {
            let sum = 0
            if (this.orderInfo.list) {
                this.orderInfo.list.forEach(item => {
                    sum += item.booknum
                })
            }
            return sum
        }
    },
    methods: {
        changeDefault(index, address) {
            this.currenAddress = index
            this.userDefaultAddress = address
        },
        //提交订单
        submitOrder() {
            //订单编号
            let { shoporderid } = this.orderInfo
            let addressid = this.userDefaultAddress.addressid
            this.$router.push(`/pay/?orderId=${shoporderid}&addressid=${addressid}&total=${this.orderInfo.totalprize}`);
        },
        //修改用户地址相关信息
        updateUserAddress() {
            this.dialogFormVisible = false
            this.$store.dispatch('updateUserAddress', {
                proviece: this.form.area[0],
                city: this.form.area[1],
                detailaddress: this.form.detailaddress,
                phonenumber: this.form.phonenumber,
                addressname: this.form.addressname
            })
            this.$store.dispatch('getUserAddress');
        }
    }
}
</script>
  
<style lang="less" scoped>
.trade-container {
    .title {
        width: 200px;
        margin: 0 auto;
        font-size: 14px;
        line-height: 21px;
    }

    .content {
        width: 1200px;
        margin: 10px auto 0;
        border: 1px solid rgb(221, 221, 221);
        padding: 25px;
        box-sizing: border-box;

        .receive,
        .pay {
            line-height: 36px;
            margin: 18px 0;
        }

        .address {
            padding-left: 20px;
            margin-bottom: 15px;

            .username {
                float: left;
                width: 100px;
                height: 30px;
                line-height: 30px;
                text-align: center;
                border: 1px solid #ddd;
                position: relative;
            }

            .username::after {
                content: "";
                display: none;
                width: 13px;
                height: 13px;
                position: absolute;
                right: 0;
                bottom: 0;
                background: url(../../assets/images/choosed.png) no-repeat;
            }

            .username.selected {
                border-color: #e1251b;
            }

            .username.selected::after {
                display: block;
            }

            p {
                width: 610px;
                float: left;
                line-height: 30px;
                margin-left: 10px;
                padding-left: 5px;
                cursor: pointer;

                .s1 {
                    float: left;

                }

                .s2 {
                    float: left;
                    margin: 0 5px;
                }

                .s3 {
                    float: left;
                    width: 56px;
                    height: 24px;
                    line-height: 24px;
                    margin-left: 10px;
                    background-color: #878787;
                    color: #fff;
                    margin-top: 3px;
                    text-align: center;
                }
            }

            p:hover {
                background-color: #ddd;
            }
        }

        .line {
            height: 1px;
            background-color: #ddd;
        }

        .way {
            width: 1080px;
            height: 110px;
            background: #f4f4f4;
            padding: 15px;
            margin: 0 auto;

            h5 {
                line-height: 50px;
            }

            .info {
                margin-top: 20px;

                .s1 {
                    float: left;
                    border: 1px solid #ddd;
                    width: 120px;
                    height: 30px;
                    line-height: 30px;
                    text-align: center;
                    margin-right: 10px;
                }

                p {
                    line-height: 30px;
                }
            }
        }

        .detail {
            width: 1080px;

            background: #feedef;
            padding: 15px;
            margin: 2px auto 0;

            h5 {
                line-height: 50px;
            }

            .list {
                display: flex;
                justify-content: space-between;

                li {
                    line-height: 30px;

                    p {

                        margin-bottom: 20px;
                    }

                    h4 {
                        color: #c81623;
                        font-weight: 400;
                    }

                    h3 {

                        color: #e12228;
                    }
                }
            }
        }

        .bbs {
            margin-bottom: 15px;

            h5 {
                line-height: 50px;
            }

            textarea {
                width: 100%;
                border-color: #e4e2e2;
                line-height: 1.8;
                outline: none;
                resize: none;
            }
        }

        .bill {
            h5 {
                line-height: 50px;
            }

            div {
                padding-left: 15px;
            }
        }
    }

    .money {
        width: 1200px;
        margin: 20px auto;

        ul {
            width: 260px;
            float: right;

            li {
                line-height: 30px;
                display: flex;
                justify-content: space-between;

                i {
                    color: red;
                    font-style: normal;
                }
            }
        }
    }

    .trade {
        box-sizing: border-box;
        width: 1200px;
        padding: 10px;
        margin: 10px auto;
        text-align: right;
        background-color: #f4f4f4;
        border: 1px solid #ddd;
        color: black;
        font-size: small;

        div {
            line-height: 30px;
        }

        .price {
            color: black;
            font-size: small;

            span {
                color: #e12228;
                font-weight: 700;
                font-size: 14px;
            }
        }

        .receiveInfo {
            color: #999;
        }
    }

    .sub {
        width: 1200px;
        margin: 0 auto 10px;

        .subBtn {
            float: right;
            width: 164px;
            height: 56px;
            font: 700 18px "微软雅黑";
            line-height: 56px;
            text-align: center;
            color: #fff;
            background-color: #e1251b;

        }
    }

}
</style>