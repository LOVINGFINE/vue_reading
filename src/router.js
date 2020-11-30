import Router from 'vue-router'
// 导入路由

/************* 我的收藏 ******* */
import mybooks from './components/mybooks/mybooks.vue'

/*******发现组件 */
import find from './components/find/find.vue'

/************个人主页组件 */
import myhome from './components/myhome/myhome.vue'


/**********书库组件类 ********/ 
import shop from './components/shop_nav/shop.vue'

// 推荐页
import recommend from './components/shop_nav/recommend/recommend.vue'

// 分类页 
import class_books from './components/shop_nav/class/class_books.vue'
import class_detail from './components/shop_nav/class/class_detail/class_detail.vue'

import male from './components/shop_nav/class/class_box/male.vue'
import female from './components/shop_nav/class/class_box/female.vue'
import class_picture from './components/shop_nav/class/class_box/class_picture.vue'
import class_more from './components/shop_nav/class/class_box/class_more.vue'

// 书单
import reclist from './components/shop_nav/reclist/reclist.vue'
import reclist_detail from './components/shop_nav/reclist/reclist_detail.vue'

// 排行页
import ranking from './components/shop_nav/rank/ranking.vue'
/********************************* */
import picture_detail from './components/picture/picture_detail.vue'

/******** 书籍类组件 *******/
import book_detail from './components/read/book_detail.vue'

import booklist from './components/read/booklist.vue'
// 书籍章节列表组件
import chapters from './components/read/list/chapters.vue'

import tags from './components/read/list/tags.vue'
// 书籍列表组件和tag组件

import text from './components/read/text.vue'
// 章节详情
import find_detail from './components/find/find_detail.vue'
// 搜索详情页
let router = new Router({
    routes: [{
            path: '/',
            redirect: '/mybooks'
        },
        {
            path: '/mybooks',
            component: mybooks
        },
        {
            path:'/class_detail',
            component:class_detail
        },
        {
            path: '/class_books',
            component: class_books,
            children:[
                {
                    path:'/',
                    redirect:'male'
                },
                {
                    path:'male',
                    component:male
                },
                {
                    path:'female',
                    component:female
                },
                {
                    path:'class_more',
                    component:class_more
                },
                {
                    path:'class_picture',
                    component:class_picture
                }
            ]
        },
        {
            path: '/shop',
            component: shop,
            children: [{
                    path: '',
                    redirect: 'recommend'
                },
                {
                    path: 'reclist',
                    component: reclist
                },
                {
                    path: 'recommend',
                    component: recommend
                }
            ]
        },
        {
            path: '/find',
            component: find
        },
        {
            path: '/myhome',
            component: myhome
        },
        {
            path: '/book_detail',
            component: book_detail
        },
        {
            path:'/booklist',
            component: booklist,
            children:[
                {
                    path:'',
                    redirect:'chapters'
                },
                {
                    path:'chapters',
                    component:chapters
                },
                {
                    path:'tags',
                    component:tags
                }

            ]
        },
        {
            path:'/text',
            component:text
        },
        {
            path:'/picdetail',
            component:picture_detail
        },
        {
            path: '/ranking',
            component: ranking
        },
        {
            path:'/reclist_detail',
            component:reclist_detail
        },
        {
            path:'/find_detail',
            component: find_detail
        }
    ]
})

export default router