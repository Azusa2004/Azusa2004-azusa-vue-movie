import { createRouter, createWebHistory } from "vue-router";
import { type App } from "vue";
import LoginView from "@/views/Login/LoginView.vue";
import MainView from "@/views/Main1/MainView.vue";
import MovieType from "@/views/Main1/movie/movieType.vue";
import HomePage from "@/views/Main1/homePage/homePage.vue";
import MovieTabulation from "@/views/Main1/movie/movieTabulation.vue";
import Cinema from "@/views/Main1/cinema/cinema.vue";
import Ranking from "@/views/Main1/reanKing/ranking.vue";
import User from "@/views/Main1/user/user.vue";
import Order from "@/views/Main1/order/order.vue";
import CinemaD2 from "@/views/Main1/cinema/cinemaD2.vue";
import AddMovie from "@/views/Main1/movie/AddMovie.vue";
import MoveDetails from "@/views/Main1/movie/MoveDetails.vue";
import Manage from "@/views/Main1/limit/manage.vue";
import CinemaSelect from "@/views/Main1/cinema/CinemaSelect.vue";
import Juese from "@/views/Main1/juese/Juese.vue";
import { useGlobalStore } from "@/Store/global";
import Performer from "@/views/Main1/performer/Performer.vue";

//懒加载
const NotFound = () => import('@/views/404/NotFound.vue');

//权限数组
const permissionRoutes = [
    {
        path: 'MovieTabulation',
        component: MovieTabulation,
        name: 'MovieTabulation',
        meta: {
            title: ['电影列表']
        }
    },
    {
        path: 'MovieType',
        component: MovieType,
        name: 'MovieType',
        meta: {
            title: ['电影类型'],
        }
    },
    {
        path: 'Cinema',
        component: Cinema,
        name: 'Cinema',
        meta: {
            title: ['影院列表']
        }
    },
    {
        path: 'CinemaD2',
        component: CinemaD2,
        name: 'CinemaD2',
        meta: {
            title: ['影院品牌']
        }
    },
    {
        path: 'AddMovie',
        component: AddMovie,
        meta: {
            title: ['添加电影']
        }
    },
    {
        path: 'Ranking',
        component: Ranking,
        name: 'Ranking',
        meta: {
            title: ['排片管理']
        }
    },
    {
        path: 'Order',
        component: Order,
        name: 'Order',
        meta: {
            title: ['订单管理']
        }
    },
    {
        path: 'User',
        component: User,
        name: 'User',
        meta: {
            title: ['用户管理']
        }
    },

    {
        path: 'modifyMovie/:movieId',
        component: AddMovie,
        meta: {
            title: ['修改电影']
        }
    },
    {
        path: 'MovieDetails/:movieId',
        component: MoveDetails,
        meta: {
            title: ['电影详情']
        }
    },

    {
        path: 'CinemaSelect/:movieId',
        component: CinemaSelect,
        meta: {
            title: ['影院详情']
        }
    },
    {
        path: 'Performer',
        component: Performer,
        name: 'Performer',
        meta: {
            title: ['演职人员']
        }
    },

]


// 路由配置
const routes = [
    {
        path: '/login',
        component: LoginView
    },

    {
        path: '/',
        component: MainView,
        name: 'MainView',
        children: [
            {
                path: '/',
                redirect: '/homePage'
            },
            {
                path: '/HomePage',
                component: HomePage,
                name: 'HomePage',
                meta: {
                    title: ['首页']
                }
            },
            {
                path: 'manage',
                component: Manage,
                name: 'manage',
                meta: {
                    title: ['管理员管理']
                }
            },
            {
                path: 'juese',
                component: Juese,
                name: 'juese',
                meta: {
                    title: ['角色管理']
                }
            },
        ]
    },
    {
        path: '/:pathMatch(.*)*',
        component: NotFound
    },

]

const router = createRouter({
    // 设置路由模式
    history: createWebHistory(),
    // 设置路由配置
    routes: routes
})

//添加白名单（设置哪些页面无需导航守卫的验证）
const WHITE_LIST = ['/login']

//添加开关变量
let isAdd = false;

router.beforeEach(async (to, form) => {
    const ID2 = localStorage.getItem('userId')
    if (!ID2 && WHITE_LIST.includes(to.path)) {
        return true
    }
    if (ID2 && WHITE_LIST.includes(to.path)) {
        return '/HomePage'
    }
    if (!ID2 && !WHITE_LIST.includes(to.path)) {
        return '/login'
    }

    if (!isAdd) {
        //获取仓库对象
        const globalStore = useGlobalStore();
        //调用仓库的公共方法
        await globalStore.getActivePinia()
        //查看仓库的权限数据
        console.log('权限数据', globalStore.permissions);
        permissionRoutes.forEach((item: any) => {
            if (globalStore.permissions?.includes(item.path)) {
                router.addRoute('MainView', item)
                isAdd = true;
            }
        })

        return to;
    }
})

//暴露退出登录方法
export const goLogin = () => {
    //清除所有本地存储
    localStorage.clear();
    // router.replace('/login');
    //刷新页面
    location.reload();
}


export function setupRouter(app: App) {
    app.use(router)
}

export const toLogin = () => {
    router.replace('login')
}