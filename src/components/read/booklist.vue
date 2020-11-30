<template>
    <div class="container">
        <div class="top">
            <router-link :to="'/book_detail?id='+old_id" tag="div" class="goBack">
                <span class="icon-chevron-thin-left goBack_icon"></span>
            </router-link>
            <span class="top_more icon-share-2"></span>
        </div>
        <div class="nav_list">
            <router-link class="nav_link" :to="'/booklist/chapters?id='+id" active-class="list_active">
            目录
            <span class="icon-th-list"></span>
            </router-link>
            <router-link class="nav_link" :to="'/booklist/tags?id='+id" active-class="list_active">
            标签
            <span class="icon-calendar-o"></span>
            </router-link>
        </div>
        <transition>
              <router-view></router-view>
        </transition>
        <div class="bottom">
            <a href="" class="bottom_left"><span class="bottom_add icon-library_books"></span>加入书架</a>
            <router-link 
            :to="'/text?link='+link"
            class="read_book_link">
                <span class="read_book_icon icon-book-open"></span> 立即阅读
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
          id:'',
          old_id:'',
          link:''
        }
    },
    methods:{
        getInfo(){
            let data = JSON.parse(window.localStorage.getItem("chapters"))
            // console.log(data[0].link);
            this.link = data[0].link   
        }
    },
    created(){
        this.$store.state.flog = false
        this.getInfo()
        this.id = this.$route.query.id
        this.old_id = this.$route.query.old    
    }
}
</script>
<style lang="scss" scoped>
    .container {
        width: 100%;
        .top {
            width: 100%;
            height: 45px;
            border-bottom: 1px solid #9999;
            padding-left: 15px;
            box-sizing: border-box;
            position: relative;
            .goBack {
                font-size: 20px;
                line-height: 45px;
                height: 100%;
                width: 80px;
                position: relative;
                .goBack_icon {
                    font-size: 20px;
                    line-height: 45px;
                    color: rgb(119, 1, 1);
                }
            }
            .top_more {
                position: absolute;
                right: 15px;
                top: 50%;
                transform: translateY(-50%);
                color: rgba(70, 69, 69, 0.6);
                font-size: 24px;
            }
        }
        .nav_list {
            width: 80%;
            height: 40px;
            margin: 0 auto;
            border-bottom: 1px solid #999;
            box-sizing: border-box;
            display: flex;
            color: #333;
            .nav_link {
                flex: 1;
                padding-left: 50px;
                line-height: 40px;
                font-size: 18px;
                color: #333;
                position: relative;
                span {
                    position: absolute;
                    color: rgba(1, 9, 78, 0.6);
                    right: 12px;
                    top: 10px;
                    font-size: 26px;
                    z-index: 30;
                }
            }
            .list_active {
                color: rgb(3, 1, 145);
                border-bottom: 2px solid rgb(4, 91, 141);
            }
        }
        .bottom {
            width: 100%;
            height: 45px;
            position: fixed;
            bottom: 0;
            display: flex;
            .bottom_left {
                flex: 1;
                width: 50%;
                height: 45px;
                color: #333;
                font-size: 16px;
                text-align: center;
                line-height: 45px;
                position: relative;
                .bottom_add {
                    position: absolute;
                    font-size: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 20%;
                }
            }
            .read_book_link {
                flex: 1;
                width: 50%;
                height: 45px;
                color: rgb(94, 1, 1);
                font-size: 16px;
                text-align: center;
                line-height: 45px;
                box-sizing: border-box;
                position: relative;
                .read_book_icon {
                    position: absolute;
                    font-size: 20px;
                    top: 50%;
                    transform: translateY(-50%);
                    left: 20%;
                }
            }
        }
       
    }
    // 路由动画
    .v-enter {
        opacity: 0;
        transform: translateX(100%);
        position: absolute;
    }
    
    .v-leave-to {
        opacity: 0;
        position: absolute;
    }

    .v-enter-active,
    .v-leave-active {
        transition: all 0.3s ease;
    }

    
    // 路由active 
    
    

</style>