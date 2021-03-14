import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);
export default new Router({
    routes: [{
            path: '/',
            redirect: '/Login'
        },
        {
            path: '/Home',
            component: resolve => require(['../components/common/Home.vue'], resolve),
            meta: { title: '金石系统' },
            children: [
                //用户管理
                {
                    path: '/couponMessage',
                    component: resolve => require(['../components/page/couponMessage.vue'], resolve),
                    meta: { title: '优惠券管理' }
                },
                //优惠券生成
                {
                    path: '/couponCheck',
                    component: resolve => require(['../components/page/couponCheck.vue'], resolve),
                    meta: { title: '优惠券生成' }
                },
                //订单查询
                {
                    path: '/couponOrder',
                    component: resolve => require(['../components/page/couponOrder.vue'], resolve),
                    meta: { title: '在场优惠券订单' }
                },
                {
                    path: '/couponOrderHistory',
                    component: resolve => require(['../components/page/couponOrderHistory.vue'], resolve),
                    meta: { title: '优惠券订单历史' }
                },
                {
                    path: '/404',
                    component: resolve => require(['../components/page/404.vue'], resolve),
                    meta: { title: '404' }
                },
                {
                    path: '/403',
                    component: resolve => require(['../components/page/403.vue'], resolve),
                    meta: { title: '403' }
                }
            ]
        },
        {
            path: '/login',
            component: resolve => require(['../components/page/Login.vue'], resolve)
        },
        {
            path: '*',
            redirect: '/404'
        }
    ]
})