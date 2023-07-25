<template>
    <div>
        <Header />
        <div class="pay-main">
            <div class="pay-container">
                <div class="checkout-tit">
                    <h4 class="tit-txt">
                        <span class="success-icon"></span>
                        <span class="success-info">订单提交成功，请您及时付款，以便尽快为您发货~~</span>
                    </h4>
                    <div class="paymark">
                        <span class="fl">请您在提交订单<em class="orange time">4小时</em>之内完成支付，超时订单会自动取消。订单号：<em>{{ orderId
                        }}</em></span>
                        <span class="fr"><em class="lead">应付金额：</em><em class="orange money">￥{{ total }}</em></span>
                    </div>
                </div>
                <div class="checkout-steps">
                    <div class="step-tit">
                        <h5>支付平台</h5>
                    </div>
                    <div class="step-cont">
                        <ul class="payType">
                            <li><img src="../../assets/images/pay/pay2.jpg"></li>
                            <li><img src="../../assets/images/pay/pay3.jpg"></li>
                        </ul>

                    </div>
                    <div class="hr"></div>

                    <div class="payshipInfo">
                        <div class="step-tit">
                            <h5>支付网银</h5>
                        </div>
                        <div class="step-cont">
                            <ul class="payType">
                                <li><img src="../../assets/images/pay/pay10.jpg"></li>
                                <li><img src="../../assets/images/pay/pay11.jpg"></li>
                                <li><img src="../../assets/images/pay/pay12.jpg"></li>
                                <li><img src="../../assets/images/pay/pay13.jpg"></li>
                                <li><img src="../../assets/images/pay/pay14.jpg"></li>
                                <li><img src="../../assets/images/pay/pay15.jpg"></li>
                                <li><img src="../../assets/images/pay/pay16.jpg"></li>
                                <li><img src="../../assets/images/pay/pay17.jpg"></li>
                                <li><img src="../../assets/images/pay/pay18.jpg"></li>
                                <li><img src="../../assets/images/pay/pay19.jpg"></li>
                                <li><img src="../../assets/images/pay/pay20.jpg"></li>
                                <li><img src="../../assets/images/pay/pay21.jpg"></li>
                                <li><img src="../../assets/images/pay/pay22.jpg"></li>

                            </ul>
                        </div>

                    </div>
                    <div class="hr"></div>

                    <div class="submit">
                        <a class="btn" @click="open">立即支付</a>
                    </div>
                    <div class="otherpay">
                        <div class="step-tit">
                            <h5>其他支付方式</h5>
                        </div>
                        <div class="step-cont">
                            <span><a href="#" target="_blank">微信支付</a></span>&nbsp;
                            <span><a href="#" target="_blank">中国银联</a></span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <Footer />
    </div>
</template>
  
<script>
export default {
    name: 'Pay',
    data() {
        return {
            payInfo: {},
            timer: null,
            code: ''
        }
    },
    mounted() {
    },
    computed: {
        orderId() {
            return this.$route.query.orderId
        },
        addressid() {
            return this.$route.query.addressid
        },
        total() {
            return this.$route.query.total
        }
    },
    methods: {
        open() {
            this.$store.dispatch('reqSubmitOrder', { orderid: this.orderId, addressid: this.addressid })
            this.$router.push('/paysuccess')
        }
    }
}
</script>
  
<style lang="less" scoped>
.pay-main {
    margin-bottom: 20px;

    .pay-container {
        margin: 0 auto;
        width: 1200px;

        a:hover {
            color: #4cb9fc;
        }

        .orange {
            color: #e1251b;
        }

        .money {
            font-size: 18px;
        }

        .zfb {
            color: #e1251b;
            font-weight: 700;
        }

        .checkout-tit {
            padding: 10px;

            .tit-txt {
                font-size: 14px;
                line-height: 21px;

                .success-icon {
                    width: 30px;
                    height: 30px;
                    display: inline-block;
                    background: url(../../assets/images/pay/icon.png) no-repeat 0 0;
                }

                .success-info {
                    padding: 0 8px;
                    line-height: 30px;
                    vertical-align: top;
                }
            }

            .paymark {
                overflow: hidden;
                line-height: 26px;
                text-indent: 38px;

                .fl {
                    float: left;
                }

                .fr {
                    float: right;

                    .lead {
                        margin-bottom: 18px;
                        font-size: 15px;
                        font-weight: 400;
                        line-height: 22.5px;
                    }
                }
            }
        }

        .checkout-steps {
            border: 1px solid #ddd;
            padding: 25px;

            .hr {
                height: 1px;
                background-color: #ddd;
            }

            .step-tit {
                line-height: 36px;
                margin: 15px 0;
            }

            .step-cont {
                margin: 0 10px 12px 20px;

                ul {
                    font-size: 0;

                    li {
                        margin: 2px;
                        display: inline-block;
                        padding: 5px 20px;
                        border: 1px solid #ddd;
                        cursor: pointer;
                        line-height: 18px;
                    }
                }
            }
        }

        .submit {
            text-align: center;

            .btn {
                display: inline-block;
                padding: 15px 45px;
                margin: 15px 0 10px;
                font: 18px "微软雅黑";
                font-weight: 700;
                border-radius: 0;
                background-color: #e1251b;
                border: 1px solid #e1251b;
                color: #fff;
                text-align: center;
                vertical-align: middle;
                cursor: pointer;
                user-select: none;
                text-decoration: none;
            }
        }
    }
}
</style>